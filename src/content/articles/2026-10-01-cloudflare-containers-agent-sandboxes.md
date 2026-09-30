---
title: "Cloudflare Containersをエージェント向けに再設計、起動が約6倍高速に"
summary: "CloudflareがContainersをエージェント・サンドボックス向けに再アーキテクチャしました。実行時にイメージとインスタンス種別を選べ、起動中央値が約4秒から648ミリ秒へ短縮されたと独立ベンチマークで報告されています。"
points:
  - "durable_object スケジューリングで実行時にイメージ選択"
  - "ComputeSDK計測で中央値648ms（約6.2倍高速）"
  - "ファイルシステムスナップショットがパブリックベータ"
category: backend
sourceName: "Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/faster-agent-sandboxes/"
publishedAt: "2026-10-01T07:07:00+09:00"
---

## 何が変わったか

Cloudflare は 2026年9月30日、Containers をエージェントワークロード向けに再設計した内容を公開した。エージェントは事前配置ではなくタスクごとにサンドボックスを作るため、イメージとコンピュートを実行時に選べる `durable_object` スケジューリングポリシーを導入した。

ComputeSDK の独立ベンチマークでは、同時に100個起動したときの対話可能までの中央値が約4.049秒から648ミリ秒へ短縮（約6.2倍）とされている。ファイルシステムスナップショットもパブリックベータになり、作業状態の保存と再開が可能になる。

## 現場で見るところ

設定は Durable Object のコードから `ctx.container.start` にイメージとインスタンス種別を渡す形になる。ロールアウトもプラットフォーム側の段階配信ではなく、コードでカナリアやピン留めを書ける。`cloudflare/debian-trixie` のような用意済みシステムイメージも提供され、Dockerfile なしで Linux サンドボックスを起動できる。既存の Container クラスやレガシー Sandbox クラスは 2026年12月31日まで維持されるが、新機能は `ctx.container` ネイティブのみとのことなので、エージェント基盤を Cloudflare 上に載せるチームは移行計画を早めに立てたい。
