---
title: "【試してみた】TypeScript 7.1の「Content Mapper」で、型を作る生成コマンドをなくす　ライブラリの型をユーザーのコードから自動で導く"
summary: "TypeScript 7.1で入る「Content Mapper」を使い、wrangler typesやprisma generateのような「型定義ファイルを生成するコマンド」を不要にする方法を、toiroakr氏がZennで紹介しました。設定を書き換えた時点で型が変わる一方、--runExternalCodeが必要で、APIはまだ正式版ではないといった注意点もまとめています。"
points:
  - "空の独自拡張子ファイル（例：.mycli）をライブラリ側からimportさせ、mapperがユーザーのコードを読んで型を返す"
  - "ユーザーはtsconfig.jsonのcontentMappersに1件書くだけ。tsc --watch中も編集に追従する"
  - "7.1でも--runExternalCodeがないとエラー、7.0系ではエラーにならず型だけ付かないので要注意"
category: frontend
sourceName: "Zenn"
sourceUrl: "https://zenn.dev/toiroakr/articles/typescript-content-mapper-codegen"
publishedAt: "2026-11-20T05:00:00+09:00"
---
Content Mapper（コンテンツマッパー）は、TypeScript 7.1で入る新しい仕組みです。.tomlや.vueのように、TypeScriptが本来は読めない種類のファイルを外部のプログラム（mapper）がTypeScriptのテキストに変換し、型チェックに含められるようにします。この記事は、toiroakr氏がZennに書いた、その応用を手を動かして確かめた解説の要約です。

## 解きたかった課題

ライブラリの型は公開した時点で固定されているため、ユーザーが書いた設定に合わせて型を変えたいときは、これまで型定義ファイルを生成するコマンドで補ってきました。例として、`wrangler types`（wrangler.jsoncからEnvの型を生成）、TanStack Router（routeTree.gen.tsを生成）、`prisma generate` が挙げられています。

ただ、空のinterfaceを生成した宣言で埋める方式（宣言マージ）は、コマンドを再実行するまで型が古いまま残るのが弱点です。設定からオプションを消しても、古い型が受け付けられ続けます。

## Content Mapperでの置き換え方

Content Mapperは.tsや.d.tsを対象にできない（登録するとTS18066エラー）ため、著者は次の工夫をしています。

1. ライブラリ（例：mycli）の `index.d.ts` から、中身が空の独自拡張子ファイル `./global-args.mycli` をimportする。7.1未満の環境でもエラーにならないよう直前に `// @ts-ignore` を置く
2. ライブラリの `package.json` の `typescript.contentMapper` で、mapperの起動方法を宣言する
3. ユーザーは `tsconfig.json` に次の1件だけを書く

`"contentMappers": [{ "package": "mycli", "extensions": [".mycli"], "options": { "entry": "./src/cli.ts" } }]`

TypeScriptが空ファイルのimportをたどるとmapperに変換を頼み、mapperは `entry` に指定したユーザーのコードを読んで型宣言を作り、ライブラリの空のinterfaceを埋めます。空ファイルは、TypeScriptにmapperを呼ばせるための目印にすぎません。

`tsc --watch` のまま設定ファイルを書き換えると、生成コマンドなしで型が変わります。tsconfig.json以外のファイルを読むmapperは `dynamicConfig: true` を宣言し、読んだファイルを `watchedFiles` で知らせると、その変更で変換がやり直されます。

## 注意点

- Content Mapperが返すのは型チェック用のテキストだけ。Prisma Clientのように実行時のコードも生成している場合は、Node.jsの `registerHooks` やバンドラーのプラグインが別に必要
- TypeScript 7.1でも `--runExternalCode` を付けないとTS18068エラー。7.0.2ではフラグ自体が不明なオプション扱いで、フラグなしだと型チェックはエラーなく通るのに型だけが付かない。エディターのTypeScriptも7.1にそろえる必要がある
- mapperは変換のたびに動くので、処理が重いと編集中の型チェックが遅くなる
- 2026年11月19日時点で7.1はBetaと日々のdevビルドのみで、Content Mapper APIはまだ安定化の途中

著者は、この方法を自作のCLIフレームワーク「politty」や、仕事で関わる `@tailor-platform/sdk` で実際に使っているとしています。
