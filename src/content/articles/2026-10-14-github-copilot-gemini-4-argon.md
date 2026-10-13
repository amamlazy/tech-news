---
title: "GitHub Copilot、Gemini 4 Argonを一般提供　CLIでの伸びを強調"
summary: "GitHubは10月13日、GoogleのフロンティアモデルGemini 4 ArgonをCopilotで一般提供すると発表した。複雑なコーディング・エージェント・推論向けで、早期テストではCopilot CLIでの伸びが最も大きかったとしている。"
points:
  - "VS Code、Visual Studio、Copilot CLI、coding agent、JetBrains、Xcode、Eclipseなどでモデルピッカーから選択可能"
  - "対象はCopilot Pro+、Max、Business、Enterprise。従量課金はプロバイダのリスト価格"
  - "Business／Enterpriseではモデルポリシーでアクセス制御。既定では新モデルが自動有効"
  - "ロールアウトは段階的。見えない場合はしばらく待つ必要がある"
category: ai
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-13-gemini-4-argon-in-github-copilot/"
publishedAt: "2026-10-14T07:20:00+09:00"
---

## 何が変わったか

GitHubは2026年10月13日、Gemini 4 ArgonをGitHub Copilotで一般提供するとChangelogで案内しました。モデルは複雑なコーディング、エージェント的な作業、推論タスク向けと位置づけられています。早期テストでは、これまでのGemini系より各コーディングベンチで多くタスクを解き、特にCopilot CLIでの伸びが大きかったと説明しています。作業の仕上げ前にエッジケースを試す挙動にも触れています。

課金は利用量ベースで、プロバイダのリスト価格に従います。利用できるのはCopilot Pro+、Max、Business、Enterpriseです。

## 現場で見るところ

モデルピッカーから選べる対象は、Visual Studio Code、Visual Studio、Copilot CLI、GitHub Copilot coding agent、GitHub Copilotアプリ、JetBrains IDE、Xcode、Eclipseです。提供は段階的で、まだ出てこない場合は時間をおいて確認する形になります。

Copilot Enterprise／Businessの管理者は、Copilot設定のモデルポリシーでGemini 4 Argonへのアクセスを制御できます。既定のモデル有効化では、管理者が全体の既定を切る、またはこのモデルを明示的に無効にしない限り、新モデルは自動で有効になります。9月末のモデル発表時点では限定公開が中心だったため、Copilot上で日常的に選べるようになった点が実務上の変化です。
