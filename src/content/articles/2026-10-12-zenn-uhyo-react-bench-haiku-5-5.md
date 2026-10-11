---
title: "uhyo氏のReact習熟度ベンチマークでClaude Haiku 5.5はSonnet 5.5のhighを上回る、ただしeffortを上げても伸びは小さい"
summary: "Zennのuhyo氏は、Claude Haiku 5.5のReact習熟度ベンチマーク結果を公開した。highでは83.82点でSonnet 5.5のhigh（81.08点）を上回ったが、max（85.56点）にしても伸びは1.74点にとどまった。"
points:
  - "順位はHaiku 5.5 maxが10位（85.56）、highが12位（83.82）。トップはOpus 5.5 maxの94.46で、Opus 5.5 highには全体で及ばない"
  - "実装1件の所要時間の中央値は、Sonnet 5.5 highが0.9分、Haiku 5.5 highが2.2分。Haikuはhighでも多く作業していた"
  - "effortを上げて効いたのは新しいAPIの採用で、006ではuseEffectEventの採用が0/3から3/3に。設計やパフォーマンスはmaxでもほぼ動かず"
  - "uhyo氏は「Haikuが強い」というより、同じeffortのラベルでも働き方が違うことの表れだと読む"
category: frontend
sourceName: "Zenn（uhyo氏）"
sourceUrl: "https://zenn.dev/uhyo/articles/react-profession-bench-20"
publishedAt: "2026-10-12T06:35:00+09:00"
---

## どんな記事か

これは、uhyo氏のReact習熟度ベンチマークシリーズの第20回（2026年10月10日公開）です。モデルごとにReactの実装課題（13スペック×各3回）を解かせ、状態設計、Effect衛生、コンポーネント設計、パフォーマンス、アクセシビリティ、TypeScriptの6観点で採点します。今回は新しく出たClaude Haiku 5.5を、effortのhighとmaxで測っています。記事の後半は、Claude Codeが書いた実験レポートを無修正で載せた形です。

## 結果

| 条件 | 総合 | 記事の順位表 |
| --- | --- | --- |
| Haiku 5.5 max | 85.56 | 10位 |
| Haiku 5.5 high | 83.82 | 12位 |
| Sonnet 5.5 high | 81.08 | 13位 |
| Opus 5.5 max（トップ） | 94.46 | 1位 |

Haiku 5.5のhighは、13スペック中10でSonnet 5.5のhighを上回りました。差はコンポーネント設計とパフォーマンスにあります。一方で、maxにしても1.74点しか伸びず、max同士ではSonnet 5.5が約6.2点上です。

## 筆者の読み解き

- **所要時間**：実装1件の中央値は、Sonnet 5.5 highが0.9分、Haiku 5.5 highが2.2分、Opus 5.5 highが4.7分でした。Sonnetはhighでは1分足らずで終えており、Haikuは同じhighでも多く手を動かしています。記事は「Haikuが上手い」ではなく、「同じhighというラベルの下でHaikuのほうが多く働く」と読むべきだとします（所要時間は壁時計の値で、負荷の影響を受けます）。
- **effortが買うもの**：Haikuでhighからmaxに上げて伸びたのは、現代的なAPIの網羅でした。通知フィード課題ではuseEffectEventの採用が0/3から3/3になり、Sonnet 5.5 max（1/3）より安定していました。設計やパフォーマンスのカテゴリはmaxでもほぼ動いていません。
- **GPTとの比較**：同世代のGPT（GPT-6、6.1）との比較ではClaude側が上回り、下位同士のHaikuとLunaでも差が出た、と書かれています。

uhyo氏は、HaikuとSonnetは単なる性能の優劣ではなく、異なる役割を持つモデルかもしれない、と考察しています。点数は各条件n=3で、サンプル範囲が重なる条件は区別できない点に注意が必要です。
