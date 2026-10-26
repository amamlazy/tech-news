---
title: "OpenAIが「GPT-6.1 Terra」公開、価格半分で幻覚を大幅削減"
summary: "OpenAIが新モデル「GPT-6.1 Terra」を公開しました。従来より約50%安い料金ながら、事実と異なる回答（幻覚）の率を53.6%から16.7%へ大きく減らしたとしています。"
points:
  - "料金は入力100万トークン1ドル・出力5ドル、従来モデル比で約50%安い"
  - "105万トークンの長文脈、最大12.8万トークン出力に対応"
  - "ChatGPT WorkやCodex、APIの「gpt-6.1-terra」、Amazon Bedrockで利用可能"
category: ai
sourceName: "OpenAI"
sourceUrl: "https://openai.com/index/introducing-gpt-6-1-terra"
publishedAt: "2026-10-27T07:10:00+09:00"
---

GPT-6.1 TerraはOpenAIの新しいAIモデルで、性能と料金のバランスを重視した「普段使い向け」の位置付けです。幻覚（ハルシネーション）とは、AIがもっともらしい嘘を答えてしまう現象のことです。

## 主な特徴

- 料金：入力100万トークンあたり1ドル、出力5ドル、キャッシュ入力0.05ドル。GPT-5.6 TerraやGPT-6.1 Solより約50%安い設定。
- コンテキスト（一度に読める量）は105万トークン、最大出力12.8万トークン、知識は2026年6月まで。
- 幻覚によるエラー率は53.6%→16.7%（最大推論設定では4.3%）。

## ベンチマーク

ターミナル操作の能力を測るTerminal-Bench 4.0では50.3%（従来21.5%）。エージェント向け評価「Agents' Last Exam」では約3分の1のコストで15ポイント向上したとしています。

## 使える場所

ChatGPT WorkとCodex（Plus/Pro/Business/Enterprise/Edu）、APIでは`gpt-6.1-terra`の名前で使えます。Amazon Bedrockでも提供されます。数値はOpenAI自身の発表で、実際の用途での評価は今後の検証待ちです。
