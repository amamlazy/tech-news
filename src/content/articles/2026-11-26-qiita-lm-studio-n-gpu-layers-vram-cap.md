---
title: "【やってみた】LM Studioが遅い原因は「GPUに9層しか載せていなかった」こと　設定1つで10→24 tok/s　Qiita"
summary: "Qiitaで、手元のPCでAIを動かすアプリ「LM Studio」経由だと、同じモデルを直接動かすより2.5倍も遅かった原因を突き止めた検証記事が公開されました。設定「モデルオフロードを専用GPUメモリに制限」がオンだとGPUに9層しか載らず、設定ファイルで切り替えると24 tok/sまで速くなったといいます。"
points:
  - "VRAM 8GBのRTX 3060 TiでQwen3.6-35B-A3Bを動かし、LM Studio経由10 tok/s、直接起動26 tok/sの差を調査"
  - "LM Studioが裏で起動するllama-serverに --n-gpu-layers 9 が渡されていたことを発見"
  - "~/.lmstudio/.internal/hardware-config.json の load.gpuStrictVramCap を false にすると改善"
category: ai
sourceName: "Qiita（mukai3）"
sourceUrl: "https://qiita.com/mukai3/items/4194902b97d0955f2c0f"
publishedAt: "2026-11-26T05:35:00+09:00"
---
この記事は、Qiitaに投稿された筆者（mukai3氏）本人による検証レポートの紹介です。LM Studio（エルエム・スタジオ）は、ChatGPTのようなAI（LLM）を、インターネットに頼らず自分のパソコンで動かすための無料アプリです。中身では、llama.cppという定番のエンジンに含まれる「llama-server」を動かしています。

## 何が起きていたか

筆者は前回の記事で、VRAM（GPUのメモリ）8GBのRTX 3060 Tiで「Qwen3.6-35B-A3B」というモデルを動かすと、同じファイル・同じ設定のつもりなのに、LM Studio経由では毎秒10トークン（tok/s、文字を出す速さの目安）、llama-serverを直接起動すると26 tok/sになると書いていました。

今回、LM Studio 0.4.25+1が子プロセスとして起動しているllama-serverのコマンドラインを確認したところ、`--n-gpu-layers 9` が渡されていました。このモデルは40層あり、そのうち9層しかGPUに載せていなかったことになります。

## 測った結果（11月25日、3回平均）

- LM Studio経由・元の設定（制限オン）：10.08 tok/s（GPU層数9）
- LM Studio経由・制限オフ：24.51 tok/s（GPU層数999999）
- llama-serverをほぼ同じ引数で直接起動：10.32 tok/s（GPU層数9）
- そのうち `--n-gpu-layers` だけ99に変更：25.97 tok/s

GPUに載せる層の数だけで2.5倍の差が出ていたことがわかります。`lms load --gpu max` やモデルごとのGPUオフロード率の設定では9のままだったそうです。

## 直し方

LM Studioの設定「モデルオフロードを専用GPUメモリに制限」は、設定ファイル上では `load.gpuStrictVramCap` というキーです。筆者の環境では `~/.lmstudio/.internal/hardware-config.json` にあり、手順は次の通りです。

1. hardware-config.jsonに `load.gpuStrictVramCap` があるか確かめる（使っているランタイムの項目の中にある）
2. ファイルをバックアップする
3. `value` を `false` に書き換える

筆者はGUIのスイッチでの切り替えは試しておらず、キー名と画面の文言の対応から同じ設定だと判断していると断っています。また、制限オンのときになぜ「9」になるのかは分かっていないとしています。
