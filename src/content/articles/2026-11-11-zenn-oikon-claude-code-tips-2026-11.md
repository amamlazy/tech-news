---
title: "【実践レポート】Claude Codeの最近の使いこなし5選　/btw、HTMLレポート、Claude Mods、マルチエージェント、Remote Control"
summary: "Claude Codeの解説書を書いているOikon氏が、最近特に重宝しているClaude Codeの使い方5つをZennで紹介しました。作業を止めずに質問できる/btwや、スマホからセッションを操作するRemote Control、セッション同士のメッセージ送信などを、コマンド付きで解説しています。"
points:
  - "/btwは会話履歴に残さず質問でき、長時間動くエージェントの進捗確認や/compactの指示作りに使える"
  - "Claude Modsで見た目や動作を変更、プロンプトキャッシュの状態を表示するModなどを紹介"
  - "Remote Controlとセッション間メッセージで、常時起動のマシン上の複数セッションをスマホからまとめて扱える"
category: ai
sourceName: "Zenn（Oikon）"
sourceUrl: "https://zenn.dev/oikon/articles/claude-code-recipe"
publishedAt: "2026-11-11T06:30:00+09:00"
---
これは、Claude Codeの書籍を2冊出しているOikon氏がZennに書いた、使いこなしの実践レポートの紹介です。Claude Codeは、Anthropicが提供している、ターミナルなどで動くAIプログラミング支援ツールです。

## 1. /btw コマンド

`/btw`（by the wayの略）は、会話履歴に残さずに今のセッションについて質問できるコマンドです。回答はそれまでの会話の内容だけを使い、画面に重ねて表示され、メインの文脈には入りません。

筆者は、長時間自走しているエージェントの作業を止めずに進捗を聞いたり、`/compact`（会話の要約）に渡す指示文を `/btw` に作らせたりしているそうです。作ってもらった文は `c` キーでコピーできます。

## 2. HTMLレポートやArtifacts

AIの作業量が人間が把握できる量を超えつつあるなかで、筆者はMarkdownではなくHTMLで図や表を使ったレポートを出させることが増えたといいます。24時間動かしているサイドプロジェクトでは、1日2回Claude Artifactsにレポートを更新させ、スマホのClaudeアプリから隙間時間に確認しているそうです。

## 3. Claude Mods

Claude Modsは、Claude Codeの見た目や動作を変えられるプラグインで、JavaScriptやTypeScriptで書いたイベントハンドラ（フック）でできています。筆者はプロンプトの履歴をレール状に表示する自作Mod「prompt-rail」と、プロンプトキャッシュ（同じ会話の頭を再利用して速く安くする仕組み）の状態を表示する「prompt-cache-control」を紹介しています。導入例は次の通りです。

```bash
claude plugin marketplace add oikon48/prompt-rail
claude plugin install prompt-rail@oikon48
```

なお、キャッシュの寿命はAPIキー利用では5分、サブスクリプションの利用枠内のメイン会話では1時間で、切れた後の最初のリクエストは遅く高くなる、と注意を促しています。

## 4. マルチエージェントパターン

標準のSubagent（呼び出し元に結果を返す補助役）や、実験的機能のAgent Teams（環境変数 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` が必要）を使えば、比較的簡単に複数のエージェントを協業させられます。互いに依存しない調査を並列で走らせたり、担当同士が途中で情報を共有したりできるのが利点です。

## 5. Remote Control

自分のマシンで動くClaude Codeのセッションに、ブラウザやスマホからつないで作業を続けられる機能です。`claude remote-control`、`claude --rc`、実行中のセッションでの `/rc` の3通りで起動できます。v2.1.224以降は別のセッションにメッセージを送れるようになり、`/rename` でセッションに「Lead」「Worker」などの名前を付けると、@メンションで指定しやすくなるそうです。

## 読みどころ

個々の機能より、「常時起動のマシンでエージェントを走らせ、人は1日数回スマホで確認する」という使い方の全体像が参考になります。ただし実験的機能も含まれるため、仕様の変化には注意が必要です。
