---
title: "【実践レポート】スタックトレースを読むとヒープが約1,470MB増えていた"
summary: "Dress Codeのかわうそ氏が、Node.js製APIサーバーでエラー表示の補助ライブラリが巨大なsource mapを読み込み、メモリを約1,470MB消費していた問題を調べて対策した実践記録です。"
points:
  - "source-map-supportが174MBの.mapを展開、最初の.stack参照でヒープ急増"
  - "登録をopt-in化し.mapをイメージから除外、ヒープ2,270MB→683MB"
  - "minify＋keepNamesは維持し、同一ビルドの.mapを保管して障害時に逆引き"
category: backend
sourceName: "Zenn（Dress Code）"
sourceUrl: "https://zenn.dev/dress_code/articles/f2a51226c9ec6f"
publishedAt: "2026-10-27T08:00:00+09:00"
---

source map（ソースマップ）は、圧縮・変換後のJavaScriptと、元のTypeScriptのどの行が対応するかを記録したファイルです。エラー時に元のコードの行番号を表示するのに使います。

## この記事はかわうそ氏（Dress Code）による実践レポートです

NestJS製のAPIサーバーで、RSSが3.2〜8.4GB、GC後でもヒープが約2.2GB残る原因を段階的に計測して突き止めました。

## 原因

`process.memoryUsage()`と`v8.getHeapSpaceStatistics()`で起動の各段階を記録すると、`app.init()`後の801MBが、最初のスタックトレース読み取り後に2,271MBへ跳ね上がっていました。esbuildが出力した174MBの`.map`を`source-map-support`がJSONパースし展開していたためです。ロガー（pino）がエラーを出す際に`.stack`を参照するだけで発生します。

## 対策

- `.map`をイメージから外すだけでは不十分（登録を残すと1,211MB、登録なしで954MB）。
- 登録を`ENABLE_SOURCE_MAP_SUPPORT=true`のときだけのopt-inにし、エントリーポイントの最初のimportで判定。
- マルチステージビルドで、ランタイムにコピーする前に`.map`を削除。

## 結果と注意点

ローカル比較でヒープ2,270MB→683MB、RSS 3,503MB→1,685MB、起動11.4秒→5.7秒。ただしPrismaClientの重複削減など他の改善も含みます。ログから元の行番号が消えるため、同じビルドの`.map`をGitHub Actionsのartifactに保管して逆引きする方針です。
