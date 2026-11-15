---
title: "Microsoft、Linux版「Autoruns」を公開　systemdやcron、ブラウザー拡張まで自動起動するものを洗い出し"
summary: "Microsoftは、システム起動時やログオン時に自動で動くプログラムを一覧にするSysinternalsツール「Autoruns」のLinux版を公開しました。Rustで新たに作られたコマンドラインツールで、MITライセンスのオープンソースです。"
points:
  - "systemdのサービスやタイマー、cron、シェルの起動ファイル、udev、fstabなどを調べられる"
  - "ChromiumやFirefoxの拡張機能、LibreOfficeのマクロも対象。ファイルを読むだけで実行はしない"
  - "--rootでコンテナーやオフラインのイメージも調査可能。DEB／RPMで配布、AMD64とARM64に対応"
category: backend
sourceName: "窓の杜"
sourceUrl: "https://forest.watch.impress.co.jp/docs/news/2155574.html"
publishedAt: "2026-11-16T06:45:00+09:00"
---
Autoruns（オートランズ）は、Microsoftの管理者向けツール集「Sysinternals」の定番ツールで、PCの起動時やログオン時に自動で動くよう設定されたプログラムを洗い出すものです。マルウェア（悪意のあるソフト）が勝手に自動起動を仕込んでいないかを調べるときなどに使われてきました。そのLinux版が新しく登場しました。

## 何が調べられるのか

窓の杜によると、Linux版「Autoruns 1.0」は、Windows版とそのコマンドライン版「Autorunsc」をもとに、Rustで新しく作られました。v1.0では次のような項目を調べられます。

- デスクトップの自動起動と、シェルの起動ファイル
- systemd（Linuxでサービスを管理する仕組み）のサービス、タイマー、ソケット、マウントなど
- cron／anacron（決まった時刻に処理を動かす仕組み）のジョブ
- モジュールの読み込み設定、ダイナミックローダーのプリロード設定、ネットワークのフック
- ChromiumやFirefoxの拡張機能、企業向けポリシー
- udevの動作やfstabの設定、マウントしたメディアの自動実行
- LibreOffice／OpenOfficeの拡張機能やマクロ

標準ではログオン時の項目を調べ、すべてのカテゴリを調べるには `-a '*'` を付けます。

## 安全に使える工夫

調査はファイルを読んで確かめるだけで、見つけたコマンドを実行したり、サービスを起動したりはしません。結果は表のほか、CSV、TSV、JSON、XMLで出力できます。`--root` で別のルートディレクトリを指定すれば、マウントしたシステムやコンテナー、オフラインのディスクイメージも調べられます。

なお、Windows版にある「VirusTotal」（複数のウイルス対策エンジンでの一括検査）との連携には対応していません。

## 入手方法

GitHubのリリースページから、DEB／RPMパッケージを無償でダウンロードできます。動作確認はUbuntu 20.04、Rocky Linux 8、Azure Linux 3で行われ、いずれもAMD64とARM64に対応しています。Linuxサーバーのセキュリティ点検や、不審な挙動の調査に使えそうです。
