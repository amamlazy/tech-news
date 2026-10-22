---
title: "Googleの「Gemini API CLI」がXで話題、AIエージェントに画像・動画・音声生成を任せるコマンド"
summary: "Googleが試験公開した「Gemini API CLI（gemini-api）」について、開発者のDmitry Lyalin氏がXで紹介した投稿が約7万回表示され、1,100件以上のいいねを集めた。Claude CodeやCodexなどのAIエージェントが、コマンド1つでGeminiの画像・動画・音声の生成やファイルの分析を使えるようにする道具だ。"
points:
  - "Lyalin氏は「モデル名を推測したり、使い捨てのスクリプトを書いたりする必要がなくなる」と投稿"
  - "生成した画像や動画はファイルに保存し、保存先だけを返すのでAIの作業メモを圧迫しない"
  - "公式ブログは10月19日付、Xでの紹介は日本時間の23日未明に広がった"
  - "名前が似た「Gemini CLI」との違いが分かりにくいという声も"
category: x-trend
sourceName: "X"
sourceUrl: "https://x.com/LyalinDotCom/status/2113287431382601765"
publishedAt: "2026-10-23T08:30:00+09:00"
---

Gemini API CLI（コマンド名は `gemini-api`）は、GoogleのAI「Gemini」の機能を、ターミナル（文字でコマンドを打つ画面）から呼び出せるようにする試験版の道具です。人が使うだけでなく、Claude CodeやCodexのようなAIエージェント（自分で考えて作業を進めるAI）に渡して使わせることを強く意識して作られています。

## Xでの反応

公式ブログの筆者の1人で、Googleで開発に携わるDmitry Lyalin氏（@LyalinDotCom）は10月23日0時12分（日本時間）、「Gemini API CLI（gemini-api）がプレビューで使えるようになりました」と投稿しました。続けて、このCLIを使えばエージェントが画像、動画、音声読み上げ、音楽の生成や、メディアの分析、音声の文字起こし、エージェントの管理ができるとし、「モデル名を推測したり、使い捨てのスクリプトや延々と続くcurlを書いたりする必要はもうない」と投稿しています。投稿は約7万4,000回表示され、1,135件のいいね、630件のブックマークを集めました。

同じくGoogleのVamsi Batchu氏（@vamsibatchuk）も23日1時39分（日本時間）に紹介動画付きで投稿しています。

## どんな道具か

公式ブログ（10月19日付）によると、`gemini-api` は追加のソフトがいらない単体のプログラムで、macOS、Linux、Windowsで動きます。

- `gemini-api image "…" --out ./assets/` のように、画像や動画を直接ファイルに書き出し、画面には保存先だけを表示する
- `--help` や `--schema` でコマンドの使い方をネットにつながずに調べられ、`--dry-run` で実際に送信せずに中身を確かめられる
- 結果をJSONなど機械が読みやすい形で出力できる
- APIキー（`GEMINI_API_KEY`）を設定して使う

ブログは、AIエージェントが画像などのデータをそのまま会話に流し込むと、AIが一度に覚えておける量（コンテキスト）を無駄に使ってしまう、と課題を挙げています。GitHubのリポジトリはApache 2.0ライセンスで、ベータ版のため今後仕様が変わる可能性があるとしています。

## 「Gemini CLI」との違いに戸惑う声

Googleにはすでに、ターミナルで会話しながらコードを書くAI「Gemini CLI」があるため、Xでは違いが分かりにくいという声が出ています。Googleの開発者Jack Wotherspoon氏（@JackWoth98）は、「Gemini API CLIはハーネス（AIをエージェントとして動かす土台）ではなく、エージェントがGemini APIの機能を使うためのもの」と投稿しました。Lyalin氏も、アプリからはSDKで、メディア生成やAPIの試用には新しい `gemini-api` で使えるとし、「OpenAIもAnthropicも自社APIのCLIを持っている。Googleは大企業なので製品が多い」と投稿しています。
