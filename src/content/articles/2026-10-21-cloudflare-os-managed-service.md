---
title: "「Cloudflare OS」にマネージド版、GitHub接続やGmail操作もAIエージェントに任せられるように"
summary: "Cloudflareが、社内のAI活用基盤として8月にオープンソースで公開した「Cloudflare OS」を、自社で運用するマネージドサービスとして提供すると発表した。あわせてGitHubリポジトリとの接続と、Gmailなど、Google Workspaceとの連携強化が加わった。"
points:
  - "Cloudflare OSはパソコンのOSではなく、AIと業務アプリのためのプラットフォーム"
  - "マネージドサービスは現在ウェイティングリストで登録を受付中"
  - "GitHub接続で、AIエージェントに機能追加やPR確認、コミット、プッシュを指示できる"
  - "Gmailのスレッド検索や下書き作成・送信、Google Drive/Docs/Sheetsとも連携"
category: ai
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/cloudflare_osgithubgmail.html"
publishedAt: "2026-10-21T08:00:00+09:00"
---

Cloudflare OSは、CDN（Webサイトを速く届ける配信網）などで知られるCloudflareが作った、会社でAIを安全に使うためのソフトウェアです。名前に「OS」と付いていますが、WindowsやLinuxのようなパソコンのOSではなく、社内データとAIをつなぐ業務用の土台という位置付けです。

## 何が発表されたか

Publickeyによると、Cloudflareは「Cloudflare OS」を同社が運用するマネージドサービス（サーバーの用意や保守を提供側が引き受ける形態）として提供すると発表しました。現在はウェイティングリストへの登録を受け付けています。

Cloudflare OS自体は2026年8月にオープンソースとして公開されたもので、Cloudflare環境だけでなく、オンプレミス（自社設備）や他のクラウドにも置けます。

## どんなことができるのか

- Cloudflare Workers AIやAnthropic、OpenAI、GoogleなどのAIとチャット形式で対話できる
- 社内データやサービスに安全にアクセスする仕組みがあり、AIは社内の情報やスキルをもとに答えられる
- 「エージェントワークスペース」の中で、AIエージェントにコードを書かせて実行させられる
- 社員がAIで作ったアプリを社内で共有できる

## 今回の新機能

マネージド版の発表に合わせて、2つの機能が加わりました。

1つ目はGitHubリポジトリとの接続です。Cloudflare OSから、AIエージェントにリポジトリのコードをもとにした機能追加やデバッグ、プルリクエストの確認、コミット作成、プッシュを指示できます。

2つ目はGoogle Workspace連携の強化です。AIエージェントがGmailのスレッドを読んだり検索したり、メールの下書きを作って送信したりできるようになり、Google Drive、Google Docs、Google Sheetsにもつながります。

## 見どころ

自分たちでサーバーを立てなくても使えるようになるため、「社内向けのAI基盤を試したいが運用の手間はかけたくない」というチームには選択肢が増えます。一方で、メール送信やコードのプッシュまでAIに任せられる分、どの操作を許可するかの設計がより大事になります。
