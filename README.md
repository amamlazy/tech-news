# テック日報

忙しい日でも、X のタイムラインを追う代わりに1ページだけ開くための技術ニュース要約です。

公開先: <https://amamlazy.github.io/tech-news/>

AI、フロントエンド、バックエンド、キャリア、ガジェットに加え、X で話題になったものと、週に一度のまとめを同じ場所に並べます。データベースもサーバも使いません。記事は Markdown ファイルで、`main` に入ると GitHub Pages へ自動で出ます。

## ページ

- `/` 日付ごとの記事一覧。タイトルと要約、カテゴリ・出典・時刻を見て、記事ページでポイントと本文を読む。カテゴリのタブで絞り込める
- `/category/ai/` など、カテゴリごとの一覧
- `/articles/YYYY-MM-DD-slug/` 要約、ポイント、本文、出典
- `/weekly/` 今週のまとめ（`category: weekly`）
- `/rss.xml`

## 記事を追加する

1. `docs/examples/2026-09-30-example.md` をコピーする
2. `src/content/articles/YYYY-MM-DD-slug.md` として保存する
3. frontmatter と本文を書き換える
4. `npm run check` を通してから `main` にマージする

ファイル名、frontmatter、本文の規則は [`docs/ARTICLE_FORMAT.md`](docs/ARTICLE_FORMAT.md) が正本です。フィールドは `title`、`summary`、`points`、`category`、`sourceName`、`sourceUrl`、`publishedAt` だけです。

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

## 見出し

本文。
```

`publishedAt` は二重引用符つきの日本時間（`+09:00`）で、ファイル名の日付と揃えます。カテゴリの slug は `ai`、`frontend`、`backend`、`career`、`gadget`、`x-trend`、`weekly` です。

最初から入っている `src/content/articles/2026-09-30-welcome.md` は、形式を見せるためのサンプルです。ニュースではありません。

## 開発

Node.js 22 以上。

```bash
npm install
npm run dev
```

開発サーバは <http://localhost:4321/tech-news/> です。サブパス付きで公開するので、ローカルも `/tech-news/` から開きます。

```bash
npm run check   # frontmatter とファイル名
npm run build   # チェックして dist/ を作る
npm run preview
```

## デプロイ

`.github/workflows/deploy.yml` が、`main` への push ごとに `npm ci`、`npm run check`、`npm run build` を実行し、`actions/deploy-pages` で GitHub Pages に出します。

リポジトリの **Settings → Pages → Build and deployment → Source** が **GitHub Actions** になっている必要があります。まだなら、一度だけそこを選んでください。選んだあとは、`main` へのマージで更新されます。
