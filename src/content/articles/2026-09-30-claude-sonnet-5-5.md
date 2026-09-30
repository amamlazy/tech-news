---
title: "Anthropic「Claude Sonnet 5.5」登場、価格据え置きで30%以上高速に"
summary: "Anthropicは現地時間9月28日、Claude 5.5ファミリーの2番目のモデル「Claude Sonnet 5.5」を発表しました。API価格はSonnet 5と同じまま、出力生成が30%以上速くなり、タスクあたりのコストは最大30%下がるとしています。"
points:
  - "API価格は100万トークンあたり入力2ドル、出力10ドルでSonnet 5から据え置き"
  - "Terminal-Bench 4.0で70.6%を記録し、上位のOpus 5.5（66.4%）を上回った"
  - "FrontierCode 1.1やCursorBench 4.0ではOpus 5.5に届かず、得意分野が分かれる"
  - "高リスクなサイバーセキュリティタスクではSonnet 5にフォールバックする安全策を搭載"
category: ai
sourceName: "PC Watch"
sourceUrl: "https://pc.watch.impress.co.jp/docs/news/2144040.html"
publishedAt: "2026-09-30T08:20:00+09:00"
---

## どんなモデルか

Sonnet 5.5は、上位モデルのClaude Opus 5.5を補う「速くて安い」ポジションのモデルです。範囲がはっきりした日常的なタスク、バグ修正、ドキュメントやスライド、スプレッドシートの作成を得意とするとされています。Anthropicによれば、Sonnetシリーズとして過去最速で、同じ作業に必要なトークン数も減っています。

GitHub Changelogでも同日付で「Claude Sonnet 5.5 in GitHub Copilot」が告知されており、IDEやCopilot経由でも使える環境が整いつつあります。

## ベンチマークの読み方

エージェント型コーディングのTerminal-Bench 4.0ではOpus 5.5を上回った一方、FrontierCode 1.1（Main）やCursorBench 4.0ではOpus 5.5に及びませんでした。知識労働を測るGDPval-AA v2.1ではOpus 5.5とほぼ同等です。「ターミナル中心の作業ならSonnet、難度の高いコード改修ならOpus」といった使い分けを検討する材料になります。

## 現場で見るところ

初期テスターは、コードベースの把握の速さや、ツール呼び出しをまとめて実行する効率のよさを評価したと伝えられています。価格が変わらないため、既存のSonnet 5利用箇所をそのまま差し替えて、速度と品質を比べてみる価値はありそうです。
