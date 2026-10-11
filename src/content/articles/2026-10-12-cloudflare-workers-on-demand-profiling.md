---
title: "CloudflareがWorkersとDurable Objects向けにオンデマンドのCPU・メモリプロファイル、本番でフレームグラフを取得可能に"
summary: "CloudflareはWorkersとDurable Objectsで、稼働中のWorkerに対しCPUとメモリのプロファイルを要求し、フレームグラフで確認できる機能を公開した。CLIでもダッシュボードでも取得でき、pprof形式でダウンロードできる。"
points:
  - "CLIは cf workers versions profile latest --worker-id <名前> --duration-ms 5000 --profile-type cpu。出力はpprof形式"
  - "ダッシュボードはWorkerのObservabilityタブで「Flamegraph」を選び、Capture Profileで取得"
  - "稼働中のisolateを観測するため、トラフィックが少ないWorkerは取りにくい。新しいisolateは起動しない"
  - "事例では、無効のはずだったPrometheusコードがアロケーションの約66.7%を占め、削除でP999が133MBから118MBに低下"
category: backend
sourceName: "Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/workers-on-demand-profiling/"
publishedAt: "2026-10-12T06:50:00+09:00"
---

## 何が使えるようになったか

Cloudflareが2026年10月9日に発表した機能です。ログや集計メトリクスでは分かりにくい「どの関数がCPUやメモリを使っているか」を、本番で稼働中のWorkerとDurable Objectsに対して調べられます。WorkersのObservabilityページからオンデマンドでCPUまたはメモリのプロファイルを要求し、インタラクティブなフレームグラフで確認でき、解析用にプロファイルファイルもダウンロードできます。

## 取り方

CLIでは、`cf`パッケージを入れたうえで次のように実行します。

```bash
cf workers versions profile latest \
  --worker-id "$WORKER_ID_OR_NAME" \
  --duration-ms 5000 \
  --profile-type cpu > worker-cpu.pprof
```

ダッシュボードでは、Build → Compute → Workers & Pages から対象のWorkerを選び、Observabilityタブのドロップダウンで「Flamegraph」を選びます。CPUとメモリの両方を取れ、プロファイルする期間とバージョンも選べます。APIを直接たたく例（`--data-raw '{"duration_ms":5000,"profile_type":"cpu"}'`）も示されています。

## 注意点と事例

- 現状は、本番の実行を観測するため新しいisolateを起動してプロファイルを作ることはしません。トラフィックが少ないWorkerは取りにくいので、十分に使われているデプロイ済みバージョンを選ぶ必要があります。
- Cloudflare社内の事例では、ヒーププロファイルをpprofで開くと、無効にしたつもりだったPrometheusのコードがアロケーションの約66.7%を占めていました。コードパスを削除した結果、メモリ使用量はP50が70MBから54MB、P999が133MBから118MBになり、128MBの上限に対して約10MBの余裕ができたとされています。

メモリエラーの原因が「無効化したはずの計測コード」だった、という例は、本番でプロファイルを取る価値を示す話です。
