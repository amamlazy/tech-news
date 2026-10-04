---
title: "Cloudflareが観測基盤を統合、エッジからオリジンまで追えるTracesをオープンベータ公開"
summary: "Cloudflareが、ログ・トレース・分析・アラート・ダッシュボード・エクスポートを一つにまとめる8つの観測性アップデートを発表しました。目玉はリクエストの経路を通しで追えるCloudflare Tracesのオープンベータです。"
points:
  - "WAF、変換ルール、キャッシュ、Workers、オリジン処理を1本のトレースで表示"
  - "W3C traceparentの受け渡しとOTLPエクスポートに対応"
  - "統合SQL API、カスタムアラート、セルフサーブ向けLogpushも追加"
category: backend
sourceName: "The Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/one-observability-platform/"
publishedAt: "2026-10-05T07:15:00+09:00"
---

## 何が発表されたか

Cloudflare は Birthday Week の一環として、観測性（オブザーバビリティ）に関する8つのアップデートを発表した。Cloudflare の各製品に散らばっていたログ、トレース、分析、アラート、ダッシュボード、データエクスポートを一つの基盤にまとめ、料金体系もそろえる方針だ。

主な内容は次のとおり。

- Workers Observability と Log Explorer を統合した新しい Logs 画面
- エッジからオリジンまでのエンドツーエンドのトレース（Cloudflare Traces）
- Cloudflare のデータを横断して問い合わせる統合 SQL API
- 観測データに対するカスタムアラートとカスタムダッシュボード
- 30日間保持のドメイン分析と、セルフサーブプランでも使える Logpush

## Cloudflare Traces

Cloudflare Traces はオープンベータで、セキュリティルールの評価、Transform Rules による URL 書き換え、キャッシュ判定、ルーティング、Worker の実行、オリジン処理を、1つのリクエスト単位のタイムラインで確認できる。ブロックやチャレンジの原因になったルールも span から特定できる。

ベースのサンプリング率を決め、Trace Rules で特定のホスト名やパス、ヘッダーに一致するトラフィックだけ率を上げることもできる。W3C の traceparent ヘッダーを受け取ってオリジンへ引き継げるほか、OTLP 対応の任意の送り先へ span をエクスポートできる。

## 現場で見るところ

「Cloudflare の手前で何が起きたか分からない」という調査の手間が減るのが大きい。既存の OpenTelemetry 基盤があるなら、オリジン側のトレースと Cloudflare 側の span をつなげて、レイテンシの内訳を一枚で見られるか試す価値がある。
