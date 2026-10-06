---
title: "Gleam v1.19.0、Erlangソースではなく「抽象形式」を直接出力するように"
summary: "Gleam v1.19.0で、Erlangターゲットのコード生成がErlangソースではなくErlangの抽象形式（abstract forms）を出す方式に書き直されました。ビルドが速くなり、スタックトレースの行番号もGleamのソースに正しく対応します。"
points:
  - "抽象形式はErlangコンパイラの中間表現で、Elixirも同じ方式"
  - "BEAMのクラッシュレポートやスタックトレースの行番号が正確に"
  - "BEAMバイトコードを直接出さないのは、VMごとに変わり追従が重いため"
category: backend
sourceName: "Gleam"
sourceUrl: "https://gleam.run/news/gleam-doesnt-compile-to-erlang-source-anymore/"
publishedAt: "2026-10-07T07:20:00+09:00"
---

## 何が変わったか

Erlang VM と JavaScript ランタイムで動く型安全な言語 Gleam の v1.19.0 が10月5日に公開された。目玉は、Giacomo Cavalieri 氏が数か月かけて書き直した Erlang 向けのコード生成器だ。これまでは Erlang のソースコードを出力していたが、今回から Erlang の抽象形式（abstract forms）を出す。

抽象形式は Erlang コンパイラが内部で使う中間表現で、普通は Erlang のトークナイザーとパーサーが作る、メタデータ付きの構文木だ。Erlang の外部項形式でバイナリにできるので、Gleam は生成したコードを直接読み込ませ、Erlang コンパイラの前半の処理を飛ばせる。Hacker News でも話題になった。

## 何がうれしいか

- コンパイラが速くなり、Erlang 上で動く Gleam プロジェクトのビルド時間が大きく短くなった。José Valim 氏の `langcompilebench` をもとにしたベンチマークでも v1.17.0 から大きく改善している
- 実行時の位置情報が、生成された Erlang ではなく元の Gleam ソースに対応するようになった。BEAM のクラッシュレポートやスタックトレースの行番号が正確になり、これまでのように近くの関数までしか分からないことがなくなる
- 古くからあったコード生成器が、今のコンパイラの基準に沿った実装に置き換わった

## なぜバイトコードを直接出さないのか

BEAM のバイトコードは、Erlang ソースや抽象形式と違って固定されておらず、VM のリリースごとに変わる。それに追い続け、Erlang コンパイラが数十年かけて積み上げた最適化を作り直すのは、スポンサーで運営されるコミュニティプロジェクトには重すぎる、と作者の Louis Pilfold 氏は説明している。Elixir も抽象形式を経由しているので、同じ選択だという。

## そのほか

JavaScript ターゲットでは、`case` 式から生成するコードが平らになり、短いリストリテラルを配列から変換せずに直接組み立てるようになった。TypeScript の宣言で型パラメータを保つオーバーロードの追加、言語サーバーのラベル対応、Mix や rebar3 などほかのビルドツール向けの改善も入っている。
