---
title: "「パソコン全体のためのagent-browser」　AIがデスクトップアプリを操作できる「agent-desktop」公開"
summary: "VercelのChris Tate氏が、AIエージェントがパソコンのアプリを読み取り・操作するためのツール「agent-desktop」を公開したとXに投稿しました。画面の画像ではなく、OSのアクセシビリティ情報を使って操作するのが特徴です。"
points:
  - "macOS、Windows、Linuxに対応し、バックグラウンドで動作すると投稿"
  - "複数のエージェントが、それぞれ自分のカーソルで並行して作業できる"
  - "OSのアクセシビリティツリーを読み、画像認識に頼らずに操作する"
  - "npmで入れられるCLIとCライブラリで、ライセンスはApache-2.0"
category: x-trend
sourceName: "X"
sourceUrl: "https://x.com/ctatedev/status/2116323148706771302"
publishedAt: "2026-11-02T11:40:00+09:00"
---

AIエージェント（指示を受けて自分で作業を進めるAI）に、ブラウザだけでなくパソコンのアプリ全体を操作させるためのツールが登場しました。Vercel（Webサービスの公開基盤を提供する会社）のChris Tate氏が公開した「agent-desktop」です。

## 何を投稿したのか

Tate氏は日本時間10月31日午前9時15分ごろ、agent-desktopを「agent-browser（AIエージェント向けのブラウザ操作ツール）の、パソコン全体版」と紹介しました。macOS、Windows、Linuxに対応し、バックグラウンドで動くこと、複数のエージェントがそれぞれ自分のカーソルを持って並行作業できることを投稿しています。

## どんな仕組みなのか

公開されたREADME（説明書き）によると、agent-desktopはCLI（コマンドで使うツール）とCライブラリで、OSのアクセシビリティツリー（画面の読み上げ機能などのために、OSが持っている「どこに何のボタンがあるか」の情報）を通じてアプリを読み取り・操作します。

- 「スナップショット」でアプリの状態を取ると、各要素に参照ID（ref）が付いたJSONが返る
- エージェントはそのrefを指定してクリックなどを行い、もう一度スナップショットを取って結果を確かめる
- 画面の画像を見比べる方式ではないので、ピクセル単位の照合に頼らない
- 既定ではヘッドレス（画面に表示せず裏で）動作

使い方の例として、`npm install -g agent-desktop` で導入し、`agent-desktop snapshot --app Finder -i` で状態を取得、`agent-desktop click @s8f3k2p9:e8` のようにrefを指定して操作します。macOSではアクセシビリティの許可が必要（`agent-desktop permissions --guide` で案内）、Linuxではat-spi2-coreが必要です。ライセンスはApache-2.0です。

## 反響

投稿は約107万回表示され、9,300件以上のいいねを集めました。VercelのCEO、Guillermo Rauch氏も「An agent on every desktop（すべてのデスクトップにエージェントを）」と反応しています。

## 読みどころ

画面の画像からボタンを探す方式より、速くて正確になりやすいのがアクセシビリティ情報を使う利点です。その分、AIにパソコンを広く操作させることになるので、許可の範囲は慎重に決めたいところです。
