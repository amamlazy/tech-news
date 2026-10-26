---
title: "【実践レポート】BitwardenのAgent Accessで、クラウドのClaude Codeに安全にパスワードを渡す"
summary: "getty104氏が、BitwardenのAgent Access SDKを使い、Web版Claude Codeから手元の保管庫の認証情報をパスワードを見せずに受け取れるか試した実践レポートです。"
points:
  - "aac runで認証情報を子プロセスの環境変数に渡し、会話に残さない"
  - "「Request denied」の原因は項目の重複とBW_SESSIONの期限切れ"
  - "Playwright MCPとCDPで同じブラウザを共有し、ログインだけスクリプトで実行"
category: ai
sourceName: "Qiita（getty104）"
sourceUrl: "https://qiita.com/getty104/items/583f2f5ecf473ddc4539"
publishedAt: "2026-10-27T08:10:00+09:00"
---

Bitwardenはパスワードを安全に保管するパスワードマネージャーです。Agent Accessは、AIエージェントに保管庫全体を渡さず、必要な認証情報だけを承認制で渡すための仕組み（現在early preview）です。

## この記事はgetty104氏による実践レポートです

`aac` v0.11.0で試した内容です。手元のPCで`aac listen`を起動し、クラウド側で`aac connect --token <ペアリングトークン>`して接続します。両者は中継サーバー経由の暗号化トンネルでつながります。

## ポイントは aac run

`aac run --domain example.com --env-all -- <コマンド>`とすると、取得した情報が`AAC_USERNAME`や`AAC_PASSWORD`として子プロセスの環境変数に渡されます。エージェントはパスワードを見ずに、それを使うコマンドだけを実行できます。プロキシ越しのWeb版Claude Codeからも、特別な設定なしでつながりました。

## 詰まった点

- 同じサービスの項目が複数あると`bw get item`が失敗するため、`--id <項目ID>`で指定する。
- 保管庫のセッションが古いと`Not found`扱いで自動拒否される。`export BW_SESSION=$(bw unlock --raw)`のあとに`aac listen`を実行する。
- 数秒で拒否なら手元の検索失敗、約120秒なら承認待ちのタイムアウト。パスキーは扱えない。

## ブラウザ操作との組み合わせ

Playwright MCPの入力ツールでパスワードを打つと会話に残るため、CDPを有効にしたChromiumを共有し、ログインだけを`aac run`内のスクリプトで実行します。その後Playwright MCPがログイン済みのタブを操作する分担です。CDPポートは同じホストの別プロセスからも使えるため、使い捨てのコンテナで動かすよう注意しています。
