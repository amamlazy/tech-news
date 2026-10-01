---
title: "Google CloudがSpanner Omni正式版、ローカルでも動く分散マルチモデルDB"
summary: "Google CloudがCloud Spannerのソフトウェア版Spanner Omniを正式リリースしました。Linux/macOSや他クラウドVMにも入れられ、ベクトル検索などマルチモデルにも対応します。"
points:
  - "RHEL9・Ubuntu22・Apple Silicon macOSに対応"
  - "リレーショナルに加えグラフ・KV・ベクトル・全文"
  - "無料Developer Editionと有料Commercial Edition"
category: backend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/google_clouddbspanner_omni.html"
publishedAt: "2026-10-02T07:35:00+09:00"
---

## 何が変わったか

Google Cloud は Spanner Omni の正式版を発表した（Publickey 2026年10月2日報道）。マネージドの Cloud Spanner をソフトウェア化し、Linux（RHEL 9、Ubuntu 22）や macOS（M1〜M3）、AWS含むVM／Kubernetes Pod にも導入できる。

Paxosや自動シャーディング、同期レプリケーションを引き継ぎつつ、ColossusやTrueTimeに相当する実装を自前コンポーネントで置き換えている。単一サーバから数千台規模まで拡張でき、単一リージョンでペタバイト級・数百万QPS規模のベンチマークが示されたという。リレーショナルに加えグラフ、KV、ベクトル、テキスト検索などマルチモデルに対応する。

## 現場で見るところ

ベクトル埋め込みの保存とkNN/ANN、SQLフィルタの組み合わせ、MCP Toolbox for Databases 経由のAI接続がAIバックエンド用途として挙げられている。非商用向け無料の Developer Edition（条件付きで90日超も可）と、本番向け Commercial Edition（vCPU年額）がある。ローカル検証やハイブリッド配置を試したいチーム向けだ。
