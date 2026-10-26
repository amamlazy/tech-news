---
title: "【実践レポート】120万円のRTX Sparkノートで、AIエージェントは元が取れるか"
summary: "PC Watchの清水理史氏が124万8,000円のRTX Spark搭載ノートを自腹で購入し、ローカルAIエージェントを業務で使えるか検証した実践レポートです。結論は「現状はまだ実験的」でした。"
points:
  - "Hermes＋ローカルLLMでBlender操作、Windows検索、Excelマクロ実行を自動化"
  - "Qwen3.8-27Bは約15token/sと遅く、コード作成はクラウドAI併用が現実的"
  - "Arm＋NVIDIA構成でBlenderのCUDA非対応など、ソフト側の対応が未整備"
category: gadget
sourceName: "PC Watch（清水理史）"
sourceUrl: "https://pc.watch.impress.co.jp/docs/topic/feature/2150970.html"
publishedAt: "2026-10-27T07:55:00+09:00"
---

RTX Sparkは、NVIDIAのArm系チップとGPUを組み合わせたノートPC向けプラットフォームで、大容量メモリでAIを手元で動かせるのが売りです。ローカルLLMとは、ネットにつながずPC内で動かすAIモデルのことです。

## この記事は清水理史氏による実践レポートです

清水氏はASUS ProArt P16（H7607BA、RTX Spark N1X、メモリ128GB）を124万8,000円で購入し、「100万円超えの価値はあるか」を業務シナリオで検証しました。

## 試したシナリオ

ネットワーク機器の営業がオフラインの客先で提案する、という想定です。

- AIエージェント「Hermes」がMCP（AIから外部ツールを操作する仕組み）経由でBlenderを操作し、オフィスの3DモデルにWi-Fiアクセスポイントを2台配置。
- PowerShell経由でWindows Searchを使い、過去の見積書を全文検索。
- COM経由でExcelの台数を書き換え、マクロで採番・PDF出力。

操作に詳しくない人でも、高度なアプリの「結果」だけを得られる点が利点だとしています。

## つまずいた点

- 3Dモデルやスキル用のコードはChatGPT Work（GPT-6.1 Sol）で作成。ローカルのQwen3.8-27Bは約15token/sと遅く、速度重視ならQwen3.6-35B-A3B（最低50token/s欲しい）を推奨。
- Blender 5.2 LTSのArm版はCUDA非対応で、x64版を使用。MCPの依存パッケージもArm64版がなく、x64版Pythonで回避。
- AIエージェントの動作を制限する新しい仕組み「MXC」は、Hermes側の対応がまだ。

## 結論

現時点では用途が限られ「実験的な意味合いが強い」とし、実利を取るならクラウドAIに課金する選択もあると締めくくっています。
