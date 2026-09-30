---
title: "AWS CloudTrailにデータイベントのカバレッジ可視化「Event Coverage」"
summary: "AWS CloudTrailがEvent Coverageを導入し、アカウント／組織単位でデータプレーン操作のログ取得状況を一覧できるようになりました。未設定のサービスやリソースタイプを洗い出し、ダッシュボードから直接サブスクライブできます。"
points:
  - "データイベントの有効／無効を組織横断で可視化"
  - "ダッシュボードから不足分へ素早くサブスクライブ可能"
  - "CloudTrail対応の商用全リージョンで利用可能"
category: backend
sourceName: "AWS What's New"
sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2026/09/aws-cloudtrail-event-coverage/"
publishedAt: "2026-10-01T07:11:00+09:00"
---

## 何が変わったか

AWS は 2026年9月30日、CloudTrail に Event Coverage を追加した。アカウントおよび Organization レベルで、どのサービス／リソースタイプにデータイベントログが有効かを一覧し、抜け漏れを手動スキャンなしで把握できる。

データイベントは S3 の GetObject / PutObject などデータプレーン操作を追跡するための仕組みで、未設定だと不正アクセスや持ち出しの兆候を見逃しやすい。Event Coverage では対応データイベントソースのカバレッジを一画面で確認し、ダッシュボードからサブスクライブしてギャップを埋められる。

## 現場で見るところ

マルチアカウント運用では「どのアカウントで何を取っているか」の棚卸しコストが高かった。セキュリティ／監査チームはまず Event Coverage で現状を可視化し、高リスクなオブジェクトストレージや機密データ周辺からデータイベントを有効化する順が現実的だ。ログ量とコスト増にも直結するため、対象を絞った段階導入が望ましい。
