---
title: "GitHub Copilot、12月14日に6モデルを廃止　Claude Fable 5、Gemini 3.8 Flash、Grok 4.6などが対象"
summary: "GitHubは、GitHub Copilotで使える一部のAIモデルを2026年12月14日に廃止すると発表しました。Claude Fable 5、Claude Haiku 4.5、Gemini 3.8 Flash、Gemini 4 Argon、Grok 4.6、Kimi K3の6つが対象で、チャットやエージェント、コード補完などすべての機能から外れます。"
points:
  - "後継の候補はClaude Fable 5.2、Claude Haiku 5.5、Gemini 4 Hydrogen、Gemini 4 Carbon、Grok 4.7"
  - "Kimi K3の代わりは未定。Claude Haiku 4.5は個人の年額プラン契約者には残る"
  - "Business／Enterpriseでは既定の設定なら代わりのモデルが自動で有効に。管理者が切っていれば手動で"
category: ai
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-11-13-upcoming-deprecation-of-selected-github-copilot-models-in-december"
publishedAt: "2026-11-16T06:40:00+09:00"
---
GitHub Copilot（コパイロット）は、GitHubが提供するAIのプログラミング支援サービスです。チャットで質問したり、AIエージェントにコードを書かせたりするときに、Anthropic、Google、xAIなど複数の会社のAIモデルから選んで使えます。そのうち古くなった一部のモデルが、12月に使えなくなります。

## 廃止されるモデルと代わりの候補

GitHubの告知によると、12月14日に次のモデルが、Copilot Chat、インライン編集、ask／agentモード、コード補完を含むすべてのCopilotの機能から廃止されます。

- **Claude Fable 5** → Claude Fable 5.2
- **Claude Haiku 4.5** → Claude Haiku 5.5（個人の年額プラン契約者には引き続き提供）
- **Gemini 3.8 Flash** → Gemini 4 Hydrogen
- **Gemini 4 Argon** → Gemini 4 Carbon
- **Grok 4.6** → Grok 4.7
- **Kimi K3** → 代わりは今後発表

## 利用者がすること

GitHubは、期日までにワークフローや連携を、サポートが続くモデルに切り替えるよう求めています。

- Copilot Enterprise／Businessでは、既定のモデル有効化の設定のままなら、代わりのモデルが自動で有効になる
- 管理者が全体の既定を切っている場合や、そのモデルを明示的に無効にしている場合は、Copilotの設定のモデルポリシーから代わりのモデルを有効にする
- 廃止されたモデルを消す作業は不要

## 現場で見るところ

チームで特定のモデルを指定してCopilotを使っている場合や、社内の手順書やスクリプトでモデル名を書いている場合は、12月14日より前に見直しておくと安心です。代わりのモデルは性格や得意分野が少し違うこともあるので、普段の作業で試しておくとよさそうです。
