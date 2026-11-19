---
title: "Microsoftの「Agent Framework」に不正版、PyPIで認証情報を盗むコード入りの1.26.1／1.26.2が公開"
summary: "AIエージェント開発用の「Microsoft Agent Framework」のPythonパッケージが侵害され、クラウドやGitHubの認証情報を盗む不正なバージョンがPyPIで一時公開されていました。入れてしまった環境は「すでに漏えいした」とみなし、認証情報をすべて作り直すよう求められています。"
points:
  - "不正版は1.26.1と1.26.2（11月17日公開、その後削除）。1.26.0以前は影響なし"
  - "Pythonが起動時に読む「.pth」ファイルを悪用し、importしなくてもインストールしただけで動く"
  - "Azure、AWS、GitHub、Docker、Hugging Face、OpenAIなどのトークンを集めて外部に送信"
category: ai
sourceName: "ITmedia NEWS"
sourceUrl: "https://www.itmedia.co.jp/news/article/2611/19/2000003332/"
publishedAt: "2026-11-20T06:00:00+09:00"
---
Microsoft Agent Frameworkは、AIエージェント（自分で手順を考えて作業するAI）を作ったり、複数のエージェントを連携させたりするための、Microsoftのオープンソースの開発キット（SDK）です。PyPIは、Pythonのライブラリを配布する公式の置き場所で、`pip install` で入るパッケージの多くがここから届きます。

## 何が起きたか

ITmedia NEWSによると、米セキュリティ企業のSocket、StepSecurity、OX Securityが相次いで、Agent FrameworkのPythonパッケージに認証情報を盗む不正なバージョンが公開されていたと報告しました。Agent Frameworkは2025年10月に発表、2026年4月に1.0が出たSDKで、Semantic KernelとAutoGenの後継にあたり、PyPIで月に約20万回ダウンロードされています。

GitHub Advisory Databaseによると、不正なバージョンは「1.26.1」と「1.26.2」で、11月17日（協定世界時）に公開され、その後PyPIから削除されました。1.26.0以前は影響を受けません。

## どんな仕組みだったか

- Pythonが起動時に自動で読み込む「.pth」ファイルを悪用し、Pythonが起動するたびに実行された。プログラムでAgent Frameworkをimportしていなくても、インストールしただけで動く
- 正規の関連パッケージ「agent-framework-core」1.26.0をそのまま使っていたため、フレームワーク自体は普通に動き、異常に気づきにくかった
- 環境変数や設定ファイル、同じマシンの他のプロセスから、Azure、AWS、GitHub、Docker、Hugging Face、OpenAIなどのパスワードやアクセストークンを集め、外部サービス「webhook.site」に送っていた。1.26.2ではGitHub Actionsのトークンも狙うように

StepSecurityによると、1.26.1は公開の約30分後にPyPIに隔離されましたが、攻撃者はその約2分後に1.26.2を公開し、こちらも約8分後に隔離されました。同じ日にメンテナー（管理者）用の新しいアカウントが作られてプロジェクトに追加されていたことも確認されています。攻撃者がどうやって公開権限を得たかは分かっていません。

## 入れてしまった場合

GitHub Advisory Databaseは、1.26.1か1.26.2を入れた環境では情報がすでに漏えいしたものとして扱い、その環境からアクセスできる認証情報をすべて再発行するよう求めています。StepSecurityは、pipを実行するだけでも不正なコードが再び動く可能性があるため、環境をネットワークから切り離し、Pythonやpipを実行せず、1.26.0に固定してクリーンな環境を作り直すよう呼びかけています。CIや開発用PCで最近このパッケージを更新していないか、ロックファイルで確かめておきましょう。
