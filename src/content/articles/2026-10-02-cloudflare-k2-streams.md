---
title: "Cloudflare K2がパブリックベータ、R2上のサーバレスイベントストリーム"
summary: "CloudflareがK2をパブリックベータ公開しました。R2上の順序付きログとしてイベントを保持し、複数コンシューマへのファンアウトや長期保持に向くサーバレスストリームです。"
points:
  - "Kafka的な耐久バッファをエッジ向けに再設計"
  - "HTTPとWorkerバインディングでプロデュース可能"
  - "Workers Paid向け、ベータ中は課金なし"
category: backend
sourceName: "Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/cloudflare-k2-streams/"
publishedAt: "2026-10-02T07:20:00+09:00"
---

## 何が変わったか

Cloudflare は 2026年10月1日、サーバレスイベントストリーム Cloudflare K2 をパブリックベータ公開した。イベントを順序付きログとして保存し、コンシューマが独立したペースで読める。高スループットのデータ移動、長期保持、複数購読者へのファンアウトが主用途だ。

内部ではR2上にパーティション付き耐久ログを構築する。Basin Pipelinesの取り込み層としても使われ、受理後はドロップしない設計が前提にある。初期はp99プロデュース遅延が約1秒程度とされ、キュー（個別ジョブ）やPipelines（最終的にオブジェクト／Icebergへ書く場合）との使い分けが案内されている。

## 現場で見るところ

`cf k2 streams create` などでストリームを作り、HTTPまたはWorkerバインディングで送信、サブスクリプションでバッチ消費（ack/nack/lease延長）する。Workers Paidで最大10GB保存・ストリームあたり30MB/sなど制限あり、ベータ中は課金されない。Kafkaクライアント互換はロードマップ上だ。
