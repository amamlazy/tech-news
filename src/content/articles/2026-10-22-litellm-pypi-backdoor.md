---
title: "AI開発で定番のPythonライブラリ「LiteLLM」1.107.0に情報窃取とバックドア、PyPIから削除"
summary: "多数のAIモデルを1つの書き方で呼び出せるPythonライブラリ「LiteLLM」の1.107.0が改ざんされ、SSH鍵やクラウドの認証情報、AIツールのAPIキーを盗む仕組みと遠隔操作用のバックドアが仕込まれていたと、セキュリティ企業SafeDepが報告した。問題の版はすでにPyPIから削除されている。"
points:
  - "インストールしただけで、litellmを使わないPythonプロセスでも起動時に動く"
  - "Claude Code、Cursor、Codexなど多くのAIツールの設定や鍵も盗む対象"
  - "1時間ごとに外部から別のコードを取得して実行するバックドアも常駐"
  - "1.106.2、1.107.0rc1、rc2は問題なし。GitHub上のソースには不正コードなし"
category: ai
sourceName: "SafeDep"
sourceUrl: "https://safedep.io/litellm-pypi-compromise-credential-stealer-backdoor/"
publishedAt: "2026-10-22T07:10:00+09:00"
---

LiteLLMは、OpenAIやAnthropic、Googleなどさまざまな会社のAIモデルを、同じ書き方で呼び出せるようにするPythonのライブラリ（部品）です。PyPI（Pythonの部品を配る公式の置き場）から誰でもインストールでき、セキュリティ企業Socketは「月間9,200万回以上ダウンロードされている」とXに投稿しています。

## 何が起きたのか

SafeDepの調査によると、10月21日（UTC、日本時間では21日夜）にPyPIへアップロードされたLiteLLM 1.107.0の配布ファイル（wheel）7つすべてに、次の3つのファイルが追加されていました。

- `cook.pth`：Pythonが起動するたびに自動で読み込まれ、`cook.py` を実行させる
- `cook.py`：認証情報を盗むプログラム
- `sitecustomize.py`：常駐するバックドア（裏口）

`.pth` や `sitecustomize.py` は、Pythonが起動時に自動で読む仕組みです。このため、litellmを一度も呼び出さないプロセス、たとえばpipやエディタの補完機能、CIのジョブでも動いてしまいます。

## 何を盗むのか

盗む対象は広く、SSH鍵、AWS・Azure・Google Cloudの認証情報、Kubernetesの設定、ブラウザーに保存したパスワード、シェルの履歴、CI/CDの秘密情報などに加え、Claude Code、Claude Desktop、Cursor、Windsurf、Copilot、Gemini CLI、Codexなど多くのAIツールの設定やトークンも含まれていました。LiteLLMをプロキシ（中継サーバー）として使っている場合は、データベースに保存された各AIサービスのAPIキーも抜き出します。集めたデータは暗号化され、本物に似せた `www.litellm[.]dev` というドメインに送られていました。

バックドアのほうは1時間ごとに攻撃者のGitHub上のファイルから接続先を読み、そこから受け取ったコードを実行する仕組みでした。このGitHubアカウントはアップロードの約2時間後に削除されていますが、それまでに別のコードを受け取った端末があった可能性は残ります。

## どうやって紛れ込んだのか

GitHubの公開リポジトリには、不正なコードは含まれていませんでした。配布用のソースには、ビルド設定の`pyproject.toml`に1行（`data = "cook"`）が足されていただけです。SafeDepは、正規のリリース用パイプラインが、攻撃者に書き換えられたソースからビルドした可能性が「中〜高程度」あるとみています。原因の確定にはBerriAI（LiteLLMの開発元）のログが必要だとしています。

## 確認すること

- 問題があるのは **1.107.0** のみ。1.106.2、1.107.0rc1、rc2は問題なし
- `site-packages` に `cook.pth`、`cook.py`、`sitecustomize.py` がないか確認する
- `/tmp/.pc_once_72129118c59f5636c0bb` や `/tmp/remote_code_loader.lock` があれば、実行された痕跡
- 入れてしまった場合は、端末にあった鍵やトークン、プロキシに登録したAPIキーを作り直す（ローテーション）のが安全
