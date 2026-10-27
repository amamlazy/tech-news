---
title: "Tailscale SSHなどに11件の脆弱性「Tailworm」、root権限を奪われるおそれ"
summary: "VPNサービスTailscaleのSSH機能などに、11件の脆弱性「Tailworm」が見つかり公開されました。最も深刻なものはroot権限でコマンドを実行されるおそれがあり、Tailscaleは修正版の準備とともに回避策を案内しています。"
points:
  - "Cyberdione LabsがTailscale v1.104.2とheadscale v0.29.5を調べ、11件をまとめて公表"
  - "最も深刻なのはSSHのUnixソケット転送を使った権限昇格で、root権限での実行につながる"
  - "当面はTS_SSH_DISABLE_FORWARDING=1を設定してtailscaledを再起動し、SSHのアクセス方針を見直す"
category: backend
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/tailscale-warns-of-serious-ssh-flaws-allowing-root-privilege-escalation/"
publishedAt: "2026-10-28T07:45:00+09:00"
---

Tailscaleは、離れた場所にあるパソコンやサーバーを、安全な専用のネットワークでつなぐVPNサービスです。「Tailscale SSH」は、そのネットワーク越しにほかのマシンへログインして操作する機能です。今回、この周辺に複数の欠陥が見つかりました。

## 何が見つかったか

BleepingComputerによると、Cyberdione LabsのErica Windisch氏が、Tailscale v1.104.2と、Tailscale互換のサーバーを自前で動かすためのOSS「headscale」v0.29.5を調べ、11件の脆弱性を見つけて公表しました。総称は「Tailworm」です。

最も深刻なのは、SSHのUnixソケット転送（マシン内部の通信口を別のマシンへつなぐ機能）を悪用し、root権限（管理者の最上位権限）でコマンドを実行できる問題です。ほかに、アプリコネクター（conn25）、headscaleのサービス停止（DoS）、中継サーバーDERPのクライアントでのメモリ枯渇、tailscale serveにも問題が見つかっています。

## Tailscaleの対応

Tailscaleは、これらを「深刻」としたうえで、ほとんどが権限昇格（本来より強い権限を得ること）だと説明しています。同社のMike Shaver氏は、Tailscale SSHを無効にすることまでは勧めないとしています。修正版は米国時間10月27日中の公開を目指していました。

## 今できる対策

- SSHのアクセス方針（誰がどのマシンに入れるか）を見直す
- `TS_SSH_DISABLE_FORWARDING=1`を設定し、tailscaledを再起動して転送機能を止める
- 重要なシステムへのアクセスを絞る

修正版が出たら、速やかに更新しましょう。
