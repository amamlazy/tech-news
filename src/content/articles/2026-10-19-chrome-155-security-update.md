---
title: "「Google Chrome 155」に再びセキュリティ更新、最も深刻な「Critical」1件を含む10件を修正"
summary: "Googleはデスクトップ向けGoogle Chromeの安定版を更新し、Windows・Mac向けにv155.0.8059.84/.85、Linux向けにv155.0.8059.84を配信し始めた。最も深刻な「Critical」1件を含む10件の脆弱性を修正しており、早めの更新が望ましい。"
points:
  - "10月13日のv155.0.8059.79/.80に続くセキュリティアップデート"
  - "Criticalは、ページの先読み機能Prerenderの解放後メモリ利用の脆弱性"
  - "High 6件もV8やDOM、SVGなどのメモリ破損や解放後メモリ利用"
  - "chrome://settings/help で手動更新でき、適用には再起動が必要"
category: frontend
sourceName: "窓の杜"
sourceUrl: "https://forest.watch.impress.co.jp/docs/news/2148608.html"
publishedAt: "2026-10-19T08:15:00+09:00"
---

Google Chromeは、世界で最も使われているWebブラウザーです。ブラウザーの脆弱性（セキュリティ上の欠陥）は、怪しいWebページを開いただけで悪用されるおそれがあるため、更新が出たら早めに当てておくのが基本です。

## 何が直ったか

窓の杜によると、Googleは10月15日（現地時間）、デスクトップ向けChromeの安定（Stable）チャネルを更新しました。今後数日から数週間かけて、Windows・Mac環境にはv155.0.8059.84/.85、Linux環境にはv155.0.8059.84が届きます。

10月13日のv155.0.8059.79/.80に続く更新で、修正された脆弱性は10件です。深刻度の内訳は、4段階で最も高い「Critical」が1件、2番目の「High」が6件、3番目の「Medium」が3件でした。

Criticalと評価されたのは「CVE-2026-110922：Use after free in Prerender」です。Prerenderは、次に開きそうなページを先読みしておく機能です。Use after free（解放後メモリ利用）は、使い終わって手放したメモリを誤って使い続けてしまう不具合で、プログラムの異常終了や任意のコード実行につながることがあります。

Highの6件も、JavaScriptエンジンの「V8」や「DOM」（ページの構造を扱う部分）、「Core」「SVG」におけるメモリ破損や解放後メモリ利用の脆弱性です。実際に悪用されたという報告はまだないようです。

## 延長安定版も更新

同じ日には、Windows・Mac向けの延長安定版（Extended Stable、更新の間隔が長い版）もv152.0.7977.169に更新され、Critical 2件とHigh 8件の計10件が修正されています。

## 更新のしかた

すでにChromeが入っていれば自動で更新されますが、設定画面（chrome://settings/help）を開けば手動でも更新できます。更新を完全に適用するにはChromeの再起動が必要です。
