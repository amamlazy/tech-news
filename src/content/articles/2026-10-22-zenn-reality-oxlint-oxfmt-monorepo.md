---
title: "【実践】ESLint＋PrettierからOxlint＋Oxfmtへ　REALITYのモノレポ移行で分かった落とし穴"
summary: "REALITYのToshiki Okazaki氏がZennで、ESLint＋Prettierを使っていたモノレポを、Biomeと比べたうえでOxlint＋Oxfmtに移行した実践記事を公開した。チェック時間は約3分の1になり、コーディング規約をドキュメントからlintのルールへ移す運用や、自動修正がコードの意味を変えてしまった事例も紹介している。"
points:
  - "BiomeはTailwindの独自ユーティリティを並べ替えられず、71ファイルで順番が変わり見送り"
  - "OxfmtはPrettierとの差分ゼロ、import順もTailwindのクラス順も再現できた"
  - "lintとformatのチェックは合計9.29秒から2.95秒に、直接の依存は14種類から3種類に"
  - "lintのエラーメッセージに「なぜダメか」と「代わりに何を使うか」を書く"
  - "自動修正で使っていたimportが消えたり、テストの意味が変わったりした例も"
category: frontend
sourceName: "Zenn（REALITY Tech）"
sourceUrl: "https://zenn.dev/reality_tech/articles/oxc-monorepo-20261006"
publishedAt: "2026-10-22T08:00:00+09:00"
---

linter（リンター）はコードの書き方の問題を見つける道具、formatter（フォーマッター）はコードの見た目を自動で整える道具です。JavaScriptの世界では長くESLintとPrettierが定番でしたが、最近はRustなどで書かれた高速な代わりのツールが出てきています。この記事は、REALITYのToshiki Okazaki氏が、実際の大きなリポジトリで乗り換えを試した実践レポートです。

## なぜ乗り換えたのか

筆者は、AIコーディングエージェントがファイルを編集するたびにlintとformatを走らせる使い方が一般的になり、1回数秒の待ち時間でも何十回も繰り返すと無視できなくなったと書いています。

対象は、pnpm workspaceとTurborepoで複数のパッケージをまとめて管理する「モノレポ」です。スタイルにはTailwind CSS v4を使い、デザインシステムの色や文字サイズを `@theme` で独自のユーティリティクラスとして定義していました。

## Biomeを見送った理由

最初に試したRust製のBiomeは、約460ファイルのうち整形の差分が1ファイルだけで、速さも十分でした。ただし、2つの差分が出ました。

- import文の並び順：社内パッケージのグループ分けが変わり85ファイルに差分。これはルールを合わせれば済むと判断
- Tailwindのクラスの並び順：71ファイルで順番が変わった。Biomeは既定の並び順を内部に持っていて、プロジェクトのスタイルシートを読まないため、`@theme` で定義した独自クラスを「知らないクラス」として扱ってしまう

後者は設定では直せない仕組みの違いで、Prettierを残すと道具が2つになり、構成をシンプルにしたいという目的に合わないため見送りました。

## Oxlint＋Oxfmtで再現できたこと

VoidZero（ViteやRolldownの開発元）が作るOxcのOxfmtは、Prettierと同じ設定を指定するだけで整形の差分がゼロでした。

- `sortImports` の `customGroups` で、React、Next.js、社内パッケージ（`@repo/**`）などのグループと空行を再現
- `sortTailwindcss` に `stylesheet`（スタイルシートのパス）と `functions: ["cn", "cva"]` を指定すると、独自クラスも含めて従来と同じ順番に並んだ

注意点として、`tailwindcss` パッケージを `node_modules` から見つけられない場所で実行すると、エラーも出ずにTailwindの並べ替えだけが行われないことがあったそうです。わざとクラスの順番を崩して並べ替わるか確かめておくと安心だとしています。

## 移行の手順と結果

作業は差分の種類ごとにコミットを分けました。

1. Oxlint・Oxfmtを追加して設定を作る（ESLintとPrettierはまだ残す）
2. Oxfmtで全体を整形するだけのコミット
3. Oxlintの自動修正だけのコミット（`import type` への書き換えが224ファイル）
4. scriptsやCIを差し替え、不要な依存を消す

設定は `.oxlintrc.json` と `.oxfmtrc.json` の2ファイルになり、lintとformatのための直接の依存は14種類から3種類（`oxlint`、`oxfmt`、`oxlint-tsgolint`）に減りました。チェック時間はESLint＋Prettierの9.29秒から2.95秒（Biomeは2.69秒）で、どちらもpnpmの起動時間約1.1秒を含みます。

## 規約を「コード」に移す

筆者は、コーディング規約を3つの置き場所に振り分けました。

- **formatter**：import順やクラス順のように正解が1つで機械的に直せるもの
- **linter**：違反は見つけられるが直し方に判断が要るもの
- **ドキュメント**：機械的に判定できないものと、判断の理由

linterでは、例えば `next/link` を使うと言語の切り替え用のパス（locale prefix）が落ちるため、`no-restricted-imports` で禁止し、メッセージに「なぜダメか」と「代わりに `@/i18n/navigation` のLinkを使う」を書いています。AIエージェントもlintのエラーを読んで直すので、規約の文書を別に読ませなくても正しい形に誘導できるといいます。

型情報を使うlint（`--type-aware`）を有効にすると、結果を待つ（await）ことも失敗を受け止める（catch）こともしていないPromise（非同期処理）が2カ所見つかりました。

## 気をつけていること

- **ルールは1つずつ増やす**。一度に増やしたら差分を追えなくなった
- **offにするルールには理由をコメントで書く**（`.oxlintrc.json` はコメントを書ける）
- **自動修正のあとはテストまで回す**。型のimportを分けるルールと重複importをまとめるルールの組み合わせで、値として使っていた `buttonVariants` が消えた。`prefer-called-with` の自動修正では、「呼ばれたこと」の確認が「引数なしで呼ばれたこと」の確認に変わり、型チェックは通ってしまった
- **エージェントの編集ごとの自動修正に注意**。importと使う側を別々に書くと、間で走ったlintが未使用のimportを消してしまう。そこで「importと、それを使うコードは1回の編集で書く」とエージェントに指示している

## トレードオフ

`eslint-plugin-turbo` のように、Oxlintに相当するルールがないものもあります。また、カテゴリでまとめて有効にする際、Reactの `rules-of-hooks` が `correctness` ではなく `pedantic` に入っていて、気づかないうちに無効になっていたそうです。Oxfmtはまだ若く、版によって整形結果が少し変わるため、バージョンを固定しているとのことです。
