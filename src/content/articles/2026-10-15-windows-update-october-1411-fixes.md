---
title: "10月のWindows Updateは過去最多1411件の脆弱性を修正、悪用済みゼロデイも"
summary: "Microsoftの10月の月例セキュリティ更新が日本時間10月14日に公開され、GIGAZINEによると過去最多となる1411件の脆弱性に対処した。悪用が確認されたゼロデイ1件と公表済みゼロデイ2件が含まれ、.NETやVisual Studioも緊急の対象だ。"
points:
  - "悪用確認済みのCVE-2026-96951はWindowsシェルのMark of the Web回避"
  - "CVE-2026-108398は.NET FrameworkでWDACの適用を回避できる脆弱性"
  - "CVE-2026-92707はMessagePack-CSharpのサービス拒否"
  - "Windows 11 24H2 Home／Proの更新提供は今回で終了、次回は11月11日（日本時間）"
category: backend
sourceName: "GIGAZINE"
sourceUrl: "https://gigazine.net/news/20261014-windows-update/"
publishedAt: "2026-10-15T07:35:00+09:00"
---

## 概要

毎月第2火曜日（米国時間）恒例のWindows Updateが、日本時間2026年10月14日に公開されました。GIGAZINEによれば、今回は過去最多となる1411件の脆弱性に対処しており、実際に悪用されているゼロデイ脆弱性1件と、既に公表されていたゼロデイ脆弱性2件が含まれます。

Windows 11 26H2／25H2／24H2向けはKB5127648、23H2向けはKB5126653、Windows 10 21H2／22H2向けはKB5126657などが配信されています。Windows 11やWindows Server各版に加え、Office、SharePoint、Exchange Server、.NET、Visual Studioの最大深刻度が「緊急」（リモートでコードが実行される）とされています。

## 注目のゼロデイ

- **CVE-2026-96951（悪用確認済み）**：Windowsシェルにおけるコマンドインジェクションにより、Mark of the Web（MotW）のセキュリティ機能を回避できる脆弱性です。
- **CVE-2026-108398**：.NET Frameworkのセキュリティ機能バイパスで、Windows Defenderアプリケーション制御（WDAC）の適用を回避して不正なアプリケーションを実行される可能性がありました。
- **CVE-2026-92707**：MessagePack-CSharpのサービス拒否の脆弱性で、.NETでの連続的なメモリ割り当ての制御が不適切なため、ネットワーク経由でDoSを受ける可能性がありました。

## 開発者が確認したいこと

.NETやVisual Studio、SQL Server、Azure関連も更新対象に入っているため、クライアントPCだけでなくビルド環境やサーバーの適用状況も確認しておきたいところです。MessagePack-CSharpを使うアプリケーションは、依存パッケージ側の更新も合わせて確認すると安心です。なお、今回でWindows 11 バージョン24H2のHome／Pro向け更新の提供が終了しました。次回の定例更新は日本時間2026年11月11日（水）の予定です。
