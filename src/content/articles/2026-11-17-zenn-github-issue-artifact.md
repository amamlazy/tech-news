---
title: "【試してみた】GitHubのIssueにHTMLやMarkdownを「Artifact」として添付できるように　ghコマンドでの使い方と制限を検証"
summary: "GitHubのIssueに、HTMLやMarkdownを添付して画面の横でそのまま表示できる「Issue Artifact」がプレビュー公開されました。Kesin11氏がZennで、ghコマンドでの添付手順と、HTMLのどこまでが動くかを検証しています。"
points:
  - "gh issue artifact create でHTMLを添付。ログファイルを添付する使い方もできる"
  - "JavaScriptは動かないが、CSSやSVGのアニメーション、details要素による開閉は動作"
  - "画像は相対パス参照は不可。base64のdata URIで1つのHTMLに埋め込めば表示できる"
category: frontend
sourceName: "Zenn（Kesin11）"
sourceUrl: "https://zenn.dev/kesin11/articles/20261114_github_issue_artifact"
publishedAt: "2026-11-17T06:20:00+09:00"
---
GitHubのIssue（イシュー）は、バグ報告や作業の相談をやり取りするための掲示板のような機能です。新しく加わった「Issue Artifact」は、そのIssueにHTMLやMarkdownのファイルを添付し、Issue画面の右側の専用パネルでそのまま表示できる機能で、現在はPublic Preview（お試し公開）です。この記事は、Kesin11氏がZennに書いた体験・検証記事の要約です。

## なぜ便利なのか

Kesin11氏によると、最近はAIのコーディングエージェントと設計やレビューを相談するとき、文字だけでなくHTMLを作らせて図や画面の案を目で見て確かめる使い方が広がっています。ClaudeにはHTMLを表示して共有できる「Artifact」機能がありますが、チームの議論はGitHubで行うため、そのたびにGitHubの外へ移動する手間がありました。Issue Artifactなら、その確認がGitHubの中で完結します。

## 使い方

どのIssueにも「Add artifact」ボタンが追加され、ブラウザから手動で添付できます。ただ、普段はエージェントにghコマンド（GitHubのコマンドラインツール）で上げてもらう使い方が中心になるだろうとしています。エージェントには、公式ドキュメントのURLを渡して「生成したHTMLをIssueにArtifactとして添付して」と頼むだけでよいそうです。

手作業の場合は、次のように添付します。

```bash
gh issue artifact create -R OWNER/REPO 7 "hello.html#Hello HTML"
```

テキストファイルも添付できるので、これまでコメントに貼って折りたたんでいたログも、次のように添付できます。

```bash
cat foobar.log | gh issue artifact create -R OWNER/REPO 7 --body-file - --name 'log file'
```

## HTMLはどこまで動くか

Kesin11氏が検証した結果は次の通りです。

- 動く：インラインCSSとSVGのグラフや表、CSSだけのクリック操作（checkbox）、details要素の開閉、CSSアニメーション、SVGアニメーション（クリックで動く）、base64で埋め込んだPNG画像
- 動かない：JavaScriptによるクリック処理やアニメーション、別ファイルを相対パスで参照する画像

## 注意点と感想

現時点では、右側のパネルの横幅に上限があり、図表が小さく表示されがちです。パネル右上の最大化ボタンで広げられます。Kesin11氏は、どのAIエージェントを使っていてもGitHubはみんな使っているので、特定の会社に依存せずに共有できるのが便利だと評価しています。JavaScriptが動かない点などをあらかじめプロンプトで伝えておけば、エージェントが代わりの方法でHTMLを作ってくれるだろうとまとめています。
