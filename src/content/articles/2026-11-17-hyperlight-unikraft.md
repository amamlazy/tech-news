---
title: "Linuxアプリを改造なしで軽量な仮想マシンに閉じ込める「Hyperlight-Unikraft」登場　Pythonの起動が20分の1以下に"
summary: "CNCFが、Linuxのアプリを作り直さずに、とても軽い仮想マシン（マイクロVM）として安全に動かせる「Hyperlight-Unikraft」を発表しました。起動直後の状態を保存しておく仕組みで、普通に動かすより速く起動できるといいます。"
points:
  - "軽量VMライブラリ「Hyperlight」と、必要最小限のOSを作る「Unikraft」を組み合わせた"
  - "Python、Node.js、.NET、Java、Go、Rustなどに対応。再コンパイルや改変は不要"
  - "199ミリ秒かかるPythonスクリプトの起動が8.9ミリ秒に。専用コマンド「hluk」でビルド"
category: backend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/vmhyperlight-unikraft.html"
publishedAt: "2026-11-17T07:20:00+09:00"
---
Hyperlight-Unikraft（ハイパーライト・ユニクラフト）は、アプリを1つずつ小さな仮想マシンに閉じ込めて安全に動かすための技術です。クラウド関連のオープンソースを推進する団体CNCF（Cloud Native Computing Foundation）が発表しました。

## 2つの技術を組み合わせた

Publickeyによると、名前の通り2つの技術を合わせたものです。

- **Hyperlight**：アプリの実行環境に、非常に軽い仮想マシンを組み込むライブラリ。速く起動し、ほかのプログラムからしっかり隔離されたマイクロVMを作れる。ただし、組み合わせる実行環境を改造する必要があった
- **Unikraft**：アプリを動かすのに必要な最小限のOS機能だけを持つ「Unikernel（ユニカーネル）」を作るツールキット

間にUnikraftを挟むことで、これまで改造が必要だったLinuxアプリを、SDKを使わず再コンパイルもせずにHyperlightと組み合わせられるようになりました。仮想マシン並みの隔離と、コンテナ並みの軽さを両立できるといいます。

対応する実行環境は、Python、Node.js、.NET（JITとNative AOTの両方）、Java、PHP、Go、Rust、C、Bash、PowerShellです。

## 起動直後の状態を保存して高速化

もう1つの特徴は、実行環境のウォームアップ（準備）が終わった状態をスナップショットとして保存し、そこから起動できることです。これにより、普通にアプリを起動するより速くなります。

CNCFによると、通常のPythonで起動に199ミリ秒かかるスクリプトが8.9ミリ秒になりました。さらに、1000個のPythonスクリプトを3GB以内のメモリで動かせる密度も実現したとしています。

## 使い方

ビルドには「hluk」コマンド（読みは「ハルク」）を使います。作ったマイクロVMは、LinuxのKVMやMSHV、WindowsのHypervisor Platform、Appleシリコン搭載macOSのHypervisor.frameworkの上で動きます。AIエージェントが作ったコードを安全に試す場所など、隔離された実行環境の需要が高まる中で注目される技術です。
