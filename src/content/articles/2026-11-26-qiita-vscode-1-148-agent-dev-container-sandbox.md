---
title: "【やってみた】VS Code 1.148の「エージェント専用Dev Container」とSandbox profilesを検証　Qiita"
summary: "Qiitaで、11月25日公開のVS Code 1.148に入った、AIエージェントに隔離された作業場を渡す2つの実験的機能を、公式ドキュメントとテスト計画をもとに試した記事が公開されました。「何が隔離され、何が隔離されないか」を3種類の隔離に分けて整理しています。"
points:
  - "設定ファイルなしでエージェント用のUbuntuコンテナを作れ、「隔離環境で試して」と頼むとエージェント自身が作る"
  - "Sandbox profilesはCopilotのハーネス専用で、ClaudeやCodexのセッションには効かない"
  - "Allow Sandbox Bypassがオンだと許可外のドメインに届いた。オフでは403で拒否されたと報告"
category: frontend
sourceName: "Qiita（shahin0809）"
sourceUrl: "https://qiita.com/shahin0809/items/05a6c7431ee7e5b6e520"
publishedAt: "2026-11-26T05:45:00+09:00"
---
この記事は、Qiitaに投稿された、Microsoft Student AmbassadorでGitHub Copilot User Group Japan運営のロホマン・シャヒン氏による実践レポートの紹介です。VS Code（Visual Studio Code）はMicrosoftの無料のコードエディタで、最近はAIエージェントに作業を任せる「Agents」ウィンドウを備えています。Dev Container（デブコンテナ）は、開発環境をコンテナ（PCの中の小さな隔離された箱）の中に作る仕組みです。

## 1.148で入った2つの機能

筆者は、リリースノートの「タスクごとに専用のDev Containerを渡す」という一文をテーマに、次の2つ（どちらもExperimental＝試験的）を試しています。

- **Create Dev Containers**：設定ファイルを書かずに、エージェント用のUbuntuコンテナを作る。中にはAgent Hostが入り、ファイルはDockerボリュームに置かれる。作る場所はこのPCか、接続済みのSSHホスト／WSL／Dev Tunnelで、いずれもDockerが必要
- **Sandbox profiles**：サンドボックスの設定に名前をつけ、リモートホストごとに割り当てる。割り当てはリモート側に保存され、どの端末からつないでも同じになる

エージェントに「隔離環境で試して」と頼むと、エージェントがコンテナを作り、その中の新しいセッションで続きをやる「handoff」もできます。ただし渡るのはタスクの要約だけで、元の会話の全文や元のプロジェクトのファイルは渡らないと注意しています。

## 「隔離」は3種類ある

筆者は、エージェント周りの「隔離」には別々の3つの話が混ざりがちだとして、次のように整理しています。

- **Worktree**：ファイルの置き場を分ける。PCやネットワーク、外部サービスへのアクセス権は分けない
- **Sandbox**：コマンドが触れるファイルとネットワークをOSレベルで制限する。ただし実行ユーザーは自分のまま
- **Dev Container**：実行する場所そのものを分ける。ただしコンテナに渡した認証情報やネットワークは共有される

## 試して分かった注意点

- Sandbox profilesが効くのはCopilotのハーネスだけで、ClaudeやCodexのセッションには効かない
- プロファイルの「Allow Sandbox Bypass」がオンだと、筆者の環境では許可していないドメインに通信が届いた。オフにするとCONNECTが403で拒否された
- Dev Containerの中でさらにサンドボックスを使うと、VS Codeがコンテナの隔離を少しゆるめるDockerオプションを足す

設定画面で `chat.agentHost.devContainer` と検索すると関連の設定がまとめて出るそうです。試験的な機能のため、設定名や画面の文言は今後変わる可能性があると筆者は書いています。
