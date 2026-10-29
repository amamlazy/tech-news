---
title: "GoogleがGemini 4 Carbonを発表、AI性能指標で首位　まずはサイバー防御担当者向けに提供"
summary: "GoogleはArgonの2週間後に、次の最上位モデル「Gemini 4 Carbon」を発表した。第三者の指標で首位になった一方、最初は一部のサイバー防御担当者だけに提供される。"
points:
  - "Artificial Analysis Intelligence Index v5.0で59点の1位を獲得"
  - "脆弱性発見のSEC-bench Proは88.2%、Argonとの比較でセキュアなコード生成の成功率は2倍超"
  - "最初は「Fairwind Program」で一部のサイバー防御担当者に提供し、開発者・企業・一般には「できるだけ早く」広げる"
  - "料金は100万トークンあたり入力2ドル、出力10ドルで、キャッシュ入力は95%引き"
category: ai
sourceName: "Google（公式ブログ）"
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/"
publishedAt: "2026-10-29T10:55:00+09:00"
---

Gemini（ジェミニ）は、Googleが作っている生成AIのシリーズ名です。今回発表された「Gemini 4 Carbon」は、その中でGoogleが最も高性能だとしている最新モデルです。

## 何が発表されたのか

Googleは10月28日（米国時間）、「Gemini 4 Carbon」を発表しました。2週間前に出した「Gemini 4 Argon」に続くモデルで、AIの総合力を比べる第三者の指標「Artificial Analysis Intelligence Index v5.0」で59点を取り、1位になったとしています。

## 数字で見る性能

Googleのブログに載っている主な結果は次のとおりです。

- ソフトの弱点を見つける力を測る「SEC-bench Pro」で88.2%
- 攻撃コードを作る力を測る「ExploitGym」で54.8%、「CWE-bench」で71.0%
- Webアプリ開発の対戦形式ランキング「WebDev Arena」で、89 elo（強さの点数）上がって4位（1768）
- Argonと比べて、安全なコードを書けた割合が2倍以上

「Terminal-Bench 4.0」という課題では、ずるをして成功扱いにする割合が0.0%（試みは0.4%）でした。重大な「ずれた行動」の警告は約80%減り、根拠のない主張はおよそ半分になったと説明しています。

## いつ使えるのか

最初に使えるのは「Fairwind Program」に参加する、一部のサイバー防御担当者です。開発者、企業、一般ユーザーには「できるだけ早く」広げるとしています。Carbonは、米国政府が行っている、公開前の自主的なテストの手続きにも入っています。

料金は100万トークン（AIが読み書きする文字の単位）あたり、入力が2ドル、出力が10ドルで、同じ入力を使い回すキャッシュ入力は95%安くなります。

## 読みどころ

今回の売りは、コードの弱点を見つけて直す力です。Chromeチームは、他社のモデルと比べて修正パッチの質が10倍以上よかったと述べたとされています。一方で、すぐ誰でも使えるわけではないため、実際の使い心地は広く公開されてから確かめる必要があります。
