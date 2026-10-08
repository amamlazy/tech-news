---
title: "Microsoft、エージェント用MXCを10月15日一般提供　OpenClawの導入も容易に"
summary: "MicrosoftはWindows向けイベントで、AIエージェントをOSレベルで隔離するMXCの一般提供を10月15日に始めると発表しました。PC Watchによると、OpenClawなどハーネスの権限設定をMXCに寄せられるようになります。"
points:
  - "MXCはコードレベルのサンドボックスとガードレールをOS機能として提供"
  - "ファイル・フォルダ単位の許可拒否をアプリ個別設定からOS設定へ集約できる"
  - "MXC対応のOpenClaw Windowsネイティブ版も提供予定と説明"
category: backend
sourceName: "PC Watch"
sourceUrl: "https://pc.watch.impress.co.jp/docs/news/2146754.html"
publishedAt: "2026-10-09T07:45:00+09:00"
---

## どんな発表か

これは笠原一輝氏が PC Watch にまとめた、Microsoft の Windows & Surface Event（10月7日・米国時間）のレポートだ。CEO サティア・ナデラ氏は、Windows をエージェント型 AI の実行環境として押し上げる「フロンティア・エコシステム」を語り、その中核として Hybrid Intelligence と MXC（Microsoft Execution Containers）を位置づけた。

MXC の一般提供は10月15日開始。エージェントが推論しツールを使う前提では、従来のアプリ中心 OS だけでは足りない、としてコードレベルのサンドボックスとガードレールを OS 機能にする、というのが趣旨だ。

## OpenClawとの関係

記事は、注目のエージェントハーネス「OpenClaw」を例に挙げる。これまで Windows のセキュリティ設定と連携しにくく、アプリ単位で権限を積む必要があり導入の壁になっていた。MXC 対応版の Windows ネイティブアプリでは、OS 側の許可設定に従って動作し、意図しないファイルアクセスなどの面倒を一度の OS 設定に寄せられる、と説明されている。NVIDIA の OpenShell が MXC に統合され、セッション隔離や活動の可視化、トークン消費の追跡にもつながる、との対談内容も紹介されている。
