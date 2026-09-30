---
title: "npm Trusted Publishingでdist-tag管理がOIDC対応に"
summary: "GitHubがnpmのTrusted Publishingに、短命OIDC資格情報でdist-tagを操作できるオプトイン権限を追加しました。latestやnextの付け替えのために長期トークンを残す必要がなくなります。"
points:
  - "Allow npm dist-tag 権限は既定オフのオプトイン"
  - "公開権限と独立して、staging専用設定にも付与可能"
  - "従来のトークンベースのdist-tag操作も引き続き利用可"
category: backend
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-09-30-opt-in-dist-tag-permissions-for-npm-trusted-publishing/"
publishedAt: "2026-10-01T07:15:00+09:00"
---

## 何が変わったか

GitHub は 2026年9月30日、npm Trusted Publishing の設定に dist-tag 管理用のオプトイン権限を追加した。これまで Trusted Publishing は公開や staging をカバーしていたが、`latest` / `next` / `beta` などのタグ操作には別途長期アクセストークンが必要だった。

新しい `Allow npm dist-tag` を有効にすると、短命の OIDC 資格情報だけで dist-tag を操作できる。新規・既存どちらの設定も既定はオフで、自動的に権限が広がることはない。staging 専用の設定にも独立して付与でき、着信 OIDC が権限付き設定のいずれかに一致すれば認可される。

## 現場で見るところ

トークンレスなリリースフローをほぼ完成させていたメンテナーにとって、最後に残っていたタグ用トークンを削減できるのが大きい。ロールバックやプリリリース昇格を CI から行うパッケージは、Trusted Publishing 設定画面で必要な構成だけに権限を付ける運用が推奨される。既存のトークン運用も壊さないため、段階移行しやすい。
