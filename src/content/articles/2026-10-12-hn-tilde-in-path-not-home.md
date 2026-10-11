---
title: "シェルのPATHに\"~/.local/bin\"と書いても~はHOMEに展開されない、サンドボックスツールの警告から見つかった落とし穴"
summary: "エージェントのサンドボックスツールnonoの警告をきっかけに、.bashrcなどで二重引用符の中に~を書いたPATHが、実際には./~/.local/binという相対パスになっていた事例が紹介された。Hacker Newsのフロントページにも載っている。"
points:
  - "export PATH=\"$PATH:~/.local/bin/\" は、引用符の中の~が展開されず、カレントディレクトリ下の./~/.local/bin/がPATHに入る"
  - "修正は ~ を $HOME に置き換える。引用符なしの export PATH=$PATH:~/.local/bin はBashやZshでは動くが、空白などで壊れやすい"
  - "確認は echo \"$PATH\" | tr ':' '\\n' | grep '~' で、チルダが残っていれば.bashrc/.zshrc/.profileを直す"
category: backend
sourceName: "disconnect3d.pl（Hacker News掲載）"
sourceUrl: "https://disconnect3d.pl//2026/10/02/dont-put-tilde-in-your-path/"
publishedAt: "2026-10-12T06:05:00+09:00"
---

## 何が起きていたか

著者のdisconnect3d氏が、エージェント用のサンドボックスツール「nono」を試したところ、「サンドボックスが書き込めるPATHエントリ：~/.local/bin/」という警告が出ました。調べると、`~/.bashrc`や`~/.zshrc`に次のように書いたPATHの設定に、問題がありました。

```bash
export PATH="$PATH:~/.local/bin/"
```

Bashのドキュメントによると、チルダ展開は引用符で囲まれていない`~`だけで行われます。引用符の中に書いた`~`は展開されず、PATHにはホームディレクトリではなく、カレントディレクトリ下の`./~/.local/bin/`という相対パスが入ってしまいます。

## 実際に確かめる

著者はディレクトリ`./~/.local/bin/`を作り、そこに置いたバイナリが`PATH="~/.local/bin/" kek`で実行できる様子を示しています。ホームディレクトリは一切関わっていません。nonoが警告したのは、PATH上のエントリがサンドボックスから書き込める場所を指していたためです。

## 直し方と確認

- 修正：`export PATH="$PATH:$HOME/.local/bin/"`に書き換えます。
- 引用符なしの`export PATH=$PATH:~/.local/bin`は、代入の`=`や`:`の直後ではチルダ展開が行われるのでBashやZshでは動きます。ただし、空白が入ると壊れるなど脆弱なので、頼らないほうがよいとされています。
- 確認：`echo "$PATH" | tr ':' '\n' | grep '~'`で何か出れば、設定ファイルの`~`を`$HOME`に直します。

出典は個人ブログの記事（2026年10月2日付）で、Hacker Newsのフロントページに上がっていました。

小さな設定ミスですが、サンドボックスツールがPATHの書き込み可否を警告したことで見つかった点も興味深い例です。
