---
title: "GitHub、IssueやPRのタイムラインをスクリーンリーダーがリストとして読めるように"
summary: "GitHubは10月8日、Issue・PR・コミットなどのタイムラインをスクリーンリーダーがリスト構造として読み上げられるよう改善しました。件数や位置の案内に加え、Load more時の追加件数も通知されます。"
points:
  - "リスト構造・件数・現在位置・移動方法を支援技術が案内できる"
  - "Load more / Load all 後に「11件読み込み」などの件数を読み上げ"
  - "github.comとGitHub Enterprise Server 3.23で利用可能。見た目は変わらない"
category: frontend
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-08-screen-readers-can-navigate-timelines-as-lists/"
publishedAt: "2026-10-09T07:40:00+09:00"
---

## 何が改善されたか

GitHub は10月8日、Issue とプルリクエストのタイムラインを、スクリーンリーダーがリストとして辿れるようにした。長い履歴を視覚に頼らず理解し、関連する更新へジャンプしやすくするのが目的だ。

支援技術はリスト構造、項目数、現在位置、イベント間の移動方法を案内できる。Load more や Load all を選ぶと、フォーカスが新しいイベントへ移ったあとに「11件の新しい項目を読み込みました」のように追加件数も読み上げる。以前は読み込み後の案内がなかった。

## 対象範囲

見た目や通常の操作感は変えていない。Issue、PR、コミット、シークレットスキャン警告、ライセンスコンプライアンス警告のタイムラインが対象で、github.com と GitHub Enterprise Server 3.23 で使える。VoiceOver、NVDA、JAWS などで長い履歴をページ送りして試せる。
