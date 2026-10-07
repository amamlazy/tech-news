---
title: "Haiku 5.5は「小型最高クラス、ただしトークンを多く使う」、Artificial Analysisの評価が話題"
summary: "ベンチマーク機関のArtificial Analysisが、Claude Haiku 5.5は同社の総合指標で43点と小型クラスの首位に立つ一方、最大effortではGPT-6 Lunaの約3倍の出力トークンを使うと投稿しています。単価が同じでも作業あたりの費用は大きく違いうるとして、実際の課金額を比べる投稿も出ています。"
points:
  - "Artificial Analysisは、前のHaikuから1年で26点上がったと投稿"
  - "幻覚率は40%と、比較したGemini 3.8 FlashやGPT-6 Lunaより低いとも投稿している"
  - "同じ3Dシーンの生成でHaiku 5.5が約12倍の費用だったと投稿したユーザーもいる"
category: x-trend
sourceName: "X"
sourceUrl: "https://x.com/ArtificialAnlys/status/2107911905822351609"
publishedAt: "2026-10-08T08:45:00+09:00"
---

## 何が話題か

Claude Haiku 5.5 の公開直後、独立系のベンチマーク機関 Artificial Analysis（@ArtificialAnlys）が詳しい評価を投稿し、1,000件以上のいいねを集めた。モデル自体の発表は同日の記事にまとめている。

同社の投稿によると、主な見立ては次のとおり。

- 同社の Intelligence Index で43点。前の Haiku から1年で26点上がり、GLM-5.3 Flash（42）、Gemini 3.8 Flash（41）、GPT-6 Luna（38）をわずかに上回る、と投稿している
- 一方でトークン消費が多い。最大 effort では1タスクあたり約16万2千の出力トークンを使い、GPT-6 Luna（最大、約5万）の約3倍だという。xhigh から max に上げると、2点のために約1.8倍のトークンを使うとしている
- 事実知識の正答率は36%と低めだが、わからないと認める傾向が強く、幻覚率は40%と比較対象より低い、と投稿している
- AutomationBench-AA の結果は、事前テストで安全上の拒否が過剰に出た問題があり、過小評価の可能性があるという

## 実際の費用を比べる声

開発ツールの atomic.chat（@atomic_chat_hq）は、同じアニメーション付きのボクセル3Dシーンを作らせたところ、Haiku 5.5 では24.96ドル、GPT-6 Luna では1.91ドルかかり、API 単価は同じなのに約12倍の差が出たと投稿している。

## 現場で見るところ

Anthropic 自身も Haiku 5.5 で effort を選べるようにしており、賢さとコストのどちらを優先するかは使う側の設定次第だ。トークン単価だけでなく、自分のタスクでの1回あたりの費用を effort ごとに測ってから採用を決めたい。
