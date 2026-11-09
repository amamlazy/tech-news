---
title: "GitHub、Actionsのログに紛れたパスワードやトークンも検出　シークレットスキャンがプレビュー対応"
summary: "GitHubのシークレットスキャンが、GitHub Actionsのワークフローログに含まれる秘密情報も検出できるようになりました。まずはGitHub Enterprise Cloudの対象ライセンス向けパブリックプレビューです。"
points:
  - "ワークフロー完了時にログを走査し、見つかれば通常のシークレットアラート一覧に並ぶ"
  - "有効化後に完了した実行だけが対象。過去ログは遡らず、プレビュー中は通知も出ない"
  - "汎用パターン、カスタムパターン、AI検出、Actionsが伏せ字にした値は対象外"
category: backend
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-11-09-secret-scanning-detects-secrets-in-github-actions-workflow-logs"
publishedAt: "2026-11-10T09:15:00+09:00"
---
シークレットスキャン（secret scanning）は、APIキーやパスワードなどの「秘密情報」が誤って公開・保存されていないかを、GitHubが自動で探してくれる機能です。GitHub Actions（GitHub上でテストやデプロイを自動実行する仕組み）の実行ログも、その検査対象に加わりました。

## 何が変わったか

GitHub Changelog（11月9日付）によると、これまでのコード、Issue、Wiki、Discussions、プルリクエストに加え、Actionsのワークフローログも走査されるようになりました。ワークフローの実行が終わるとログが既知のサービスのパターンで調べられ、見つかったものはリポジトリのシークレットスキャンのアラート一覧に、ログへのリンク付きで表示されます。対応している種類では有効性チェック（その鍵がまだ使えるか）も行われ、ログを削除してもアラートは残ります。

## 使える条件と有効化

パブリックプレビューで、対象はGitHub Secret ProtectionかGitHub Advanced Securityを持つGitHub Enterprise Cloudの企業です（GHE.comのデータレジデンシーも含む）。Enterpriseのオーナーが、企業設定の「Policies」→「Advanced Security」で、「All repositories」を「Enabled」にします。既定は無効です。

## 注意点

有効化した後に完了した実行だけが対象で、既存のログは遡って調べません。汎用パターン、カスタムパターン、AIによる検出、Actionsがすでに伏せ字（マスク）にした値は検出しません。また、プレビュー中はアラートの通知が飛ばないため、アラート一覧を自分で確認する必要があります。
