---
title: "CloudflareらがTypeScriptのRust移植「tsrs」を発表、型チェックが最大8倍速くメモリ7割減"
summary: "CloudflareとVoidZeroが、TypeScriptのコンパイラをRustに移植する「tsrs」を、TypeScriptチームと協力して進めると発表した。TypeScript 7.0と比べて最大8倍速く、メモリ使用量は約70%少ないという初期ベンチマークを示し、npmで試験版を公開している。"
points:
  - "フォークではなく、言語の設計はTypeScriptチームが決めるという立場"
  - "同じワーカー数の比較で最大8倍高速、メモリは約70%削減と説明"
  - "Rustを選んだ理由はWebAssemblyでの動かしやすさとメモリ効率"
  - "npm install tsrs と npx tsrs で試験版を試せる"
category: frontend
sourceName: "The Cloudflare Blog"
sourceUrl: "https://blog.cloudflare.com/typescript-rust-port/"
publishedAt: "2026-10-21T07:55:00+09:00"
---

TypeScriptは、JavaScriptに「型」（変数に入る値の種類の決まり）を足した言語で、書いたコードが型の決まりに合っているかを調べる「型チェック」を行うのがコンパイラの大事な仕事です。tsrsは、そのコンパイラをRustという高速な言語で書き直すプロジェクトです。

## 何が発表されたか

Cloudflareのブログによると、CloudflareとVoidZero（Viteなどの開発ツールを手がける会社）は、Owner.comのMax Schwenk氏とともに、TypeScriptコンパイラのRust移植「tsrs」に取り組んでいます。TypeScriptチームと密に連携し、Rust製のJavaScriptツール群「Oxc」の一部として育てるとしています。

ブログは「TypeScriptをフォークするのではない」と強調しています。言語の設計や方向性はTypeScriptチームが決めるべきで、移植版はその決定に厳密に従わなければいずれ互換性が崩れる、という考えです。

## どれくらい速いのか

初期のベンチマークでは、型チェックのワーカー数をそろえた比較で、TypeScript 7.0より最大8倍速く、メモリは約70%少ないとしています。また、次のTypeScript 7.1ベータ自体もTypeScript 7.0より最大2.5倍速くなっており、その最適化の一部はtsrsから本家に取り込まれたものだといいます。

ベンチマークはTypeScriptチームと協力して、同じ設定で比べるようにしたと説明しています。

## なぜRustなのか

TypeScriptチームはすでにGo言語への移植で約10倍の高速化を実現しています。それでもRustを選んだ理由として、ブログはWebAssembly（ブラウザなどで動く共通の実行形式）との相性を挙げています。Goをこの形式にするとガベージコレクタ（不要なメモリを自動で片付ける仕組み）も一緒に入れる必要がありますが、Rustならメモリを小さく抑えやすいためです。これにより、開発環境をまるごとブラウザやCloudflare Workers上の隔離環境で動かすことを狙っています。

## 試すには

試験版はnpmで公開されています。

```bash
npm install tsrs
npx tsrs
```

今のところ、エラーメッセージの表示順など本家との違いが残っているとのことです。Theo Browne氏の「tsc-rs」と1つのパッケージに統合し、LSP（エディタの補完などを支える仕組み）にも対応させる計画も示されています。
