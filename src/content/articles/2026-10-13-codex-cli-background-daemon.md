---
title: "Codex CLIが常駐・自己更新するデーモンを既定で起動、無効化を求めるIssueがHNで話題に"
summary: "OpenAIのCodex CLIが0.157.0以降、対話セッションを開くだけで常駐型のバックグラウンドデーモンと自動更新プロセスを起動するとして、既定でオフにするよう求めるGitHub Issueが議論を集めている。10月12日にはHacker Newsのフロントページにも載った。"
points:
  - "Issueによると、codexを起動するとapp-serverデーモンが立ち上がり、ウィンドウを閉じてもPID 1の配下で動き続ける"
  - "約374MBのパッケージを~/.codex配下へ複製し、そこから実行。5分後と以後1時間ごとに更新を確認し、デーモンを再起動する"
  - "最初に起動したセッションの環境変数（プロキシなど）をデーモンが持ち続ける、パッケージマネージャ版と版がずれるといった問題も挙げた"
  - "回避策としてcodex features disable daemon_auto_startとデーモン停止の手順が書かれている。Issueは取得時点でOpenのまま"
category: ai
sourceName: "GitHub（openai/codex Issue #48195）"
sourceUrl: "https://github.com/openai/codex/issues/48195"
publishedAt: "2026-10-13T07:45:00+09:00"
---

## 何が問題になっているか

OpenAIのコーディングエージェント「Codex CLI」のリポジトリに9月25日に立てられたIssue #48195が、10月12日にHacker Newsのフロントページに上がりました（取得時点で約370ポイント、200件超のコメント）。タイトルは「`daemon_auto_start`をオプトインにしてほしい。常駐して自己更新するデーモンを既定にすべきではない」です。

Issueの報告者は、npmで入れた0.157.0（Linux / WSL2）で、次の動きを確認したと書いています。

- 対話セッションを開くだけで`codex app-server --managed-daemon`が起動する。TTYのない独自セッションで動き、Codexのウィンドウをすべて閉じてもPID 1に付け替えられて動き続ける
- プラットフォーム用パッケージ一式（約374MB。`codex`本体や同梱の`bwrap`、`zsh`、`rg`など）を`~/.codex/packages/app-server-daemon/releases/<version>/`へ複製し、そのコピーから実行する。以後はバックエンドの版がパッケージマネージャで入れた版と切り離される
- 別プロセスの更新ループが、起動5分後とその後1時間ごとに更新を確認し、新しい版を落としてバックエンドを再起動する。実行中のターンが止まる問題も関連Issueで報告されている
- 最初にデーモンを起動したセッションの環境変数を持ち続ける。報告者はセッションごとに`HTTPS_PROXY`を変えているが、後から起動したセッションでも最初のプロキシが使われるという

## 報告者の提案と回避策

報告者は、CLIではバックエンドはウィンドウと一緒に終わり、インストールした版のバイナリを使い、裏で勝手に更新しないのが自然だと主張しています。共有デーモンはRemote Controlやデスクトップアプリ向けに、明示的に有効化したときだけ使えばよい、という提案です。既定のままにするなら、最後のクライアントが切れたら終了する、npmやbrew、pacmanで入れた場合は複製・自己更新をしない、といった対策を求めています。

報告者が使っている回避策は次のとおりです。`daemon stop`では更新ループが止まらないため、`pkill`も必要だったと書いています。

```bash
codex features disable daemon_auto_start
codex app-server daemon stop
pkill -f ' app-server daemon pid-update-loop '
rm -rf ~/.codex/packages/app-server-daemon
```

## 現場で見るところ

コメント欄には、Windowsで使えなくなった、Arch Linuxのパッケージでは`--no-daemon`なしに起動しない、といった報告も並んでいます。一方、0.160.0ではデーモンが見当たらないという声もあり、版や環境によって挙動が違う可能性があります。取得時点でIssueはOpenで、OpenAIとしての方針は示されていません。社内でCodex CLIを配る場合は、常駐プロセスやプロキシ設定の扱いを一度確認しておくとよさそうです。
