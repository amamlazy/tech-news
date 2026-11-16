---
title: "Rustの日時ライブラリ「Jiff」が1.0に　uvやCargoも採用、今後は互換性を長く守ると宣言"
summary: "プログラミング言語Rustで日付や時刻、タイムゾーンを扱うライブラリ「Jiff」が1.0になり、Hacker Newsで話題になりました。作者は、重大な欠陥がない限り1.0を無期限に維持し、互換性を壊す更新は軽々しく出さないと約束しています。"
points:
  - "Pythonのパッケージ管理ツールuv、RustのCargo、Starship、fd、Nushellなどがすでに本番で利用"
  - "JavaScript標準の日時API「Temporal」に強く影響を受けた設計。タイムゾーンの扱いを間違えにくくする"
  - "既存のchronoやtimeの使いにくさを解消したいという動機から開発された"
category: backend
sourceName: "burntsushi.net（Hacker News）"
sourceUrl: "https://burntsushi.net/jiff/"
publishedAt: "2026-11-17T07:05:00+09:00"
---
Jiff（ジフ）は、プログラミング言語Rust（ラスト）で日付・時刻・タイムゾーンを扱うためのライブラリです。BurntSushi（バーントスシ）の名前で知られる開発者が作っています。

## 1.0の約束

作者のブログによると、Jiffはすでに次のような多くのプロジェクトで本番利用されています。

- Pythonのパッケージ管理ツール「uv」、Rustのビルドツール「Cargo」
- シェルのプロンプト「Starship」、ファイル検索「fd」、シェル「Nushell」
- バージョン管理「Jujutsu」、coreutilsのRust版「uutils」
- AWSのJavaScript実行環境「LLRT」でのTemporal実装の土台

作者は「重大な欠陥が見つからない限り、Jiff 1.0を無期限に維持する」と宣言しました。Jiffはほかのライブラリの公開APIにも登場する「部品」を目指しているため、互換性のない更新はエコシステム全体に大きな負担をかけます。そうした更新は軽々しく出さないとしています。0.2から1.0への変更点はCHANGELOGにまとまっています。

## なぜ作ったのか

日時の処理は、コンピューターの時間（Unix時間、1970年からの秒数）と、人間の時間（暦と時計、タイムゾーン、夏時間）を行き来する必要があり、昔から間違いやすい分野です。作者は「難しさの原因は、領域のモデル化がうまくないことにある」と考え、複雑さをライブラリの中に閉じ込めて、使う側が間違えにくくすることを目指しました。

Rustにはchronoやtimeという既存のライブラリがありますが、作者は「どちらを使うべきか、毎回迷っていた」と振り返ります。設計はJavaScriptの新しい標準日時API「Temporal」から強く影響を受けており、Temporalを知っている人なら違和感なく使えるといいます（ただし完全互換は目指していません）。

## 試してみるには

ブログでは、次の手順で手元に試す環境を作るよう案内しています。

```bash
cargo init --bin
cargo add jiff anyhow
cargo run
```
