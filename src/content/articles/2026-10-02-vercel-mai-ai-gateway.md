---
title: "Vercel AI GatewayがMicrosoft AI音声・文字起こしモデルに対応"
summary: "VercelのAI GatewayでMicrosoft AIの音声生成とストリーミング文字起こしモデルが使えるようになりました。AI SDK 7から同一APIで呼び出せます。"
points:
  - "MAI-Voice-2.1と低遅延のFlash版"
  - "MAI-Transcribe-2 Streamingで部分書き起こし"
  - "推論料金にプラットフォーム手数料なし"
category: ai
sourceName: "Vercel Changelog"
sourceUrl: "https://vercel.com/changelog/microsoft-ai-models-are-now-available-on-ai-gateway"
publishedAt: "2026-10-02T07:40:00+09:00"
---

## 何が変わったか

Vercel は 2026年10月1日、AI Gateway で Microsoft AI（MAI）モデルの提供を開始した。ゼロデータ保持（ZDR）方針が Gateway の透過性・データ管理の方針と近い、としている。

音声は MAI-Voice-2.1（表現力・長文一貫性）と MAI-Voice-2.1-Flash（低遅延）、文字起こしはストリーミングで部分結果を返す MAI-Transcribe-2 Streaming。AI SDK 7 の `generateSpeech` や `streamTranscribe` から呼べる。推論は掲載レートどおりで、プラットフォーム手数料はない。

## 現場で見るところ

ボイスエージェントやライブ字幕を既存の AI Gateway ルーティング・リトライ・フェイルオーバーに乗せたい場合に便利だ。Node.js 20 非推奨と同時期の更新なので、ランタイムは Node 24 側へ寄せつつ音声APIを試すのが現実的だ。
