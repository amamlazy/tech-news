---
title: "Cloudflare、文書から情報を抜き出すAI「Clairic」を改良しオープンウェイトで公開　軽量版「Clairic-flash」も"
summary: "Cloudflareが、レシートやPDFなどから必要な項目を取り出すことに特化した自社製AIモデル「Clairic」の新版と、軽量版「Clairic-flash」を公開しました。どちらも中身（重み）をHugging Faceで公開し、同社のWorkers AIからも使えます。"
points:
  - "Clairicは270億パラメータ、Clairic-flashは90億パラメータ。PDFの読み取りにも新たに対応"
  - "料金は入力100万トークンあたりClairicが0.24ドル、flashが0.10ドル。出力分は課金しない"
  - "Cloudflareは研究チームを「Workers AI Superintelligence team」と名乗り、自社モデル開発を強化"
category: ai
sourceName: "Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/open-clairic/"
publishedAt: "2026-11-19T06:20:00+09:00"
---
Clairic（クレアリック）は、ネットワーク企業のCloudflareが自社開発した、文章や画像から必要な情報を抜き出す「抽出」専用のAIモデルです。たとえばレシートの写真から店名や合計金額を取り出す、といった用途を想定しています。

## 何が発表されたか

Cloudflareは11月18日（米国時間）、ブログで2つのモデルを発表しました。

- **新しいClairic**：プレビュー版から設計をやり直し、表・箇条書き・日付の扱いや、答えの根拠を元の文書に結びつける精度を高めた。新たにPDFも読めるようになり、画像やPDFのページを合わせて4枚まで渡せる
- **Clairic-flash**：90億パラメータ（モデルの規模を表す数字）の小型・高速版

どちらもCloudflareのAI実行サービス「Workers AI」で使えるほか、モデルの重み（中身）をHugging Faceで公開しました。これを「オープンウェイト」と呼び、自分の環境で動かしたり改良したりできます。

## 仕組みと料金

新しいClairicでは、抽出したい項目ごとに文字を順番に生成し、それぞれが終わりの印で止まる方式にしたといいます。全項目が同時に進むので、1回のリクエストの待ち時間は短いままだと説明しています。結果には、確からしさ（信頼度）や、元の文書のどこから取ったかを示す位置情報も付きます。

プレビュー時は9B（90億）版を `@cf/cloudflare/clairic` で提供していましたが、今後9B版は `@cf/cloudflare/clairic-flash` に移り、`@cf/cloudflare/clairic` は27B（270億）版になります。料金は入力100万トークンあたりClairicが0.24ドル、Clairic-flashが0.10ドルで、出力トークンには課金しません。12月1日までは両方とも0.10ドルのキャンペーン価格です。

あわせてCloudflareは、言語モデル「Clef」なども作ってきた研究チームを「Workers AI superintelligence team」として紹介し、自社でフロンティア級のAIモデルを作っていく姿勢を打ち出しました。
