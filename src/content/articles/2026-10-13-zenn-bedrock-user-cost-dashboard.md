---
title: "【試してみた】CUR 2.0とAmazon QuickでBedrock利用料をユーザーごとに見るダッシュボード"
summary: "ZennのAWS Japan（杉山氏）の実践記事は、Cost Explorerが使えない契約でも、CUR 2.0のIAMプリンシパル記録とAthena・Quickを組み合わせ、Bedrockの誰がどのモデルをいくら使ったかを可視化する手順を公開している。"
points:
  - "Data ExportsでCUR 2.0を作り、「Include caller identity (IAM principal)」をONにすると呼び出し元が記録される"
  - "IAM Identity Center経由ならline_item_iam_principalにユーザー名まで入り、タグ付けなしでユーザー別に分けられる"
  - "Athenaでテーブルを作り、CloudFormationでQuickのダッシュボード（全体サマリー／個人別）を一括作成する"
  - "サンプルではキャッシュ書き込み費用が大きく出た。金額は定価（unblended）ベースの概算である点に注意"
category: backend
sourceName: "Zenn（AWS Japan / sugimount氏）"
sourceUrl: "https://zenn.dev/aws_japan/articles/aws-bedrock-cur2-user-cost-dashboard"
publishedAt: "2026-10-13T06:30:00+09:00"
---

## どんな実践報告か

これは、AWSのソリューションアーキテクト杉山氏によるZennの実践記事です。Claude DesktopやClaude CodeをAmazon Bedrock経由で社内展開すると、「誰が、どのモデルを、どれくらい使っているか」が知りたくなります。Cost Explorerとタグでも集計できますが、パートナー契約などでCost Explorerが使えないアカウントがあります。そこでCUR 2.0とAthena、Amazon Quick（旧QuickSight）でダッシュボードを作る手順を、テンプレート付きで公開しています。

リポジトリ: https://github.com/Sugi275/bedrock-user-cost-dashboard

## 手順の要点

1. **S3バケットを用意**し、Billing and Cost ManagementのData ExportsでCUR 2.0を作成する  
2. 追加オプションで **Include caller identity (IAM principal) allocation data** をONにする。これで`line_item_iam_principal`に呼び出し元が入ります  
3. Claude DesktopをIAM Identity CenterでBedrockに繋ぎ、データを貯める。プリンシパルは`AWSReservedSSO_<権限セット>_xxxx/<ユーザー名>`の形になり、ユーザー別に分けられます  
4. Athenaで`cur.cur2`テーブルを作り、パーティション射影で月フォルダを自動認識させる  
5. QuickのAthena/S3アクセスとSPICE容量を用意し、CloudFormationテンプレートでデータセットとダッシュボードを作る

CURは設定以降の利用分からしか出ません。過去分のさかのぼり作成はできないので、早めにONにするのがおすすめだと書かれています。

## ダッシュボードで見えること

全体サマリーでは、請求月ごとの金額、ユーザー別の積み上げ、モデル別・トークン種別、日次・月次推移が並びます。個人別シートでは1人を選んでモデル構成や日次推移を確認できます。著者の例では、あるモデルで月合計約225ドルのうち約150ドルが`cache_write`で、Claude Code系の使い方ではキャッシュ書き込みが効くことが分かりました。

金額は定価（unblended）ベースの概算で、パートナー請求とは一致しない場合があります。日付はUTC基準です。按分の目安として使う前提で読む必要があります。
