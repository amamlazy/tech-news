---
title: "【実践レポート】PHP2ShellはAWS WAFのマネージドルールでどこまで防げるか、ルールの版ごとに試した"
summary: "スプリックスのいけ氏がZennで、PHPの深刻な脆弱性「PHP2Shell」をAWS WAFのPHP向けマネージドルールで防げるかを、ルールの版ごとに無害なリクエストで試した実践レポートです。8KBより後ろに置いた攻撃はどの版でも通ってしまいました。"
points:
  - "ルール2.3〜2.5は、セッションCookie付きの典型的な形を止めたが、Cookieなしは通った"
  - "ALBのWAFは本文の先頭8KBしか調べず、それより後ろの内容はどの版でも通過"
  - "8KB超を止めるルールは効くが、通常の20KBのアップロードも止まった"
  - "アプリがmultipartを使わないなら、multipartを止めるのが最も効果的"
  - "WAFはあくまで時間稼ぎ、本命はPHPの更新"
category: backend
sourceName: "Zenn（SPRIX）"
sourceUrl: "https://zenn.dev/sprix_it/articles/dabba0dab7f409"
publishedAt: "2026-10-30T10:00:00+09:00"
---

WAF（Web Application Firewall）は、Webサイトへの通信を調べて、攻撃らしいものを止める“門番”の仕組みです。この記事は、スプリックスのいけ氏が、10月に見つかったPHPの深刻な脆弱性をAWSのWAFでどこまで防げるかを、実際に試した実践レポートです。

## 背景

PHP2Shellは、PHPで認証なしにサーバーを乗っ取られるおそれのある脆弱性（CVE-2026-109618／109619、CVSS v4で9.2）です。修正版は8.2.35、8.3.36、8.4.27、8.5.12です。さらに10月23日には別の脆弱性CVE-2026-115560が公表され、記事の時点では未修正のため、`session.upload_progress.enabled=0`の設定が勧められています。

AWSの「AWSManagedRulesPHPRuleSet」には、2.3（10月21日）で`PHP2Shell_BODY`、2.4（10月22日）で`PHP2Shell_BODY_Extended`が追加され、東京リージョンの既定は2.5です。ALBにつけたWAFは本文を先頭8KBまでしか調べられず、CloudFrontなら16〜64KBまで広げられます。

## 試した環境

ALBの後ろに、`php:8.4.27-apache`のEC2を置き、攻撃の形をまねた無害なリクエストR1〜R5を送りました。所要時間は約1時間、費用は約0.08ドル（約13円）です。

## 結果

- 2.3〜2.5は、セッションCookieと`PHP_SESSION_UPLOAD_PROGRESS`を含むmultipart送信（R2）を止めた。Cookieを外した形（R2b）は通過
- 攻撃部分を8KBより後ろに置いたR3は、どの版でも通過（サイズ超過時の扱いが「Continue」＝そのまま通すため）
- 8KB超を止める独自ルールを足すとR3は止まったが、通常の20KBのアップロードも止まった。CRSの`SizeRestrictions_BODY`も同じ挙動
- multipartそのものを止めるルールはR1〜R4をすべて止めた
- 60秒に10回までのレート制限ルールは、24回目、約32秒後に初めて遮断
- Extendedルールは一度も反応しなかった

## おすすめの優先順位

1. アプリがmultipart（ファイル送信の形式）を使わないなら、multipartを止める
2. ルールを2.5に上げる
3. 8KB超を止めるルールを足すか、CloudFrontに移して64KBまで調べる
4. どれも修正までの時間稼ぎと考え、8.1以前のPHPからは移行する

## 読みどころ

「WAFを入れているから大丈夫」とは言えないことを、実際の通信で示した記事です。13円ほどで再現できる手順なので、自分の環境のルール設定を見直すきっかけになります。
