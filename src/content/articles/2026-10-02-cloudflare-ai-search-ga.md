---
title: "Cloudflare AI Searchが一般提供、画像埋め込みとOCRに対応"
summary: "Cloudflareのマネージド検索パイプラインAI Searchが一般提供になりました。ネイティブ画像埋め込み、PDFのOCR、最大10MiBファイルに対応し、課金は2026年11月1日からです。"
points:
  - "Workers AI・Vectorize・R2・Browser Runを組み合わせ"
  - "Qwen3-VL-Embeddingで画像クエリも同一空間検索"
  - "無料枠あり、課金開始は11月1日"
category: ai
sourceName: "Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/ai-search-ga/"
publishedAt: "2026-10-02T07:10:00+09:00"
---

## 何が変わったか

Cloudflare は 2026年10月1日、AI Search を一般提供した。Workers AI、Vectorize、R2、Browser Run を組み合わせたマネージドなインデックス／検索パイプラインで、社内ドキュメントやサイト検索などに使われてきた。

GAに合わせ、キャプション経由ではなく画像ピクセルを直接埋め込むマルチモーダル検索、PDF向けOCR、テキスト／PDFの上限を4MiBから10MiBへ引き上げた。課金は2026年11月1日からで、Workersプランには無料枠がある。

## 現場で見るところ

埋め込みモデルが画像対応ならクエリ画像も同一ベクトル空間で検索できる。テキスト専用モデルでも ToMarkdown 経由のキャプション検索は可能。セマンティックと全文のクエリ数は無料枠で別枠になった。RAGや社内検索を Cloudflare 上に載せるチームは、課金前にインデックス規模とクエリ種別を見積もりたい。
