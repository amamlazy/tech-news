---
title: "AIエージェントに「最新のWeb標準」を教えるスキル「Modern Web Guidance」　Chrome・Edge・Firefox・MDNが共同で"
summary: "Google Chrome、Microsoft Edge、Mozilla Firefox、MDNのチームが、コーディングAIが古い書き方のJavaScriptを出しがちな問題を減らすためのスキル集「Modern Web Guidance」を公開しています。npxで導入でき、最新のブラウザ機能の使い方をAIの文脈に直接渡します。"
points:
  - "AIは学習データに古いコードが多く、ネイティブ機能で済む処理にも重いJavaScriptを書きがち"
  - "View Transitions、コンテナクエリ、Popover API、アクセシビリティなどのガイドを収録"
  - "「npx modern-web-guidance@latest install」で導入、古い書き方を探すlegacy-scanも"
category: frontend
sourceName: "GitHub（GoogleChrome/modern-web-guidance）"
sourceUrl: "https://github.com/GoogleChrome/modern-web-guidance"
publishedAt: "2026-11-11T07:30:00+09:00"
---
Modern Web Guidance（モダン・ウェブ・ガイダンス）は、ClaudeやCodexのようなコーディング用AIエージェントに、最新のWebの書き方を教えるための「スキル」（AIに読ませる手引き書とツールのセット）です。GoogleChrome組織のGitHubリポジトリで公開され、Hacker Newsの「Show HN」でも紹介されて話題になりました。

## 何を解決するのか

リポジトリの説明によると、コーディングAIは学習データに古いコードが大量に含まれているため、今ならブラウザの標準機能で軽く書ける処理にも、重たいJavaScriptを生成しがちです。APIの存在は知っていても、実際の正しい使い方の例が足りないことも多いといいます。

Modern Web Guidanceは、専門家がまとめたガイドをCLI（コマンドで動くツール）経由でAIのコンテキスト（AIが作業中に参照する情報）に直接渡し、次の点に重点を置いています。

- **最新のブラウザAPI**：AIがよく間違えるAPIの正しい組み立て方
- **性能とアクセシビリティ**：ブラウザ側で最適化され、使いやすさの配慮が組み込まれた標準機能を優先
- **無理のない代替手段**：重いポリフィル（古いブラウザ向けの補助コード）ではなく、軽い代替策を使う

管理は、Google Chrome、Microsoft Edge、Mozilla Firefox、MDNの各チームとWeb開発コミュニティが担っています。

## 収録内容

View Transitions（画面切り替えのアニメーション）、コンテナクエリやsubgridなどのCSSレイアウト、INP（操作への反応の速さの指標）の診断、Popover APIやダイアログ、アクセシビリティ、ブラウザ内蔵AIの翻訳・要約APIなど、ここ数年の新機能を幅広く扱います。モデルがすでに知っている内容は評価（eval）で削り、トークンを節約する設計です。

## 使い方

```bash
npx modern-web-guidance@latest install
```

で対話式に導入できます。インストールせずに試すなら、`search`でガイドを検索、`retrieve`でIDを指定して取得、`legacy-scan .`でコードベースの古い書き方を洗い出せます。
