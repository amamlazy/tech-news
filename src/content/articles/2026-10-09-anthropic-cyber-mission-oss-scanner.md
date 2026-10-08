---
title: "AnthropicがCyber Missionを始動、OSS向け無料脆弱性スキャン「OSS Scanner」も開始"
summary: "Anthropicは10月8日、重要インフラとオープンソースの防御を支える長期取り組み「Cyber Mission」を発表しました。あわせて、希望するOSSプロジェクトに最強モデルによる定期スキャンを無償提供するOSS Scannerも開始しています。"
points:
  - "OSS Scannerはモデル生成の報告を人手レビューなしで送るオプトイン方式"
  - "再現手順・説明・候補パッチ付き。真陽性率は90%超を目標とする"
  - "重要インフラ向けCIDPではAccentureやCrowdStrikeなど11社が創設パートナー"
category: ai
sourceName: "Anthropic"
sourceUrl: "https://www.anthropic.com/news/anthropic-cyber-mission"
publishedAt: "2026-10-09T07:05:00+09:00"
---

## 何が発表されたか

Anthropic は10月8日（米国時間）、ソフトウェアとシステムの防御者を支援する長期取り組み「Anthropic Cyber Mission」を発表した。最初の柱は二つで、電力・水道・交通などの重要インフラ向け「Critical Infrastructure Defense Program（CIDP）」と、オープンソース向けの無料脆弱性スキャン「OSS Scanner」だ。

同社は Project Glasswing で広く使われる OSS を走査し、人手でトリアージした開示を続けてきた。一方でメンテナー側から「未検証分も含めて全部ほしい」という声が増え、人手ボトルネックを避ける速い経路として OSS Scanner を用意した、と説明している。

## OSS Scannerの仕組み

OSS Scanner は Google の OSS-Fuzz に着想を得たオプトインサービスだ。対象はインフラや利用者の安全に大きく関わるプロジェクトで、コアメンテナーが所定テンプレートの PR を出して申し込む。加入後は Claude Mythos などを含む最強モデルで定期スキャンし、再現手順・説明・可能な場合は候補パッチ付きの報告を送る。

報告は人手レビューなしのモデル生成だ。届くのは速いが、深刻度の誤りなど不正確な内容もありうる。早期検証では、専門家が査読した97件の Critical / High のうち85件（88%）が CVD の基準を満たしたという。wolfSSL からは74件中ほぼすべてが妥当で5件が CVE になった、といったメンテナーの声も紹介されている。真陽性率は90%超を目指し改善するとしている。

## 重要インフラ向けCIDP

CIDP は運用技術（OT）の防御者にフロンティアモデル、現地エンジニア、脅威調査を届けるプログラムだ。創設パートナーは Accenture、Booz Allen、CrowdStrike、Deloitte、Dragos、Hitachi、Insane Cyber、Nozomi Networks、Palo Alto Networks、PwC、Rockwell Automation の11組織。検証済み開示は従来どおり続け、余裕のあるプロジェクト向けに OSS Scanner を使い分ける方針だ。
