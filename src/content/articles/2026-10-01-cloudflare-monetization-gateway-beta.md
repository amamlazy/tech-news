---
title: "Cloudflare Monetization Gatewayがクローズドベータ、HTTP 402でエージェント課金"
summary: "CloudflareがMonetization Gatewayのクローズドベータを開始しました。HTTP 402 Payment RequiredでサイトやAPI、MCPツールへのアクセスをエージェント単位の従量課金にでき、AI Gatewayや検索APIなどの利用例が紹介されています。"
points:
  - "HTTP 402でインラインに支払い要求、チェックアウト画面なし"
  - "決済はBase上のUSDC、x402 Facilitator経由で検証・精算"
  - "Ceramic.aiやStocktwits、API2PDFなどが本番利用中と紹介"
category: backend
sourceName: "Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/monetization-gateway-beta/"
publishedAt: "2026-10-01T07:23:00+09:00"
---

## 何が変わったか

Cloudflare は 2026年9月30日、Monetization Gateway をクローズドベータとして提供開始した。ドメイン所有者はダッシュボードから、ウェブサイト・API・MCPツール・データセットへのアクセスをエージェント向け従量課金にできる。

仕組みの中心は HTTP 402 Payment Required で、リダイレクト型チェックアウトではなくリクエストと同じ HTTP フローで支払い指示と認可をやり取りする。価格ルールは URL・ヘッダ・クエリなどにマッチさせられ、検証と精算は Coinbase の x402 Facilitator、決済は Base ブロックチェーン上の USDC と説明されている。

## 現場で見るところ

エージェントがサブスク前提の API キー取得を避け、必要回数だけ払うモデルへの移行を狙った機能だ。AI Gateway ではヘッダ `PAYMENT-METHOD: x402` で推論を都度払いできる例、Ceramic.ai の検索、Stocktwits のセンチメント、API2PDF の PDF 生成などが紹介されている。クローズドベータのため利用には申請が必要で、規制・会計・ウォレット運用の準備も合わせて検討したい。
