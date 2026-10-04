---
title: "NVIDIAがメモリ64GB版「DGX Spark」を4,999ドルで投入、128GB版は値上げ"
summary: "NVIDIAが、DGX Sparkのユニファイドメモリを64GBに抑えた廉価版を10月23日に発売すると発表しました。同時に128GBのFounders Editionは6,950ドルに値上げされています。"
points:
  - "GB10 Grace Blackwellは共通で、違いはメモリ容量だけ"
  - "64GB版はOEMパートナーのみが提供し、Founders Editionはなし"
  - "2台をConnectX-7でつなぐと1台比で約1.7倍の性能とNVIDIAは説明"
category: gadget
sourceName: "PC Watch"
sourceUrl: "https://pc.watch.impress.co.jp/docs/news/2145000.html"
publishedAt: "2026-10-05T07:40:00+09:00"
---

## 何が発表されたか

NVIDIA は10月2日（現地時間）、デスクトップ AI コンピューター DGX Spark のメモリ容量を半分の 64GB にした「DGX Spark 64GB」を発表した。10月23日に発売し、価格は 64GB メモリと 2TB ストレージの構成で 4,999 ドルから。NVIDIA 自身の Founders Edition はなく、OEM パートナー各社から出る。

一方、メモリの供給制約とコスト上昇を理由に、128GB の Founders Edition は10月2日付で 6,950 ドルに値上げされた。

## なぜ 64GB 版なのか

NVIDIA は、Meta、Google、Alibaba、NVIDIA 自身などの最新オープンモデルが 64GB に収まる規模になり、OS や KV キャッシュ、エージェントが使う追加のモデル用の余裕も残せると説明している。トークン消費の増加とデータプライバシーへの関心から、ローカルで AI を動かす需要が高まっていることも理由に挙げた。

性能が必要なら、64GB 版2台を背面の ConnectX-7 でつなぐ構成も提案している。メモリ帯域が倍になり、1台比で約1.7倍の性能が出るという。管理アプリ NVIDIA Sync の Cluster Assistant は最大4台のネットワークを自動構成でき、10月下旬にはクラスタ上にモデルを展開する Model Launcher も追加される予定。

## 現場で見るところ

扱うモデルが 64GB に収まるなら単体性能は 128GB 版と同じなので、ローカル推論の検証機としては導入しやすくなった。ただし長いコンテキストや複数モデルの同時実行ではメモリが先に足りなくなるため、用途を見極めて選びたい。
