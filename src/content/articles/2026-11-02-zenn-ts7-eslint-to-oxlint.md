---
title: "【実践レポート】TypeScript 7へ上げようとしたらESLintが動かず　Oxlintへ乗り換えた手順と落とし穴"
summary: "Dependabotが出したTypeScript 7.0.2への更新が、typescript-eslintの対応バージョンの制約で失敗。そこでリンターをOxlintに切り替え、TypeScript 6.0以降の既定値の変更にも対応した記録がZennで公開されました。"
points:
  - "typescript-eslint 8.71.2は「TypeScript 6.1未満」を要求し、ERESOLVEエラーで更新が止まった"
  - "Oxlint 1.89.0に移行し、.oxlintrc.jsonで主要なルールを設定"
  - "Oxlintにないsemiやmax-lenは、AGENTS.mdに規約として書いてAIに守らせる形に"
  - "TypeScript 6.0で変わったtypesやstrictの既定値にも対応が必要だった"
category: frontend
sourceName: "Zenn（kyto64）"
sourceUrl: "https://zenn.dev/kyto64/articles/ts7-eslint-to-oxlint"
publishedAt: "2026-11-02T10:50:00+09:00"
---

リンター（Linter）は、コードの書き方の間違いや危ない書き方を自動で見つけてくれる道具です。この記事は、TypeScript（型のあるJavaScript）を新しいバージョンに上げようとしたら、定番リンターのESLintが対応しておらず、より新しいリンター「Oxlint」に乗り換えた実録です。

## 何が起きたのか

kyto64さんの記事（11月1日公開）によると、Dependabot（依存ライブラリの更新を自動で提案してくれるGitHubの機能）が、TypeScriptを5.9.3から7.0.2に上げるPRを作りました。ところが、typescript-eslint 8.71.2が「typescript <6.1.0」を条件にしていたため、npmのERESOLVEエラー（依存関係の条件が合わないエラー）でインストールに失敗しました。

## Oxlintへの移行

そこで、Oxlint 1.89.0へ移行しました。設定ファイル `.oxlintrc.json` では、プラグインとして eslint／typescript／oxc を有効にし、`correctness` を error に、さらに `no-var`、`prefer-const`、`typescript/no-explicit-any` などを指定しています。

Oxlintに同じ機能がない `semi`（行末のセミコロン）や `max-len`（1行の長さ）は、AGENTS.md（AIコーディングエージェント向けの説明書きファイル）に規約として書く形にしました。

## TypeScript 6.0の既定値変更にも注意

バージョンアップでは、TypeScript 6.0で変わった既定値にも引っかかりました。

- `types` の既定値が空（`[]`）になったため、`"types": ["node","mocha"]` を明記する必要があった
- `strict` が既定で有効になったため、`noImplicitAny`（型が書かれていない変数をエラーにする設定）のエラーを直す必要があった

変更は追加771行・削除1,226行で、DependabotのPRは閉じ、代わりに作ったPR #36で取り込んだそうです。

## 読みどころ

「バージョンを上げたいのに周辺ツールが追いつかない」は誰でも出会う問題です。リンターごと乗り換えるという判断と、機能の穴をAGENTS.mdで補うという今どきの工夫が、具体的な設定つきで分かります。
