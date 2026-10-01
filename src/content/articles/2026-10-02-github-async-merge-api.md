---
title: "GitHub非同期マージAPIが一般提供、スタックPRにも対応"
summary: "GitHubが非同期マージAPIを一般提供しました。個別・スタック・キュー・直接マージを非同期で処理でき、忙しいリポジトリの自動化向けの推奨パスになります。"
points:
  - "PUTで要求を送りrequest IDでGETポーリング"
  - "スタックPRをサポートする唯一のマージAPI"
  - "権限があればルールバイパスも可能"
category: backend
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-01-github-async-merge-api-generally-available/"
publishedAt: "2026-10-02T07:00:00+09:00"
---

## 何が変わったか

GitHub は 2026年10月1日、非同期マージAPIを一般提供した。個別PRやスタックPRのマージ、マージキューへの追加、直接マージに対応し、権限がある場合はルールのバイパスも選べる。

マージ処理は非同期で進む。`PUT` で要求を送り、返ってきた request ID を使って `GET` で状態を確認する流れだ。複雑なマージでも単一リクエストの完了を待つ必要がなく、忙しいリポジトリの自動化に向く。

## 現場で見るところ

同期RESTやGraphQLミューテーションに代わる推奨パスとされ、スタックPRを扱えるのはこのAPIだけとのこと。CIやボットでマージを自動化しているチームは、タイムアウトやキュー待ちの扱いを非同期モデルに合わせて見直すとよい。
