---
title: "【試してみた】SQLite本体に入ったベクトル検索拡張vec1をビルドし、埋め込みモデルなしで日本語の「音」検索を作る"
summary: "Zennのmattn氏の実践記事は、SQLite公式のベクトル検索拡張vec1のビルドから使い方、Goからの利用までを実際に動かして紹介している。vec1で、言語モデルを使わず22万語の読みの近さを引くツールも作っている。"
points:
  - "vec1は2026年9月30日にSQLiteのソースツリー（ext/vec1/）へ取り込まれた公式のベクトル検索拡張。現状はamalgamationに含まれず、make vec1.soで自前ビルドする"
  - "距離はL2とコサイン、インデックスはIVFADC＋OPQ。件数が少なければ全件比較（flat）で足りる。trunkのバージョンは0.8"
  - "埋め込みモデルがなくても「数値の並びの近さ」を測れる。音のキーを2〜3文字の断片にハッシュしたベクトルで22万語を2秒ほどで取り込めた"
category: backend
sourceName: "Zenn（mattn氏）"
sourceUrl: "https://zenn.dev/mattn/articles/6e9996319ac099"
publishedAt: "2026-10-12T07:10:00+09:00"
---

## どんな実践報告か

SQLiteの周辺で知られるmattn氏による、vec1の実機ハンズオンです。vec1はSQLite公式のベクトル検索（近似最近傍探索）拡張で、2026年9月30日にDan Kennedy氏のコミットで`ext/vec1/`としてソースツリーに入りました。これまで定番だったAlex Garcia氏のsqlite-vecなど、サードパーティ拡張とは違う公式の選択肢です。

## ビルドと基本の使い方

SQLiteのソースツリーで次を実行します。amalgamation（`sqlite3.c`）には含まれず、`make vec1.so`で作るローダブル拡張という扱いです。

```bash
./configure
make sqlite3 vec1.so
```

```sql
.load ./vec1
SELECT vec1_info();   -- version 0.8 (AVX2, multi-threaded)
CREATE VIRTUAL TABLE v USING vec1;
INSERT INTO v(cmd, vector) VALUES('rebuild', '{index:"flat", distance:"l2"}');
SELECT rowid, distance FROM v(vec1_from_json('[0.9,1,1.1,1]'), '{K:2}');
```

ベクトルはfloat32のBLOBで、検索結果は普通のSQLなので元テーブルとJOINしたりWHEREで絞ったりできます。L2のdistanceは二乗距離です。大量データでは`vec1_train()`で学習し、検索時に見るバケットの割合は`vec1_config('nprobe')`（既定は5%）で調整します。

## 言語モデルなしで「音」検索を作る

ベクトル検索は埋め込みモデルがなくても使える、という例として、著者は読みの近さで日本語の単語を引くツール`yomivec`を作りました。

- ローマ字に揃え、lをr、vをbに寄せて「音のキー」にする（lemonもレモンもremon）
- 英単語はcakeをkekに直すなど、カタカナ語に近づける規則を入れる
- 音のキーを2〜3文字の断片に切り、ハッシュで256個の箱に数えたものをベクトルにする
- IPAdicの約22万語を登録（約2秒）し、コサイン距離の近い順に取り出す

「バナーナ」でバナナ、「hamburger」でハンバーガーが引けました。音しか見ないので、「とうふ」で「塗布」も出ます。

## 注意点

vec1は1.0前で、公式ページでもテストはまだ不十分とされています。本番投入は様子を見る段階です。
