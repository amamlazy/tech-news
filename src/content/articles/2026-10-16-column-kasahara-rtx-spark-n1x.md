---
title: "【コラム】笠原一輝氏が読み解くRTX Spark N1X、売りは「買ってすぐローカルAIエージェント」"
summary: "PC Watchの連載「笠原一輝のユビキタス情報局」が、NVIDIAが詳細を明らかにしたPC向けチップRTX Spark N1Xの中身とSurface Laptop Ultraでの実測を解説した。笠原氏はローカルで動くAIエージェントの「大衆化」が最大の売りで、成果を報酬や評価に変えられる人にとっては新しい選択肢だと評している。"
points:
  - "MediaTek設計の20コアCPUとRTX 5070と同じ6,144 CUDAコアのGPU、メモリは最大128GB"
  - "GPUに回すメモリはNVIDIA Appで4〜96GBに設定、128GB機の標準は62.5GB"
  - "初回起動の「はじめに」画面からHermes Agent・OpenClaw・Perplexityを選んで導入"
  - "マルチスレッドとAI処理はSnapdragon X2 Elite比で約82％高く、電池持ちは短め"
  - "24GB/512GBで51万3,480円と高価だが、仕事量が増える人ならすぐ元が取れると見る"
category: gadget
sourceName: "PC Watch（笠原一輝のユビキタス情報局）"
sourceUrl: "https://pc.watch.impress.co.jp/docs/column/ubiq/2148478.html"
publishedAt: "2026-10-16T07:40:00+09:00"
---

RTX Spark N1Xは、NVIDIAがWindowsノートPC向けに作ったチップで、CPUとGPUを組み合わせ、AIをPCの中で動かすことを強く意識しています。この記事は、PC業界を長く取材するジャーナリスト笠原一輝氏のコラム「笠原一輝のユビキタス情報局」（PC Watch、10月15日掲載）の内容を紹介するもので、NVIDIAが10月15日（現地時間）に明らかにした詳細と、搭載機Surface Laptop Ultraでの実測をもとに解説しています。

## チップの中身

笠原氏によると、N1XはTSMCの3nmプロセスで作るCPUダイとGPUダイの2つを組み合わせた「チップレット」（機能ごとに分けた小さなチップを1つにまとめる作り方）です。

- **CPU**：MediaTekがカスタム設計し、高性能なCortex-X925を10コア、Cortex-A725を10コアの計20コア。L3キャッシュは32MB
- **GPU**：GeForce RTX 50シリーズと同じBlackwell世代で、デスクトップ向けGeForce RTX 5070と同じ48SM／6,144 CUDAコア
- **メモリ**：スマートフォンやノートPCで広く使われるLPDDR5X-9400で帯域は300GB/s、最大128GBまで載せられる
- **電力**：CPUとGPU合わせたcTDP（メーカーが熱設計に合わせて選べる消費電力の枠）は45〜80W

下位版は18コアCPUと5,120 CUDAコアで、メモリの上限が32GBになります。笠原氏は、大きなAIモデルを手元で動かすことを重視するなら、48GB以上を選べる上位版を選ぶべきだとしています。

## メモリを分け合う仕組み

GPUはNVLink C2C（600GB/s）という高速なチップ間接続でCPU側のメモリに入り、メインメモリの一部をGPU用に使います。GeForce RTX 50シリーズのGPU専用メモリが最大32GBなのに対し、最大128GBを使えることが、ローカルで大型AIモデルを動かすときの明確なメリットだと笠原氏は指摘します。

GPUに割り当てる量はNVIDIA Appで4〜96GBの範囲で変えられ、128GB搭載機では標準で62.5GBでした。96GBまで増やすとCPU側が足りなくなってWindows自体が遅くなるため、標準あたりがバランスが良いとしています。

## 「はじめに」画面からAIエージェント

笠原氏が「極めつき」と書くのが、プレインストールされたWindows 11（26H1）の初期設定を終えたあとに出る「はじめに」の画面です。ここで「Hermes Agent」「OpenClaw」「Perplexity」の3つのエージェント型AI（指示を受けて自分で作業を進めるAI）から選ぶと、そのまま導入が始まります。

また、AIエージェントが決められたフォルダーやネットワーク以外に触れないよう閉じ込めるNVIDIAの「OpenShell」の機能は、MicrosoftがWindowsに組み込んだMXC（Microsoft eXecution Containers）として10月7日に一般提供が発表されました。x64アプリはPrism（Arm向けに変換しながら動かすWindowsの仕組み）で動き、残っていたEAのアンチチートツール「EA Javelin Anticheat」もArm対応を予定していると紹介しています。

## Surface Laptop Ultraでの実測

Snapdragon X2 Eliteを載せたSurface Laptop 13.8インチと比べた結果は次のとおりです。

- Cinebench 2026のマルチスレッドは約82％高く、シングルスレッドはほぼ同等
- AI処理（Procyon AI Computer Vision）は、不利な条件（GPUでFP16、相手はNPUでFP8）でも82％高い
- 3DMarkは1.93〜3.78倍
- バッテリー駆動時間は10時間22分で、13.8インチの13時間18分より短い。電池容量は92Whと54Whで、笠原氏はアイドル時の消費電力の大きさが唯一の弱点と見ている

## 笠原氏の見立て

笠原氏は、RTX Sparkの売りは「買ってすぐにエージェント型AIが実行できる」点にあり、「ローカルエージェント型AIの大衆化」という一種の理想郷がそこにある、と評しています。

一方で価格は安くなく、同じ24GB/512GB構成でSurface Laptop 13.8インチの38万2,580円に対し、Surface Laptop Ultraは51万3,480円（いずれも税込）です。それでも、自由業のクリエイターなら仕事を多く請けて報酬を増やせ、会社員なら成果を上げて評価を高めたり余暇を増やしたりできるとし、そうした人ならすぐに元が取れるのではないか、とまとめています。
