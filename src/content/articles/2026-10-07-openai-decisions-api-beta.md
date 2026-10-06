---
title: "OpenAIの「Decisions API」がパブリックベータ、分類や振り分けを確率付きで高速に返す"
summary: "OpenAIが、テキストや画像から判定結果を型付きで返すDecisions APIを全開発者向けのパブリックベータにしました。Responses APIより約10倍速いとされ、料金は入力トークンのみの課金です。"
points:
  - "質問の型はpredicate（確率）、choice（選択肢）、score（段階評価）の3種類"
  - "対応モデルは今のところgpt-6-lunaのみで、エンドポイントはPOST /v1/decisions"
  - "料金は入力100万トークンあたり0.10ドルで、出力やキャッシュの課金はない"
category: ai
sourceName: "OpenAI"
sourceUrl: "https://developers.openai.com/api/docs/guides/decisions"
publishedAt: "2026-10-07T06:55:00+09:00"
---

## 何が変わったか

OpenAI は10月6日（米国時間）、Decisions API をパブリックベータとして公開した。9月29日の DevDay では一部の顧客向けの限定プレビューとして発表されていたもので、今回から全開発者が使える。OpenAI は、数週間以内の一般提供を見込んでいる。

Decisions API は、テキストや画像を入力として受け取り、アプリケーションでそのまま使える型付きの答えを返す。同じ gpt-6-luna を Responses API で呼ぶより約10倍速いという。リクエストは `model`、判断材料になる `input`、判断項目の `questions` の3つで構成する。

- `predicate`: 「目に見える傷があるか」のような条件が成り立つ確率を0〜1で返す
- `choice`: 部署やカテゴリなど、渡した選択肢から1つ選び、選択肢ごとの確率と `confidence` も返す
- `score`: 重要度のような順序付きの段階に対し、確率で重み付けした平均スコアを返す

## 使うときの注意

画像は base64 のデータ URL でインラインに渡す必要があり、HTTP の URL や `file_id` は使えない。独自の JSON スキーマに沿ったオブジェクトを作りたい場合や、説明文が欲しい場合は、従来どおり Responses API の Structured Outputs を使うようガイドは勧めている。しきい値は、自分のアプリのラベル付きデータを使い、誤検知と見逃しのコストを考えて決めるよう書かれている。

## 料金と提供範囲

gpt-6-luna の場合、入力は100万トークンあたり0.10ドルで、キャッシュの読み書きや出力トークンには課金されない。Zero Data Retention や HIPAA にも、条件を満たす顧客なら対応する。同じ日の changelog では、API の利用ティアを5段階から Build、Launch、Grow の3段階に整理したことも発表された。問い合わせの振り分けやコンテンツ分類にチャットモデルと構造化出力を使っているなら、速度と費用を比べてみる価値がある。
