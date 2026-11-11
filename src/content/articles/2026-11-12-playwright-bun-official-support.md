---
title: "Playwright v1.65.0がBunを正式サポート、テストランナーをBunで動かせるように"
summary: "Webアプリのテスト自動化ツール「Playwright」が、最新のv1.65.0でテストランナーをBun上で動かすことを正式にサポートしました。BunがTypeScriptを直接変換するのでBabelが要らなくなる一方、Watch Modeがないなどの制限もあります。"
points:
  - "これまでテストランナーはNode.js専用だったが、v1.65.0からBunでも正式に動く"
  - "TypeScriptの変換をBunに任せるため、Babelやコンパイル用キャッシュが不要になり構成がシンプルに"
  - "Watch Modeがない、--tsconfigが効かないなど、Node.jsとの非互換点に注意"
category: frontend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/playwrightbun.html"
publishedAt: "2026-11-12T07:00:00+09:00"
---
Playwright（プレイライト）は、Microsoftが開発しているWebアプリのテスト用ツールで、ブラウザを自動で操作して「ボタンを押したら正しい画面が出るか」などを確かめられます。Bun（バン）は、Node.jsと同じようにJavaScriptをパソコンやサーバーで動かすための実行環境で、速さを売りにしています。

## 何が変わったか

Publickeyによると、Playwrightは最新のv1.65.0で、テストランナー（テストをまとめて実行する仕組み）をBun上で動かすことを正式にサポートしました。これまでテストランナーはNode.jsで動かす前提でした。

GitHubのリリースノートでは「テストランナーがBunの下で動くようになった。BunがTypeScriptのテストファイルを自分でトランスパイル（別の形式のコードへ変換）するので、PlaywrightはBabelやコンパイルキャッシュを使わない」と説明されています。Babelは、新しい書き方のJavaScriptやTypeScriptを変換するための定番ツールです。変換をBunに任せられるため、仕組みがシンプルになるのが利点です。

## 注意したい制限

一方で、Node.jsで動かす場合と比べて次のような非互換があると記事は指摘しています。

- Watch Mode（ファイルを保存するたびに自動でテストを再実行する機能）がない
- UI Modeでファイルを変更しても自動で再実行されない
- `--only-changed` の挙動に制限がある
- `--tsconfig` オプションが効かない

## 背景

Bunは2026年8月のBun 1.4でNode.jsとの互換性を高め、Playwrightが動くようになったと発表していました。ただしそれはBun側の対応で、Playwrightとしては非公式の状態でした。今回Playwright側が正式サポートを打ち出したことで、BunをメインにしているプロジェクトでもPlaywrightを安心して使えるようになった、とPublickeyはまとめています。
