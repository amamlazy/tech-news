---
title: "Cloudflare Basinが一般提供、Icebergベースのサーバレス分析基盤"
summary: "旧Data PlatformがBasinとして一般提供されました。Pipelines・Catalog・SQLの3製品でイベント取得からIcebergテーブルへの格納、サーバレスSQLまでをカバーします。"
points:
  - "Apache IcebergとR2上のオープン分析基盤"
  - "egress無料でDuckDBやSparkなど他エンジンからも参照可"
  - "既存Pipelines/R2 Data Catalog/R2 SQL設定は継続利用可"
category: backend
sourceName: "Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/cloudflare-basin/"
publishedAt: "2026-10-02T07:15:00+09:00"
---

## 何が変わったか

Cloudflare は 2026年10月1日、旧称 Cloudflare Data Platform を Basin として一般提供した。Basin Pipelines（旧 Pipelines）、Basin Catalog（旧 R2 Data Catalog）、Basin SQL（旧 R2 SQL）から成り、イベントの取り込み、Icebergメタデータ管理、分散SQLクエリまでをサーバレスでつなぐ。

ストリームあたり最大約3GB/sの取り込み、Logpush連携、スキーマ付きWorkerバインディング、コンパクションやスナップショット期限切れなどのテーブルメンテが強化されている。egress無料のため、PyIceberg、DuckDB、Snowflake、SparkなどIceberg互換エンジンからもデータを持ち出せる。

## 現場で見るところ

`wrangler basin catalog create` でカタログを作り、PipelineでIcebergへ書き、Basin SQLで即クエリできる。従量課金でインスタンス時間はない。S3＋Athena系からの簡素化や、エージェントが数秒で分析パイプラインを立てる用途が想定されている。既存の旧名称リソースはそのまま使える。
