---
title: "Cloudflare、AIエージェント専用の軽量ブラウザ「Kitesurf」をオープンソース化　Chromiumより3〜7倍効率的"
summary: "Cloudflareは、AIエージェントがWebページを読み込んで操作するための軽量なヘッドレスブラウザ「Kitesurf」を、Apache 2.0ライセンスのオープンソースとして公開しました。Rustで書かれWebAssemblyで動き、手元のPCや自分のCloudflareアカウントで動かせます。"
points:
  - "タブ、ブックマーク、拡張機能など人間向けの機能を省き、Cloudflare Workers上で動くよう設計"
  - "Chrome DevTools Protocol（CDP）に対応し、Puppeteerなどからそのまま操作できる"
  - "自分のアカウントに置くにはWorkersの有料プランが必要。開発中で互換性を改善中"
category: frontend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/cloudflareaikitesurf.html"
publishedAt: "2026-11-16T07:00:00+09:00"
---
Kitesurf（カイトサーフ）は、Cloudflareが作っている「AIエージェントのためのWebブラウザ」です。ヘッドレスブラウザとは、画面を表示せずにプログラムから操作するブラウザのことで、AIが情報を集めたりWebアプリを操作したりするときに使われます。

## AI専用にすると何が違うのか

Publickeyによると、AIエージェントが使うブラウザには、タブやブックマーク、テーマ、拡張機能、同期、なめらかなスクロールといった人間向けの機能はいりません。その代わり、たくさんのエージェントが同時に動けるよう、軽くて速いことが求められます。

Cloudflareによれば、Chromium（Google Chromeのもとになっているブラウザ）と比べて、KitesurfはCPUとメモリの効率が3〜7倍ほど良いといいます。Kitesurfは8月に発表され、今回、約束していたオープンソース化が実現しました。

## 中身の仕組み

KitesurfはChromiumもNode.jsも使わず、主にRustで書かれ、WebAssembly（ブラウザやサーバーで速く動く共通の実行形式）にコンパイルして動きます。Cloudflareのブログによると、次のオープンソース部品を組み合わせています。

- **Blitz**：HTMLの解析、DOM、レイアウトと描画
- **Stylo**：CSSの解析とスタイル計算
- **Boa**：JavaScriptの実行（ほかの方法で動かせないときの最後の手段）
- **Linebender**：文字のレイアウトと2Dグラフィックス
- **Krilla**：PDFの出力

Chrome DevTools Protocol（CDP、ブラウザを外から操作するための共通の約束事）に対応しているので、Puppeteerなどのツールからつなげます。

## 試し方

ブログでは、リポジトリを取得して次のように起動する手順を紹介しています。

```bash
git clone https://github.com/cloudflare/kitesurf.git
cd kitesurf
pnpm install --frozen-lockfile
pnpm run dev
```

初回はRustのコア部分のビルドに時間がかかります。起動すると `http://127.0.0.1:8787` で開発用サーバーが立ち上がり、Puppeteerからは `ws://127.0.0.1:8787/devtools/browser` に接続して使えます。ブラウザで試せるプレイグラウンドも公開されています。

自分のCloudflareアカウントに置く場合は `pnpm run deploy` で配備できますが、ページごとに隔離した実行環境を作る仕組み（Dynamic Workers）を使うため、Workersの有料プランが必要です。Cloudflareは、まだ開発が活発に進んでいる段階で、互換性や安定性の改善に力を入れているとしています。
