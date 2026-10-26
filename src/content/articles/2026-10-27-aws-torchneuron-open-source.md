---
title: "AWSが「TorchNeuron」をオープンソース公開、PyTorchがTrainiumでそのまま動く"
summary: "AWSが、AI開発の定番ツールPyTorchを自社のAIチップTrainiumでそのまま動かせる「TorchNeuron」をオープンソースのパブリックベータとして公開しました。NVIDIA以外のチップへの移行を後押しする動きです。"
points:
  - "コードは .to('neuron') と書き換えるだけでTrainiumで実行できる"
  - "eager実行やtorch.compileなど標準APIを維持、独自カーネル言語NKIとも統合"
  - "GoogleのTorchTPUと並び、CUDA依存から離れる選択肢が広がる"
category: ai
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/awsgoogle_cloudpytorchaws_trainiumgoogle_cloud_tpunvidia.html"
publishedAt: "2026-10-27T07:30:00+09:00"
---

PyTorchはAIモデルを作って学習させるための定番ライブラリです。Trainium（トレイニアム）はAWSが自社開発したAI学習用チップで、NVIDIAのGPUの代わりになるものです。

## 発表の内容

10月20〜21日のPyTorch Conference 2026で、AWSは「TorchNeuron」を発表しました。PyTorchのネイティブなバックエンド（裏側でチップを動かす部分）としてTrainiumに対応するもので、オープンソースのパブリックベータとして公開されています。

- デバイス指定を`.to('neuron')`にするだけで切り替えられる。
- eagerモード（1行ずつ実行する方式）や`torch.compile`、標準APIをそのまま使える。
- Trainium向けの独自カーネル言語「NKI」とも統合。

## なぜ重要か

Linux Foundationの2024年の調査では、AI研究開発の7割以上でPyTorchが使われています。これまでAI開発はNVIDIAのCUDAに強く依存していましたが、Google Cloudの「TorchTPU」と合わせ、PyTorchのコードを大きく書き換えずに他社チップへ移る道が整いつつあります。

## 注意点

実際にチップを選ぶ際は、使っているライブラリの対応状況、性能、コストも見極める必要があるとPublickeyは指摘しています。
