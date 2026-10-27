---
title: "【実践レポート】claude -pの--json-schemaは「終了コード0」でも失敗している、成功判定の正しい書き方"
summary: "masaki mori氏がZennで、Claude Codeを非対話で使うclaude -pの--json-schemaを33回わざと違反させて挙動を調べた実践レポートを公開しました。終了コード0でも結果が空のことがあり、成功判定にはsubtypeとstructured_outputの両方を見る必要があるといいます。"
points:
  - "再試行は最大5回で、33回の違反のうち終了コード1で終わったのは1回だけ"
  - "成功はsubtypeがsuccessで、かつstructured_outputがあることで判定する"
  - "formatは検証されないためpatternを使い、--setting-sources \"\"と--tools \"\"も推奨"
category: ai
sourceName: "Zenn（masaki mori）"
sourceUrl: "https://zenn.dev/masaki_mori72/articles/7682a6c0f13528"
publishedAt: "2026-10-28T08:00:00+09:00"
---

`claude -p`は、AIコーディングツールClaude Codeを、対話画面を開かずにコマンド1回で呼び出す使い方です。`--json-schema`を付けると、答えを決まった形のJSON（データの書式）で返すよう指定できます。この記事は、筆者がClaude Code 2.1.296とHaikuモデルで実際に試した実践レポートです。

## 何が起きるか

筆者が、スキーマ（JSONの形のルール）にわざと違反する状況を33回作って試したところ、Claude Codeは内部で最大5回まで作り直しを試みていました（上限は`MAX_STRUCTURED_OUTPUT_RETRIES`）。作り直しが尽きても多くは終了コード0で終わり、終了コード1（失敗）になったのは1回だけでした。つまり、終了コードだけで成功を判断すると、結果が空なのに成功扱いしてしまいます。

## 正しい成功判定

出力のJSONで、`subtype`が`"success"`であり、かつ`structured_output`が存在することを、両方確かめるのが筆者の結論です。

## そのほかの注意点

- スキーマの`format`（メールアドレス形式など）は検証されないため、`pattern`（正規表現）で書く
- 余計な設定やツールを読み込まないよう`--setting-sources ""`と`--tools ""`を付ける
- Windowsでは`claude.cmd`ではなく`claude.exe`を呼ぶ

## 試した結果

選択肢を限定するenum、最小文字数のminLength、必須項目のrequiredに違反した場合は、途中であきらめて空の結果になりました。一方、プロンプトに「弾かれたら直してよい」と一言添えると、enum違反は直るようになったといいます。
