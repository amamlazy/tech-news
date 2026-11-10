---
title: "AMD、第6世代EPYC「Venice」の出荷開始　最大256コア、Xeon 6比で最大3.3倍の性能"
summary: "AMDが、データセンター向けCPUの第6世代EPYC（開発コード名Venice）の最初の製品「9006 SP7」の出荷を始めました。最大256コアで、IntelのXeon 6と比べて2.6〜3.3倍の性能が出るとしています。"
points:
  - "新しいCPUコア「Zen 6／Zen 6c」を採用、Zen 6cはコアあたりのL3キャッシュが倍の4MBに"
  - "高クロック版は最大5.3GHz、高密度版は最大256コアで、AIエージェント処理向けCPUサーバーも想定"
  - "2027年前半にSP8版、後半に3D V-Cache版「Venice-X」とLPDDR5X版「Verano」を予定"
category: gadget
sourceName: "PC Watch"
sourceUrl: "https://pc.watch.impress.co.jp/docs/news/2155286.html"
publishedAt: "2026-11-11T08:20:00+09:00"
---
EPYC（エピック）は、AMDが作っているサーバー・データセンター向けのCPU（コンピューターの頭脳にあたる半導体）です。クラウドの裏側で動くサーバーなどに使われ、Intelの「Xeon（ジーオン）」と競っています。

## 何が出たのか

PC Watchによると、AMDは11月10日（米国時間）、第6世代EPYC（開発コード名：Venice）の詳細と、最初の製品「9006 SP7」の出荷開始を発表しました。AMDは、第6世代EPYCがIntelのXeon 6と比べて2.6〜3.3倍の性能を発揮するとしています。

## 主な特徴

- **新しいCPUコア**：CPUコアはZen 6／Zen 6cに進化しました。高密度向けのZen 6cでは、コア1つあたりのL3キャッシュ（CPU内の高速な一時記憶）が2MBから4MBに倍増しています。
- **2つの方向性**：高クロック版の「Venice HF」は最大5.3GHzで動き、7月の発表時点の5GHzから引き上げられました。最大256コアの「Venice 256c」は、CPUだけで組むエージェント型AI向けのサーバーを想定しています。
- **性能の目安**：FFmpeg、Redis、NGINX、MongoDBなどのクラウド的な処理でXeon 6の最大3.3倍、データベースなどの企業向け処理で最大2.6倍だとAMDは説明しています。
- **メモリ**：SP7ソケットは最大16チャネルのDDR5またはMRDIMMに対応します。

## 今後の予定

2027年前半にはSP8ソケット版、後半には3D V-Cache（キャッシュを積み重ねて大容量化する技術）搭載の「Venice-X」と、LPDDR5Xメモリを使う「Verano」を順次出荷する計画です。また、CPUのみやCPU＋GPUで組めるエージェント型AI向けのラック製品「Helion」も、11月中に最初の製品が出荷されるとしています。
