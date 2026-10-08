---
title: "【試してみた】ターミナルなしでClaude Codeを使うCiel、pipx導入からブラウザ操作まで"
summary: "Zennの実践記事では、Claude CodeやCodexをブラウザから操作する道具「Ciel」の導入手順が詳しく書かれています。AIにREADME手順を任せる方法と、whlを自分で入れる方法の両方を、環境条件つきで解説しています。"
points:
  - "Mac（Appleシリコン・macOS 15以降）とWindows 11に対応。Intel Macは非対応"
  - "Python 3.12〜3.14とpipxが必要。いちばん楽なのはClaude Code/Codexへの一文依頼"
  - "10月8日追記で無料期限を撤廃。当面無料だがAI利用料は各サービスの契約が別"
category: ai
sourceName: "Zenn"
sourceUrl: "https://zenn.dev/ciel_lab/articles/20af6d36e79145"
publishedAt: "2026-10-09T07:55:00+09:00"
---

## どんな実践報告か

これは Ciel 作者による導入ハンズオン（2026年10月7日公開、8日追記）だ。黒いターミナルを直接触らず、ブラウザのチャット画面からローカルの Claude Code や Codex に頼む道具を、申し込みなし・当面無料で公開している。著者自身はコードを書かず、AI に指示して作らせている、と明記している。

画面は general（依頼）、CLI（窓の並び表示）、report（定期報告）、Notes（Markdown ノートと2D/3Dグラフ）などで、テーマは6種類から選べる。

## 導入の手順感

いちばん楽な方法は、すでに Claude Code か Codex にログインできる状態で、GitHub の ciel-download README の「AI への手順」どおりに進めて、と一文貼ることだ。AI が下準備から起動まで進め、途中でパスワード入力など人手の箇所だけ止まる。最後にブラウザ URL と合言葉が出る。

自分で入れる場合は Python（3.12〜3.14）と pipx、Mac では tmux も必要。Releases の `.whl` を OS と Python 版で選び、`pipx install` → `ciel setup` → `ciel serve` の流れだ。Windows では PATH 追加の落とし穴も書かれている。10月8日追記で無料期限は撤廃され、当面無料。AI の利用料は Ciel に含まれない。
