---
title: "Google、AIチップ「TPU」に新モデル2種　機密計算対応の8txと密度2倍の8i Max"
summary: "Google Cloudが、自社開発のAI用チップTPUの新製品「TPU 8tx」と「TPU 8i Max」を発表しました。安全な計算環境を作れる版と、ラックあたりの性能を2倍にできる版で、GPU頼みからの脱却を進めます。"
points:
  - "TPU 8txはAMD EPYCと組み合わせ、外から覗かれない実行環境（TEE）で学習できる"
  - "TPU 8i Maxは1パッケージに2チップを載せ、同じ設置面積で理論上2倍の性能"
  - "CUDA向けPyTorchコードをTPUで動かしやすくする「PyTorch on TPU」も一般提供に"
category: ai
sourceName: "PC Watch"
sourceUrl: "https://pc.watch.impress.co.jp/docs/news/2154906.html"
publishedAt: "2026-11-10T09:35:00+09:00"
---
TPU（Tensor Processing Unit）は、GoogleがAIの計算専用に自社で設計しているチップです。NVIDIAのGPUの代わりに、GeminiなどGoogle自身のAIや、Google Cloudの顧客のAI処理に使われています。

## 何が発表されたか

PC Watch（2026年11月9日付）によると、Google Cloudは11月9日（米国時間）、4月に発表した第8世代TPU（学習向けの8t、推論向けの8i）の派生モデルとして「TPU 8tx」と「TPU 8i Max」を発表しました。1年に4つのTPUを発表するのはTPUの歴史で初めてだといいます。

- **TPU 8tx**：組み合わせるCPUを自社製のAxionからAMDの第5世代EPYCに変更。EPYCの機能で、外部から干渉されない「TEE（信頼できる実行環境）」を作れるため、外に漏らせない学習データを扱う大企業に向くとしています。
- **TPU 8i Max**：1つのパッケージに2つのTPU 8iを統合。基板1枚に載るチップ数が4から8になり、ラックあたりの性能とメモリ容量を2倍にできます。

## 背景

記事は、GoogleがTPUに力を入れる理由として、GPUの入手難と価格高騰の2点を挙げています。10月にはOracleのクラウドなどでもTPUの採用が決まりました。あわせて、CUDA（NVIDIA GPU向けの開発環境）用に書かれたPyTorchのコードをTPUへ移しやすくする「PyTorch on TPU」の一般提供開始も明らかにされ、GPUからの乗り換えを後押しする形です。
