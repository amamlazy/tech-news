---
title: "SELECTしかしていないのにマイグレーションがロック待ちで失敗　PostgreSQLの原因と対策"
summary: "Aurora PostgreSQLで、放置されたSELECTだけのトランザクションがリリース時のマイグレーションを止めた事例を、Zennの実践記事が原因調査の過程とともに解説しています。SELECTもテーブルロックを取ることと、idle in transactionへの備えがポイントです。"
points:
  - "SELECTが取るACCESS SHAREは、REINDEXなどが要求するACCESS EXCLUSIVEと競合する"
  - "外部APIの応答をトランザクション内で待つと、idle in transactionのまま残る"
  - "保険としてidle_in_transaction_session_timeoutを3分に設定（既定は24時間）"
category: backend
sourceName: "Zenn"
sourceUrl: "https://zenn.dev/naokisuzuki27/articles/cb1a5ac0e23763"
publishedAt: "2026-11-10T07:35:00+09:00"
---
マイグレーションは、データベースの表やインデックス（検索を速くする索引）の構造を、アプリの更新に合わせて変更する作業です。この記事は、インフラエンジニアのNaoki氏（naokisuzuki27）が、Amazon Aurora PostgreSQL 16で実際に起きた障害の調査と対処をまとめたZennのハンズオン記事です（2026年11月8日）。

## 起きたこと

普段はエラーも遅延もなく動いていたサービスで、リリース時にメンテナンスモードにしてマイグレーションを流すと、ロック待ちで進まず失敗しました。筆者は「Google CloudのDatastreamへの同期接続が原因では」「REINDEXに`CONCURRENTLY`を付け忘れたせいでは」と仮説を立てて検証しましたが、どちらも根本原因ではありませんでした。

## 本当の原因：idle in transaction

原因は、会話機能の処理でした。1回のリクエストで「履歴をSELECT→外部APIを呼ぶ→応答を保存してコミット」を1つのトランザクションで行っていたため、外部APIを待つ間や失敗したとき、何もしていないのにトランザクションだけ開いた「idle in transaction」状態のセッションが残っていました。`pg_stat_activity`で調べると、SELECTを1本実行したまま4分半以上放置されたセッションが見つかり、Performance Insightsでは最大約3,000秒のものもあったといいます。

## なぜリリースのときだけ失敗するのか

PostgreSQLのロックは「共有」「排他」の2種類ではありません。普通のSELECTも、表の定義を途中で変えられないよう「ACCESS SHARE」というテーブルロックを取り、これはトランザクションが終わるまで解放されません。ACCESS SHAREと競合するのは、`CONCURRENTLY`なしのREINDEXやALTER TABLEなどが要求する「ACCESS EXCLUSIVE」だけなので、普段は誰も待たされず気づけませんでした。さらにロック要求は順番待ちで追い越せないため、ACCESS EXCLUSIVEを待つ操作が1つあると、その後ろのSELECTまで全部詰まると筆者は説明しています。トラフィックの少ないSTG環境で再現しなかったのも、この状態のセッションがほぼ発生しないからでした。

## 対策

- 根本対処：読み取りが終わったらトランザクションを閉じ、外部APIの応答はトランザクションの外で待つ。保存は別トランザクションに
- 根本対処：例外時に必ずロールバックする
- 保険：`idle_in_transaction_session_timeout`を設定（Auroraのパラメータグループで3分に。既定は24時間）
- 被害抑制：REINDEXなどには`CONCURRENTLY`を付ける

筆者は、AIに聞けば答えが返ってくる時代だからこそ、こうした基礎を自分で理解しているかが障害対応の速さに効くと締めくくっています。
