---
title: "Windowsの「Telnet Client」（telnet.exe）が非推奨に　将来のWindowsで削除へ、OpenSSHなどへの移行を"
summary: "Microsoftは、Windowsに付属するコマンド「Telnet Client」（telnet.exe）を非推奨機能に加えました。今後は開発の対象から外れ、将来のWindowsで削除される見込みなので、使っている手順があればOpenSSHなどへの移行を考える時期です。"
points:
  - "Microsoft Learnの非推奨機能一覧に11月25日（現地時間）追加"
  - "現在は既定で無効のオプション機能。削除される時期は未定"
  - "今月は「MTP over Bluetooth」やWindows版「Microsoft Family Safety」も非推奨に"
category: backend
sourceName: "窓の杜"
sourceUrl: "https://forest.watch.impress.co.jp/docs/news/2159560.html"
publishedAt: "2026-11-27T06:10:00+09:00"
---
Telnet（テルネット）は、ネットワーク越しに別のコンピューターへつないで操作するための古い通信方式です。通信が暗号化されないため、今では安全なSSHに置き換えられていますが、ポートが開いているかの確認などに「telnet.exe」を使う人もまだいます。

## 何が変わるか

窓の杜によると、Microsoftは11月25日（現地時間）、自社のドキュメントサイト「Microsoft Learn」で、Windowsに付属するコマンド「Telnet Client」（telnet.exe）が非推奨になると明らかにしました。

Telnet Clientは、接続先のホスト名やIPアドレスと、必要に応じてTCPポート（既定は23番）を指定して使うコマンドです。現在は既定で無効のオプション機能として提供されており、使うには「Windows の機能」（optionalfeatures）の画面などで有効にする必要があります。

今後は積極的な開発の対象から外れ、削除されるバージョンは明らかにされていないものの、将来のWindowsで削除される見込みです。

## 現場で見るところ

社内の手順書やスクリプトで「telnet ホスト名 ポート番号」を使って疎通確認をしている場合は、今のうちに置き換え先を決めておくと安心です。窓の杜は、依存する手順があればOpenSSHなどへの移行を検討するとよいとしています。

なお今月は、Telnet Clientのほかにも「MTP over Bluetooth」やWindows版「Microsoft Family Safety」アプリなどが非推奨機能になっています。
