---
title: "Aurora PostgreSQLがIceberg/Parquetを直接クエリ可能に"
summary: "Amazon Aurora PostgreSQLが、S3上のApache IcebergおよびParquetデータをETLなしで直接クエリできるようになりました。PostgreSQL外部テーブル経由でDuckDBエンジンが実行し、既存アプリから同じSQLインターフェースで利用できます。"
points:
  - "S3 / S3 Tables / Glue Data Catalog上のデータを外部テーブルで参照"
  - "クエリ実行にはPostgreSQL埋め込みのDuckDBを利用"
  - "Aurora PostgreSQL 17.11 / 18.6以降で追加料金なしでGA"
category: backend
sourceName: "AWS What's New"
sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2026/09/aurora-postgresql-query-apache-iceberg-and-parquet/"
publishedAt: "2026-10-01T07:09:00+09:00"
---

## 何が変わったか

AWS は 2026年9月30日、Aurora PostgreSQL がデータレイク上の Apache Iceberg / Parquet を直接クエリできる機能を一般提供開始した。Amazon S3、Amazon S3 Tables、AWS Glue Data Catalog 上のデータを PostgreSQL 外部テーブルとして参照し、ETL やデータ複製なしで運用データと横断クエリできる。

クエリ時は PostgreSQL に埋め込まれた DuckDB のエンジンが Iceberg / Parquet に対して実行する。既存のアプリや BI ツールはこれまでどおり PostgreSQL インターフェースを使える。Glue 経由で外部の Iceberg REST Catalog 互換カタログも参照可能で、レイテンシが厳しい場合は標準 SQL でネイティブテーブルへマテリアライズもできる。

## 現場で見るところ

対象は Aurora PostgreSQL 17.11、18.6 以降で、商用および GovCloud (US) 全リージョン、追加料金なしと案内されている。レイクハウスと OLTP を別系統で抱えていたチームは、パイプライン削減の選択肢になる。性能特性や同時実行、権限モデルはワークロードごとに検証が必要で、まずは読み取り用途や分析寄りクエリから試すのが安全だ。
