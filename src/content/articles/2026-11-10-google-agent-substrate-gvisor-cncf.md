---
title: "Google、AIエージェント基盤「Agent Substrate」とgVisorをCNCFに寄贈　Kubernetesで10倍の高密度に"
summary: "Googleが、Kubernetes上でAIエージェントを効率よく動かすオープンソース「Agent Substrate」と、安全な実行環境「gVisor」をCNCFに寄贈しました。待ち時間の多いエージェントを止めて保存し、すぐ復帰させる仕組みで、従来の10倍の密度で動かせるとしています。"
points:
  - "エージェントは処理時間の90〜95%を、モデルの応答や人の承認を待って過ごしている"
  - "待機中のエージェントはスナップショットとして保存し、復帰時に高速に読み戻す"
  - "特定企業に縛られない中立な基盤にする狙い。GKEでは正式サービスとして提供開始"
category: backend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/googlekubernetes10aiagent_sustrategvisorcncf.html"
publishedAt: "2026-11-10T09:25:00+09:00"
---
Kubernetes（クバネティス）は、たくさんのコンテナ（アプリを動かす小さな箱）をまとめて管理する、事実上の標準ソフトです。そのKubernetes上でAIエージェントを効率よく動かすためにGoogleが作ったのが「Agent Substrate」で、今回CNCF（Linux Foundation傘下の、クラウド向けオープンソースを管理する団体）に寄贈されました。

## なぜ必要なのか

Publickeyによると、GoogleはAIエージェントの実行時間の90〜95%が、AIモデルの推論結果、外部APIの応答、人間のレビューや承認の「待ち時間」だと説明しています。1つのPodに1つのエージェントを置くと、待っている間も計算資源を抱えたままになり非効率です。かといってサーバーレスのように止めてしまうと、再開時に起動を待たされる「コールドスタート」で対話の体験が損なわれます。

## Agent Substrateの仕組み

Agent Substrateは、エージェントのセッションや作業状態、メモリを持つ「アクター」を、ワーカープール内の空き枠（スロット）に割り当てます。アイドルになったアクターはすぐにスナップショット（その瞬間の状態の保存）として高速な階層ストレージに保存され、復帰時には素早く読み戻されるため、コールドスタートの待ちがほぼありません。これにより従来の10倍の密度でエージェントを動かせるとしています。エージェントがコードを実行する場所には、通常のコンテナより安全な「gVisor」を使います。

## 寄贈の狙い

Googleは、各社がばらばらにエージェント基盤を作るのを避け、どのKubernetesでも使える中立な基盤にするためだと説明しています。一方でGoogle CloudはGKE（GoogleのKubernetesサービス）でAgent Substrateを正式提供しており、Publickeyは業界標準になれば自社サービスの利用促進にもつながるとの見方を示しています。
