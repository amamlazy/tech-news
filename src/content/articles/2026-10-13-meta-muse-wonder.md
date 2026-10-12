---
title: "Meta、エージェント向けの最上位モデル「Muse Wonder」を公開　記憶と粘り強さを前面に"
summary: "Metaは10月12日（米国時間）、個人・業務エージェント向けのフロンティアモデル「Muse Wonder」と上位版「Muse Wonder Full」を発表した。Muse WonderはMeta Model APIとMuse Codeで使え、Fullは当面Muse Codeの契約者向けになる。"
points:
  - "Muse WonderはMeta Model APIとMuse Codeで即日提供。Muse Wonder FullはMuse Code契約者のみが使える"
  - "会話をまたいで必要な文脈を保ち引き出す「Active Memory」と、行き詰まっても別の手を試す「Active Focus」を特徴に挙げた"
  - "長時間の開発はSWE-Marathon、粘り強さはFocusBenchで評価。ギガワット級のPrometheusデータセンターで学習したという"
  - "Vercel AI Gatewayでもmeta/muse-wonder-1.0として利用可能になり、1Mトークンの文脈と画像・PDF入力に対応する"
category: ai
sourceName: "Meta AI"
sourceUrl: "https://research.meta.ai/blog/muse-wonder"
publishedAt: "2026-10-13T07:50:00+09:00"
---

## 何が発表されたか

Metaは2026年10月12日（米国時間、日本時間13日未明）、新しいモデルシリーズ「Muse Wonder」を発表しました。通常版の「Muse Wonder」と、上位版の「Muse Wonder Full」の2つです。同社は、個人や業務のエージェント用途で最先端の性能だと説明しています。

- **Muse Wonder**：Meta Model APIとコーディング用の「Muse Code」で、発表当日から利用できます
- **Muse Wonder Full**：当面はMuse Codeの契約者向けです
- 対話アプリ「Muse」でも、まず有料会員から順次Muse Wonderを使えるようにするとしています

ブログでは、14カ月前にAIの取り組みを一から作り直し始めたこと、前モデル「Muse Spark」から続けてきたスケーリングの延長にあることも書かれています。学習には、ギガワット級のデータセンター「Prometheus」を使ったそうです。

## 4つの重点

Metaが詳しく説明したのは、次の4つです。

1. **専門知識**：契約書や金融・医療情報を読み解く力。法律の評価にはHarveyのLegal Agent Benchmark（LAB）などを使っています。
2. **Active Memory**：会話をまたいで利用者について大事な文脈を持ち続け、今の作業に関係する情報を自分から引き出す力です。
3. **Active Focus**：別のやり方を試したり、障害を回避したりしながら、難しい目標に向けて作業を続ける力です。必要なら確認を求め、重要な操作の前には相談するとしています。評価にはFocusBenchと、長期のソフトウェア開発を試すSWE-Marathonを使いました。
4. **フロンティア級のコーディング**：要件を追い、コードベースをまたいで変更し、テストと修正を繰り返す長時間の作業を想定して学習したと説明しています。

## 開発者が使うには

VercelのAI Gatewayにも同日に追加されました。モデル名は`meta/muse-wonder-1.0`で、Meta側にアカウントを作らなくても、AI Gatewayのキー1つで呼び出せます。Vercelの説明では、コンテキストは1Mトークンです。テキスト・画像・PDFの入力、ツール呼び出し、構造化出力に対応しています。

```ts
import { streamText } from 'ai';

const result = streamText({
  model: 'meta/muse-wonder-1.0',
  prompt: 'Plan a codebase refactor and identify the tools needed.',
});
```

ベンチマークの数字はMeta自身の評価によるものです。第三者評価や、提供開始直後に起きた利用枠の不具合については、別記事「Xで話題」で投稿内容を紹介しています。
