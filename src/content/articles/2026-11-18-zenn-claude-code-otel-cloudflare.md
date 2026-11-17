---
title: "【試してみた】組織のClaude Code利用ログを、OpenTelemetryとCloudflareだけで集める　Collector不要の構成"
summary: "Claude Codeを全社導入したGemcookのsoso氏が、社員の利用状況を自動で集める仕組みをZennで紹介しています。Claude CodeのOpenTelemetry送信を使い、Cloudflare WorkersとR2だけでログの受け口を作りました。"
points:
  - "http/jsonで送らせれば、OTel Collectorなしで普通のHTTPハンドラで受けられる"
  - "api_requestイベントにメールアドレス、モデル、トークン数、推定コストが入っている"
  - "設定はserver-managed settingsで配布。事前の周知と承認ダイアログの説明が必要"
category: backend
sourceName: "Zenn（Gemcook）"
sourceUrl: "https://zenn.dev/gemcook/articles/claude-code-otel-cloudflare"
publishedAt: "2026-11-18T06:05:00+09:00"
---
OpenTelemetry（オープンテレメトリー、略してOTel）は、アプリの動作記録（ログや数値）を集めるための業界標準の仕組みです。AIのコーディングエージェント「Claude Code」はこの形式で利用ログを自動送信できるため、会社全体での使われ方を把握するのに使えます。この記事は、Gemcookのsoso氏がZennに書いた構築記事（収集編）の要約です。前提はClaudeのTeamプランです。

## なぜOpenTelemetryを選んだか

soso氏は最初、各自の端末のログを集計するCLIツール「ccusage」を検討しました。手軽ですが、組織全体の状況を見るには毎週メンバーに実行してもらう必要があり、長く続けるには向かないと判断しました。OpenTelemetryなら、一度仕組みを作れば設定を配るだけで自動で送られてきます。標準規格なので、同じ受け口をCodexなど他のツールにも使えるのも利点です。Claude標準のアナリティクス画面は、Teamプランでは集計済みの数字が中心で、セッション単位や時間帯別の分析には足りなかったそうです。

## 取れる情報

一番役立つのは、Claude CodeがAPIを1回呼ぶごとに届く `api_request` イベントです。

- 発生時刻、ユーザーのメールアドレス、セッションID、使用モデル
- 入力・出力トークン数、キャッシュの読み取り・作成トークン数
- API料金に換算した推定コスト（`cost_usd`）、所要時間

OAuthでログインしていればメールアドレスが付くので、メンバー別の集計がしやすいとのことです。ただし推定コストはAPI料金換算なので、定額のサブスクリプションの実際の請求額とは一致せず、目安として使うよう注意しています。プロンプト本文などを送るオプションは、不要なので無効のままにしています。

## 受け口の作り方

Claude Codeは送信方式を選べ、`http/json` を指定するとJSONのままHTTPで届きます。そのため、OTel Collector（受信用の専用サーバー）を立てずに、Cloudflare Workers（サーバーを持たずにプログラムを動かせるサービス）の普通のHTTPハンドラで受けられます。Workerは、Authorizationヘッダーのトークンを照合したうえで、届いたJSONをまず生データのままR2（Cloudflareのストレージ）に保存します。整形より先に生データを残すことで、整形処理にバグがあってもやり直せ、Claude Code側の仕様変更にも対応しやすくなります。手前にはWAFも置いています。

## 設定の配り方

Claudeの「server-managed settings」を使うと、管理コンソールに登録した設定がメンバーのClaude Codeに自動で配信されます。設定例は次の通りです（ドメインはダミー）。

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "http/json",
    "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "https://otel.example.com/v1/metrics",
    "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "https://otel.example.com/v1/logs",
    "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Bearer <トークン>"
  }
}
```

## 注意点

- 一部の設定を有効にすると、Bashコマンドなどが送られて意図しない情報が集まる可能性がある。保存してよいデータか確認する
- メールアドレス付きで個人のログを集めるので、何を何のために集め、誰が見られるのかを事前にメンバーへ周知する
- 設定が配信されると各メンバーに確認ダイアログが出て、拒否するとClaude Codeが終了する。このことも伝えておく

メンバーがやるのは承認だけで、あとは使うたびにログがR2に溜まっていきます。集計と可視化は別記事で扱う予定だそうです。
