---
title: "GitHub、Security overviewにAI Scanのメトリクスを追加　修正率やautofix適用を可視化"
summary: "GitHubは10月13日、プルリクエスト向けAI Scanの効果をSecurity overviewで見られるパブリックプレビューを開始した。検出数・解決数・修正率、リポジトリ別、autofix適用状況を集計できる。"
points:
  - "「CodeQL pull requests」ページは「Code scanning on pull requests」に改名し、CodeQLとAI Scanのタブを分離"
  - "AI Scanタブでは検出総数と、autofix提案の有無を分けて表示"
  - "組織・エンタープライズ管理者がロールアウト判断に使えるのが狙い"
  - "GitHub Code SecurityまたはAdvanced Security向け。Enterprise Serverは非対応"
category: backend
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-13-code-scanning-ai-scan-metrics-in-security-overview/"
publishedAt: "2026-10-14T08:35:00+09:00"
---

## 何が変わったか

GitHubは2026年10月13日、組織・エンタープライズ管理者がSecurity overviewから、プルリクエスト向けAI Scanの効果を観察できるパブリックプレビューを開始しました。新しいメトリクスでは、AI Scanの検出が何件生まれ、何件解決されたか、修正率、どのリポジトリから出たか、期間中の推移、開発者がautofix提案をどれだけ適用したか、を見られます。

ページ名も変わり、「CodeQL pull requests」は「Code scanning on pull requests」になりました。CodeQLとAI Scanは別タブです。AI Scanタブでは検出総数に加え、autofix提案付き／なしの内訳が出ます。従来のCodeQL向け指標はCodeQLタブに移っています。

## 誰向けか

セキュリティチームが、個別PRを眺めずにAI Scanの導入効果や開発者の反応を把握し、展開や投資の判断に使う想定です。github.com上のGitHub Enterprise Cloudを含む、GitHub Code SecurityまたはGitHub Advanced Securityの顧客向けです。GitHub Enterprise Serverはこのリリースでは対象外です。
