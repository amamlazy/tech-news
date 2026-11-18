---
title: "【試してみた】Rust製TypeScriptコンパイラ「tsrs」を入れたら型チェックが229秒→11秒に　ぷーじ氏がCIでの置き換えを報告"
summary: "TypeScriptの型チェックをRustで書き直した「tsrs」が、高速なリンター「oxlint」から使えるようになりました。DRESS CODEのぷーじ氏が、発表の翌日に自社のフロントエンドとバックエンドへ導入し、速さ・結果の一致・つまずいた点をZennにまとめています。"
points:
  - "バックエンドの型チェックはCIの中央値で229秒から11秒に。指摘内容は一致した"
  - "pnpm add -D tsrs と pnpm remove oxlint-tsgolint で入れ替え。tsgolintが残るとそちらが使われる"
  - "TypeScript 7.1準拠のためTS2674が1カ所増えた。knipの誤検知やキャッシュの扱いにも注意"
category: frontend
sourceName: "Zenn（DRESS CODE）"
sourceUrl: "https://zenn.dev/dress_code/articles/6c179ae5129131"
publishedAt: "2026-11-19T05:50:00+09:00"
---
tsrs（ティーエスアールエス）は、TypeScript 7のコンパイラ（tsc）をRust言語に移植したものです。型チェック（変数の型の食い違いなどを見つける作業）を速くするための道具で、11月17日にoxlint（Rust製の高速なリンター＝コードの問題点を指摘するツール）の「型を使った検査」で使えるようになりました。この記事は、DRESS CODEのぷーじ氏（@yug1224）がZennに書いた導入レポートの要約です。

## どれくらい速くなったか

ぷーじ氏のチームでは、型を使ったlintと型チェックがCIの重い工程で、キャッシュが効かないとバックエンドの型チェックだけで4分以上かかっていました。11月15〜18日のCI実行ログを集めたところ、バックエンドの型チェックは中央値で229秒（708回）から11秒（30回）になり、20倍以上速くなったといいます。フロントエンドはまだ実行回数が少ないため参考値としています。

一方でメモリは、フロントエンドでは3〜4割減ったものの、バックエンドの型チェックは最大使用量6.6GBで変わらなかったそうです。

## 結果は同じか

置き換えで指摘が変わっては困るため、従来のtsgolint・tscと比べました。フロントエンドのlint指摘97件はすべて一致し、バックエンドのwarning 1496件も同じ、型エラーも位置やエラー番号まで一致しました。違うのは失敗時の終了コードで、tscは1、tsrsは2を返します。

## 導入の手順

まだbeta版なので、いきなり差し替えず2段階にしています。

1. マージを止めない別ジョブ「Typecheck (tsrs)」をCIに足し、tscと同じ環境で並べて走らせる
2. 結果が合うのを確かめてから、型チェックのscriptをtsrsに替え、TypeScript 7.0.2を依存から外す

lintの入れ替えは次の2行で、oxlintの設定（`typeAware: true`、`typeCheck: true`）はそのままです。

```
pnpm add -D tsrs
pnpm remove oxlint-tsgolint
```

型チェックのscriptは `tsc --noEmit ...` を `tsrs --noEmit --incremental --diagnostics -p tsconfig.typecheck.json` に替えています。

## つまずいたところ

- oxlint-tsgolintとtsrsが両方入っていると、oxlintはtsgolintを使った。外す必要がある
- tsrsはTypeScript 7.1 beta準拠のため、関数が返す無名クラスの中で `new this()` を使う箇所がTS2674エラーになった。名前付きクラスにして返すと通る
- tscが書いた .tsbuildinfo（差分チェック用の記録）は版違いとして読み捨てられ、全件を検査し直す
- 未使用の依存を探すknipがtsrsの使われ方を追えず、設定で除外した
- oxlintを1.93.0に上げたことで、描画中に `new Date()` を呼ぶ箇所の指摘（react/purity）などが新たに出た
