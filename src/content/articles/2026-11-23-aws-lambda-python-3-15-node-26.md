---
title: "AWS Lambdaが「Python 3.15」と「Node.js 26」に対応　PythonでもWeb Functionsを使えるように（プレビュー）"
summary: "AWS Lambdaが新しいランタイムとしてPython 3.15とNode.js 26に対応しました。Python 3.15は、これまでNode.jsしか使えなかった新しい実行形態「Lambda Web Functions」で使える初めてのPythonランタイムで、PythonでWebアプリやAPIをそのまま載せられるようになります（Web Functionsではパブリックプレビュー）。"
points:
  - "Python 3.15はEvent Functionsで一般提供、Web Functionsではパブリックプレビュー"
  - "Python 3.15の明示的な遅延importで、関数の起動時間を短くできる可能性"
  - "Node.js 26は最新のLTSで2029年4月までサポート予定。Temporal APIなどが使える"
category: backend
sourceName: "AWS What's New"
sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2026/11/aws-lambda-python-315/"
publishedAt: "2026-11-23T06:10:00+09:00"
---
AWS Lambda（ラムダ）は、サーバーを自分で用意しなくても、書いたプログラムをリクエストやイベントに応じて動かせるAWSのサービスです。Lambda Web Functionsは、HTTPサーバーとして作ったWebアプリをそのままLambdaで動かせる新しい形態で、Event Functionsは従来のイベント駆動型の関数です。

## Python 3.15に対応

AWSによると、LambdaはPython 3.15に対応しました。Event Functionsでは一般提供、Web Functionsではパブリックプレビューです。Web Functions向けのPythonランタイムはこれが初めてで、これまでNode.jsしか使えませんでした。今後はPythonでもWebアプリやAPIをWeb Functionsで作れます。

Python 3.15では、次のような新機能がLambdaで使えます。

- 明示的な遅延import（必要になるまでモジュールを読み込まない仕組み）で、関数の起動時間を短くできる
- 新しい組み込み型frozendictとsentinel
- 改良されたJITコンパイラー

マネージドランタイムとしてのほか、ベースコンテナイメージ（Event Functionsのみ）としても使え、AWSが更新を自動で適用します。Powertools for AWS Lambda（Python）や、SAM、CDK、CloudFormationなどのデプロイツールにも対応しています。

## Node.js 26にも対応

同時期にNode.js 26への対応も発表されました。Node.js 26は最新の長期サポート（LTS）版で、2029年4月までセキュリティやバグの修正が提供される予定です。Web FunctionsとEvent Functionsの両方で使え、日付やタイムゾーンを扱いやすくするTemporal APIや、Fetch APIの改善などを利用できます。

どちらも、Web FunctionsとEvent Functionsが使えるすべてのリージョンで利用できます。
