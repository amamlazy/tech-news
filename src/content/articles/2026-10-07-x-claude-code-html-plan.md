---
title: "Claude Codeの実装計画をHTMLで対話的に詰めるスキル「html-plan」が話題に"
summary: "Claude Codeが作るHTMLを見やすくし、実装計画の質疑応答をHTML上で進められるスキル「html-plan」を紹介する投稿が、Xでブックマークを集めています。コミュニティのプラグインマーケットプレイスから2行のコマンドで入れられると紹介されています。"
points:
  - "「/html-plan <指示>」で、実装計画の質疑応答をHTMLで行える"
  - "anthropics/claude-plugins-communityのマーケットプレイスから導入する"
  - "投稿はいいねよりブックマークが多く、あとで試したい人が多い様子"
category: x-trend
sourceName: "X"
sourceUrl: "https://x.com/oikon48/status/2107237926883172409"
publishedAt: "2026-10-07T08:20:00+09:00"
---

## 何が話題か

@oikon48 氏が、Claude Code が生成する HTML を改善するスキル「html-plan」を紹介した。`/html-plan <指示>` と打つと、実装計画についての質疑応答を HTML で進められるという。投稿には230件以上のいいねに対して330件以上のブックマークが付いていて、あとで試そうと保存した人が多いことがうかがえる。

## 入れ方

投稿で紹介されている手順は次の2行だ。

```bash
claude plugin marketplace add anthropics/claude-plugins-community
claude plugin install html-plan@claude-community
```

## 現場で見るところ

長い実装計画をターミナルの文字だけで読むのはつらく、選択肢を比べながら決めたい場面では見た目の整った HTML のほうが判断しやすい。コミュニティのプラグインなので、導入前に中身を確認してから使いたい。
