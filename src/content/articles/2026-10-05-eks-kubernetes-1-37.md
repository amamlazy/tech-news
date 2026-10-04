---
title: "Amazon EKSがKubernetes 1.37に対応、Metrics APIがGAに"
summary: "Amazon EKSとEKS DistroでKubernetes 1.37が使えるようになりました。Metrics APIのGAや、HPAのゼロスケールが既定で有効になる点が主な変更です。"
points:
  - "metrics.k8s.io/v1としてMetrics APIが一般提供に"
  - "DRAのデバイスtaint/tolerationもGAで、GPUの除外がしやすく"
  - "HPAのscale-to-zeroがベータになり既定で有効"
category: backend
sourceName: "AWS What's New"
sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-eks-distro-kubernetes-version-1-37"
publishedAt: "2026-10-05T07:30:00+09:00"
---

## 何が変わったか

AWS は2026年10月2日、Amazon EKS と Amazon EKS Distro で Kubernetes 1.37 をサポートしたと発表した。新規クラスターを 1.37 で作成できるほか、既存クラスターもコンソール、eksctl、IaC ツールでアップグレードできる。GovCloud（US）を含む EKS の全リージョンが対象。

## Kubernetes 1.37 の主なポイント

- **Metrics API の GA**: Pod とノードの CPU・メモリ使用量を返す API が `metrics.k8s.io/v1` として正式版になった。HPA や `kubectl top` が使う。
- **DRA のデバイス taint と toleration の GA**: Dynamic Resource Allocation のドライバーや管理者が、GPU などのデバイスに taint を付け、許容しない Pod をスケジューラーに避けさせられる。
- **HPA のゼロスケール**: ベータに上がり、既定で有効になった。オブジェクトメトリクスや外部メトリクスを使う HPA で `minReplicas: 0` を設定すると、アイドル時に Pod を0まで減らし、需要が戻れば再び増やせる。

## 現場で見るところ

アップグレード前には EKS の cluster insights で、非推奨 API の利用などの問題がないか確認しておきたい。キューやイベント駆動で動くワーカーなど、夜間や週末にほぼ止まるワークロードは HPA のゼロスケールでコストを下げられるか検討する価値がある。
