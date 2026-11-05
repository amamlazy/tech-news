---
title: "AlpineのOpenSSHにパスワード認証回避の深刻な問題　10.6p2などで修正"
summary: "Alpine Linuxは、musl環境でPAMなしのsshdに、パスワード未設定アカウントへ長いパスワードで入れる問題があると警告しました。パッケージ更新後にsshdの再起動が必須で、暫定策はPasswordAuthentication noです。"
points:
  - "条件が揃うと1回の接続で、キー専用など「*」アカウントにログイン可能"
  - "原因はmuslのcrypt()が256バイト超で「*」を返し、未設定ハッシュと一致すること"
  - "Dockerでsshdを動かしていないコンテナや、cloud-initでパスワード認証オフの画像は対象外"
category: backend
sourceName: "Alpine Linux"
sourceUrl: "https://alpinelinux.org/posts/2026-11-05-openssh-password-authentication-bypass/"
publishedAt: "2026-11-06T08:45:00+09:00"
---
OpenSSH（オープンエスエスエイチ）は、サーバへ安全に遠隔ログインするための定番ソフトです。Alpine Linux（アルパイン・リナックス）は軽量なLinuxで、コンテナやクラウドの土台によく使われます。今回の問題は、その組み合わせで「パスワードを知らずに入れる」状態になり得るものです。

## 何が起きるのか

Alpineの11月5日付アドバイザリによると、攻撃者はSSHポートに届ければ、パスワードを知らなくてもログインできます。必要なのは、パスワード欄が「*」（未設定。キー専用アカウントでよくある）であるアカウント名と、同じマシンに`$5$`または`$6$`形式のハッシュを持つ別アカウントがあることです。257〜1024バイトの長いパスワードを送ると成功します。

## 影響を受ける条件

Alpineのopenssh-server（PAMなしビルド）、またはopenssh-server-pamでUsePAM noの場合が対象です。PasswordAuthenticationがyesで、上記のアカウント条件を満たすと該当します。3.16から3.24およびedgeが確認対象で、tiny-cloudのalpineユーザー（doasで特権昇格可能な構成）にも注意が必要です。一方、コンテナ内でsshdを動かしていないDocker利用や、UsePAM yes、PasswordAuthentication no、cloud-initでパスワード認証を切った画像は対象外です。

## 対処

apk upgradeのあと、必ずsshdを再起動してください。パッケージ更新だけでは動いているsshdは置き換わりません。すぐ更新できない場合はPasswordAuthentication noに変更して再起動します。OpenSSH側の回避は10.6p2に入り、各Alpineブランチ向けの修正パッケージも公開されています。ログに未設定アカウント向けの「Accepted password for」が出ていないかも確認するよう案内されています。
