---
title: "AI生成コードを本番品質に保つフロントエンドの4層仕組み【実践】"
summary: "Sun*のPhung Dinh Son氏が、Next.jsとTypeScriptを例にAI生成コードを本番品質へ保つ仕組みを4層で解説した実践記事です。プロンプトより外側のコンテキスト、lint、テスト、CI／人レビューで推測埋めを止める方針を具体例つきで示しています。"
points:
  - "AGENTS.mdで「仕様が無い項目は推測せずTODO(spec)を残す」を明示"
  - "型・ESLint・編集直後フックでanyや勝手なfetch、feature横断importを弾く"
  - "仕様から先にテスト観点を決め、VRTや依存追加は人の承認に残す"
category: frontend
sourceName: "Zenn"
sourceUrl: "https://zenn.dev/sun_asterisk/articles/d4e4bc24974b99"
publishedAt: "2026-11-06T10:45:00+09:00"
---
本番品質とは、仕様どおり動き、既存の設計に沿い、壊れを機械が先に見つけ、半年後の別メンバーも直せる状態です。この記事は、AIが書いたフロントエンドのコードをその水準に保つための仕組みを、実践レポートとしてまとめたものです。

## 問題の捉え方

Phung Dinh Son氏（Sun* Developers、2026年11月5日公開）は、最大文字数などが仕様に無いとAIがそれらしい値で埋めてしまい、動くのにズレる、と指摘します。CodeRabbitの調査ではAI共作PRの指摘が人のみの約1.7倍、DORA 2025も制御なしの変更増が不安定さと結びつく、といった数字も引用しています。

## 4つの層

(1) AGENTS.mdや仕様チェックリストで推測余地を減らす。(2) TypeScriptの厳格化、ESLint、Prettier、Claude CodeのPostToolUse／Stopフックで規約違反をその場で弾く。(3) 仕様から先に決めた観点のVitest／Storybook／Playwrightで振る舞いと見た目を固定する。(4) CI必須チェックとCODEOWNERS、依存追加や設計判断は人が見る。上の層ほど安く速く、AI自身が直せる、というのが骨子です。

## 導入の始め方

まずlint・format・typecheck・testを完了定義にしてCI必須にし、短いAGENTS.md、フック、チケットの仕様チェックリスト、共通部品のStorybook／VRTの順で足す提案です。同じ指摘が2回出たらlintか指示ファイルへ落とす運用も勧めています。
