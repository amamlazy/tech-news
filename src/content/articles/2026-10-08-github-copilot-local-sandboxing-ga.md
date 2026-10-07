---
title: "GitHub Copilotのローカルサンドボックスが正式版に、エージェントのコマンド実行を制限"
summary: "GitHub Copilot CLI、Copilotアプリ、VS CodeのAgent Hostセッションで、Copilotが実行するツールやコマンドのアクセス範囲を制限するローカルサンドボックスが正式版になりました。ファイル、ネットワーク、Git認証情報への接触をポリシーで絞れ、追加料金はかかりません。"
points:
  - "Microsoft eXecution Container（MXC）がWindows/macOS/Linuxの制御に変換する"
  - "組織はサンドボックスを必須にし、開発者が緩められないポリシーを強制できる"
  - "同日、Copilot CLIの/modelで起動中のOllamaのモデルを見つけて使える機能も追加"
category: ai
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available"
publishedAt: "2026-10-08T08:00:00+09:00"
---

## 何が変わったか

GitHub は10月7日、GitHub Copilot のローカルサンドボックスを正式版（GA）にした。対象は GitHub Copilot CLI、GitHub Copilot アプリ、Agent Host を使う VS Code のセッション。Copilot が起動するツールやコマンドは、開発者や組織が決めたポリシーに沿って、ファイルシステム、ネットワーク、認証情報などへのアクセスを制限された状態で動く。

仕組みの土台は Microsoft eXecution Container（MXC）で、共通のサンドボックスポリシーを Windows、macOS、Linux それぞれの OS の制御に変換する。

## できること

- エージェントが実行するコマンドが読み書きできるファイルやディレクトリを限定する
- インターネット、ローカルネットワーク、Git の認証情報、GitHub CLI の認証情報へのアクセスを制御する
- 対応している範囲で、ローカルの MCP サーバーや言語サーバーにもサンドボックスをかける
- エンタープライズの管理設定でサンドボックスを必須にし、開発者が弱められないポリシーを強制する

GitHub は「モデルの実行とツールの隔離は別の問題」としており、どのモデルを使っていてもツール実行にはポリシーが適用される。追加料金なしで使える。

## 同日のもう一つの更新

Copilot CLI 1.0.94-0 以降では、`/model` で起動中のローカル Ollama のモデルを見つけ、セッションを再起動せずに使えるようになった。ただし Ollama とモデルは事前に入れておく必要があり、ツール呼び出しとストリーミングに対応したモデルに限られる。ローカルモデルを選んでもオフラインモードにはならず、テレメトリも止まらない。オフラインにするには `COPILOT_OFFLINE=true` を明示する。

## 現場で見るところ

エージェントに自律的に作業させるほど、「何に触れてよいか」の境界が重要になる。組織で Copilot を使っているなら、まず認証情報とネットワークの制限を有効にしたポリシーを用意し、必須化するかどうかを検討しておきたい。
