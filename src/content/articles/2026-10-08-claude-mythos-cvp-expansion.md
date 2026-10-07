---
title: "Anthropic、最上位モデル「Claude Mythos 5.1」をセキュリティ専門家向けに提供拡大"
summary: "Anthropicがサイバーセキュリティ専門家向けの「Cyber Verification Program」を拡大し、一部組織に限っていた「Claude Mythos 5.1」をより多くの防御・レッドチーム用途で使えるようにしました。用途ごとに3段階のアクセスレベルを設け、大規模な混乱を招く操作は引き続きブロックします。"
points:
  - "Project Glasswingと従来のCVPを統合し、Defense/Red Team/Specializedの3段階に"
  - "Red Teamでは承認済みの侵入テストが可能だが、ランサムウェア展開などは不可"
  - "参加組織には不正利用監視のためのデータ保持が求められる"
category: ai
sourceName: "Impress Watch"
sourceUrl: "https://www.watch.impress.co.jp/docs/news/2146399.html"
publishedAt: "2026-10-08T08:10:00+09:00"
---

## 何が変わったか

Anthropic は10月6日（米国時間）、サイバーセキュリティ専門家向けの「Cyber Verification Program（CVP）」を拡大した。これまで重要なソフトウェアを守る一部の組織に限って提供してきた最上位モデル「Claude Mythos 5.1」を、より多くのセキュリティ専門家や組織が使えるようになる。

同社はこれまで、Mythos を提供する「Project Glasswing」と、審査済みの組織に Opus や Sonnet のサイバー関連の制限を緩めて提供する CVP の2本立てだった。今回これを統合し、用途に応じた3段階のアクセスレベルを設けた。

## 3つのアクセスレベル

- **Defense Access**: インシデント対応、マルウェアのリバースエンジニアリング、脆弱性分析などの防御業務
- **Red Team Access**: 上に加えて、承認された侵入テストやレッドチーム活動。ランサムウェアの展開や物理システムへの損傷など、大規模な混乱を起こしうる操作はブロックされる
- **Specialized Access**: 航空運行、電力網、通信網、銀行間送金、政府の行政ネットワークなどのテストを許可された一部の組織向け。Project Glasswing の参加組織は再審査なしで移る

どのレベルでも Mythos 5.1 のほか、Opus 5.5 や Sonnet 5.5 を使える。

## 提供基盤と条件

CVP は Claude Platform、Google Cloud の Vertex AI、Microsoft Foundry で使える。Amazon Bedrock では「Enterprise Frontier Safeguards（EFS）」の対象ユーザーに限られる。参加組織には不正利用の監視のためにデータ保持が求められ、今秋後半に EFS が始まると、対象組織は自前のクラウドにデータを置けるようになる。

## 現場で見るところ

AI による攻撃の自動化が話題になる中で、防御側にも最上位モデルを使わせる方向に舵を切った形だ。同日公開の Haiku 5.5 も、防御的なタスクは Sonnet 5.5 より広く許す一方、侵入テストはブロックする設計になっている。セキュリティ業務で Claude を使うチームは、どのモデルとアクセスレベルで何ができるかを整理しておくとよい。
