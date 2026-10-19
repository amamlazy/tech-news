---
title: "AWS Lambdaに「Web Functions」登場、Next.jsやHonoのアプリを書き換えずにそのまま動かせる"
summary: "AWSのサーバーレス基盤Lambdaに、Next.jsやExpress、HonoなどNode.js向けWebアプリを手を加えずにデプロイできる新機能「AWS Lambda Web Functions」が加わった。1つの実行環境で最大128件のリクエストを同時に処理でき、東京リージョンでも使える。"
points:
  - "Webサーバーとして書いたNode.jsアプリを、アダプターなしでLambdaに載せられる"
  - "ランタイムはNode.js 24、実行環境ごとにメモリ2GB・最大128同時リクエスト"
  - "タイムアウトは既定30秒で、3秒〜15分の範囲で設定できる"
  - "従来型の関数は「Lambda Event Functions」と呼ばれるようになる"
category: backend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/aws_lambdanextjshononodejsaws_lambda_web_functions.html"
publishedAt: "2026-10-20T07:20:00+09:00"
---

AWS Lambdaは、Amazon Web Services（AWS）が提供する「サーバーレス」（サーバーの用意や管理をせず、プログラムだけを置いて動かせる仕組み）の実行基盤です。今回の「Web Functions」は、普通のWebアプリをLambdaでそのまま動かせるようにする新しい種類の関数です。

## 何が変わったのか

Publickeyによると、これまでのLambdaは「HTTPリクエストを受け取って関数を呼び、結果を返す」という形で、関数の実行とHTTPの処理が別々に行われていました。そのため、Next.jsのようにWebサーバーとして動く前提のアプリを関数の中に置いても、そのままでは動きませんでした。間をつなぐアダプター（変換役のプログラム）を別に用意する必要があったのです。

Web Functionsでは、Node.jsと同じようにWebサーバーとして振る舞える関数が提供されます。Next.js、Express、Hono、FastifyといったNode.js向けフレームワーク（Webアプリを作るための土台）で書いたアプリを、Web関数の中にそのままデプロイして実行できます。これに伴い、従来型の関数は「Lambda Event Functions」と呼ばれるようになります。

## 主な仕様

- ランタイム（実行環境）はNode.js 24
- 実行環境1つにメモリ2GB、既定のヒープ（プログラムが使う作業用メモリ）は1024MB
- 1つの実行環境で最大128件のリクエストを同時に処理
- タイムアウトは既定30秒、3秒〜15分で変更可能

使えるリージョンは、東京、米国東部（バージニア北部、オハイオ）、米国西部（オレゴン）、欧州（アイルランド）です。

## 現場で見るところ

Publickeyは、VercelなどNode.jsのWebアプリをホスティングするサービスにとって「大いなる競合」が現れたと評しています。1つの環境で複数のリクエストをまとめて捌けるため、リクエストごとに環境が立ち上がる従来型より、コールドスタート（環境の初回起動による待ち時間）に当たる回数を減らせる可能性があります。一方で、従来型と料金の傾向が同じとは限らないので、自分のアプリの待ち時間や同時アクセス数に合わせて試算してから移すのが安心です。
