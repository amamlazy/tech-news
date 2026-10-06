---
title: "EmbeddingGemma 2、公開当日からllama.cppとOllamaで手元で動かせると話題に"
summary: "GoogleのマルチモーダルEmbeddingモデルEmbeddingGemma 2に、公開当日からllama.cppとOllamaが対応し、Xで話題になっています。0.5GBのRAMで動くという紹介や、マルチモーダルRAGの作り方が変わるという声が上がっています。"
points:
  - "llama.cppのGeorgi Gerganov氏が公開当日の対応を投稿"
  - "Ollamaは「ollama pull embeddinggemma-2」で使えると案内"
  - "文字起こしやキャプションを経ずに、すべてを1つのベクトル空間に置けるとの声"
category: x-trend
sourceName: "X"
sourceUrl: "https://x.com/ggerganov/status/2107513582925853030"
publishedAt: "2026-10-07T08:10:00+09:00"
---

## 何が話題か

Google が公開したマルチモーダルの Embedding モデル EmbeddingGemma 2 について、llama.cpp の作者 Georgi Gerganov 氏（@ggerganov）が「llama.cpp で EmbeddingGemma 2 に Day-0 で対応した」と投稿した。モデルそのものの発表内容は同日の記事にまとめている。Google DeepMind の発表の投稿にも2,300件以上のいいねが付いた。

## Xでの反応

- @ollama は、`ollama pull embeddinggemma-2` で使えると投稿した
- @HuggingModels は、0.5GB の RAM で手元で動かせると紹介し、1,000件以上のいいねを集めた
- @MiaAI_lab は、多くの人はマルチモーダル RAG を、画像にキャプションを付けたり音声を文字起こししたりしてからテキストの Embedding モデルに通す形で作っているが、このモデルはすべてを1つのベクトル空間に置ける、と投稿した

## 現場で見るところ

画像や音声を含む社内資料の検索を、外部の API に送らず手元で組めるのが大きい。いまキャプション生成と文字起こしを挟んでいるパイプラインがあるなら、精度とコストを一度比べてみる価値がある。
