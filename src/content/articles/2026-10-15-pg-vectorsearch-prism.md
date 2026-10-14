---
title: "Tiger Dataが「pg_vectorsearch」公開、PostgreSQLの新ベクトル索引PRISMはHNSWより省メモリ"
summary: "Tiger Data（旧Timescale）がPostgreSQL向けのオープンソース拡張pg_vectorsearchをアルファ公開した。分割と圧縮を使う新索引PRISMは、1億ベクトルでHNSWの4分の1のメモリのマシンでも構築・検索でき、構築も大幅に速いという。"
points:
  - "PRISMはk-meansでクラスタ分割し、RaBitQ（約1ビット／次元）で圧縮したベクトルを連続スキャン"
  - "1億ベクトル・128GBマシンで構築1時間40分、95%再現率でp50 6ms（HNSWは512GBでも42時間）"
  - "pgvectorのvector／halfvec列にそのまま索引を張れ、クエリ変更は不要"
  - "PostgreSQL 18以上が必要、アルファ版で大量更新時は手動リバランスが必要"
category: backend
sourceName: "Tiger Data Blog"
sourceUrl: "https://www.tigerdata.com/blog/announcing-pg_vectorsearch-scalable-open-source-vector-search-postgresql"
publishedAt: "2026-10-15T07:25:00+09:00"
---

## 何が公開されたか

Tiger Data（TimescaleDBから社名変更）は10月13日（米国時間）、PostgreSQL拡張「pg_vectorsearch」をアルファ版としてオープンソース公開しました。中核はPRISM（Partitioned Routing Index for Similarity Matching）という新しい索引アクセスメソッドで、pgvectorのHNSWのようなグラフ型ではなく、パーティション（クラスタ）と圧縮を使う方式です。GitHubリポジトリはHacker Newsでも話題になっています。

## 仕組み

PRISMはk-meansでベクトル空間をクラスタに分け、各クラスタにRaBitQで圧縮したコードと行IDを詰めて格納します。検索時はPostgreSQLのバッファキャッシュに載ったセントロイドの木をたどって近いクラスタを選び、その中を連続スキャンします。グラフ探索のようなランダムアクセスが少なく、SIMD（AVX2／AVX-512／NEON）で効率よく距離計算できるのが利点だと説明しています。RaBitQの誤差境界を使って再ランキングが必要な候補を減らし、クラスタ境界のベクトルを2つ目のクラスタにも置く「spilling」も実装しています。

## ベンチマーク（同社公表値）

- 1億ベクトル：128GBのr8i.4xlargeでPRISMは1時間40分で構築し、95%再現率でp50 6ms。HNSWはこのマシンでは構築できず、512GBのマシンで42時間かかり95%で8msでした。
- 100万ベクトル：4GBのマシンでPRISMは約3分で構築、99%再現率で9ms。HNSWは約21.7時間かかり392msでした。2GBのマシンでもPRISMは99%で15msを出したとしています。

## 使い方と注意点

PostgreSQL 18以上が必要です。新規テーブルでは独自の `vec32`／`vec16` 型で `CREATE INDEX ... USING prism` とし、既存のpgvectorの `vector`／`halfvec` 列にもそのまま索引を張れます（列の書き換えやクエリ変更は不要）。チューニングは主に `prism.nprobe` の1つで、既定値0は約95%再現率を自動で狙います。

アルファ版のため、大量の更新でパーティションが偏った場合は `prism_rebalance` や `REINDEX` が必要、削除領域の再利用は未対応、空テーブルに索引を作ってから投入するのは非推奨、といった制約があります。同社の既存拡張pgvectorscaleはメンテナンスモードに移行するとしています。
