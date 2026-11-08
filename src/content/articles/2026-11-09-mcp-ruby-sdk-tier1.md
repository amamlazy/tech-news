---
title: "MCP公式Ruby SDKが「Tier 1」に到達　仕様の全機能をRubyから利用可能に"
summary: "AIとツールをつなぐ共通規格MCPの公式Ruby SDKが、仕様を完全にサポートした「Tier 1」に到達しました。RubyはTypeScript、Python、C#、Go、Rustに続く6番目のTier 1言語です。"
points:
  - "ステートレスな接続など最新機能を含め、サーバとクライアントの全実装が適合"
  - "7月の1.0時点ではTier 2、今回で全機能サポートの格付けに"
  - "2027年3月下旬を目標とする次期MCP仕様のサポートも約束"
category: backend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/mcpmcpruby_sdkmcp_sdk_tier_1.html"
publishedAt: "2026-11-09T07:40:00+09:00"
---
MCP（Model Context Protocol）は、AIアシスタントが外部のツールやデータにつながるための共通ルールです。そのMCPをRubyから使うための公式ライブラリ（SDK）が、最上位の格付けを得ました。

## 何が発表されたか

Publickey（2026年11月9日付）によると、Linux Foundation傘下でMCPの仕様策定を担う「Agentic AI Foundation（AAIF）」が、公式Ruby SDKが「MCP SDK Tier 1」に到達したと明らかにしました。MCPの最新機能であるステートレスな接続（サーバ側で接続ごとの状態を持たない方式）を含め、全機能をRubyから使えるようになります。

## Tierの意味

MCP SDKは3段階に分かれています。

- **Tier 1**：すべてのプロトコル実装を完全にサポート
- **Tier 2**：全実装を目指して積極的にメンテナンス中
- **Tier 3**：実験的・部分的な実装や特別版

Ruby SDKは2026年7月に1.0に到達した時点ではTier 2でした。今回はサーバとクライアントの全実装が適合し、ドキュメント上で非推奨のため明示的に除外された2項目以外はすべて適合しています。

## 現場で見るところ

Rails などRubyで動く既存サービスに、AIエージェント向けの窓口（MCPサーバ）を本番品質で足しやすくなります。Ruby SDKチームは、2027年3月下旬を目標とする次期MCP仕様への対応も約束しています。
