---
title: "AWS、Agent ToolkitにSageMaker向けAI/MLスキルを追加　コーディングエージェントから学習・最適化・デプロイ"
summary: "AWSは10月13日、Agent Toolkit for AWSの中核スキルとしてAWS AI/MLスキルを公開した。自然言語の一連の流れでSageMaker上のモデル選定から学習、最適化、デプロイまでを進められる。"
points:
  - "Agent Toolkitが公式の統合点となり、従来のAWS Labsスキル／プラグインを置き換える"
  - "推論最適化、ファインチューニング一式、serverful学習、MLflow、JumpStart、Processing Jobsに対応"
  - "SageMaker Studio JupyterLabにはKiro等向けにプリインストール"
  - "スキル自体は追加料金なし。使うAWSリソース分のみ課金"
category: ai
sourceName: "AWS What's New"
sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2026/10/bring-sagemaker-ai-expertise-to-your-coding-agent/"
publishedAt: "2026-10-14T07:50:00+09:00"
---

## 何が変わったか

AWSは2026年10月13日、コーディングエージェント向けのAgent Toolkit for AWSに「AWS AI/MLスキル」を中核スキルとして追加したと発表しました。EC2やBedrockなど他のAWSスキルと並べて使い、SageMaker AI上でのモデル選定・学習・最適化・デプロイを、残りのAWS環境操作と同じ自然言語ワークフローで進められるとしています。

Agent Toolkitは、これまでのAWS Labs系スキル／プラグインに代わる公式の統合点として位置づけられ、インストールと更新の経路を一本化しています。SageMaker StudioのJupyterLabには、Kiroや任意のコーディングエージェント向けにプリインストールされています。

## 対応範囲

今回、SageMaker側でスキルが扱う領域も広げられています。

- デプロイ済みモデルのレイテンシ・スループット・コスト向け推論最適化
- ユースケース定義から学習・評価・デプロイまでのカスタマイズ（ファインチューニング）
- 従来型MLと生成AI向けのserverful学習
- MLflowによる実験追跡とモデルライフサイクル
- JumpStartモデルのデプロイと推奨
- マネージド計算上のデータ準備／ETL（Processing Jobs）

スキル自体に追加料金はなく、エージェントが起動するAWSリソース分だけが課金されます。利用開始はGitHub上のAgent Toolkitからインストールするか、Studio JupyterLabのプリインストールを使う形です。
