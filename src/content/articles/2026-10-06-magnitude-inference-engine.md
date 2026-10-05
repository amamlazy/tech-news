---
title: "端末のハードに合わせてカーネルを自動最適化するLLM推論エンジン「Magnitude」が公開"
summary: "Magnitude AIが、AIエージェント向けのオープンソースLLM推論エンジン「Magnitude」を公開しました。実行するチップに合わせてカーネルをその場でコンパイル・調整し、llama.cpp比で最大2倍の速度が出るとしています。"
points:
  - "Apache-2.0で無料、macOS/Windows/Linuxに対応"
  - "Metalでデコード92%、CUDAで19%高速化、エージェントあたりのメモリを27%削減"
  - "Claude Code、Codex、OpenCode、ClineなどとOpenAI互換APIで連携"
category: ai
sourceName: "PC Watch"
sourceUrl: "https://pc.watch.impress.co.jp/docs/news/2145716.html"
publishedAt: "2026-10-06T06:45:00+09:00"
---

## 何が公開されたか

PC Watch によると、Magnitude AI は AI エージェント向けに開発したオープンソースの LLM 推論エンジン「Magnitude」を公開した。ライセンスは Apache-2.0 で、ローカルで動くためトークン費用もかからない。

llama.cpp、Ollama、LM Studio などが汎用的に事前コンパイルしたカーネルを使うのに対し、Magnitude は実行する端末のハードウェアに合わせてカーネルをローカルで自動コンパイル・チューニングする。人気のオープンウェイトモデル向けには手作業で最適化したカーネルも備える。

## 性能と特徴

同社は llama.cpp と比べて最大2倍の処理速度を達成したとし、Metal 環境ではデコードが92%、NVIDIA CUDA 環境では19%速くなったと説明している。エージェント1つあたりのメモリ消費を27%減らし、停止時にはすぐ解放する。セッション間でプレフィックスキャッシュを共有するので、複数のエージェントを同時に動かしても速度が落ちにくいという。

対応ハードは Apple Silicon GPU、NVIDIA GPU、AMD GPU、CPU。GUI 付きのデスクトップアプリとして提供され、CLI も同梱される。プロンプトやファイルは端末の外に送られず、モデルのダウンロード後はオフラインでも使える。

## 現場で見るところ

ローカル LLM をコーディングエージェントのバックエンドにする動きが続いている。数値は開発元の発表なので、手元のマシンとよく使うモデルで llama.cpp などと比べてみるのが確実だ。
