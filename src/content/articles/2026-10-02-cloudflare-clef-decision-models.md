---
title: "Cloudflareが意思決定モデルClefを公開、Workers AIとOSSで提供"
summary: "Cloudflareが自社訓練の意思決定モデルClefとClef-flashをWorkers AIに載せ、Hugging FaceでApache 2.0公開しました。型付き確率出力でエージェントの高速ルーティング向けです。"
points:
  - "Jev API互換、ビジョン対応、64kコンテキスト"
  - "Clef 27Bと低遅延のClef-flash 9B"
  - "RLによるファインチューニングサービスも開始"
category: ai
sourceName: "Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/clef-decision-models/"
publishedAt: "2026-10-02T07:25:00+09:00"
---

## 何が変わったか

Cloudflare は 2026年10月1日、意思決定モデル Clef と Clef-flash を発表した。Workers AI上でホストされ、Hugging FaceではApache 2.0で重みが公開されている。入力状態と質問スキーマを渡し、緊急度や担当チームなどの型付き回答を確率付きで返す用途向けだ。

Clefは約27B、Clef-flashは約9Bで、ビジョンエンコーダと64kコンテキストを備える。Jev API互換で差し替えやすく、脅威インテリジェンスなどの社内検証では一般LLMより低遅延で多ラベル分類できた例が示されている。RLを使ったファインチューニングの伴走サービスも案内された。

## 現場で見るところ

エージェントのホットパスで分類・ルーティングし、必要なら別LLMに作業を渡す構成が想定される。推論データの学習利用はオプトイン前提とのこと。まずはWorkers AIの `@cf/cloudflare/clef` で試し、ドメイン特化が必要ならRLサービスや将来のセルフサーブを検討する流れになりそうだ。
