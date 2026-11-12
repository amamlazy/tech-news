---
title: "Google「Gemini 4 Hydrogen」を公開　速さ重視の新モデルを無料ユーザーや検索にも、Carbonと自動で使い分ける「Orchestrator」も"
summary: "Googleは11月12日、日常のコーディングやAIエージェントの作業向けに、速さと効率を重視したAIモデル「Gemini 4 Hydrogen」を発表しました。Gemini 3.8 Flashより2.5倍速く作業を終えられるとし、Geminiアプリや検索など幅広い場所で使えるようになります。"
points:
  - "Google AI StudioやGemini APIの全プラン、Geminiアプリ、Google検索、Antigravityの有料プランで提供"
  - "料金は100万トークンあたり入力1.5ドル、出力7.5ドル。100万トークンの文脈全体で同じ価格"
  - "Antigravityの新機能「Orchestrator」は、CarbonとHydrogenを作業の途中で自動的に切り替える"
category: ai
sourceName: "Google Blog"
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/"
publishedAt: "2026-11-13T06:55:00+09:00"
---
Gemini（ジェミニ）は、Googleが開発しているAIモデルとAIサービスのシリーズです。Gemini 4シリーズには、難しい問題をじっくり考える上位モデル「Carbon」「Argon」があり、今回の「Hydrogen」は、日々の作業を速く安くこなすためのモデルとして加わりました。

## どんなモデルか

Googleの発表によると、Hydrogenは「すばやい実行」に向けて作られたモデルです。AIの賢さを比べる指標「Artificial Analysis Intelligence Index」では、初期設定（high）で51と、上位モデルのArgon（50）を上回り、最も深く考える設定（xhigh）では54に達したとしています。

- Gemini 3.8 Flashと比べ、作業を2.5倍速く終え、Terminal-Bench 4.1（ターミナル操作の課題で測るベンチマーク）は18.2％から57％へと3倍超に
- 事実と異なる主張（作り話）を5分の1以下に減らし、ツールの呼び出しが失敗したときも立て直せる
- 考える深さを low／medium／high（初期設定）／xhigh の4段階から選べる
- 入力は最大100万トークン、出力も最大100万トークンに対応

料金は100万トークン（トークンはAIが文章を処理する単位）あたり入力1.50ドル、出力7.50ドルで、長い文脈を使っても単価は変わりません。

## どこで使えるか

Google AI StudioとGemini APIの全プラン、法人向けのGemini for business、Geminiアプリ、Google検索で使えます。Googleの開発環境「Antigravity」では、有料のGoogle AI Pro／Ultraの加入者が対象です。

Google検索の担当者のブログによると、Hydrogenは検索で「これまでで最大のモデル更新」とされ、複数の条件を含む質問の理解や、比較表・画像を使った回答、関連サイトへのリンクの幅が改善されるとしています。

## 2つのモデルを自動で使い分ける「Orchestrator」

あわせてAntigravityには「Orchestrator」という新しい選択肢が加わりました。作業の最初はCarbonが依存関係を調べて計画を立て、コードの編集やテストはHydrogenが担当し、Hydrogenが行き詰まるとCarbonに戻す、という形で1つの作業の中でモデルを切り替えます。Googleによると、Carbon単独に近い成功率のまま、利用枠の消費を平均24％減らし、19％速く終えたといいます。Orchestratorはまず Google AI Ultra の加入者向けに提供されます。

## 見ておきたいところ

高性能なモデルは賢い一方で遅く高くなりがちです。今回の発表は「計画は上位モデル、手を動かすのは速いモデル」という分担を製品として組み込んだ点が特徴です。普段使いのGeminiアプリや検索でも新モデルが使われるため、一般ユーザーにとっても身近な変化になりそうです。
