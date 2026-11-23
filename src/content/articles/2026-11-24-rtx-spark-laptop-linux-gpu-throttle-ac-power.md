---
title: "RTX Spark搭載ノートでLinuxを動かすと、電源につないだときだけAI処理が大幅に遅く　原因は暗号化された電源設定"
summary: "NVIDIAの「RTX Spark」を搭載したノートパソコンでLinuxを直接動かすと、AC電源につないだときだけGPUの速度が大きく落ち、AIの推論速度がWindowsの約35%にとどまるという検証結果をGIGAZINEが紹介しました。原因はWindows専用の電源管理部品「NPCF」の暗号化された設定表で、当面はWindows上でLinuxを動かすWSLを使うのが現実的な回避策とされています。"
points:
  - "GPT-OSS-120Bの生成速度は、Windowsで毎秒65.4トークン、ネイティブLinuxでは毎秒13.9トークン"
  - "AC電源をつなぐとGPUクロックが約1,800MHzから約780MHzへ。バッテリー駆動ならWindowsと同程度"
  - "WindowsでNPCFを無効にすると同じ低下が再現。WSLならフル性能で動く"
category: gadget
sourceName: "GIGAZINE"
sourceUrl: "https://gigazine.net/news/20261123-linux-nvidia-rtx-spark-laptop/"
publishedAt: "2026-11-24T05:30:00+09:00"
---
RTX Spark（アールティーエックス・スパーク）は、NVIDIAがノートパソコン向けに作った、CPUとGPUを一体にしたArm系のチップです。手元のパソコンで大きなAIモデルを動かせることが売りで、搭載ノートはすべてArm版のWindowsで出荷されています。

## 何がわかったか

GIGAZINEによると、ノーコード開発プラットフォームのMindStudioが、RTX Spark搭載ノートにLinuxを直接インストールして性能を調べた結果をブログで公開しました。AIツールの多くはLinuxでの利用を前提に作られているため、開発者には「WindowsをやめてLinuxで使えるか」が気になるところです。

GPU上で「GPT-OSS-120B」というAIモデルを動かして1秒あたりに生成できる量（トークン数）を比べると、次のような結果でした。

- Windows：毎秒65.4トークン
- WSL（Windowsの中でLinuxを動かす仕組み）：毎秒65.1トークン
- デスクトップ型のDGX Spark（NVIDIA製Linux）：毎秒61トークン
- ノート上のネイティブLinux：毎秒13.9トークン

AIを動かすソフト「vLLM」で8つの処理を同時に流した場合も、WSLの毎秒127トークンに対してLinuxは39.5トークンでした。長めのテストでは、Windowsが約8分で終わったのに対しLinuxは37分かかり、GPUはWindowsで2.2GHz前後、Linuxでは790MHz前後で動いていました。温度は40〜47℃と低く、熱による速度制限ではないことも確認されています。

## 電源につないだときだけ遅くなる

奇妙なのは、遅くなるのがAC電源に接続しているときだけという点です。電源を抜いたバッテリー駆動ではLinuxでも毎秒61〜67トークンとWindows並みでしたが、電源をつなぐと毎秒約15トークンに落ち、GPUのクロックも約1,800MHzから約780MHzに下がりました。

原因は「NVIDIA Platform Controllers and Framework（NPCF）」というWindows専用の部品でした。ノートパソコンではCPUとGPUで電力を分け合う必要があり、その配分をNPCFが管理しています。ところがNPCFが使う電源設定の表は暗号化されていて、Linuxのドライバーは読めないため、GPUをフルスピードで動かせないのです。実際にWindowsでNPCFを無効にすると、速度は毎秒約83トークンから約31トークンに落ち、クロックもLinuxと同じ786MHzになりました。

## 当面の回避策

現時点では、Windowsのドライバーの上で動くWSLを使うのが実用的な回避策とされています（メモリ割り当ての調整が必要になる場合あり）。根本的な解決には、NVIDIAがこの電源管理の仕組みをLinuxドライバーにも移植する必要があると指摘されています。
