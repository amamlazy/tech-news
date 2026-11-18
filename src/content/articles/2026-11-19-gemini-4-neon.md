---
title: "Google、Gemini 4ファミリーの中間モデル「Gemini 4 Neon」を公開　速さと賢さの両立を狙う"
summary: "Googleが、AIモデル「Gemini 4」シリーズの新しい一員「Gemini 4 Neon」を発表しました。最上位のCarbonと軽量のHydrogenの間に位置し、難しいプログラミングや調べものを速く安く片付けることを狙ったモデルです。"
points:
  - "料金は100万トークンあたり入力3ドル・出力15ドル、一度に扱える量は100万トークン"
  - "Artificial Analysisの総合指標で61点の3位、コーディングエージェント指標では1位とGoogleは説明"
  - "Gemini API、Antigravity、Gemini app（Pro/Ultra契約者）で順次提供"
category: ai
sourceName: "Google Blog"
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/"
publishedAt: "2026-11-19T06:50:00+09:00"
---
Gemini 4 Neon（ネオン）は、Google DeepMindが開発した対話型AIモデル「Gemini 4」シリーズの新モデルです。シリーズには最上位の「Carbon」と、速さ重視の「Hydrogen」があり、Neonはその中間に置かれます。

## 何が発表されたか

Googleは11月18日（米国時間）、ブログでGemini 4 Neonを発表しました。執筆者はGoogle DeepMindのコーレイ・カヴクチュオール氏です。Googleは、Neonを「フロンティア級（最先端クラス）の知能と、作業を最後まで速く終える力」を両立したモデルと位置づけています。

料金はAPI（プログラムから呼び出す窓口）で、100万トークン（トークンは文章を細かく区切った単位）あたり入力3ドル、出力15ドルです。同じ入力を再利用する「キャッシュ」なら入力は0.15ドルになります。一度に読み込める量（コンテキストウィンドウ）は100万トークンです。

## Googleが示した成績

- 外部評価のArtificial Analysis Intelligence Indexで、最も深く考える「xhigh」設定のとき61点で全体3位
- 同じくArtificial Analysisのコーディングエージェント指標で58.6点の1位、Terminal-Bench 4.1は65.2％
- 既定の「high」設定では、Carbonより1タスクあたりの費用が32％低いとしている
- 作業途中でユーザーが指示を直したときに素直に従う「操縦しやすさ」の評価で2位

開発用ツール「Google Antigravity」では、Neonが指揮役になり、複数のHydrogenを並行して働かせる使い方も紹介されています。セキュリティ向けの「Gemini 4 Neon for cyber」は、信頼できる防御側の組織に向けて数日以内に提供を始めるとしています。

## どこで使えるか

Gemini APIの有料枠（Google AI Studio）、企業向けのGemini for business、有料のGoogle AI Pro/Ultra契約者向けのAntigravityとGeminiアプリで、順次提供が始まりました。GeminiアプリではNeonを選ぶと、作業代行機能「Tasks」もNeonで動くようになります。

X上でも話題で、DeepMindのデミス・ハサビスCEOの紹介投稿にはいいね1615件が付いています（取得時点）。
