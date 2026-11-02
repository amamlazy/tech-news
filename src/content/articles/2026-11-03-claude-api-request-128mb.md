---
title: "Claude APIの1リクエストの上限が32MBから128MBに　画像の解像度上限も緩和"
summary: "AnthropicがClaude APIで一度に送れるデータ量の上限を、32MBから128MBに引き上げました。多数の画像を送るときの解像度の上限も2,000pxから3,000pxに広がっています。"
points:
  - "対象はMessages APIとToken Counting API（10月30日発表）"
  - "20枚を超える画像を送る場合の解像度上限が2,000px→3,000pxに"
  - "AWSなどクラウド経由で使う場合は、従来どおり20〜32MBのまま"
category: ai
sourceName: "PC Watch"
sourceUrl: "https://pc.watch.impress.co.jp/docs/news/2153118.html"
publishedAt: "2026-11-03T06:40:00+09:00"
---
API（プログラムから機能を呼び出すための窓口）は、1回の呼び出しで送れるデータの大きさに上限があります。AnthropicのAI「Claude」のAPIで、この上限が4倍に引き上げられました。

## 何が変わったのか

PC Watchによると、Anthropicは10月30日、Messages API（Claudeと対話するための基本のAPI）とToken Counting API（送る前にトークン数を数えるAPI）の1リクエストあたりの上限を、32MBから128MBに引き上げました。トークンは、AIが文章を処理するときの単位です。

## 画像の扱いも緩和

20枚を超える画像を1回で送る場合の解像度の上限も、2,000pxから3,000pxに広がりました。資料のページ画像などをまとめて読ませたいときに便利になります。

## 注意点

Amazon BedrockやGoogle Cloudなど、クラウド事業者経由でClaudeを使う場合は、上限が20〜32MBのまま据え置かれています。どの経路で使っているかで上限が違う点に注意が必要です。

## 読みどころ

大量のPDFや画像を一度に渡す使い方が現実的になります。同じClaude APIでは、会話の履歴を毎回送り直さずに済む「メッセージスレッド」の公開ベータも始まっています（今日の【Xで話題】参照）。
