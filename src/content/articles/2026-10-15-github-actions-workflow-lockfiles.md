---
title: "GitHub Actionsに「ワークフローロックファイル」、タグのまま実行コミットを固定"
summary: "GitHubがActionsのワークフロー依存関係ロックファイルをパブリックプレビューで提供開始した。YAMLはタグ指定のまま、実際に動くコードはロック済みのコミットに固定でき、タグ移動によるサプライチェーン攻撃を防ぎやすくなる。"
points:
  - "gh actions-lock拡張で .github/workflows/actions.lock を生成、推移的依存や再利用ワークフローも記録"
  - "ワークフロー単位で段階導入でき、導入後はロックにない依存は実行されない"
  - "Require lockfileポリシーでEnterprise／Org／リポジトリ単位の強制が可能"
  - "DependabotがActions更新時にロックの該当エントリも同じPRで再生成"
category: backend
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-14-github-actions-workflow-lockfiles-in-public-preview"
publishedAt: "2026-10-15T07:03:00+09:00"
---

## 何が発表されたか

GitHubは10月14日（米国時間）、GitHub Actionsの「ワークフロー依存関係ロックファイル」をパブリックプレビューとして公開しました。対象はGitHub Enterprise Cloud（データレジデンシー版を含む）、Team、Freeの各プランです（当初の告知から対象プランが更新されています）。

背景にあるのは、`uses: org/action@v3` のようなタグやブランチ参照が「レビュー後に動きうる」という問題です。アクションが侵害されてタグが付け替えられると、リポジトリ側に変更がなくても別のコードが実行されてしまいます。ロックファイルを使うと、ワークフローの記述はタグのまま読みやすく保ちつつ、実行されるのはロックしたコミットに固定されます。

## 使い方のポイント

- GitHub CLIの拡張 `gh actions-lock` をインストールし、`.github/workflows/actions.lock` を生成します。アクション本体だけでなく推移的な依存や再利用ワークフローのコミットも記録されます。
- ワークフローごとに順次オンボードでき、オンボード後はロックファイルに記載のない依存があると実行されません。
- ファイルを書き換えずにロックが最新かを検証するモードがあり、CIのチェックにも組み込めます。
- 管理者向けに「Require lockfile」ポリシーもプレビュー提供され、Enterprise・Organization・リポジトリ単位で強制できます。

## Dependabotとの連携と注意点

オンボード済みのワークフローでDependabotがアクションのバージョン更新PRを作ると、同じPRでロックファイルの該当エントリも再生成されます。一方でGitHubは「ロックは依存先そのものが安全かどうかは判断しない」と明記しており、ロック前に依存をレビューするよう求めています。SHAピン留めを手作業で管理していたチームにとっては、可読性と固定の両立が図れる仕組みと言えそうです。
