# 記事ファイルの形式

自動でも手でも、記事はこの形で追加します。判定の実装は `scripts/validate-articles.mjs` と `src/lib/article-schema.mjs` です。`npm run check` が失敗したら、この文書とエラーメッセージの両方を直してからマージしてください。

公開されるのは `src/content/articles/` のファイルだけです。記入例は `docs/examples/2026-09-30-example.md` にあります。例をコピーして使ってください。

## ファイル名

```text
src/content/articles/YYYY-MM-DD-slug.md
```

- ディレクトリ直下だけ。サブフォルダは不可。
- `YYYY-MM-DD` は実在する日付で、`publishedAt` の日付（日本時間）と一致させる。
- `slug` は `^[a-z0-9]+(?:-[a-z0-9]+)*$`。英小文字、数字、ハイフン。80文字以内。
- 例: `2026-09-30-welcome.md`

URL は `/tech-news/articles/YYYY-MM-DD-slug/` になります。

## frontmatter

YAML です。ファイルは `---` で始まり、もう一つの `---` で本文と分かれます。次のキーだけを、この名前のまま書きます。増やすと `npm run check` が失敗します。

| キー | 型 | 制約 |
| --- | --- | --- |
| `title` | 文字列 | 1〜100文字。ページの h1 になる |
| `summary` | 文字列 | 20〜280文字。`。` `！` `？` で区切った1〜2文 |
| `points` | 文字列の配列 | 2〜5個。各1〜120文字。ふつうは3個 |
| `category` | 文字列 | 下の slug のいずれか |
| `sourceName` | 文字列 | 1〜80文字。媒体名やアカウント名 |
| `sourceUrl` | URL | `http://` または `https://` |
| `publishedAt` | 文字列 | 下記の1行。二重引用符が必須 |

`publishedAt` はこの1行だけです。引用符を外すと日付型になり、`+09:00` が落ちるので失敗します。

```yaml
publishedAt: "2026-09-30T09:00:00+09:00"
```

- 形は `YYYY-MM-DDTHH:mm:ss+09:00` 固定。秒まで書く。ミリ秒は書かない。
- オフセットは `+09:00` のみ。`Z` や `+00:00` は不可。
- コロンのあとはスペース1つ。
- 並び順は `publishedAt` の新しい順。同じ時刻ならファイル名の降順。

## カテゴリ

| slug | 表示名 | 使うとき |
| --- | --- | --- |
| `ai` | AI | モデル、エージェント、AIプロダクト |
| `frontend` | フロントエンド | UI、ブラウザ、フレームワーク |
| `backend` | バックエンド | サーバ、インフラ、言語、データ |
| `career` | キャリア | 働き方、組織、スキル |
| `gadget` | ガジェット | デバイス、ハードウェア |
| `x-trend` | Xで話題 | X 上の投稿が主な出典の話題 |
| `weekly` | 今週のまとめ | 一週間の振り返り。`/weekly/` に出る |

## 本文

Markdown。ページ側が `title` を h1 にするので、本文の見出しは `##` または `###` から始めます。見出しが1つもないと失敗します。

要約は frontmatter の `summary`、箇条書きは `points` に書き、本文は背景や詳細に使います。

## テンプレート

```markdown
---
title: "記事タイトル"
summary: "1文目です。必要なら2文目です。"
points:
  - "短いポイント"
  - "短いポイント"
  - "短いポイント"
category: ai
sourceName: "媒体名"
sourceUrl: "https://example.com/original"
publishedAt: "2026-09-30T09:00:00+09:00"
---

## 何が変わったか

本文。

## 現場で見るところ

本文。
```

`sourceUrl` の `https://example.com/original` は形の見本です。実際の記事では、出典の実在する URL に置き換えてください。

## チェック

```bash
npm run check
```

失敗すると終了コード 1 で、`パス: 理由` を stderr に出します。`npm run build` と `astro dev` でも同じチェックが走ります。

チェッカー自身の自己テストも `npm run check` に含まれます。正しい記事を拒否したり、壊れた frontmatter を通したりすると、ここでも失敗します。
