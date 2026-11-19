---
title: "マイクロソフト、クラウドやオンプレミスのデータベースをまとめて管理する「Database Hub」を正式リリース　AIが障害を予測する機能も"
summary: "マイクロソフトは、Azureやオンプレミス、他社クラウドにあるデータベースを一覧にして一元管理できる「Database Hub in Fabric」を正式リリースしました。AIエージェントが障害の予兆や性能を見張り、修正案を出す「Database Agents」のプレビューも発表しています。"
points:
  - "Azure SQL、Azure Database for PostgreSQL、Cosmos DB、SQL Serverなどを横断して一覧・監視"
  - "CPU・メモリ・ストレージの傾向をほぼリアルタイムに追い、Entra認証や監査ログなど安全面も確認"
  - "Database AgentsはSQL ServerとPostgreSQLに対応。VS Code拡張からも使える"
category: backend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/database_hubai.html"
publishedAt: "2026-11-20T05:40:00+09:00"
---
Microsoft Fabricは、マイクロソフトが提供するデータ分析のための統合基盤です。今回の「Database Hub in Fabric」は、その上で、会社の中にたくさんあるデータベースの状態をひとつの画面（ダッシュボード）にまとめて見られるようにするサービスです。

## 何ができるか

Publickeyによると、マイクロソフトは年次イベント「Microsoft Ignite 2026」で、管理者が権限を持つデータベースを自動的に一覧表示し、一元管理できるDatabase Hub in Fabricの正式リリースを発表しました。対象はAzure SQL、Azure Database for PostgreSQL、Azure Cosmos DB、SQL Serverなどで、クラウド、オンプレミス（自社設置）、他社クラウドで動くものをまとめて管理できます。

監視対象のCPU、メモリ、ストレージの傾向をほぼリアルタイムで追え、Microsoft Entra（マイクロソフトのID管理サービス）による認証、監査ログ、顧客管理キーといったセキュリティの状態も確認できます。セキュリティや性能、最適化に関わる重要な変化の概要も自動で示してくれます。

## AIエージェントによる見張り役

あわせて、AIがデータベースの障害予測や性能監視をする「Database Agents」のプレビューも発表されました。SQL ServerとPostgreSQLに対応し、マイクロソフトが作ったスキル（作業の手順書）に基づいて継続的に監視し、問題になりそうな状況を見つけると、その重要性や影響を説明したうえで修正案や承認済みの操作を実行します。

これまでのデータベース運用は、障害や性能低下が起きてから気づいて対応するのが一般的でしたが、Database Agentsで先回りする運用に移れる、とPublickeyは解説しています。VS Code向けの拡張機能「Database agent in the Microsoft PostgreSQL extension for Visual Studio Code」も発表され、エディターから離れずにPostgreSQLの運用管理ができるようになります。
