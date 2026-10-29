---
title: "GitHub Copilotの仕組みがMicrosoft全体の土台に　「Copilot harness」をFoundryでプレビュー提供"
summary: "Microsoftが、GitHub Copilotで使われてきたAIエージェントの実行基盤を「Microsoft Copilot harness」として全社の共通基盤にし、Microsoft Foundryでパブリックプレビューを始めました。SDKの名前もMicrosoft Copilot SDKに変わります。"
points:
  - "エージェントの繰り返し処理とサンドボックスをFoundry Agent Serviceが実行"
  - "20種類以上の最先端モデルに対応し、自分のAPIキーを持ち込むこともできる"
  - "実行部分はRustで書き直された"
  - "GitHub Copilot SDKはMicrosoft Copilot SDKに改名、6言語で一般提供"
  - "12月1日から課金開始、それまでは実行環境が無料"
category: ai
sourceName: "窓の杜"
sourceUrl: "https://forest.watch.impress.co.jp/docs/news/2152248.html"
publishedAt: "2026-10-30T07:45:00+09:00"
---

「ハーネス（harness）」は、AIモデルに道具を使わせたり、作業を何度も繰り返させたりするための“外枠”の仕組みです。同じモデルでも、ハーネスの出来でエージェント（自分で作業を進めるAI）の賢さが大きく変わります。

## 何が発表されたのか

Microsoftは10月28日（米国時間）、GitHub Copilotから生まれたエージェントの実行基盤を、社内全体で使う共通の基盤にすると発表しました。名前は「Microsoft Copilot harness」で、AI開発サービス「Microsoft Foundry」でパブリックプレビューとして提供が始まっています。エージェントの繰り返し処理（ループ）とサンドボックス（隔離された実行環境）は「Foundry Agent Service」が動かします。

20種類以上の最先端モデルに対応し、BYOK（自分で契約したAPIキーを持ち込む方式）も使えます。実行部分はRustで作り直されました。

## 4つの構成要素

窓の杜によると、ハーネスは次の4つでできています。

- 使い回せる「スキル」（手順書のようなもの）
- FoundryやMCP（AIと外部ツールをつなぐ共通規格）によるツール接続
- 組み込みのサブエージェントへの実行・作業の委任
- ソース管理できるエージェント定義

## SDKの名前も変更

開発者向けの「GitHub Copilot SDK」は「Microsoft Copilot SDK」に改名され、Node.js／TypeScript、Python、Go、.NET、Rust、Javaで一般提供されています。旧名称も当面は残ります。なお、ハーネスはエージェントを作るときに選ぶ必要があります。

## 料金

課金は12月1日から始まり、1vCPU時間あたり0.0994ドル、1GiB時間あたり0.0118ドルです。それまでは実行環境を無料で使えます。

## 読みどころ

GitHub Copilotで鍛えた仕組みを、Microsoftが自社のエージェント全体の土台にした形です。Foundryで社内向けエージェントを作る企業にとっては、GitHub Copilotと同じ動き方のエージェントを自分で組めるようになります。
