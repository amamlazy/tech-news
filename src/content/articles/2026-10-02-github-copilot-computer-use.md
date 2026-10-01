---
title: "GitHub Copilotにコンピュータユース、デスクトップ操作がプレビュー"
summary: "GitHub Copilot CLIとmacOS/Windowsアプリでコンピュータユースがパブリックプレビューになりました。GUIアプリのクリックや入力など、APIのない業務フローも委任できます。"
points:
  - "CLIは /computer on で有効化"
  - "操作前に承認を求め、組織設定で無効化も可能"
  - "レガシーやGUI専用ソフトの自動化向け"
category: ai
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-01-github-copilot-can-now-interact-with-desktop-apps/"
publishedAt: "2026-10-02T07:05:00+09:00"
---

## 何が変わったか

GitHub は 2026年10月1日、Copilot CLI と GitHub Copilot アプリ（macOS / Windows）でコンピュータユースをパブリックプレビュー公開した。アクセシビリティ情報や画面の文脈を読み、クリック、文字入力、キー操作、スクロール、ドラッグなどを行える。

APIやCLI、MCPがないレガシーやGUI専用ソフトのワークフローも対象になる。操作前に承認を求め、常時許可したアプリの見直しもできる。macOSではアクセシビリティと画面収録の権限案内があり、組織管理設定で機能を無効化できる。

## 現場で見るところ

CLIでは `/computer on`、`/computer show`、`/computer off` で制御する。アプリ側は設定の Computer Use から有効化できる。成果・使うアプリ・制約を具体的に書くほど安定しやすい。社内ポリシーとデスクトップ権限の確認を先に済ませたい。
