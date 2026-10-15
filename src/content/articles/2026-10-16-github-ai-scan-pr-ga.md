---
title: "GitHub、プルリクエストのAI Scanを一般提供　CodeQL未対応のPHPやTerraformも検査"
summary: "GitHubが、プルリクエストの変更から脆弱性を探すコードスキャンの「AI Scan」を一般提供した。CodeQLが対応していないPHPやShell、Terraform、Dockerfileなどを補い、同日にはアラートをCopilotが直す「エージェント型autofix」も一般提供になった。"
points:
  - "AI Scanの指摘は参考扱いで、チェックを失敗させたりマージを止めたりはしない"
  - "公開リポジトリは利用可能、非公開はCode SecurityかAdvanced Securityが必要"
  - "エージェント型autofixは修正後にCodeQLを再実行し、直ったと確かめてからドラフトPR"
  - "最大25件のアラートを1つのPRにまとめて修正させることも可能"
category: backend
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-15-ai-scan-for-pull-requests-generally-available"
publishedAt: "2026-10-16T08:10:00+09:00"
---

GitHubのコードスキャンは、リポジトリのコードに潜むセキュリティ上の弱点（脆弱性）を自動で探す機能です。これまでの中心は「CodeQL」というルールベースの解析エンジンでしたが、そこにAIで探す「AI Scan」を組み合わせる機能が、プルリクエスト向けに正式提供になりました。10月14日に紹介した「AI Scanのメトリクス」は効果を見える化する機能で、今回はスキャンそのものの一般提供です。

## AI Scan for pull requests

AI Scanは、コードスキャンとリポジトリのAI Scan設定が有効なとき、プルリクエストで自動的に動きます。CodeQLがまだ対応していない言語や形式、具体的にはPHP、Shell/Bash、Terraformの設定ファイル（HCL）、Dockerfile、Java向けのJSP、C#向けのBlazorなどの脆弱性を探すのが役割です。

見つかった問題はCodeQLの結果と並んで「Conversation」や「Files changed」タブに表示され、「AI」の印で区別できます。リスクの説明や修正案（autofix）が付くこともあります。

注意点として、AI Scanの指摘はあくまで参考（advisory）扱いです。コードスキャンのチェックを失敗させることはなく、ルールセットでマージを止める条件にもできません。フォークからのプルリクエストやDependabotが作ったものでは動きません。

## 利用条件と課金

公開リポジトリなら、組織でも個人アカウントでも使えます。非公開・内部リポジトリでは、GitHub Code SecurityかGitHub Advanced Securityが必要です。Copilotのライセンスは不要ですが、「Code Security AI Credits」を消費します。

## エージェント型autofixも一般提供

同じ10月15日には、コードスキャンのアラートをCopilotに割り当てると直してくれる「エージェント型autofix」も一般提供になりました。Copilotが関連ファイルを調べて修正案を作り、CodeQLを再実行して本当にアラートが消えるか確かめ、必要なら手直ししてからドラフトのプルリクエストを開きます。

アラート一覧から最大25件を選んで1つのプルリクエストにまとめることや、REST APIから割り当てることもできます。こちらはGitHub Enterprise Cloudで、Code SecurityかAdvanced Securityの契約者向けです。企業管理者がポリシーを有効にする必要があり、AIクレジットとGitHub Actionsの実行時間を消費します。
