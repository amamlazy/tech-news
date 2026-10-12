---
title: "QGIS、LLM・AI・エージェントによるコード貢献を禁止する方針を正式採択"
summary: "オープンソースGISのQGISは、Enhancement Proposalをマージし、AIツール方針を厳格化した。qgis/qgisリポジトリへのLLM・AI・エージェント支援のコード貢献を認めず、後から判明した場合は差し戻しと貢献者権限の制裁対象になると明記した。"
points:
  - "従来の「人間がループに入っていればよい」方針から、「NOT ALLOWED」へ切り替えた"
  - "対象はqgis/qgisリポジトリ。AI・LLM・エージェント系のワークフローで作った貢献が後から分かると、コードの差し戻しと貢献者権限への制裁がある"
  - "メンテナーのレビュー負荷と、人間の貢献ネットワークを守ることが理由として挙げられた"
  - "QEPは2026年10月7日にマージ。HNでは10月12日にフロントページで議論された"
category: career
sourceName: "QGIS Enhancement Proposals"
sourceUrl: "https://github.com/qgis/QGIS-Enhancement-Proposals/pull/387"
publishedAt: "2026-10-13T07:25:00+09:00"
---

## 何が決まったか

QGISプロジェクトは、AIツール利用方針（QEP 408）を版2.0に更新し、次の一文に短縮しました。

> No LLM, AI or agent assisted code contributions are allowed in the https://github.com/qgis/qgis repository.  
> If we subsequently discover that you have used an AI, LLM, or any agent-based workflow for your contribution, you will be subject to code reversion and contributor rights sanctioning.

これまで「好きなツールを使ってよいが、人間がループに入り、内容を理解してレビューできること」としていた方針を、明示的な禁止に切り替えた形です。変更をまとめたPull Request #387は2026年10月7日にマージされ、10月12日にはHacker Newsのフロントページでも議論になりました（取得時点で約350ポイント）。

## なぜ厳しい方針か

PR上の議論では、次のような理由が挙がっています。

- 外部からのAI由来の貢献が、すでに重いメンテナーの肩にのしかかっている
- 人間が本気でレビューできる量を超えると、未レビューの山か、品質の低下のどちらかになる
- フリーソフトのコミュニティは人のネットワークで成り立っており、組織が信頼して貢献を戻したり、支援や教育を依頼したりできる余地を守りたい

AI支援でバグ調査PRを出した寄稿者からも、「レビュワーとの信頼契約を壊していた」「スキルが身につかない」という反省のコメントが出ています。

## 現場で見るところ

対象は`qgis/qgis`リポジトリです。レビューや監査にLLMを使う話は別スレッドで扱う、という整理もあります。他のOSSでも「人間が責任を持つ」方針は増えていますが、QGISは「後から分かれば差し戻しと制裁」まで書き切った点が強いです。コントリビュートする側は、方針文書を読んでから手を動かす必要があります。
