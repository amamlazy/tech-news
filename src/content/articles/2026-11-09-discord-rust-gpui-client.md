---
title: "Discord、クライアント全体をRustで書き直しへ　Electronをやめ「GPUI」採用"
summary: "チャットアプリDiscordのCTOが、デスクトップとモバイルのクライアントをRustへ移行し、Electronをやめると明らかにしました。UIにはエディター「Zed」発のGPUIを使い、モバイルはネイティブUIのままコードを共有します。"
points:
  - "現在はデスクトップがElectron、モバイルがReact Nativeで、いずれもJavaScriptベース"
  - "2018年からインフラや音声技術でRustを採用しており、クライアントも統一する狙い"
  - "Tauriではなく、GPUで描画を高速化するGPUIを選択。ユーザーテストは近く開始予定"
category: frontend
sourceName: "窓の杜"
sourceUrl: "https://forest.watch.impress.co.jp/docs/news/2154396.html"
publishedAt: "2026-11-09T08:00:00+09:00"
---
Discordは、ゲーマーを中心に広く使われる音声・テキストのチャットアプリです。その「見た目と操作」を担うアプリ本体を、まるごと別の技術で作り直す計画が明らかになりました。

## 発表の中身

窓の杜（2026年11月6日付）によると、米Discordの共同創業者でCTOのStanislav Vishnevskiy氏が11月4日（現地時間）にXで方針を明かしました。現在のクライアントは、デスクトップが「Electron」（Webの技術でデスクトップアプリを作る枠組み）、モバイルが「React Native」で、どちらもJavaScriptベースです。これをRust言語のネイティブアプリに置き換え、ElectronとReact Nativeはなくなります。

## なぜRustで、なぜGPUIか

DiscordはRustを2018年からインフラや音声技術で使っており、現行クライアントの一部もすでにRustです。デスクトップのUIフレームワークには、同じくRust製の「Tauri」ではなく、コードエディター「Zed」の開発元が作った「GPUI」を採用します。GPUIはGPUを積極的に使って描画を速くするのが特徴です。モバイル版はiOS/AndroidのネイティブUIを維持しつつ、裏側のロジックをRustでデスクトップ版と共有します。

## 現場で見るところ

大規模な人気アプリがElectronから離れる例として、メモリ使用量や起動速度にどう効くかが注目点です。同氏は新アプリのテストを「近いうち」に始めたいとしています。
