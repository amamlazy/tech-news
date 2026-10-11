---
title: "DenoチームがCloudflareに合流、Denoランタイムは1年後に開発終了・Deno Deployは6カ月で終了"
summary: "Deno開発チームの全員がCloudflareに合流し、独自のランタイムとホスティングの開発を共通基盤へ寄せると、DenoとCloudflareが10月9日に同時発表した。Deno Deployは6カ月後に停止し、Denoランタイムは1年間の保守のあとDeno社としての開発を終える。"
points:
  - "Denoランタイムは1年間、毎月バグ修正とセキュリティ更新を出し、その後Deno社としての開発は終了（OSSのまま残る）"
  - "Deno Deployは6カ月後に停止。有料顧客にはCloudflare Workersへの移行支援を提供"
  - "JSRは継続し、基盤はCloudflareへ移す。rusty_v8の支援も続け、workerdへの統合を目指す"
  - "celldとworkerdを統合し、スケールするDurable Objectsのセルフホストを実現するのが狙い"
category: backend
sourceName: "Cloudflare Blog / Deno Blog"
sourceUrl: "https://blog.cloudflare.com/deno-joins-cloudflare/"
publishedAt: "2026-10-12T07:35:00+09:00"
---

## 何が発表されたか

Cloudflareのブログと、Ryan Dahl氏によるDeno公式ブログが2026年10月9日に同時に出した発表です。Denoの開発チーム全員がCloudflareに加わり、Cloudflare Workersのランタイム「workerd」と、Denoチームが8月に公開したセルフホスト基盤「celld」を統合します。

Deno側の記事によると、今後の開発は別個のランタイムとホスティングではなく、共通のプラットフォームに注ぎます。現場に直結する取り決めは次のとおりです。

- Denoランタイムは今後1年間、毎月のリリースでバグ修正とセキュリティ更新を続けます。その後、Deno社としての開発は終了します。Denoはオープンソースのまま残り、引き継ぎたい人は歓迎するとしています。
- Deno Deployは6カ月間は稼働し、その後に終了します。有料顧客にはCloudflare Workersへの移行支援があります。
- JSRは稼働を続け、インフラはCloudflareへ移ります。
- rusty_v8のサポートは続け、workerdへの統合を目指します。

## Cloudflare側が語った狙い

Cloudflare側ではKenton Varda氏が、「Workersは他社と違う作りにしたのはロックインのためだ」という通説は誤りだと書いています。workerdは本番と同じコードのオープンソースで、「脱出口があること」が大企業に売る前提だったという説明です。

一方で、workerdのDurable Objects実装は単一インスタンス止まりで、ローカルテスト向けにとどまっていました。スケールするセルフホスト版を作るためにcelldを開発していたDenoチームと組む、という筋書きです。Dahl氏は、Durable Objectsがエージェントのハーネス向けに安価なサーバレス実行、永続状態、WebSocketを提供する点に期待を寄せています。

## 現場で見るところ

Denoを使っている場合、まずDeno Deployの利用有無を確認すると期限の読み違いを防げます。ランタイムを使うだけなら猶予は約1年ですが、その後の保守主体は決まっていません。移行先は、Workers／workerdへ寄せる、Node.jsなど別のランタイムへ戻す、コミュニティ版を見守る、のどれかになります。

Xでの日本語圏の反応は別記事にまとめています。
