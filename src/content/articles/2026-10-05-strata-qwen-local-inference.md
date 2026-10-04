---
title: "125BのQwen3.8-Flash-NextをGPU1枚で動かす推論エンジン「Strata」が話題"
summary: "総パラメータ125BのMoEモデルQwen3.8-Flash-Nextを、VRAM 12〜24GBのGPU1枚と64GBメモリで動かすOSS推論エンジンStrataが公開されました。Hacker Newsでも上位に入り注目を集めています。"
points:
  - "RTX 5070と64GBメモリの環境で短い対話なら93tok/sと公表"
  - "よく使うエキスパートだけVRAMに置き、残りはCPUが並行処理"
  - "OpenAI互換とAnthropic互換のAPIを提供、MITライセンス"
category: ai
sourceName: "PC Watch"
sourceUrl: "https://pc.watch.impress.co.jp/docs/news/2145142.html"
publishedAt: "2026-10-05T07:35:00+09:00"
---

## どんなソフトか

Strata は、Niko1221 氏が GitHub で公開している推論エンジンだ。Alibaba の Qwen3.8-Flash-Next（総パラメータ125B、アクティブ6B）を、本来なら数百GBの VRAM が必要なところ、VRAM 12GB 以上の GeForce RTX 20〜50 シリーズ1枚と 64GB のメインメモリで動かすことを狙っている。対応 OS は Windows 10/11 と Linux で、ライセンスは MIT。

公表されたベンチマークでは、RTX 5070（12GB）と Ryzen 5 7600、64GB メモリの構成で、最軽量の量子化モデル Q2_0 が短い対話で 93tok/s、128K コンテキストでも 74tok/s を記録したという。Hacker News では「RTX 4090 で 100T/s」という見出しで投稿され、週末に500ポイントを超えた。

## 速さの仕組み

このモデルは MoE 構成で、2万4,576個のエキスパートのうち1トークンの生成に使うのは10個だけだという。Strata は、すべてのトークンで必要な部分とよく使われるエキスパートだけを VRAM に置き、全エキスパートはメインメモリに保持する。GPU にないエキスパートが必要になれば CPU が並行して処理するので、どちらも待たずに済む。

さらに、小型のヘルパーが次の数トークンを推測し本体がまとめて検証する投機的デコーディングで、1.6〜1.8倍速くなったとしている。

## 現場で見るところ

`http://127.0.0.1:8080/v1` で OpenAI 互換、`/v1/messages` で Anthropic 互換の API が使えるため、既存のコーディングエージェントのバックエンドをローカルモデルに差し替えて試せる。ただし数値は開発者による公表値で、量子化による精度の変化も含め、自分の用途で確かめる必要がある。
