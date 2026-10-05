---
title: "Google、OSS向けバグ報奨金の製品脆弱性受付を一時停止　AIによる無効な報告が急増"
summary: "Googleは、オープンソース向けバグ報奨金プログラム「OSS VRP」で製品脆弱性の報告受付を10月1日から一時停止しました。自動化された報告が大幅に増え、その大半が無効だったためと説明しています。"
points:
  - "サプライチェーン関連の報告と、審査中の報告は対象外"
  - "制度を作り直し、2027年第1四半期に続報を出すとしている"
  - "cURLやHackerOneのInternet Bug Bountyも同様の理由で停止済み"
category: ai
sourceName: "GIGAZINE"
sourceUrl: "https://gigazine.net/news/20261005-google-froze-open-source-bug-bounty-program/"
publishedAt: "2026-10-06T07:00:00+09:00"
---

## 何が起きたか

Google のオープンソース向けバグ報奨金プログラム「Google Open Source Software Vulnerability Reward Program（OSS VRP）」が、2026年10月1日以降、製品脆弱性の報告を受け付けなくなった。Google VRP の公式アカウントは X で、自動化された報告が大幅に増え、その大半が有効ではないことが理由だと説明している。

対象は Google の公開リポジトリにあるコードの欠陥や設計上のバグといった「製品脆弱性」の報告で、サプライチェーン関連の報告や、すでに提出済みの報告には影響しない。Google Cloud 製品に関わる一部のリポジトリは Google Cloud VRP で受け付ける場合がある。Google は制度の見直しを続け、2027年第1四半期に続報を出すとしている。

## 広がる「AI報告疲れ」

GIGAZINE は Tom's Hardware の報道を引き、AI で報告のコストが下がった結果、メンテナーが修正よりも報告の手動検証に時間を取られるようになったと伝えている。同様の理由で、cURL は2026年1月にバグ報奨金を停止し、HackerOne は3月に Internet Bug Bounty の新規受付を止めた。Apple も8月に提出件数の上限を設けている。

## 現場で見るところ

AI で脆弱性を見つけること自体は成果を上げている一方、検証の手間が受け手側に偏っている。OSS を運営する側は報告テンプレートや再現手順の必須化など、受け付けの仕組みを整えておく必要が出てきた。報告する側も、AI の出力をそのまま送らず、再現と影響範囲を自分で確かめることが前提になる。
