---
title: "静的型付けはAIのバグを減らすか　TSとJSでGit互換CLIを3本ずつ書かせて比べた実験"
summary: "Claude Opus 5.5にTypeScriptとJavaScriptで同じ数千行のGit互換CLIを3本ずつ書かせ、残るバグと費用を比べたZennの検証記事です。この規模では明確な差は出ず、JS側はテストを約2倍回して型の不在を補っていました。"
points:
  - "隠しテスト満点はTSが3本中3本、JSが3本中2本。残ったバグは型では防げない種類"
  - "費用はTSが約7%高い。コードが約2割長く、キャッシュ読み込みが増えたため"
  - "本物のgitと答え合わせできる環境があったことが、差が出なかった理由と筆者は推測"
category: frontend
sourceName: "Zenn"
sourceUrl: "https://zenn.dev/torudev/articles/dd45de860fc7c3"
publishedAt: "2026-11-10T07:45:00+09:00"
---
静的型付け（TypeScriptのように、変数の種類＝型を書いてプログラムの実行前に間違いを検査する方式）は、AIにコードを書かせるときも役立つと言われます。この記事は、それを実際に確かめた、Toru Ikeda氏（torudev）によるZennのハンズオン検証記事です（2026年11月8日）。

## 実験の設定

きっかけは、Yusuke Endoh氏が数百行規模の簡易Gitを各言語で書かせ、TypeScriptがJavaScriptより時間・費用とも約1.6倍かかったという記事です。筆者は規模を数千行に広げ、バグの残り方まで比べました。

- お題：本物のgitと同じ形式で読み書きし、出力も一字一句そろえるCLI「tgit」。仕様書を3版（init/add/commitなど→diff/merge→tag/reset/cherry-pickなど）に分け、機能を積み上げさせる
- AI：Claude Code上のClaude Opus 5.5をDockerコンテナ内で実行
- TypeScript側：`strict`と`noUncheckedIndexedAccess`を有効、`any`禁止、`tsc`が通ることを完了条件に
- JavaScript側：型注釈もJSDocの型も禁止
- 指示書（AGENTS.md）はこの部分以外同一。`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`で文脈を20万トークンに絞った
- 採点：見えない隠しテスト151件に加え、ランダムな操作列2,000本を本物のgitと突き合わせ、`.git`の中身や`git fsck --strict`まで確認

## 結果

隠しテスト満点はTypeScriptが3本中3本、JavaScriptが3本中2本でした。ただ、唯一残ったバグは「`.gitignore`で無視したファイルをaddしたとき、エラー判定の前に空の`.git/index`を書いてしまう」という処理順の問題で、型検査では防げない種類だったといいます。

費用はTypeScriptが$49.9、JavaScriptが$46.7で約7%の差。TypeScriptはコードが約2割長く、毎ターン読み直すキャッシュの量が増えたのが主な理由です。ただし同じ言語内でも1割以上のばらつきがあり、差はその範囲に収まっていました。

## 気になった傾向

TypeScript側のAIは1本あたり40〜55回`tsc`を実行したのに、型エラーが出たのは2〜3回だけで、AIはそもそも型エラーをほとんど書いていませんでした。逆にJavaScript側は単体テストを約2倍回しており、筆者は規模がもっと大きくなると、この確認コストが動的型付けの不利として表に出るかもしれないと見ています。

## 注意点

筆者は、各3本と本数が少ないこと、正解と答え合わせしやすいお題とモデル1つでの結果であることを限界として挙げ、「差がなかった」は「差がないと証明された」とは違うと強調しています。実験の資材やログはすべて公開されています。
