---
title: "GoogleがPyTorchをTPUで直接動かす「TorchTPU」をオープンソース化"
summary: "Googleが、AI開発で広く使われるPyTorchを自社のAI専用チップTPU上で動かすためのバックエンド「TorchTPU」をGitHubで公開し、Hacker Newsで話題になった。torch.compile()との統合や分散学習に対応し、pipで試せる。"
points:
  - "TPU向けにPyTorchの演算（ATenカーネル）を実装したバックエンド"
  - "コンパイル結果のキャッシュで実行を速くする仕組みを持つ"
  - "データ並列・テンソル並列の分散学習と、LlamaやQwenなどの例を同梱"
  - "Python 3.11以上が対象で、PyPIで0.2.0が公開されている"
category: ai
sourceName: "GitHub（google-pytorch/torch_tpu）"
sourceUrl: "https://github.com/google-pytorch/torch_tpu"
publishedAt: "2026-10-21T07:45:00+09:00"
---

PyTorchはAIモデルを作ったり動かしたりするときに最もよく使われるPythonのライブラリの一つで、TPUはGoogleが自社で開発しているAI計算専用のチップです。TorchTPUは、PyTorchで書いたプログラムをTPUの上でそのまま動かせるようにするためのソフトウェアです。

## 何が公開されたか

GoogleのGitHub組織「google-pytorch」で、TorchTPUのリポジトリが公開されました。Hacker Newsでも「GoogleがTorchTPUをオープンソース化、TPU向けのネイティブなPyTorchバックエンド」として上位に入りました。

READMEによると、主な機能は次の通りです。

- TPU向けに実装したPyTorchのATenカーネル（PyTorchの基本演算の中身）
- XLA（TPUなどでプログラムを最適化して実行するコンパイラ）の計算結果をためるコンパイルキャッシュ
- データ並列・テンソル並列による分散学習への対応
- Llama、Qwen、ResNet、DLRM、minGPT、UNetなどのモデル例
- `torch.compile()`と統合したグラフモード実行
- デバッグやベンチマーク用のユーティリティ

## 試し方

対応するのはPython 3.11以上で、PyTorchの互換性方針に合わせるとしています。PyPIには0.2.0が公開されています。

```bash
python -m venv .venv
source .venv/bin/activate
pip install torch_tpu==0.2.0 --extra-index-url https://download.pytorch.org/whl/cpu
```

使い方のガイドはMarimo（Jupyterに似たノートブック）形式で用意されており、TPU VM上で動かす必要があります。READMEは、v6eのGCEインスタンスを使うのが一番簡単だとしています。

## 見どころ

ふだんPyTorchでモデルを書いている人にとって、TPUを試すときの入り口になるプロジェクトです。ただしバージョンはまだ0.2.0で、TPU VMという専用の環境が必要なため、まずはガイドのノートブックで動きを確かめるのが現実的です。
