---
title: "API開発ツール「Postman」、Claude CodeやCodexに無断でプラグインを入れたと利用者が報告　Hacker Newsで物議"
summary: "API開発ツールのPostmanが、起動しただけで利用者のClaude CodeやCodexに自社のプラグインや指示を自動で組み込んでいた、とする報告がGitHubに投稿されました。報告者は、他のツールの設定を勝手に変えるのは同意と信頼の重大な問題だと訴えています。"
points:
  - "Postmanのログに「claude-code:installed」「codex:installed」と自動インストールの記録"
  - "Codexの起動時に「API作業ではPostmanのスキルを使え」と促す指示（hook）が追加されていた"
  - "インストーラーが自社のhookを自分で「信頼済み」にしようとする処理もあったと指摘"
  - "報告者はデータの持ち出しまでは確認しておらず、そこは主張していない"
category: ai
sourceName: "GitHub（postmanlabs/postman-app-support）"
sourceUrl: "https://github.com/postmanlabs/postman-app-support/issues/14370"
publishedAt: "2026-11-04T06:45:00+09:00"
---
Postmanは、Web APIを試したり管理したりするための定番の開発ツールです。そのデスクトップアプリが、利用者に断りなく、AIコーディングツールのClaude CodeやCodexの設定を書き換えていたという報告が、Postmanの公式サポート用リポジトリに投稿されました。Hacker Newsでも大きな話題になっています。

## 報告の内容

報告者によると、しばらく使っていなかったMac上のPostman（12.33.4）を開いたあと、Codexで認証の警告が繰り返し出たり、API関連の作業が勝手にPostmanのスキル（AIに特定の手順を教える追加機能）経由になったりしたといいます。調べたところ、次のような変更が見つかりました。

- Postmanのログに「claude-code:installed」「codex:installed」という自動インストールの記録
- Codexの設定ファイル（~/.codex/config.toml）にPostmanのプラグインが追加・有効化
- Codexの起動時に読み込まれる「hook（決まったタイミングで自動実行される仕組み）」で、「APIの設計・実装・テストなどの作業では、まずPostmanのスキルを読み込め」という指示が入る
- インストーラーのソースコードに、自社のhookを「信頼済み」として自分で登録しようとする処理がある
- Claude Code側にもPostmanのプラグインが有効化され、PostmanのCLI（コマンドで使う版）も入っていた

## 報告者の主張

報告者は「APIのツールを開いただけで、無関係なAIツールの既定の作業手順に割り込むべきではない」とし、自動インストールの停止や、hookの自己承認の削除、完全なアンインストール手順の提供を求めています。一方で、データが外部に持ち出された証拠があるとは主張していない、と明記しています。

## 読みどころ

AIエージェントの「プラグイン」や「hook」は便利な反面、他のアプリが入り込む新しい入り口にもなります。Postmanを使っている人は、~/.codex/config.toml や ~/.claude/settings.json に覚えのない設定が増えていないか一度確かめておくと安心です。
