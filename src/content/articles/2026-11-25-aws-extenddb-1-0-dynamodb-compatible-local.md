---
title: "AWS、DynamoDB互換DBを手元のPCで動かせるOSS「ExtendDB」がバージョン1.0に"
summary: "AWSのクラウド用データベース「Amazon DynamoDB」と同じ使い方ができるデータベースを、自分のPCやオンプレミスで構築できるオープンソース「ExtendDB」がバージョン1.0に到達しました。中身のエンジンにはPostgreSQLなどを使います。"
points:
  - "DynamoDBと同じSDK・同じコードでアクセスでき、同じ結果を返す設計"
  - "データの保存先はPostgreSQL・SQLite・Cassandra・MongoDBから選べるプラグイン方式"
  - "Windows/macOS/Linux向けnpmパッケージとコンテナイメージで提供"
category: backend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/awsdynamodbextenddb10.html"
publishedAt: "2026-11-25T06:45:00+09:00"
---
Amazon DynamoDB（ダイナモDB）は、AWSがクラウドで提供している「NoSQL」型のデータベースです。NoSQLとは、表計算のような決まった形の表ではなく、キーと値の組やJSONに近い形でデータを保存するタイプのデータベースのことです。

## 何が発表されたか

Publickeyによると、AWSはDynamoDBと互換性のあるデータベースを、Windows・Linux・macOSなどユーザーの手元のマシン上で構築できるオープンソース「ExtendDB」が、バージョン1.0に到達したと発表しました。

ExtendDBが受け持つのは、アプリから見える「入り口（フロントエンド）」の部分です。実際にデータを保存するエンジンには、PostgreSQL、SQLite、Cassandra、MongoDBのいずれかをプラグインとして使います。基準となる構成はPostgreSQLです。

## 同じSDK・同じコードで使える

ExtendDBはDynamoDBと基本的に同じ機能を持ち、アプリからは同じSDK（開発用の部品集）でアクセスでき、同じ操作に同じ結果を返すように作られています。ただし、性能やスケーラビリティ、一部の機能は異なり、違いは公式の「Differences from DynamoDB」にまとめられています。

想定される使い道は次の通りです。

- DynamoDB向けアプリの、ローカル環境での開発やテスト
- クラウドとオンプレミスなど、複数のデータセンターで同じアプリを動かしたい場合
- オンプレミスやローカル向けのアプリでも、DynamoDBのスキルや既存コードを生かしたい場合

提供形態は、Windows・macOS・Linuxに対応したnpmパッケージと、コンテナイメージです。「クラウドに縛られずにDynamoDBの書き方を使える」選択肢として、開発・テスト環境の作り方が変わりそうです。
