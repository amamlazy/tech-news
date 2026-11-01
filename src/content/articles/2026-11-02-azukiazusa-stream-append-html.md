---
title: "【実践レポート】AIの返答をストリーミングでそのままHTML表示　新API「streamAppendHTML()」を試す"
summary: "azukiazusaさんが、AIチャットのように少しずつ届くHTMLを、安全に画面へ追加できる新しいブラウザAPI「streamAppendHTML()」を試した記事を公開しました。使い方から、サニタイザーの注意点、停止ボタンの作り方まで紹介しています。"
points:
  - "response.textStream().pipeTo(element.streamAppendHTML(...))の1行でHTMLを流し込める"
  - "Chrome 158 Beta以降はフラグなしで利用可能。SafariとFirefoxは未対応"
  - "既に表示した要素は作り直されないので、開いた<details>も閉じない"
  - "既定のサニタイザーはimgやclassも消すため、許可する要素を指定するのがおすすめ"
category: frontend
sourceName: "azukiazusa.dev"
sourceUrl: "https://azukiazusa.dev/blog/stream-append-html/"
publishedAt: "2026-11-02T11:00:00+09:00"
---

ChatGPTのようなAIチャットでは、返事が1文字ずつ流れるように表示されます。この「ストリーミング」で届くHTMLを、ブラウザが安全に、しかも効率よく画面へ追加していけるようにする新しい機能が「streamAppendHTML()」です。この記事は、それを実際に試した解説です。

## どう使うのか

azukiazusaさんの記事（10月31日公開）によると、`streamAppendHTML()` はWritableStream（データを順番に書き込める入れ物）を返すメソッドです。fetchで受け取ったレスポンスを、次のようにつなぐだけで、届いた順にHTMLが表示されます。

```js
response.textStream().pipeTo(element.streamAppendHTML({ sanitizer }));
```

対応状況は、Chrome 158 Beta以降ならフラグ（試験機能を有効にする設定）なしで使え、Chrome／Edge 148以降はフラグを有効にすれば試せます。SafariとFirefoxはまだ対応していません。

## 便利なところ

- すでに表示された要素は作り直されないため、ユーザーが開いた `<details>` が勝手に閉じることがない
- チャンク（届いたデータのかたまり）の途中でタグが切れていても、完成するまでためておいてくれる

## 安全に使うための注意点

サニタイザー（危険なHTMLを取り除く仕組み）について、記事は次の点を挙げています。

- 「Unsafe」版では `onerror` のようなイベントハンドラーが動いてしまう。`<script>` は既定（runScriptsがfalse）では実行されない
- 既定のサニタイザーは `img`、`details`、`class` なども消してしまうため、`new Sanitizer({ elements: [...] })` で許可する要素を列挙する方法がおすすめ
- 画像を許可すると外部へのリクエストが発生するため、CSP（読み込み元を制限するセキュリティ設定）の `img-src` で制限するとよい

また、生成を止める「停止ボタン」は、AbortController（処理を途中で止めるための仕組み）をfetchとpipeToの両方に渡すことで作れると紹介しています。

## 読みどころ

AIチャット画面を自作するとき、「ストリーミング表示」と「安全性」の両立は意外と面倒なところです。ブラウザ標準でそれができるようになる流れと、実際にハマりやすいサニタイザーの挙動がまとめて分かる記事です。
