---
title: "【試してみた】Kiro CrewをDockerで起動し、裏側をClaude Codeに差し替えて動かした"
summary: "Qiitaのmoritalous氏の実践記事は、オープンソースのKiro CrewをDocker Composeで立ち上げ、公式が案内するACP経由でエージェントバックエンドをClaude Code（Amazon Bedrock）に切り替える手順を、画面付きで紹介している。"
points:
  - "Kiro CrewはOSS。Kiro CLI自体はOSSではないが、CrewはAgent Client Protocol（ACP）で複数バックエンドに繋げる"
  - "composeでghcr.io/kirodotdev/kirocrewを起動し、seccompとホーム用ボリュームを付ける"
  - "コンテナ内でmise→Node→claude-agent-acp→Claude Codeを入れ、Bedrock APIキーでログインする"
  - "開発メニューのエージェントバックエンドで「Claude Codeを使う」を選ぶと、呼び出しログにもClaude Codeが出る"
category: ai
sourceName: "Qiita（moritalous氏）"
sourceUrl: "https://qiita.com/moritalous/items/065b32fd5e765bc54726"
publishedAt: "2026-10-13T06:25:00+09:00"
---

## どんな実践報告か

これは、Qiitaのmoritalous氏によるハンズオン記事です。Kiro Crewは裏側でエージェントを動かす仕組みで、ドキュメント上はClaude Codeでも動くとあります。連携にはACP（Agent Client Protocol）を使います。Kiro CLIやIDEはオープンソースではありませんが、Kiro Crew自体はGitHubで公開されています。

著者はLinux（WSLやDev Container、Raspberry Piなどを想定）でDocker Composeを使い、実際にClaude Codeへ切り替えて呼び出しまで確認しています。

## 手順の流れ

最低限の`compose.yaml`は次のような形です（記事の例）。

```yaml
services:
  kirocrew:
    image: ghcr.io/kirodotdev/kirocrew:stable
    ports:
      - "127.0.0.1:5476:5476"
    volumes:
      - ./kirocrew-home:/home/kirocrew
    security_opt:
      - seccomp:./kirocrew-seccomp.json
```

seccomp定義は公式リポジトリから取得し、マウント先ディレクトリは先に作っておきます（後から作るとroot所有になりがちです）。起動後は、

1. `docker exec`で`kiro-cli login`（セットアップ上必要）
2. `kirocrew token`でブラウザ用URLを発行
3. コンテナ内にmise、Node.js、`@agentclientprotocol/claude-agent-acp`、Claude Codeを入れる
4. Claude CodeをBedrock APIキーなどで初期設定し、デフォルトモデルを指定
5. Kiro Crewの開発メニューからエージェントバックエンドを「Claude Code」に切り替える

までを画面付きで追っています。切り替え後、実際の呼び出しとClaude Code側のログに載るところまで確認できたと報告しています。

## 注意点

記事時点の手順であり、公式イメージやACPアダプタの版で画面やコマンドが変わる可能性があります。Bedrockを使う場合は、キーを発行したリージョンとClaude Code側のリージョン指定を揃える必要がある、という案内もあります。
