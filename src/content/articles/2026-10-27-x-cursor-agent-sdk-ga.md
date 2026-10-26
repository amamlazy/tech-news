---
title: "【Xで話題】Cursorが「Agent SDK」の一般提供を発表"
summary: "AIコードエディタのCursorが、自社のレビューボットなどを動かしている仕組み「Agent SDK」の一般提供開始をXで発表し、1,900件以上のいいねを集めました。"
points:
  - "BugbotやSecurity Reviewerを支えるエージェント開発フレームワーク"
  - "プロンプトはMarkdown、ツールはTypeScriptで書き、agent-sdk deployで公開"
  - "評価（eval）やイベント再生機能を内蔵、GitHub/GitLab/Bitbucketに対応"
category: x-trend
sourceName: "X"
sourceUrl: "https://x.com/cursor_ai/status/2114793714531102901"
publishedAt: "2026-10-27T08:35:00+09:00"
---

CursorはAIがコードを書く手伝いをしてくれるエディタです。SDK（ソフトウェア開発キット）は、開発者が自分でツールを作るための部品と道具のセットのことです。

## 何が発表されたか

Cursorの公式アカウントは10月27日未明（日本時間）、「Agent SDK」が一般提供（GA）になったと投稿しました。投稿は13万回以上表示、1,981いいねを集めています。

## Agent SDKの中身（公式ブログより）

- Cursor自身のBugbot（自動バグ検出）、Security Reviewer、Rolloutsを支えているフレームワーク。
- プロンプトはMarkdown、ツールはTypeScriptで定義し、`@cursor/agent-sdk`の`defineAgent`で組み立てる。
- `agent-sdk deploy`でCursor上に公開するか、Nodeのプロセス1つとして自前で動かせる。
- 評価（eval）とイベント再生を内蔵し、GitHub/GitLab/Bitbucketのイベントで起動できる。

## 事例

ブログでは、ナレッジベースをレビューする「kb-reviewer」を約1日で作った例や、PGA Americaの導入コメントも紹介されています。自社専用のコードレビューボットを作りたいチームには注目の選択肢です。
