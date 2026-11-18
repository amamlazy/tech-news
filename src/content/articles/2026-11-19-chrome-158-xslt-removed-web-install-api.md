---
title: "「Chrome 158」安定版、XMLを変換する「XSLT」のサポートを終了　Webアプリのインストールを促すAPIも"
summary: "Googleが、Webブラウザー「Chrome」の新しい安定版「Chrome 158」を公開しました。古くから使われてきたXML変換の仕組み「XSLT」が既定で使えなくなったほか、Webサイトからアプリのインストールを促せる「Web Install API」などが加わり、204件のセキュリティ修正も含まれています。"
points:
  - "XSLTは攻撃の糸口になりやすい古いライブラリに依存しており、Chrome 176で完全に無効化の予定"
  - "navigator.install() と <install> 要素で、Webアプリのインストールを促せるように"
  - "Android版でWebHIDに対応。CSSに :playing / :paused などの疑似クラスも追加"
category: frontend
sourceName: "窓の杜"
sourceUrl: "https://forest.watch.impress.co.jp/docs/news/2157314.html"
publishedAt: "2026-11-19T06:25:00+09:00"
---
Chromeは、Googleが開発する世界で最も使われているWebブラウザーです。今回の「Chrome 158」は、4週間ごとに出る大型更新の一つで、Web制作に関わる人には「XSLTの終了」が大きな変更点です。

## XSLTのサポート終了

XSLT（エックスエスエルティー）は、XML形式のデータを、人が読みやすいHTMLなどに変換するルールを書くための言語です。1999年に標準化され、すべてのブラウザーが対応してきました。

窓の杜によると、Chrome 158では、お試し機能の「オリジントライアル」や企業向けポリシーを有効にしている場合を除き、XSLTが動かなくなりました。Chromeが使う「libxslt」はC言語で書かれた古く複雑なライブラリで、メモリ安全性に関わる脆弱性が何度も報告されてきました。Googleは、利用が大きく減る一方で攻撃の糸口になっているとして削除を決めたといいます。オリジントライアルと企業向けポリシーもChrome 176で終わり、全ユーザーで無効になる予定です。FirefoxやSafariも同じ方針を示しています。

## 新しく使えるようになったもの

- **Web Install API**：Webサイトが `navigator.install()` メソッドや `<install>` 要素で、ユーザーにWebアプリのインストールを促せる（デスクトップ版）
- **WebHID（Android版）**：USBやBluetoothでつないだキーボードやマウスなどとWebアプリがやり取りできるAPI。Android 17以降で対応
- **CSS**：動画や音声の再生状態に合わせて見た目を変えられる `:playing`、`:paused` などの疑似クラスや、`::highlight(*)` セレクター

## セキュリティ修正

204件の脆弱性が修正され、うち6件は最も深刻な「Critical」です。悪用が確認された脆弱性のアナウンスはありません。
