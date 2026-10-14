---
title: "【コラム】西川和久氏、中古「Tesla V100」でQwen3.8-Flash-Nextが約80tok/s　Strata導入手順と制約"
summary: "PC Watchの西川和久氏の不定期コラムは、中古のTesla V100（32GB、SXM2→PCIe変換）で巨大MoEモデルを動かすStrataを試し、デコード約60〜80tok/sを確認した実機レポートだ。ドライバ580系止まりなど古いGPUならではの制約と、具体的な導入コマンドもまとめている。"
points:
  - "V100はHBM2で帯域約900GB/s、中古価格は人気で7万円程度から11〜12万円に上昇"
  - "ドライバは580系が最後、Ubuntu 24.04・カーネル6.8固定、CUDAは12.9まで"
  - "memlock解除→nvidia-headless-580→cuda-toolkit-12-9→setup.shでエンジンを約15分ビルド"
  - "decodeはRTX 4090（48GB改）の約0.7〜0.8倍、prefillは約0.5〜0.6倍"
category: gadget
sourceName: "PC Watch（西川和久）"
sourceUrl: "https://pc.watch.impress.co.jp/docs/column/nishikawa/2147537.html"
publishedAt: "2026-10-15T08:15:00+09:00"
---

## どんなコラムか

これは、PC Watchで連載されている西川和久氏の「不定期コラム」（10月14日掲載）です。GPUのVRAM・メインメモリ・SSDの3階層にエキスパートを置いて巨大なMoEモデルを普通のPCで動かすエンジン「Strata」を、今回は中古で入手した9年前のGPU「Tesla V100」で試しています。前回はRTX 4090（48GB改）で同じことを行っていました。

## V100を選ぶ理由と制約

V100はVolta世代でHBM2を搭載し、帯域は約900GB/sと、同価格帯の現行GeForceより広いのが特徴です。LLMのデコードはメモリ帯域が速度に直結するため、ここが効くと著者は説明します。入手したのはSXM2版をPCIe変換アダプタに載せたファン付きの製品で、電源は12VHPWRまたはPCIe 8ピン2基（300W）。LLM用途では32GB版一択としています。

一方で、演算はFP32とFP16 Tensorコアのみで、INT8／BF16／FP8／FP4には非対応。ドライバは580系が最終で、新しいカーネルでビルドできなくなる恐れがあるため、Ubuntuは24.04のまま（アップグレード通知をneverに）、カーネルも6.8に戻して固定、CUDAは12.x止まり（CUDA 13ではVolta向けにコンパイルできない）という制約があります。「この環境が何年持つかは不明」というリスクを承知で買うべきだ、と注意を促しています。

## 導入手順

1. 基本パッケージ（git、build-essential、cmakeなど）を入れ、StrataがRAMを35〜55GBロックするため `/etc/security/limits.d/` でmemlockを無制限に設定。
2. `nvidia-headless-580` と `nvidia-utils-580` を入れて再起動し、`nvidia-smi` でV100を確認。NVIDIAのリポジトリからドライバを入れ替えないよう `cuda-toolkit-12-9` だけを導入。
3. Strataを取得し、`STRATA_NVCC` を指定して `setup.sh`（qwenファミリー、IQ3_S、コンテキスト262144、KV int8など）を実行。V100向けはビルド済みエンジンがないため、275ステップ約15分のコンパイルが走り、IQ3_Sのパック変換と投機デコード用MTPドラフト層の取得が続きます。
4. `./run-iq3_s.sh` で起動すると、OpenAI互換APIとWebUIのチャットが使えます。

## ベンチ結果と著者の見立て

Claude Codeに実行させたベンチでは、decodeはコード78.0、論理パズル69.7、文章生成60.1、日本語71.5tok/s（Thinking none）。RTX 4090（48GB改）の約0.7〜0.8倍、prefillは約0.5〜0.6倍で、RTX 5060 Ti＋RTX 4060 Ti構成の約38tok/sよりは1.6〜2.1倍速かったとしています（両者でStrataのバージョンが異なる点は注記あり）。

著者は「この世代のGPUでも今の技術でここまで出るのは、ソフトウェアがいかに重要かを示す」と述べ、資源不足の中でNVIDIAにはもう少しサポートを続けてほしいとも書いています。次回はV100を2枚使った構成や、GLM-5.3-Flashを動かす「Maya」を試す予定です。
