---
title: "【試してみた】BedrockのOpenAIモデルでreasoning.summaryを実測、課金・速度・Guardrailsを検証"
summary: "Zennの実践記事では、Amazon BedrockのResponses APIで使えるようになったreasoning.summaryを、課金への影響や応答速度、Guardrails併用で実測している。要約が追加の出力トークンとして計上される挙動は確認されなかったが、請求額までは検証していない。"
points:
  - "要約文字列が出力トークンに追加計上される挙動は確認できず、CloudWatchのOutputTokenCountもレスポンスのusageと一致"
  - "ストリーミングでは要約が本文より先に届き、最初の表示までの時間を短縮できた。ただし要約を付けると完了までは延びた"
  - "autoはdetailedに解決され、conciseでも要約は短くならなかった。日本語で質問しても要約は英語で返る"
  - "マルチターンでは暗号化された推論情報（encrypted_content）を落とすと前ターンのreasoning分が入力から消える"
category: ai
sourceName: "Zenn（Yutaka Kashiwabara氏）"
sourceUrl: "https://zenn.dev/kashiwabaray/articles/0a1719bec85fa7"
publishedAt: "2026-10-12T07:15:00+09:00"
---

## どんな実践報告か

これは、Yutaka Kashiwabara氏が2026年10月11日に検証した結果を書いた、実測型のハンズオン記事です。AWSが10月9日に発表した「Bedrockの全OpenAIモデルでreasoning.summaryに対応」というニュースを受けて、公式発表には書かれていない3点を確かめています。要約が出力トークンとして加算されるか、体感速度、Responses API以外やGuardrailsと併用できるか、です。

検証はus-west-2を中心に、主にGPT-6 Lunaで行い、リクエストは`reasoning`に`summary`を足す形です。

```python
body = {
    "model": "us.openai.gpt-6-luna",
    "input": QUESTION,
    "max_output_tokens": 4000,
    "reasoning": {"effort": "medium", "summary": "auto"},
}
```

要約はレスポンスの`type: "reasoning"`アイテムの`summary[].text`に入ります。

## 実測でわかったこと

- **指定値**：`auto`は8モデルすべてで`detailed`に解決されました。`concise`を指定しても、今回の測定では要約が短くなりませんでした。
- **課金**：要約の文字列が出力トークンへ別枠で追加される挙動は確認されませんでした。GPT-6 Astraで5回送り、CloudWatchの`OutputTokenCount`とレスポンスのusageがトークン単位で一致しています。ただし請求明細による確認ではなく、要約生成が推論量や総トークン数を変える可能性は残ると著者は書いています。
- **速度**：ストリーミングでは要約が回答本文より先に届くため、最初の表示までは短くなりました。一方、要約を有効にすると完了までの時間は延びました。
- **マルチターン**：前ターンの出力を次の入力に含めると、要約を空にしても3倍に複製しても入力トークンは同じでした。`encrypted_content`を外すと、前ターンの推論分（約513トークン）が入力から消えました。
- **日本語と安全機能**：日本語で質問しても要約は英語で返りました。Responses APIとConverseで併用した単語フィルタでは、要約中の禁止語への介入は確認されませんでした。

## 注意点

試行回数は条件ごとに1〜5回で、統制されたベンチマークではないと著者自身が断っています。公式のモデルカードと実際の対応状況にも食い違いがあり、結果は検証日（10月11日）時点のものとして読むのが安全です。要約をUIに出す、デバッグに使う前に、自分のモデル・リージョンで同じ確認をしておくと確実です。
