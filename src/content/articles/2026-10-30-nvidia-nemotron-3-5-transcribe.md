---
title: "NVIDIAが文字起こしAI「Nemotron 3.5 Transcribe」を公開、日本語を含む40言語で1時間の音声に対応"
summary: "NVIDIAが、音声を文字にする文字起こしAI「Nemotron 3.5 Transcribe」を、重みを公開する形でリリースしました。日本語を含む40言語に対応し、最大1時間の音声をまとめて処理できます。"
points:
  - "300億パラメーターのMoEで、実際に動くのは約40億パラメーター"
  - "日本語は「本番利用可能」の区分に入る40言語のひとつ"
  - "話者の区別、翻訳、プロンプトでの指示にも対応"
  - "英語のOpen ASR Leaderboardでオープンモデル首位"
  - "ライセンスはOpenMDW-1.1、学習データセット「Granary v2」も公開"
category: ai
sourceName: "GIGAZINE"
sourceUrl: "https://gigazine.net/news/20261029-nvidia-nemotron-3-5-transcribe/"
publishedAt: "2026-10-30T08:00:00+09:00"
---

Nemotron 3.5 Transcribeは、NVIDIAが作った「話し声を文字にする」AIです。会議の録音やインタビューの文字起こしなどに使えるタイプで、モデルの中身が公開されているので自分の環境でも動かせます。

## 何が発表されたのか

NVIDIAは10月28日（現地時間）、文字起こしモデル「Nemotron 3.5 Transcribe」を公開しました。Hugging Faceでのモデル名は「NVIDIA-Nemotron-3.5-Transcribe-30B-A4B」で、NVIDIAの説明では300億パラメーターのMoE（必要な部分だけを動かして計算を節約する仕組み）で、実際に動くのは約40億パラメーターです。

最大1時間の音声を一度に処理でき、日本語を含む40言語に「Production-ready（本番利用可能）」として対応しています。

## できること

- 誰が話したかを区別する話者の割り当て
- 文字起こしと同時の翻訳
- プロンプト（指示文）で用語などを伝える使い方

英語の音声認識の比較サイト「Open ASR Leaderboard」ではオープンモデルの中で首位、Artificial AnalysisのWER（単語の誤り率）の指標ではMistralのVoxtral Small Transcribeと並んだとされています。

## ライセンスと今後

ライセンスはOpenMDW-1.1です。量子化（モデルを軽くして少ないメモリで動かす処理）した版も提供予定で、学習に使ったデータセット「Granary v2」も公開されました。

## 読みどころ

日本語が本番利用の水準として明記されているのは、国内で文字起こしを自前で動かしたい人にはうれしい点です。量子化版が出れば、より手軽なGPUで試せるようになりそうです。
