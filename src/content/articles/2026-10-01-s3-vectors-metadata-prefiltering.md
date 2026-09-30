---
title: "Amazon S3 Vectorsがメタデータ事前フィルタで検索リコールを改善"
summary: "Amazon S3 Vectorsがメタデータの事前フィルタリングに対応しました。類似検索の前にテナントやカテゴリなどで絞り込み、選択的なフィルタでは最大約5倍多くの該当ベクトルを返す場合があると説明されています。"
points:
  - "フィルタ後の部分集合に対して類似検索を実行（ENHANCEDモード）"
  - "1クエリ最大100制約、$startsWithによるプレフィックス一致も追加"
  - "追加料金なし、既存インデックスはUpdateIndexModeで移行可能"
category: ai
sourceName: "AWS News Blog"
sourceUrl: "https://aws.amazon.com/blogs/aws/amazon-s3-vectors-now-supports-metadata-pre-filtering-for-higher-recall-on-filtered-searches/"
publishedAt: "2026-10-01T07:13:00+09:00"
---

## 何が変わったか

AWS は 2026年9月30日、Amazon S3 Vectors のメタデータ事前フィルタリングを発表した。従来の CLASSIC モードでは検索とフィルタ評価が並行に近かったが、ENHANCED モードではメタデータ条件を先に解決し、一致するベクトルだけに類似検索をかける。

各ベクトルは最大 2KB のフィルタ可能メタデータを持て、1クエリあたり最大100のフィルタ制約を指定できる。パスや階層キー向けに `$startsWith` も追加された。選択的なフィルタでは、同じクエリでも該当ベクトルを最大約5倍多く返すケースがあるとしている。

## 現場で見るところ

マルチテナント RAG やエージェントがユーザー／案件単位で検索する用途で効きやすい。2026年9月30日以降に作られたベクトルバケット上の新規インデックスは既定で ENHANCED、既存バケットは CLASSIC のままだが `UpdateIndexMode` で切り替えられ、再取り込みは不要と案内されている。フィルタ制約の数え方や `$in` の肥大化には注意が必要で、設計段階でメタデータキーを整理しておくとよい。
