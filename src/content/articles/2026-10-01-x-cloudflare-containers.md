---
title: "Xで話題：Cloudflare Containersが6倍高速起動と公式投稿"
summary: "Cloudflare公式アカウントが、Containersの起動が6倍速くなり、エージェントが実行時にサンドボックスのイメージとインスタンス種別を選べると投稿しています。ファイルシステムスナップショットもパブリックベータだと述べています。"
points:
  - "Cloudflare公式がBirthday Week投稿としてContainers更新を告知"
  - "起動6倍高速、ランタイムでのイメージ選択、スナップショットを列挙"
  - "Durable Objectから制御する、と説明している"
category: x-trend
sourceName: "X"
sourceUrl: "https://x.com/Cloudflare/status/2105289092741132421"
publishedAt: "2026-10-01T07:29:00+09:00"
---

## 何が話題か

Cloudflare（@Cloudflare）は 2026年9月30日、「Cloudflare Containers now start 6x faster, let your agent choose each sandbox's image and instance type at runtime, and support filesystem snapshots in public beta, all controlled from a Durable Object」と投稿している。

エージェントがタスクごとに Linux サンドボックスを立てる用途を意識した更新として、X上でも開発者向けに共有されている。詳細は同日公開のブログ記事「faster-agent-sandboxes」にリンクされている。

## エンジニア視点のメモ

数値（6倍やスナップショット）は公式投稿・ブログに基づく主張であり、実測はワークロード次第だ。Cursor Cloud Agents や OpenAI Agents API などとの連携言及もあるため、すでに Cloudflare 上でエージェント実行環境を組んでいるチームは、新スケジューリングポリシーへの移行可否を確認したい。
