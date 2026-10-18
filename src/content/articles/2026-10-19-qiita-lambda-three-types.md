---
title: "【実践レポート】3種類になったAWS Lambdaを全部使って、AIが分析するチャットアプリを作ってみた"
summary: "6月のMicroVMsと10月のWeb Functionsが加わり3種類になったAWS Lambdaを、1つのチャットアプリの中で全部使ってみた体験記だ。AIが書いた分析コードは権限を持たない隔離VMで動かす構成で、丸1日いじった料金は約20セントだったという。"
points:
  - "Event Functionsは集計、Web Functionsは画面とAPI、MicroVMsはAIのコード実行と役割分担"
  - "AIに数字を直接言わせず、pandasのコードを書かせてMicroVMで実行する"
  - "MicroVMにはIAM権限を渡さず、データは期限付きの署名付きURLで読ませる"
  - "MicroVMの認証トークンは最長60分、Web Functionsのデプロイではバケット設定で2回つまずいた"
category: backend
sourceName: "Qiita（maeda-kazutoshi）"
sourceUrl: "https://qiita.com/maeda-kazutoshi/items/4674e080c2ce3d53c809"
publishedAt: "2026-10-19T08:25:00+09:00"
---

AWS Lambdaは、サーバーを自分で用意しなくても、プログラムを置くだけで必要なときに動かしてくれるAmazonのクラウドサービスです。この記事は、Qiitaのmaeda-kazutoshi氏が、種類が増えたLambdaを3つとも実際に組み合わせて使ってみた実践レポートです。

## 3種類のLambdaの使い分け

著者の整理では、3つのLambdaはこう分けられます。

- **Event Functions**：これまでのLambda（名前が変わっただけ）。S3にファイルが届いたら何かする、といった用途。状態は持たない
- **Web Functions**（10月登場）：Webアプリをそのまま置ける。自分の画面とAPI向け。状態は持たない
- **MicroVMs**（6月登場）：人に貸せる隔離された仮想マシン。他人やAIが書いたコードを動かす用途。メモリもディスクも残る

お題には、著者が毎朝集めていたというホールの台データ（CSV）を選び、チャットで質問するとAIが分析して答えるアプリを作りました。CSVをS3に置くとEvent Functionsが列の情報と日ごとの集計をJSONにし、Web Functionsがチャット画面とAPIを担当、質問はAmazon Bedrock（AWSの生成AIサービス、モデルはClaude Haiku 4.5）に渡します。

## 計算は必ずコードにさせる

この構成でいちばん大事なのは、Bedrockに答えを直接言わせない点です。AIに数字を言わせると、それらしい数字を作ってしまうことがあるため、pandas（Pythonのデータ分析ライブラリ）のコードを書かせ、それをMicroVMで実行してから答えを書かせます。AIが書いたコードは何をするか分からないので、隔離されたMicroVMで動かすわけです。

手順の要点は次のとおりです。

- AWS CLIは2.38.1を使用。2.33系には `lambda-web` も `lambda-microvms` もなかったので、古ければ先に上げる
- 画面とAPIはHonoで1つのアプリにし、`aws lambda-web deploy --name slot-chat --code web --create` でデプロイ。API GatewayもCloudFrontもなしで動いた
- MicroVMはDockerfileとアプリをzipでS3に置き、`create-microvm-image` でイメージを作って `run-microvm` で起動。ビルドは数分、起動は数秒
- idle policyで「10分話しかけなければ一時停止、一時停止が2時間続いたら終了、どちらにしても4時間で終了」と決め、消し忘れても勝手に消えるようにした

## 安全面の工夫

MicroVMにはIAM（AWSの権限管理）の権限を一切付けていません。実行ロールにS3などの権限を付けると、AIが書いたコードからも同じ権限が使えてしまうためです。CSVは、Web Functionsが発行した期限付きの署名付きURLで読ませています。

## 使ってみた結果

「8月に平均差枚が高い機種トップ5を棒グラフにして」と聞くと、グラフ付きで返ってきました。ただし最初の答えは、去年と今年の「8月」をまとめて集計した間違いで、年を書いて聞き直すと直ったそうです。手作業の分析メモとの答え合わせでは1件ずれましたが、原因は手作業側の集計条件で、条件をそろえると一致しました。

10分放置して一時停止したMicroVMに話しかけると、最初の1回だけ少し待たされ、メモリ上のデータもそのまま残っていました。一時停止中は計算料金が止まり、スナップショットの保存料だけになります。丸1日いじった料金は合計約20セントで、半分以上がMicroVMでした。

## つまずいたところ

- Web Functionsのデプロイ先を自分のS3バケットにすると、バージョニングの有効化と、`lambda.amazonaws.com` への読み取り許可を求められた。`--bucket-name` を付けなければCLIが専用バケットを作ってくれる
- MicroVMの認証トークンは最長60分。Web Functionsの中でSDKを使って発行し、切れる前に作り直すようにした
- pandasの `FutureWarning` が出力に混ざるとAIが警告の説明を始めるので、実行環境側で止めた

著者は、業務では認証を自前で書く必要があるため当面はAPI Gateway＋Lambdaのままでよいとしつつ、コマンド1つで画面まで動く手軽さは学び始めの人に向いていると感想を述べています。
