---
title: "Microsoftが「Type Server Protocol」を公開、Pylanceの型チェックを差し替え可能に"
summary: "MicrosoftがPython向けの型情報をやり取りする仕様「Type Server Protocol（TSP）」を公開しました。VS CodeのPython拡張Pylanceが、MetaのPyrefly等の型チェッカーとも組み合わせられるようになります。"
points:
  - "JSON-RPCで「typeServer/」系メソッドを定義、現行バージョンは0.4.1"
  - "pyright-typeserver --stdio で型サーバーとして起動できる"
  - "Meta（Pyrefly）との提携で、エディタ機能と型チェッカーを分離"
category: backend
sourceName: "Microsoft (GitHub)"
sourceUrl: "https://github.com/microsoft/pylance-release/blob/main/docs/tsp/type-server-protocol.md"
publishedAt: "2026-10-27T07:25:00+09:00"
---

Pylance（パイランス）はVS CodeでPythonを書くときに補完やエラー表示をしてくれる拡張機能です。型チェッカーとは、変数や関数の「型」の食い違いを実行前に見つけるツールです。

## TSPとは

Type Server Protocolは、エディタ側（Pylance）と型を解析するエンジン（型サーバー）の間のやり取りを決めた仕様です。JSON-RPCという形式で`typeServer/`で始まるメソッドを定義しており、現在のバージョンは0.4.1です。

## 何が変わるか

- これまで一体だった「エディタ機能」と「型の解析エンジン」を分けられる。
- Pyright由来のサーバーは`pyright-typeserver --stdio`で起動できる。
- MetaのPython型チェッカー「Pyrefly」との提携も発表されており、好みのエンジンとPylanceを組み合わせる道が開ける。

## 反響

Hacker Newsでは159ポイントを集めました。Python開発者にとって、エディタ体験を保ったまま型チェッカーを選べるようになる点が注目されています。
