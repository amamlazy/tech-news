---
title: "【実践レポート】採用を装って届いたリポジトリにご用心、gitフックはどの操作で動くのかを手元で検証"
summary: "Zennに、受け取ったリポジトリに仕込まれたgitフックがどの操作で動くかを実際に試した記事が公開されました。cloneでは送り手のフックは動かない一方、.gitフォルダごと受け取ると最初の git status だけで動くことがあり、開く前の確認手順と、誤って動かしたときに見直すべき認証情報をまとめています。"
points:
  - "git cloneでは送り手の.git/hooksと.git/configはコピーされず、フックは動かなかった"
  - ".gitごとコピーしたフォルダでは、最初の git status や git diff で post-index-change が動いた"
  - "core.hooksPath、core.fsmonitor、core.pager など.git/configに書かれたコマンドも動く"
  - "安全に見るには git clone --no-checkout で取り直し、コードの実行はネットワークを切ったコンテナで"
category: backend
sourceName: "Zenn（mystery_hat）"
sourceUrl: "https://zenn.dev/mystery_hat/articles/git-hooks-in-received-repositories"
publishedAt: "2026-11-12T06:34:00+09:00"
---
これは、Zennに投稿された実践レポートの紹介です。gitフックとは、Gitでブランチを切り替えたりコミットしたりしたときに、自動で実行されるスクリプトのことです。便利な仕組みですが、悪意あるフックを仕込んだリポジトリを渡されると、Gitを操作しただけで攻撃者のプログラムが動いてしまうおそれがあります。

## きっかけ

筆者は、Frank Wiles氏の記事「I got targeted」を読んだことがきっかけだと書いています。Wiles氏は開発の相談を受け、NDA（秘密保持契約）の前に資料を読むよう頼まれました。渡されたDropboxの共有フォルダには .git フォルダが入っていて、「NDAのブランチに切り替えて記入して」と言われます。不審に思って .git/hooks を開くと、ブランチを切り替えたときに外部からプログラムを取ってきて実行する post-checkout フックが仕込まれていたそうです。

## 試してわかったこと

筆者はmacOSとgit 2.54.0で、13種類のフックを仕込んだリポジトリを作り、操作を1つずつ試しました。

- **git clone**：送り手のフックは動かない。cloneで写されるのは履歴で、.git/hooks と .git/config はコピーされない
- **.gitごと受け取った場合**：`git log` や `git show` では何も動かないが、最初の `git status` か `git diff` で post-index-change が動いた。フォルダをコピーするとファイルの記録が実物と合わなくなり、Gitがそれを書き戻すときに呼ばれるため
- **ブランチ切り替え**：post-checkout などが動く。`git checkout` 1回で reference-transaction が11回呼ばれた
- **.git/configの設定**：core.hooksPath、core.fsmonitor、core.pager に書いたコマンドも動いた
- **アーカイブ**：tarやzipで固めて展開しても、フックの実行権限は残っていた

Gitには他人が持ち主のリポジトリの設定を読まない仕組み（safe.directory）がありますが、自分でダウンロード・展開したファイルの持ち主は自分なので、今回の実験では何も止まらなかったといいます。

## 開く前に確かめる手順

筆者は次の手順を勧めています。

- `find received -name .git` で .git が入っていないか確かめる
- `ls -la received/.git/hooks` で .sample で終わらない有効なフックがないか見る
- `cat received/.git/config` で hooksPath、fsmonitor、pager などの行を確認する
- 履歴を見るときは `git clone --no-checkout received fresh` で取り直し、受け取った .git ではgitを動かさない
- ファイルは `git -C fresh show origin/nda:NDA.md` のように、ブランチを切り替えずに読む

clone し直しても、npm install などを実行すると package.json のスクリプトが動きます。コードを動かすなら、`docker run --rm --network none` でネットワークを切り、受け取ったフォルダを読み取り専用で渡したコンテナの中で行う例を示しています。

## 誤って動かしてしまったら

フックはgitを実行したユーザーの権限で動くため、そのユーザーが読めるものはすべて漏れたと考えて見直します。GitHubのトークン、~/.ssh の鍵、~/.aws や ~/.npmrc、.env などに置いた認証情報やAPIキー、ブラウザのログインセッションを取り消し・作り直す対象として挙げています。会社のPCなら、まず社内のセキュリティ担当に連絡するよう勧めています。

筆者は、日本でも採用選考の課題や副業案件、カジュアル面談の前などにリポジトリを受け取る場面があると指摘し、書類を読むためにブランチの切り替えを求められたら、PDFやメールで送ってもらえば足りると書いています。
