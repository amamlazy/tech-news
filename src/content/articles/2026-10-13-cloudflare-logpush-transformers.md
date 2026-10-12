---
title: "Cloudflare、Logpushの出力前にSQLでログを絞り込み・加工する「Transformers」の仕組みを解説"
summary: "Cloudflareは10月12日、Logpushでログを外部へ送る前にSQLで絞り込み、マスク、整形ができる「Transformers」の内部構造をブログで解説した。Go製の配信基盤にRust製のApache DataFusionを組み込み、Arrow形式で受け渡している。"
points:
  - "SQLのWHEREで不要なレコードを捨て、SELECTの結果をNDJSONで出力する。ヘルスチェック除外やIPの一部マスクが例に挙がった"
  - "Free、Pro、Business、Enterpriseの全プランで利用可能。ダッシュボードのTransformer StudioかAPIで作り、Logpushジョブに付ける"
  - "Go製の配信サービスにRust製DataFusionをcgo経由で組み込み、Arrow IPCで受け渡す。5,000行を約3ミリ秒で処理したという"
  - "変換に失敗したら生のログは送らず再試行する「fail closed」設計。失敗が続くジョブは自動で無効化される"
category: backend
sourceName: "Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/transformers-on-logpush/"
publishedAt: "2026-10-13T07:10:00+09:00"
---

## どんな機能か

Logpushは、CloudflareのログをSIEMや分析基盤、オブジェクトストレージへ送る機能です。送る前にヘルスチェックを除いたり、機微な項目を消したり、ダッシュボード向けに形を変えたりしたい場合、これまでは別の処理サービスを用意する必要がありました。捨てるだけのレコードにも、転送や取り込み、保存の費用がかかります。

Transformersでは、この処理をLogpushの中で行います。データセットごとにSQLを書き、`WHERE`に合わないレコードを捨て、`SELECT`の結果を出力レコードにします。出力はNDJSONです。ブログの例では、次のような処理を1本のSQLで書いています。

```sql
SELECT
  regexp_replace(ClientIP, '\.\d+\.\d+$', '.XXX.XXX') AS redacted_ip,
  UPPER(ClientRequestMethod) AS method,
  EdgeResponseStatus AS status,
  'cloudflare' AS provider,
  named_struct('host', ClientRequestHost, 'path', ClientRequestPath) AS request
FROM http_requests
WHERE ClientRequestPath NOT LIKE '/healthz%'
```

IPアドレスの後半を伏せ、項目名を揃え、ネストした`request`にまとめ、ヘルスチェックを除いています。複数のCDNのログを同じスキーマに揃える用途を想定した例です。

## 中の仕組み

配信を担うサービス「Bufstream」はGoで書かれており、毎秒1億1,000万件を超えるLogpushレコードを顧客の送り先へ届けています。SQLエンジンには、Cloudflare Basinでも使っているRust製のApache DataFusionを選びました。

- GoとRustの間は、cgoとC ABIを通し、Apache ArrowのIPC形式でバッチ単位に受け渡します。行ごとのJSON変換を避けるためです
- メモリの持ち主は明確に分けています。Goは呼び出しの間だけ入力バッファを貸し、Rustが作った出力はGo側でコピーしてから明示的に解放します
- スキーマは届いたログから推測せず、データセットの定義から生成します。クエリの検証にも使います
- SQLはR2に保存され、DataFusionの論理プランに変換されます。プランは時間区切りごとに1回作り、バッチごとに使い回します

ベンチマークでは、合成した5,000行のバッチを1つのgoroutineから処理して約3ミリ秒（毎秒約160万行相当）でした。

## 運用で効くところ

変換に失敗した場合は、変換前のログを代わりに送らず、配信位置も進めずに再試行します（fail closed）。マスク前のデータが下流に流れる事故を避けるためです。失敗が続くと再試行の間隔を広げ、長く失敗したままのジョブは自動で無効になります。LogpushのHealthタブで、成功・失敗の件数や変換前後のデータ量を確認できます。

利用はFree、Pro、Business、Enterpriseの全プランで可能です。手順は、データセットを選ぶ、SQLを書いてサンプルでプレビューする、保存する、同じデータセットのLogpushジョブに付ける、の4段階です。
