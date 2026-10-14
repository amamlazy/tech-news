---
title: "「SvelteKit 3」正式版、設定をvite.configに集約し$libは#libへ"
summary: "Webアプリフレームワーク「SvelteKit 3」の正式版がリリースされ、Publickeyが変更点をまとめた。大きな新機能よりも、設定のVite集約や型安全・エラー処理の改善といった整理が中心のメジャーアップデートだ。"
points:
  - "svelte.config.jsを廃止し、設定はvite.config.js／tsに一本化"
  - "自動生成の$libエイリアスはNode.jsのサブパスインポート「#lib」へ移行"
  - "データ取得やフォーム処理まで型チェック、サーバー用コードの誤インポートも防ぎやすく"
  - "Remote FunctionsやAsync Svelteはフラグで試用可能、移行スクリプトも用意"
category: frontend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/websveltekit_3vite.html"
publishedAt: "2026-10-15T07:20:00+09:00"
---

## 何がリリースされたか

SvelteとViteを基盤に、ルーティング、SSR、フォーム処理、エラー処理、デプロイなどを統合したWebアプリフレームワーク「SvelteKit 3」の正式版がリリースされました。Publickeyによると、SvelteKit 2から大きな機能追加はなく、設定の集約や型安全性の向上、エラー処理の改善といった整理が中心です。開発者のSimon H氏は、環境変数の扱いやエラーメッセージの改善に加え、移行スクリプトが多くを自動で処理し、残りはTodoリストとして示すとXで紹介しています。

## 主な変更点

- **設定の集約**：これまでの `svelte.config.js` が廃止され、SvelteKitの設定はViteの `vite.config.js` または `vite.config.ts` に書くようになりました。Svelteコンパイラ、SvelteKit、Viteの設定を近い場所で管理できます。
- **`$lib` から `#lib` へ**：SvelteKitが自動生成していた `$lib` エイリアスがなくなり、Node.jsのサブパスインポートを使う `#lib` に移行しました。定義は `package.json` の `imports` フィールドで行います。独自規約が減り、Node.jsやTypeScriptとの互換性が高まります。
- **型安全とエラー処理**：データ取得、フォーム処理、ルーティング、サーバーとの通信などにも型チェックが効くようになり、開発時にエラーを見つけやすくなりました。シークレットを扱うサーバー用コードをブラウザ側から誤ってインポートすることも防ぎやすくなっています。

## 今後の見どころ

サーバー側の関数をコンポーネントから通常の関数のように呼べる「Remote Functions」や、コンポーネント内で非同期処理を自然に書ける「Async Svelte」は開発中で、SvelteKit 3でもフラグ設定で利用できます。Publickeyは、これらが正式機能になるタイミングでSvelteKit 4になるのではないかと見ています。
