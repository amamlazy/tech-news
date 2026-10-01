---
title: "Chrome DevTools 10月まとめ、エージェント向け制御とソフトナビ計測"
summary: "Chrome 153/154向けDevTools更新の月次まとめが出ました。MCP向けJS実行制御、広告メトリクス、ソフトナビゲーションのフル対応などが入りました。"
points:
  - "chrome-devtools-mcpにヒープ照会やJS無効化オプション"
  - "PerformanceでソフトナビのInsightsまで貫通"
  - "Device ModeにiPhone 16やPixel 9/10などを追加"
category: frontend
sourceName: "Chrome for Developers"
sourceUrl: "https://developer.chrome.com/blog/new-in-devtools-october-2026"
publishedAt: "2026-10-02T07:45:00+09:00"
---

## 何が変わったか

Chrome for Developers は 2026年9月22日公開の記事で、Chrome 153/154 の DevTools 変更を月次でまとめた。コーディングエージェント向け chrome-devtools-mcp には、JS評価の無効化、オンデマンドソースマップ、ヒープスナップショット照会、PWA自動化などが加わった。

Application に広告スクリプト追跡、Performance でソフトナビゲーションを Insights までフル対応、CPU性能ティアのCDPオーバーライド、Elements の inactive styles、Device Mode のフォームファクタ別プリセット更新なども含まれる。

## 現場で見るところ

SPAのソフトナビ計測を Performance だけで完結させたい場合や、エージェントにページを安全に触らせたい場合に効く。Chromeのリリースが月2回になったため、DevToolsの「What's new」も月次要約へ切り替わっている点も運用上の変化だ。
