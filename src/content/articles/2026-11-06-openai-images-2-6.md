---
title: "OpenAI「Images 2.6」公開　GIFアニメ対応、画像生成は最大約50%高速に"
summary: "OpenAIがChatGPTとCodex、API向けに画像生成「Images 2.6」を公開しました。プロンプトや写真からGIFを作れ、APIではFlareとSunburstの2モデルで生成速度と編集の一貫性を選べます。"
points:
  - "ChatGPT/Codexの全プランでGIF生成と参照画像の再利用に対応"
  - "APIのGPT-Image-2.6 Flareは低品質設定で最短約6秒、Sunburstは編集の一貫性重視"
  - "週あたり約40億枚の画像が生成されているとOpenAIは説明"
category: ai
sourceName: "OpenAI"
sourceUrl: "https://openai.com/index/introducing-images-2-6/"
publishedAt: "2026-11-06T07:45:00+09:00"
---
Images 2.6（イメージズ・ツー・ポイント・シックス）は、OpenAIがChatGPTなどで使う画像生成機能の新しい版です。文章の指示や写真から静止画や動くGIF（短い繰り返し動画）を作り、編集のやり直しもしやすくしたものです。

## 何が新しくなったか

OpenAIは11月4日付の発表で、Images 2.6をChatGPTとCodexの全サブスクリプション、およびAPIで提供開始したとしました。生成速度は従来より最大約50%速く、週あたり約40億枚（1日平均で5億枚超）の画像が作られていると述べています。

## GIFと参照画像

ChatGPT上では、プロンプトやアップロードした写真からアニメーションGIFを生成できます。再生速度の調整やフレーム単位の編集、共有にも対応します。参照画像を一度保存して何度も使い回せるため、自分やペット、キャラクターを毎回アップロードし直す必要がなくなりました。

## APIのFlareとSunburst

開発者向けには「GPT-Image-2.6 Flare」と「Sunburst」が追加されました。Flareは速度重視で、品質をlowにすると最短約6秒で生成できるとします。Sunburstは細部と編集時の一貫性を重視します。複雑さ（complexity）パラメータやマークアップ指定の編集、SVG出力もAPIで使えるようになりました。
