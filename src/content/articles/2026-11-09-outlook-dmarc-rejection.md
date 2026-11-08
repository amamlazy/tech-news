---
title: "Outlook.comがDMARCなしのドメインからのメールを一部拒否　告知なく11月5日から"
summary: "メール中継サービスのMailRouteによると、11月5日からOutlook.comやHotmailが、DMARCレコードのないドメインからのメールを一部拒否しています。大量送信者でなくても対象で、DNSにTXTレコード1行を足すのが対策です。"
points:
  - "バウンスは「550 5.7.1 Message lacks SPF/DKIM/DMARC Auth Records」"
  - "一部のメールだけ拒否されるため、届いている例があっても安全とは限らない"
  - "_dmarcに「v=DMARC1; p=none」を追加。SPFかDKIMがFromのドメインと一致していることが前提"
category: backend
sourceName: "MailRoute"
sourceUrl: "https://mailroute.net/blog/outlook-rejecting-email-without-dmarc"
publishedAt: "2026-11-09T08:20:00+09:00"
---
DMARC（ディーマーク）は、「このドメインを名乗るメールが本物かどうか」を受信側が判断するための設定で、DNSに1行書いて宣言します。SPFやDKIMという送信元の認証の結果を、差出人（From）のアドレスと結びつける役割があります。

## 何が起きているか

メール中継サービスMailRouteのブログによると、2026年11月5日から、Microsoftの個人向けメール（outlook.com、hotmail.com、live.com、msn.com）が、DMARCレコードを公開していないドメインからのメールの一部を拒否しています。送信者には次のようなバウンスが返ります。

```text
550 5.7.1 Message rejected: Message lacks SPF/DKIM/DMARC Auth Records (AS9031519)
```

MailRouteは11月5日に自社の送信ログで初めて確認し、同日から他の管理者の報告も出始めたとしています。11月6日時点でMicrosoftからの告知はないといいます。

## これまでのルールとの違い

Microsoftは2025年5月から、1日5,000通超を送るドメインにSPF・DKIM・DMARCを求め、満たさなければ「550 5.7.515」で拒否しています。今回の拒否は小規模な送信者にも及び、一部のメールだけが弾かれるため気づきにくいのが特徴です。拒否されたドメインの多くはSPFやDKIMは正しく、欠けていたのはDMARCだったと説明しています。

## 対策

まず自社ドメインにDMARCがあるか確認します。

```bash
dig +short TXT _dmarc.example.com
```

何も返らなければ、DNSに名前「_dmarc」、値「v=DMARC1; p=none」のTXTレコードを追加します。p=noneは「失敗しても何もしない」設定なので、Gmailなど他の受信側の扱いは変わりません。ただし、SPFかDKIMのどちらかがFromのドメインと一致して合格していないと、DMARCを足しても効果はない点に注意が必要です。
