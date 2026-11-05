---
title: "OpenAI、サイバーセキュリティ特化の「GPT-6 Cyber」発表　ExploitGymで48.5%"
summary: "OpenAIが11月5日、脆弱性の発見と検証に強いAIモデル「GPT-6 Cyber」を発表しました。承認済みのDaybreak Red顧客向けにAPIとCodexで提供を始め、ExploitGymの成績は前世代の32.1%から48.5%に上がっています。"
points:
  - "Firefoxで未発見の高深刻度脆弱性81件、Linuxでは948件の権限昇格エクスプロイトを検証"
  - "スコープ外の攻撃を避ける整列評価で、配備プロンプトありなら100%範囲内に留まった"
  - "Preparedness Frameworkでサイバー能力をCriticalに分類、Daybreak Red承認顧客から順次拡大"
category: ai
sourceName: "OpenAI"
sourceUrl: "https://openai.com/index/introducing-gpt-6-cyber"
publishedAt: "2026-11-06T07:30:00+09:00"
---
GPT-6 Cyber（ジーピーティー・シックス・サイバー）は、OpenAIが出したサイバーセキュリティ（情報を守る技術）向けのAIモデルです。許可された範囲の中で、ソフトの弱点を探し、本当に悪用できるかを確かめ、直し方の候補まで作ることに特化しています。

## 何が発表されたのか

OpenAIは11月5日付の公式ブログで、GPT-6 Cyberを紹介しました。前世代のGPT-5.6 Cyberと比べ、指定した脆弱性を実際に突けるかを測る「ExploitGym」で48.5%（以前は32.1%）と、相対で約51%の改善だと説明しています。ソースコードなしでWebアプリを探る評価では、脆弱性の再現率がGPT-6 Astraの32.0%に対し40.3%でした。

## 現場での成果

同社は、Firefoxで未発見の高深刻度脆弱性を81件見つけ、提案パッチとともにMozillaへ報告したとしています。Linuxカーネルでは1,724件を再現し、うち948件で権限昇格の動くエクスプロイトを作ったと述べ、GPT-5.6 Solの166件から大きく増えたとしています。CiscoやCalif、CodeRabbitなど複数社のセキュリティチームも利用を始めているとのことです。

## 提供範囲と安全策

GPT-6 Cyberは、承認されたDaybreak Red顧客の一部にAPIとCodexで先行提供され、順次拡大する予定です。防御寄りのDaybreak BlueはGPT-6 Astra向けに拡大中です。モデル自体はPreparedness Frameworkでサイバー能力をCriticalと判定しつつ、スコープ外サービスへの攻撃を避ける訓練や、重要インフラ向けの監視・IP許可リストなどの安全策を強化したと説明しています。
