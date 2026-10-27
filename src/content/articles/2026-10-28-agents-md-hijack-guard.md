---
title: "【実践レポート】ダウンロードフォルダーのAGENTS.mdでAIエージェントが乗っ取られる、フックと管理設定で塞ぐ"
summary: "遠藤氏がZennで、ダウンロードフォルダーに置かれたAGENTS.mdやCLAUDE.mdをAIエージェントが指示として読んでしまう危険を検証し、フックと管理者設定で防ぐ仕組みを作った実践レポートを公開しました。"
points:
  - "Codexは9割超、Claude CodeはANTHROPIC_BASE_URL経由で約半数の試行で乗っ取られたと報告"
  - "設定ファイルを検査するフックを作り、80通りの突破を受けてテストを27件から104件に増強"
  - "Claude Code・Codex・Cursorの管理者設定で外せないようにし、毎日の自己点検で17/17の故障を検出"
category: ai
sourceName: "Zenn（遠藤）"
sourceUrl: "https://zenn.dev/shoma_endo/articles/agent-downloads-hijack-guard"
publishedAt: "2026-10-28T07:55:00+09:00"
---

AGENTS.mdやCLAUDE.mdは、Claude CodeやCodexといったAIエージェントに「このフォルダーではこう動いて」と伝えるための指示ファイルです。この記事は、遠藤氏が実際に攻撃を試し、対策を作り込んだ実践レポートです。

## 何が危ないのか

ダウンロードフォルダー（~/Downloads）など、エージェントが作業するフォルダーに悪意のあるAGENTS.mdやCLAUDE.mdが紛れ込むと、エージェントはそれを正規の指示として読んでしまいます。筆者の実験では、Codexは9割を超える試行で乗っ取られました。Claude Codeでは、接続先を変える環境変数`ANTHROPIC_BASE_URL`を書き換える手口で、約半数の試行が成功しました。

## 作った対策

筆者は、エージェントが設定ファイルを読み書きする前に中身を調べるフック（特定のタイミングで自動実行される処理）「agent-config-guard.py」を作りました。JSONやTOMLを正しく解析する形に作り直し、自分でレッドチーム（攻撃役）として80通りの突破を試したうえで、テストを27件から104件に増やしています。

利用者が勝手に外せないよう、各ツールの管理者向け設定に組み込んでいます。
- Claude Code：`/Library/Application Support/ClaudeCode/`（フックが失敗したら止めるonFailure: block）
- Codex：`/etc/codex/requirements.toml`
- Cursor：`/Library/Application Support/Cursor/hooks.json`（failClosed）

root権限で動かすのは`/usr/bin/tee`だけに絞りました。毎日の自己点検では、わざと仕込んだ17件の故障をすべて約25秒で検出できたといいます。

## 残っている課題

筆者は、まだ塞げていない点も正直に挙げています。
- フックがHomebrewのPythonで動いていること
- シェルの設定ファイルから`source`で読み込まれる別ファイルは検査していないこと
- Codexでフックが10秒のタイムアウトに達したときの挙動は未検証であること
