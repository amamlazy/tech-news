---
title: "Next.jsアプリをViteで動かす「Vinext」が1.0に、Cloudflareが本番向け正式版"
summary: "Cloudflareは、Next.jsアプリをViteベースで動かし、さまざまなプラットフォームへデプロイできるようにするフレームワーク「Vinext」のバージョン1.0を公開しました。App RouterとPages Routerの両方に対応し、主要機能のテスト互換性は99%を超えたとしています。"
points:
  - "npx vinext check と npx vinext init の2コマンドで既存プロジェクトを移行できる"
  - "Cloudflare Workersの無料プランのほか、NetlifyやAWS Lambdaにもデプロイ可能"
  - "デプロイ前にCloudflare上でページを事前生成する「キャッシュウォーミング」を導入"
  - "Cache Components（use cache）への対応は現時点では限定的"
category: frontend
sourceName: "Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/vinext-nextjs-on-vite/"
publishedAt: "2026-09-30T09:00:00+09:00"
---

## 実験から正式版へ

Vinextは2月、エンジニア1人がAIを使って1週間でNext.js互換のフレームワークをViteの上に再現できるか、という実験として始まりました。それから7か月で、高トラフィックな本番アプリにも使われるフレームワークに育ち、今回1.0に到達しました。

1.0では、React Server Components、Server Actions、ミドルウェア、クライアントサイドナビゲーションを含むApp RouterとPages Routerの両方に対応しています。ISRやビルド時のプリレンダリング、`output: "export"` による静的出力もサポートし、既存のOpenTelemetryやSentryの設定もそのまま使えるNext.js互換のトレースを備えます。

## キャッシュウォーミングという発想

ページ数が多いサイトでは、アクセスの少ないページまでビルド時にレンダリングするのは無駄が大きくなります。Vinextは、新しいWorkerのバージョンを本番トラフィック0%でデプロイし、そのバージョンに対してページをリクエストしてキャッシュを温めてから本番へ昇格させる仕組みを用意しました。ビルドマシンではなくCloudflareのネットワーク上で事前生成を行うイメージです。

## 追従の仕組み

Next.jsのcanaryには毎日コミットが入ります。Vinextでは毎朝エージェントが差分を確認して影響のありそうな変更をIssueにし、毎晩Next.jsのテストスイートを流して互換性マトリクスを更新しています。Next.jsをCloudflareやVercel以外の環境で動かしたいチームにとって、具体的な選択肢が一つ増えた形です。
