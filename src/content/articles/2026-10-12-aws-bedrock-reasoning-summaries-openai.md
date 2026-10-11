---
title: "Amazon Bedrock、OpenAIモデルでreasoning.summaryに対応、推論の要約をResponses APIで取得可能に"
summary: "AWSは10月9日、Amazon BedrockのResponses APIで、OpenAIモデルの推論の要約を返すreasoning.summaryパラメータに対応したと発表した。Bedrock上の全OpenAIモデルで、リージョン内・地理・グローバルのクロスリージョン推論でも使える。"
points:
  - "要約はreasoning出力アイテムのsummary配列に、回答と並んで返る"
  - "対象はBedrock上のすべてのOpenAIモデルで、OpenAI GPTモデルが使えるリージョン"
  - "デバッグや回答の評価、モデルの取り組み方をユーザーに見せる用途を想定"
category: ai
sourceName: "AWS What's New"
sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-bedrock-reasoning-summaries-openai/"
publishedAt: "2026-10-12T06:15:00+09:00"
---

## 何が発表されたか

AWSが2026年10月9日に、Amazon BedrockがResponses API経由でOpenAIモデルのreasoning.summaryパラメータに対応した、と発表しました。コーディングや分析、複数段階の問題解決のようなタスクで、モデルの推論の考え方を人が読める要約として、回答と一緒に受け取れます。

要約は、レスポンスのreasoning出力アイテムの`summary`配列に入ります。

## 対象と用途

- 対象はBedrock上のすべてのOpenAIモデルで、OpenAIのGPTモデルが提供されているすべてのリージョンです。リージョン内推論、地理（GEO）のクロスリージョン推論、グローバルのクロスリージョン推論のいずれにも対応します。
- 想定用途は、回答の評価、アプリケーションのデバッグ、ユーザーにモデルのアプローチを見せることです。
- パラメータの詳細は、OpenAIのreasoning summariesのドキュメントを参照する形です。

## 補足

発表本文には料金や対応エンドポイントの記載はありません。実際の挙動（課金への影響、速度、Guardrailsとの併用）を実測したZennの記事を、別記事で取り上げています。
