---
title: "CloudflareがAI Gateway経由のWeb Search APIを発表、Exaなど3社と提携"
summary: "Cloudflareが、AIエージェントにWeb検索結果を渡せるWeb Search APIをAI Gateway経由で提供すると発表しました。提携する検索事業者には、Cloudflareのクローラー基準の順守を求めています。"
points:
  - "初期パートナーはCeramic.ai、Exa、Linkup"
  - "検索結果には取得元コンテンツへのリンクを含めることが条件"
  - "AI Gatewayの観測性、統合請求、アクセス制御と一緒に使える"
category: ai
sourceName: "The Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/introducing-web-search-api/"
publishedAt: "2026-10-05T07:25:00+09:00"
---

## 何が発表されたか

Cloudflare は、AI Gateway を入口とする Web Search API を発表した。エージェントが最新の情報を必要としたとき、URL を推測して取得するのではなく、検索から始めて関連する情報を見つけ、その結果をコンテキストに入れられるようにする。最初の提携先は Ceramic.ai、Exa、Linkup の3社。

Cloudflare は、エージェントが URL を当て推量して fetch し、404 になるケースが多いと説明している。検索 API を推論パイプラインに組み込めば、学習データの締め切り後に出た API 変更やニュースも扱いやすくなる。

## クローラー基準

提携する検索事業者は、Cloudflare の「Verified bots」の要件を満たすクローラーを使い、robots.txt を守ることを約束している。検索結果には取得元のコンテンツへのリンクを含める必要がある。サイト運営者が自分のコンテンツの使われ方を把握し、制御できるようにする狙いだ。

## 現場で見るところ

すでに AI Gateway でモデル呼び出しを管理しているなら、検索も同じ場所でログ、請求、権限を管理できるのが利点になる。検索結果に出典リンクが付く前提なので、回答に引用元を表示するエージェントも作りやすい。
