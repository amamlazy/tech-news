---
title: "jQuery 4.1正式版リリース　内部をquerySelectorAllに統一して高速化、3.x系は3.8で最後に"
summary: "Webページを手軽に操作するための定番JavaScriptライブラリ「jQuery」の最新版4.1が正式リリースされました。同時に、古いブラウザ向けの3.x系は「jQuery 3.8」が最後のバージョンになります。"
points:
  - "内部の要素検索をquerySelectorAllに一本化し、高速化が期待される"
  - "リダイレクト後の最終URLを取れる「jqXHR.responseURL」を追加"
  - "3.x系は3.8で最後。今後は重大なバグや脆弱性の修正のみ"
category: frontend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/jquery_41queryselectoralljquery_3xjquery_38.html"
publishedAt: "2026-11-25T06:50:00+09:00"
---
jQuery（ジェイクエリー）は、Webページのボタンや文字などを少ないコードで動かせるようにする、JavaScriptの老舗ライブラリ（便利な部品集）です。今も多くの企業サイトや業務システムで使われています。

## 何が変わったか

Publickeyによると、jQuery開発チームは最新版「jQuery 4.1」の正式版をリリースしました。4.x系はモダンブラウザ（現在主流のブラウザ）向けで、Internet Explorer 10以前のサポートはすでに終わっています。IE11のサポートは続きますが、次のjQuery 5.0で削除される見通しです。

4.1では、ページ内の要素を探すために内部で使っていた `getElementsByTagName` や `getElementsByClassName` などを、すべて `querySelectorAll`（CSSと同じ書き方で要素を探すブラウザ標準の機能）に置き換えました。一般にこちらの方が速いため、高速化が期待されます。

ほかにも次のような改良があります。

- **jqXHR.responseURL の追加**：通信でリダイレクト（転送）が起きた場合に、最終的にたどり着いたURLを取得できます。
- **uniqueSort() の高速化**：大量の要素から重複を取り除く処理が速くなりました。
- **AJAX Transportの拡張**：通信部分のコールバックAPIを広げ、今後の機能追加をしやすくしました。

## 3.x系は3.8で最後

同時に出た「jQuery 3.8」では、セレクタ処理のReDoS（正規表現を悪用してサーバーやブラウザを重くさせる攻撃）脆弱性の修正、古いIE/旧Edge関連の比較処理の見直し、4.0で入ったバグ修正の取り込みなどが行われました。

3.x系は古いブラウザを支えるための版として続いてきましたが、3.8が最後のバージョンです。今後は原則、重大なバグや脆弱性が見つかったときだけ修正版が出ます。開発は4.x系に一本化されるため、3.x系を使っているサイトは、4.x系への移行計画を立てておくとよさそうです。
