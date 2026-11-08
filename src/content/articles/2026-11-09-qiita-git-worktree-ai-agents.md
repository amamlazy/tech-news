---
title: "AIエージェントを並列で動かすためのgit worktree入門　コマンドと落とし穴"
summary: "複数のAIエージェントに同じリポジトリを同時に触らせると、互いの編集を上書きしてしまいます。Qiitaの実践記事が、git worktreeで作業フォルダーを分けてClaude Codeを並列実行する手順と注意点をまとめています。"
points:
  - "worktreeは同じリポジトリの作業フォルダーを複数持てる機能。履歴とリモート設定は共有"
  - ".envなどgit管理外のファイルはコピーされず、ポートやDB、Dockerも分かれない"
  - "Subagent定義に「isolation: worktree」と書けば専用worktreeで動かせる"
category: ai
sourceName: "Qiita"
sourceUrl: "https://qiita.com/sf-12/items/34ddfb7d7f245085fb2b"
publishedAt: "2026-11-09T09:30:00+09:00"
---
git worktree（ワークツリー）は、1つのGitリポジトリから作業用フォルダーを複数取り出せる機能です。この記事は、AIエージェントを複数同時に走らせる前提でworktreeの使い方を整理したハンズオン記事で、sf-12氏がQiitaに投稿しました（2026年11月8日）。

## 基本の考え方

普通はブランチを切り替えると同じフォルダーの中身が書き換わりますが、worktreeなら別フォルダーとして並べて置けます。エージェントAには`myapp-agent-a`、エージェントBには`myapp-agent-b`で作業させれば、編集がぶつかりません。一方、`.git`の本体は元のフォルダーに1つだけなので、どちらで作ったコミットもpushせずに互いから見え、そのまま`git merge agent-a`できます。同じブランチを2つのフォルダーで同時に開くことはできません。

## 主なコマンド

```bash
git worktree add ../myapp-agent-a -b agent-a   # 新しいブランチで作成
git worktree list                              # 一覧
git worktree remove ../myapp-agent-a           # 削除（未コミットがあると失敗）
git worktree prune                             # 手で消した残骸を掃除
git branch -d agent-a                          # ブランチは別途削除
```

## Claude Codeでの並列実行の流れ

作業ごとにworktreeを作り、必要なら`npm install`などを済ませ、ターミナルを2つ開いてそれぞれのフォルダーで`claude`を起動します。1セッション内のSubagent（補助エージェント）も、定義に`isolation: worktree`と書けば専用のworktreeで動きます。終わったらコミットさせ、PRを作るかメイン側でマージし、worktreeとブランチを片付けます。

## 気をつけること

著者は次の点を注意として挙げています。`.env`のようなgit管理外のファイルは新しいworktreeにないので手で用意すること。ポート、データベース、Dockerコンテナは共有なので、同じポートの開発サーバーを2つ起動すると片方が失敗すること。履歴は共通なので、エージェントが他のブランチをgitで操作すると全体に影響すること。同じファイルを変えればマージ時のコンフリクトは避けられないこと。
