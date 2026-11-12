---
title: "【実践レポート】VS Codeの「Local harness」は2027年2月に削除　Copilot harnessへの移行を実際に試した手順とつまずきどころ"
summary: "Microsoft Student Ambassadorのロホマン シャヒン氏が、VS Code 1.146で非推奨になった「Local harness」から「Copilot harness」へ、デモ用リポジトリで実際に移行した手順をQiitaで紹介しました。MCPサーバーやプロンプトファイルなどの古いカスタマイズは自動では移らない点に注意が必要です。"
points:
  - "Copilot harnessは1.143から新規セッションの既定。チャットタイトルの「Local ·」「Copilot ·」で見分けられる"
  - "Customizations→Migrationsで移行。プロンプトはスキルに変換され、元ファイル削除のチェックが既定でオン"
  - "パスワード入力つきのMCPサーバーやフックは自動変換されず、手作業での書き直しが必要"
category: frontend
sourceName: "Qiita（shahin0809）"
sourceUrl: "https://qiita.com/shahin0809/items/ccb8a8ddf11d6cb4113d"
publishedAt: "2026-11-13T06:05:00+09:00"
---
これは、Microsoft Student AmbassadorでGitHub Copilot User Group Japanの運営にも関わるロホマン シャヒン氏がQiitaに公開した実践レポートの紹介です。VS Code（Visual Studio Code）はMicrosoftのコードエディタで、GitHub Copilotはその中で動くAIのコーディング支援機能です。harness（ハーネス）は、AIモデルに渡す情報を準備し、ツールの呼び出しや承認を取りまとめる「エージェントの実行基盤」のことです。

## 何が変わるのか

2026年11月11日に公開されたVS Code 1.146のリリースノートで、従来の「Local harness」が非推奨になり、2027年2月に削除されると予告されました。

- **Local harness**：VS Codeに組み込まれた従来型。拡張機能ホストで動き、ウィンドウを閉じると作業が止まる
- **Copilot harness**：Copilot SDKベース。Agent Hostで動くので、ウィンドウを閉じてもバックグラウンドで続けられる

Copilot harnessは1.143から新規セッションの既定なので、普通に使っていれば移行済みの人も多いはずです。ただし `.vscode/mcp.json` や `.prompt.md` などの古いカスタマイズは自動では移りません。

## 筆者が試した移行手順

1. チャットのタイトルの接頭辞（`Local ·` か `Copilot ·`）や、入力欄の下のSession Targetで、使っているharnessを確認する
2. Chatビュー右上のCustomizationsのアイコン（コマンドパレットなら `Chat: Open Customizations`）を開き、左のメニューの「Migrations」で移行が必要な項目を見る
3. MCPサーバー、プロンプトファイル、`.vscode/agents` などのファイルをグループごとに移行する

デモ用リポジトリでの結果は次の通りでした。

- MCPサーバー2件は `.mcp.json` に移行できたが、`${workspaceFolder}` は絶対パスに置き換えて書かれた
- パスワード入力つきのMCPサーバーは自動移行されず「Needs manual review」に残った
- プロンプトファイル2件は `.github/skills/` のスキルに変換された。元ファイルを削除するチェックが既定でオンで、`mode`／`model`／`tools` の指定は消える
- Localの会話は「Continue In → Copilot」で引き継げた（一方通行）

## つまずきどころ

フック（エージェントの動作の前後に処理を挟む仕組み）は自動変換されず、設定とスクリプトの両方を書き直す必要があります。公式ドキュメントでは、`preToolUse` はエラーが起きると操作を拒否する側に倒れるとされているため、筆者は単体で動作を確認してから有効にするよう勧めています。

筆者は「移行した」と「動く」は別だとし、代表的なタスクを実際にCopilot harnessで動かして確かめることを勧めています。期限まで約3か月あるうちに試し、足りない機能はIssueで伝えるのが得だ、と締めくくっています。
