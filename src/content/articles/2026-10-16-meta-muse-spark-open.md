---
title: "Meta「Muse Spark Open」の重みを公開、総8160億パラメーターでMac Studio 2台でも動く"
summary: "Metaが、コーディングやエージェント用途向けのAIモデル「Muse Spark Open」の重みを公開した。総パラメーター8160億・アクティブ420億のマルチモーダルモデルで、M5 Ultra搭載Mac Studio 2台で手元実行できるとしている。"
points:
  - "コンテキストは100万トークン、長時間タスクや複雑なソフト開発が得意と説明"
  - "Hugging Faceなどで重みを配布、Together AIやGroqなど7社のAPIでも提供"
  - "SGLang・vLLM・llama.cpp・MLXなど主要推論エンジンが対応"
  - "ライセンスは商用条件付きの「Muse Model License」"
category: ai
sourceName: "Meta AI Research"
sourceUrl: "https://research.meta.ai/blog/muse-spark-open"
publishedAt: "2026-10-16T08:30:00+09:00"
---

Muse Spark Openは、Facebookなどを運営するMetaが公開したAIモデルです。中身のデータ（重み）が配布されている「オープンウェイト」モデルなので、クラウドのサービスを使わず、自分の機械にダウンロードして動かすこともできます。10月13日に紹介した最上位モデル「Muse Wonder」とは別の、重みを公開した系列のモデルです。

## どんなモデルか

Metaの発表によると、Muse Spark Openは文章だけでなく画像なども扱える「ネイティブなマルチモーダル」モデルです。総パラメーター（モデルの中の数値の数）は8160億、1回の計算で使うアクティブパラメーターは420億です。これは、多数の「専門家」の一部だけを使って計算するMoE（Mixture of Experts）という作りで、大きさの割に速く動かせる方式です。

一度に読める量を示すコンテキストウィンドウは100万トークンで、コーディングやエージェント（AIが自分で手順を考えて作業を進める使い方）向けに作られ、長時間のタスクや複雑なソフトウェア開発、多段階の推論が得意だとしています。Metaは「これまでで最も高性能な米国製オープンウェイトモデル」とうたっています。

## 自宅で動かせる、の中身

Metaは、M5 Ultra搭載のMac Studio 2台と最新のMLX（Apple製の機械学習フレームワーク）で動かせる、このクラス初のモデルだと説明しています。Mac Studioは1台あたり最大512GBのユニファイドメモリ（CPUとGPUが共有するメモリ）をGPUで使えるため、2台でモデル全体を載せられるという理屈です。オープンソースのMastodonクライアント「Ice Cubes」にバグ修正や新機能を実装したり、動画編集ソフトDaVinci Resolveを端から端まで操作したりするデモを、すべて端末上で動かしたとしています。

## 入手方法とライセンス

重みはHugging Face、Amazon SageMaker AI、Google Cloud Model Garden、Microsoft Foundry Modelsで配布され、Baseten、Fireworks AI、Groq、Modal、Nebius、OpenRouter、Together AIのAPIからも使えます。推論エンジンはSGLang、vLLM、TensorRT-LLM、Transformers、MLX、llama.cpp、Unslothが対応します。

ライセンスは「Muse Model License」で、商用利用には制限付きの条件があるものの、多くの開発者は無料で使えるとしています。オープンウェイト向けに追加の安全対策の学習を行い、社内の評価枠組みの基準を満たしたとも説明しています。
