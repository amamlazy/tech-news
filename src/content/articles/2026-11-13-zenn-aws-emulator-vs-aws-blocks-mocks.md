---
title: "【実践レポート】AWS EmulatorはAWS Blocksのモックを置き換えるのか　両方に同じ操作を流して見えた「三つ目の層」"
summary: "GENDAのikenyal氏が、AWS公式の「AWS Emulator」と、TypeScriptでバックエンドを組むフレームワーク「AWS Blocks」のローカル用モックの関係を、ソースとGitHub Actions上での実験から読み解きました。結論は「置き換え」ではなく、モックと本物のAWSの間に入る「三つ目の層」だといいます。"
points:
  - "Blocksはimportの段階でモックに差し替え、EmulatorはAWS APIの手前で応答を返す。動く層が違う"
  - "Blocksが使う操作のうち、DynamoDB・S3・SQSなどの読み書きは8〜10割が本物と一致。メール送信やログインはまだ低い"
  - "IAMやスロットリング、結果整合性はEmulatorでも再現できず、セキュリティのテストには使わないよう公式も明記"
category: backend
sourceName: "Zenn（GENDA・ikenyal）"
sourceUrl: "https://zenn.dev/genda_jp/articles/18d1f780f6b41f"
publishedAt: "2026-11-13T06:00:00+09:00"
---
これは、GENDAのエンジニアikenyal氏がZennに公開した実践レポートの紹介です。AWS Emulatorは、AWSが11月11日（米国時間）に公開した、AWSのAPIを手元で再現するツールです。AWS Blocksは、2026年6月にパブリックプレビューとなったオープンソースのフレームワークで、AWS上のバックエンドをTypeScriptで組み立てるためのものです。筆者はBlocksにコントリビュートしている立場から、「Blocksのモックはもういらなくなるのか」を確かめました。

## 二つの「ローカル」はどこが違うか

Blocksでは、`npm run dev` で動かすと、すべての部品（Block）が同梱のローカル実装（モック）で動き、AWSアカウントは不要です。Node.jsの条件付きエクスポート（package.jsonの設定で読み込むファイルを切り替える仕組み）で、ローカルではAWS SDK自体が読み込まれません。

一方、AWS EmulatorはSDKやCLIの呼び出しを受けて、DynamoDBやS3と同じ形の応答を返します。つまり、再現している対象が違うため、今のBlocksの開発体験にEmulatorが入る場所はない、と筆者は整理します。

## Blocksのテストにある「隙間」

ただし、BlocksのAWS実装のテストは、DynamoDBに送るリクエストを途中で捕まえて、テストを書いた人が用意した応答を返す形になっています。確かめられるのは「何を送るか」までで、「AWSがどう応えるか」はテストを書いた人の想定の範囲を出ません。各Blockの設計文書（DESIGN.md）にはモックとAWSの違いが並び、その多くが「sandbox（実際のAWSに作る一時環境）で確認」とされていました。

## 実際に流してみた結果

筆者はGitHub ActionsのLinuxランナーでEmulatorのRPMを入れて起動し、書き出された設定ファイルを使って、BlocksのAWS実装をコード変更なしでEmulatorに向けました。

```bash
D=~/.aws/emulator/9297
export AWS_CONFIG_FILE=$D/config
export AWS_SHARED_CREDENTIALS_FILE=$D/emulator_credentials
export NODE_EXTRA_CA_CERTS=$D/ca.pem   # 自己署名の証明書をNode.jsに信頼させる
export AWS_ENDPOINT_URL=https://127.0.0.1:9297
```

- KVStore（キーと値を保存する部品）は、モックと同じ結果を返した
- FileBucket（ファイルを置く部品）は、DESIGN.mdに書かれたS3の挙動（メタデータのキーの小文字化、削除マーカーの扱い）をそのまま返した
- Emulatorが公開する一致率（fidelityスコア）のうち、Blocksが使う操作だけを集計すると、DynamoDB・S3・SQSなどの読み書きは8〜10割が本物と一致。ブラウザへのリアルタイム配信、メール送信、ログイン処理はまだ低い

## 注意点

IAM（権限の設定）、PostgreSQLのデータ操作、スロットリング（呼び出し回数の制限）や結果整合性は、Emulatorでも埋まりません。EmulatorのREADMEも、本番のワークロードやセキュリティのテストには使わないよう書いています。

筆者は、Emulatorの活用先として効果的に感じたのは、開発者の手元よりもBlocks自身のCIテストだったとしています。AWSの公式見解ではなく、一人の利用者・コントリビューターとしての読み解きだと断ったうえでの結論です。
