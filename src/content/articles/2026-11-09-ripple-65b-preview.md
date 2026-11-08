---
title: "米国発オープンモデル「Ripple-65B Preview」　650億パラメーターで大型モデル超え"
summary: "米スタートアップRicursive Intelligenceが、オープンウェイトモデル「Ripple-65B Preview」を公開しました。エージェント型コーディングのTerminal-Bench 2.1で80.52点を出し、開発費は約3,200万ドルだったとしています。"
points:
  - "5010億パラメーターのBeam（80.1）やMuse Spark Open（76.4）を上回るスコア"
  - "12兆トークンで事前学習、最大100万トークンの文脈に対応"
  - "Hugging Faceで無償公開、Together AIやOpenRouterなどのAPIでも利用可能"
category: ai
sourceName: "GIGAZINE"
sourceUrl: "https://gigazine.net/news/20261108-ripple-65b-preview/"
publishedAt: "2026-11-09T09:00:00+09:00"
---
Ripple-65B Previewは、AIでチップ設計を進めるスタートアップRicursive Intelligenceが作った大規模言語モデルです。重み（学習済みのパラメーター）が公開される「オープンウェイト」型なので、誰でもダウンロードして自前の環境で動かせます。

## 性能

GIGAZINE（2026年11月8日付）によると、Ripple-65B Previewはエージェント型コーディングのベンチマーク「Terminal-Bench 2.1」で80.52点を記録しました。パラメーター数（モデルの規模の目安）は650億で、5010億の「Beam 501B」（80.1）、Metaの8160億「Muse Spark Open」（76.4）、約1兆の「Inkling 975B」（63.8）を上回ったと報告されています。一方、数学や安全性などのベンチマークではMuse Spark OpenとBeamに次ぐ3番手でした。

## 安さの理由

ゼロからの開発費は研究開発全体で3,200万ドル（約50億円）とされます。同社は、力任せの強化学習に頼らず、SFT（お手本データでの追加学習）と強化学習の手法を改良し、学習後のデータを購入せず独自の合成データパイプラインを作ったと説明しています。Terminal-Bench 2.1で80.5点に達するまでの試行は140万回で、Beamの約70分の1だったといいます。

## 使い方

規模が比較的小さいため、データセンター向けGPUだけでなくローカル環境でも効率よく動かせるとしています。Hugging Faceで無償公開され、Together AI、GMI Cloud、OpenRouter、FireworksなどのAPIでも使えます。
