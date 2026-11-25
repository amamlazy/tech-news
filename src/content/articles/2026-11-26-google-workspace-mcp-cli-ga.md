---
title: "Google、AIエージェント向け「Workspace MCPサーバ」と「Workspace CLI」を正式公開　REST APIからの移行を要求"
summary: "Googleは、AIエージェントがGmailやGoogleドライブなどを操作するための「Google Workspace MCPサーバ」と「Google Workspace CLI」を正式版にしました。AIエージェントは2027年2月までに従来のREST APIからMCP経由に移ることが求められます。"
points:
  - "Gmail、Drive、Docs、Sheets、Slides、Calendar、Chat、Tasksの8サービスに対応。Keepも対応予定"
  - "無料枠は製品ごとに1日5,000リクエスト。送信や共有の前に人が確認する仕組みを内蔵"
  - "OpenClaw開発者のsteipete氏は「CLIツールを有料にしないと禁止するのか」と批判的に投稿"
category: backend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/google_workspace_mcpgoogle_workspace_cli.html"
publishedAt: "2026-11-26T06:30:00+09:00"
---
Google Workspace（グーグル ワークスペース）は、GmailやGoogleドライブ、ドキュメントなどをまとめた仕事用サービス群です。MCP（Model Context Protocol）は、AIエージェントが外部のサービスやツールにつながるための共通ルールです。Googleは、AIエージェントがWorkspaceを操作する公式の入り口を正式に用意しました。

## 何が正式版になったか

Publickeyによると、正式版になったのは次の2つです。

- **Workspace MCPサーバ**：Googleが運営するMCPサーバ。Gmail、Google Drive、Docs、Sheets、Slides、Calendar、Chat、Tasksの各サービスにAIエージェントから接続して操作できます。Google Keepにも近く対応する予定です。
- **Workspace CLI**：手元のパソコンから、コマンドで各サービスを操作するツール。人もAIエージェントも使えます。

Google DeepMindのフィリップ・シュミット氏はXで、Enterpriseプランや支払い用カードがなくても1クリックで設定できる個人モードがあり、無料枠は製品ごとに1日5,000リクエスト、メール送信や共有の前に人が確認する仕組み（HITL）も組み込まれていると説明しています。

## REST APIからの移行が必要に

どちらもAIエージェントが使うことを前提に作られ、従来のREST API（プログラムからWebサービスを呼び出す一般的な方法）より、AIが読むデータ量（トークン）を節約できるとされます。

Publickeyによると、Googleは今後AIエージェントからのWorkspaceへのアクセスをMCP経由にする方針を示しており、REST APIを使っているAIエージェントは2027年2月までにMCPへの移行が求められます。

## 開発者の反応

個人向けAIエージェント「OpenClaw」の開発者ピーター・スタインバーガー（steipete）氏は、「GoogleがやっとMCPを作ったと思ったら、gogのようなCLIを、もっとお金を払わないと禁止するのか」と投稿し、いいね668件（取得時点）を集めました。gogは同氏が作ったGoogleサービス用のコマンドラインツールで、既存の非公式ツールへの影響を心配する声が出ています。
