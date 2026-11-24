---
title: "Windows Server 2028は既定で32bitアプリが動かない　「WoW64」がオンデマンド機能に"
summary: "次期サーバーOS「Windows Server 2028」では、64bitのOSで32bitアプリを動かすための仕組み「WoW64」が既定で入らなくなることが分かりました。古い32bitアプリを狙う攻撃を減らすためで、必要なら後から追加できます。"
points:
  - "WoW64は既定でアンインストール、必要に応じて追加するオンデマンド機能（FoD）に"
  - "「初期状態で安全（Secure by Default）」への方針転換の一環。WSUSやSMB 1.0、VBScriptも削除予定"
  - "レガシーBIOSのサポートも削除されUEFIが必須に。Hyper-Vでは第2世代VMが必要"
category: backend
sourceName: "窓の杜"
sourceUrl: "https://forest.watch.impress.co.jp/docs/serial/yajiuma/2158861.html"
publishedAt: "2026-11-25T06:40:00+09:00"
---
WoW64（ワウ64）は、64bit版のWindowsの上で、昔ながらの32bitアプリを動かすための「通訳」のような仕組みです。Windows Serverは2009年の「Windows Server 2008 R2」から64bit版だけになりましたが、WoW64のおかげで古い32bitアプリも動かし続けられていました。

## 何が変わるのか

窓の杜によると、米Microsoftはテクニカルカンファレンス「Ignite 2026」のセッションで、次期サーバーOS「Windows Server 2028」ではWoW64が既定でアンインストールされると明らかにしました。必要に応じて後から追加できる「オンデマンド機能（FoD）」になる見込みです。

背景には、Windows Server 2028でのセキュリティ方針の大きな転換があります。従来の「互換性重視」から「初期状態で安全（Secure by Default）」へと舵を切り、次のような変更が予定されています。

- 「Windows PowerShell 5.1」「WDS」の非推奨化
- 「WSUS」「SMB 1.0」「VBScript」などの削除
- レガシーBIOS（PCAT BIOS）のサポート削除（UEFIが必須）
- Hyper-VでWindows Server 2028をゲストOSとして動かすには第2世代（Gen2）仮想マシンが必須

## なぜWoW64を外すのか

WoW64は、32bitのマルウェア（悪意あるプログラム）まで動かせてしまいます。また、メンテナンスされなくなった古い32bitアプリは攻撃の標的になりやすいという問題もあります。そこで「攻撃される入り口」を減らすため、最初からは入れない形にするというわけです。

記事は、将来サポートされなくなる可能性も考え、できるだけ早く後継アプリや代替手段への移行を検討すべきだとしています。Windows Server 2028は現在パブリックプレビュー中です。社内に古い32bitの業務アプリが残っているなら、今のうちに洗い出しておくのがよさそうです。
