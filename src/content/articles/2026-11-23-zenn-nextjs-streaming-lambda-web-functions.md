---
title: "【試してみた】Next.jsのストリーミング表示はLambda Web Functionsで動くか　チャンクの到着時刻を3つの方法で測った結果"
summary: "Next.jsのSuspenseによる「準備できた部分から順に表示する」ストリーミングが、AWSの新しい実行形態Lambda Web Functionsで本当に動くかを、Vercelと比べて計測したZennの実践レポートです。追加設定なしで段階的に届き、挙動はVercelとほぼ同じで、違いが出たのはコールドスタートだけだったと報告しています。"
points:
  - "Suspense境界の中身は仕込んだ遅延（1秒・3秒）どおりに届き、Vercelとの差は数十ms程度"
  - "CloudFrontを挟んでも段階表示は崩れず、増えたのは最初のバイトまでの10〜40ms程度"
  - "コールドスタート時はTTFBが約1.2秒。chunkedヘッダーやTTFBだけでは段階表示かどうか判定できない"
category: frontend
sourceName: "Zenn"
sourceUrl: "https://zenn.dev/ryota_09/articles/nextjs-suspense-streaming-lambda-web-functions"
publishedAt: "2026-11-23T05:50:00+09:00"
---
ストリーミング表示とは、Webページの準備ができた部分から先にブラウザーへ送り、遅い部分はあとから差し込む仕組みです。Next.jsではReactの`<Suspense>`で区切った部分ごとに順に届きます。この記事は、ryota_09氏がZennに書いた、AWS Lambda Web Functionsでこれが動くかを確かめた実践レポートの要約です。

## なぜ試したか

Lambda Web Functionsは2026年10月に一般提供になった、HTTPサーバーをそのままLambdaで動かせる形態です。著者は以前、Lambda Web Adapter経由で試したとき、`Transfer-Encoding: chunked`が付いてTTFB（最初のバイトが届くまでの時間）も速いのに、Suspense部分が全部同時に表示された経験がありました。そこで今回は、Suspenseの中身がいつ届いたかを直接測ることにしています。

## 検証の方法

- Next.js 16.4.6、React 19.3.1、Node.js 24。Next.js公式のstreaming-demoと、従来型SSRのサンプルの2アプリ
- 東京リージョンのWeb Functions（直接／CloudFront経由）と、Vercel（hnd1）を比較
- Node.jsのfetch、curl（`--trace-time`）、Playwright＋Chromiumの3つの方法でチャンクの到着時刻を記録
- 「段階的に届いた」と判定する閾値は、結果を見る前に決めて変えない。Vercelを陽性対照、Suspenseなしのページを陰性対照に置いた

## 結果

- Web Functionsでは追加設定なしで、検証したすべての条件でSuspenseのページが段階的に届いた。1秒・3秒の遅延を仕込んだ部品は、シェルからそれぞれ約1.0秒・約3.0秒後に届いた
- CloudFrontを挟んでも中身の届くタイミングは変わらず、TTFBが10〜40ms程度増えただけ。HTTP/2、HTTP/3でも同じ
- 画面遷移時のRSC（React Server Componentsのデータ）も段階的に届いた
- 違いはコールドスタートで、Web FunctionsはTTFBが約1.2秒に。VercelのPPRページはTTFBは速いまま、Suspenseの中身が約0.64秒遅れた

## デプロイ時のハマりどころ

Web Functionsは待ち受けアドレスを環境変数`AWS_LAMBDA_HTTP_ENDPOINT`（host:port）で渡しますが、Next.jsのstandalone出力の`server.js`は`HOSTNAME`と`PORT`を読みます。そこで変換するだけの`index.js`をzipのルートに置いています。また、Web FunctionsはArm64のみなので、`linux/arm64`の`node:24`コンテナでビルドし、pnpmは`node-linker=hoisted`にしてstandalone出力にシンボリックリンクを残さないようにしています。`.next/static`と`public`はstandaloneに含まれないため手でコピーする点も注意点として挙げています。

著者は「chunkedヘッダーやTTFBだけでは、段階表示されているかは分からない。判定は到着時刻で見る」とまとめています。
