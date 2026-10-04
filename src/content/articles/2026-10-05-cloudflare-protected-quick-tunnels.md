---
title: "Cloudflare Quick Tunnelsにメール認証、アカウント不要のままアクセス先を限定可能に"
summary: "cloudflared 2026.9.3から、Quick Tunnelsに--allowed-mailオプションが加わりました。指定したメールアドレスやドメインの人だけが、ワンタイムPINで認証して公開URLにアクセスできます。"
points:
  - "トンネルを張る側も見る側もCloudflareアカウント不要"
  - "'*@example.com'のようにドメイン単位でも許可できる"
  - "オプションを省けば従来どおり誰でもアクセス可能"
category: backend
sourceName: "The Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/protected-quick-tunnels/"
publishedAt: "2026-10-05T07:20:00+09:00"
---

## 何が変わったか

Quick Tunnels は、`cloudflared tunnel --url http://localhost:5173` のような1コマンドで、ローカルのサービスを trycloudflare.com のランダムな URL で公開できる機能だ。アカウントもドメインも費用も要らない一方、URL を知っていれば誰でも開けてしまうのが弱点だった。

cloudflared 2026.9.3 からは `--allowed-mail` を付けると、指定したメールアドレスやドメインの人だけが入れるようになる。訪問者はメールアドレスを入力し、Cloudflare Access から届くワンタイム PIN で本人確認する。フラグは繰り返し指定でき、`'*@example.com'` のようにドメイン全体も許可できる。

## 背景

Cloudflare によると、コーディングエージェントが作った成果物をスマホで確認したり、ローカルの MCP サーバーを外部から呼べるようにしたりする用途で、Quick Tunnels の利用が急増しているという。`--output json` でログを JSON にすれば、エージェントが URL を機械的に取り出せる。一方で「エージェントが見せたくないものまで公開してしまうのでは」という懸念もあり、今回のアクセス制限はそれに応える形だ。

許可するユーザーを変えたいときは、cloudflared を止めて新しいトンネルを張り直す。プロセスが終われば全員のアクセスがその場で切れる。

## 現場で見るところ

エージェントに Quick Tunnels を使わせる場合は、`--allowed-mail` を付ける運用にしておくと事故を防ぎやすい。固定ホスト名や IdP グループ単位の制御が必要なら、通常の Cloudflare Tunnel と Access の組み合わせを使う。
