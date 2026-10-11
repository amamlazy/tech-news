---
title: "【作ってみた】Java不要でFirestoreエミュレーターをRustで作り直した「hidane」、リスナー付き10万件書き込みが121秒から4.9秒に"
summary: "Qiitaの記事では、Firestore公式エミュレーターの重さを測り、Rust製の互換エミュレーター「hidane」で起動5.5ms・待機メモリ7.4MiBを実現した過程を書いている。公式をオラクルにした互換性の確認方法や、firebase-toolsからそのまま使う方法も解説している。"
points:
  - "公式v1.22.0はJava 21が必要で、起動0.74秒（CLI経由2.5秒）。onSnapshotを張ると10万件の書き込みが121秒（11倍）になった"
  - "hidaneは書き込みの変更前後（Change）だけを見てリスナーを判定し、10万件＋リスナーでも4.9秒。起動5.5ms、待機メモリ7.4MiB"
  - "公式の応答を記録して再生するオラクル方式で互換性を確認。使い方はhidane exec -- firebase emulators:start --only firestore"
  - "Security Rulesは未対応（v0.2予定）。比較は同一条件ではなく、再計測は予定とされている"
category: backend
sourceName: "Qiita（nomunomu0504氏）"
sourceUrl: "https://qiita.com/nomunomu0504/items/f764426407431c183016"
publishedAt: "2026-10-12T06:30:00+09:00"
---

## どんな記事か

これは、Hiroki Nomura氏（株式会社みらいスタジオ）が2026年10月11日に書いた、Firestoreの互換エミュレーター「hidane（火種）」の製作記です。非公式のOSSで、v0.1.0が出たばかりです。公式エミュレーターのどこが重いかを測り、設計で軽くした過程を書いています。

## 公式エミュレーターで困っていたこと

- Java 21が必要です。firebase-tools 15.0.0以降、Java 21未満はサポート外で、`PATH`上の`java`しか見ません。公式のインストールガイドには今も「Java JDK 11以上」と書かれているそうです。
- 起動は直接起動で740ms、`firebase emulators:start`経由で2.5秒、1,000件書き込み後のメモリは456MiBでした。
- リスナーがあると、書き込むほど遅くなります。10万件を500件ずつ書くと、リスナーなしは11.0秒、コレクション全体に`onSnapshot`を張ると121秒、`limit(50)`でも65.5秒でした。

## 軽くした設計

- Rustの単一バイナリにして、Javaを不要にしました（Linux版は静的リンク）。
- コミットが「触ったドキュメントの変更前と変更後」を返す設計にして、リスナーはその変更だけを見て自分のクエリに合うか判定します。データベースを読み直さないので、通知のコストは保存済みの件数に依存しません。
- メモリは、値の型を72バイトから32バイトにする、フィールドをエンコードしたまま持つ、パスを共有する、で100万件1.9GiBから473MiBに下げました。

結果は、起動5.5ms、待機メモリ7.4MiB（1,000件後21MiB）、10万件＋リスナーで4.9秒です。

## 互換性と使い方

公式エミュレーターを「正解」にして、境界ケースの応答を記録し、hidaneに再生して突き合わせています。Admin SDKやWeb SDKのテストも両方に流します。公式のバグ（リスナーで遅くなる点など）は真似せず、差分は`docs/parity-exceptions.md`に書く方針です。

```bash
curl -fsSL https://hidane.dev/install.sh | sh
hidane exec -- firebase emulators:start --only firestore
```

`hidane exec`は、一時的に自分を`java`として`PATH`の先頭に置き、firebase-toolsに公式のjarの代わりに起動させる仕組みです。

## 注意点

Security Rulesは未対応で、いまは全リクエストを許可します（v0.2で対応予定）。公式の数字は負荷の高い環境、hidaneは後日の静かな環境で測っており、同一条件の比較ではないと著者が明記しています。
