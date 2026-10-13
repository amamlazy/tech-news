---
title: "GitHub Secret scanning、Anthropicキーを既定でpush保護　Salesforceもパートナー追加"
summary: "GitHubは10月13日、Secret scanningにAnthropic・Salesforce・Cloudsmithの検出を追加し、Anthropicのサービス／ユーザーAPIキーを既定のpush protection対象にしたと発表した。"
points:
  - "新規検出: anthropic_service_api_key、anthropic_user_api_key、cloudsmith_api_key、Salesforce Marketing CloudのOAuthトークン"
  - "Anthropicの2種は、Secret scanning有効リポジトリ（無料の公開リポジトリ含む）でコミットを既定ブロック"
  - "Salesforceは秘密スキャンのパートナーとなり、公開リポジトリで見つかると発行元へ転送"
  - "Partner秘密は公開リポジトリで発行元へ報告、User秘密は公開／プライベートでアラート"
category: backend
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-13-secret-scanning-blocks-anthropic-keys-by-default-adds-salesforce/"
publishedAt: "2026-10-14T07:35:00+09:00"
---

## 何が変わったか

GitHubは2026年10月13日、Secret scanningの検出対象を拡充しました。新たにSalesforce、Anthropic、Cloudsmithの秘密種別が加わり、うちAnthropicのサービスAPIキーとユーザーAPIキーは、push protectionの既定セットに含まれます。

Secret scanningが有効なリポジトリ（無料の公開リポジトリを含む）では、これらのAnthropicキーを含むコミットが自動的にブロックされます。CloudsmithのAPIキーも自動検出の対象です。

## 現場で見るところ

Salesforceは秘密スキャンのパートナーになりました。公開リポジトリでプロバイダの秘密が見つかると、GitHubが該当パートナーへ転送し、失効やローテーションを促す仕組みです。今回追加されたSalesforce側の種別は`salesforce_marketing_cloud_api_oauth2_token`です。

Partner扱いの秘密は公開リポジトリで発行元へ報告され、User扱いは公開・プライベート双方でアラートが出ます。ClaudeやAnthropic APIを日常的に使うチームでは、キーをリポジトリに置かない運用に加え、誤ってコミットした場合のブロック挙動も想定しておく必要があります。
