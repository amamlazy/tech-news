---
title: "【実践レポート】「checkout@v7」の書き方はもうやめよう　GitHub Actionsの「actions.lock」を実際に使う"
summary: "Progateの横江氏がZennで、GitHub Actionsで「@v7」のようにバージョンを書く危険と、10月28日に一般提供された「actions.lock」で依存をまるごと固定する手順をまとめた実践レポートです。"
points:
  - "タグは書き換えられるので、@v7.0.1のように細かく書いても安全とは限らない"
  - "コミットSHAでの固定も有効だが、中で使われる別のActionまでは固定できない"
  - "gh拡張「gh-actions-lock」を入れて「gh actions-lock」を実行するとロックファイルができる"
  - "バージョンを変えたら再生成を忘れずに、忘れるとCIが「Invalid lockfile」で失敗する"
category: backend
sourceName: "Zenn（Progate）"
sourceUrl: "https://zenn.dev/progate/articles/24b1140180300c"
publishedAt: "2026-10-30T09:30:00+09:00"
---

GitHub Actionsは、GitHubにコードを置くと自動でテストや公開などを実行してくれる仕組みです。この記事は、Progateの横江氏（@yokoe24）による、使うActionのバージョンを安全に固定する方法の実践レポートです。

## なぜ「@v7」は危ないのか

ワークフローでは「actions/checkout@v7」のように、使う部品（Action）をタグで指定するのが一般的です。しかしタグは後から別のコミットに付け替えられます。記事では、2026年3月のaquasecurity/trivy-actionへの攻撃で、攻撃者がタグを強制的に書き換えたため、「@v7.0.1」のように細かく指定していても防げなかった例を挙げています。

GitHubの「Immutable Releases」（一度出したリリースを変更できなくする設定）を使っていれば細かいタグは守られますが、記事執筆時点（10月29日）でactions/checkoutは有効にしていないといいます。

## 対策1：コミットSHAで固定する

タグの代わりに、変わらないコミットのID（SHA）で指定する方法です。

```yaml
- uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
```

ただし、そのActionの中で別のActionを使っている場合、そちらまでは固定できません。trivy-actionも内部でsetup-trivy@v0.2.1を使っていました。

## 対策2：actions.lockを使う（記事のおすすめ）

`.github/workflows/actions.lock`は、10月14日にパブリックプレビュー、10月28日に一般提供になった仕組みで、中で使われるActionまで含めて固定できます。手順は次の2つだけです。

```bash
gh extension install github/gh-actions-lock
gh actions-lock
```

実行すると、ワークフローの「@v7」が「@v7.0.1」に書き換わり、ロックファイルが作られます。ファイルにはワークフローごとの依存、参照（ref）、コミット（sha1-…）、使われている場所が記録されます。実行時のログには「Using locked action versions from the workflow's lockfile」と表示され、ロックが効いていることを確認できます。

## 更新するときの注意

バージョンを上げるときは、ワークフローの指定を書き換えてから、もう一度`gh actions-lock`を実行します。再生成を忘れるとCIが「Invalid lockfile」で失敗します。また、更新前にはリリースノートや、公開されて間もない版ではないかを確かめるよう勧めています。

## 読みどころ

サプライチェーン攻撃（使っている部品を通じた攻撃）への対策が、コマンド2つで始められるのが分かる記事です。GitHub Actionsを使っているリポジトリなら、まず1つで試してみる価値があります。
