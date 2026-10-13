---
title: "【試してみた】GitHub Pages証明書失効で526　Cloudflare Pagesへ移した手順と3つのハマり"
summary: "Zennのunsoluble_sugar氏の実践記事は、Cloudflareプロキシ配下のGitHub Pagesで証明書更新が失敗しError 526になった障害から、暫定復旧とCloudflare Pages移行、プレビューで踏んだ3点のハマりを手順付きで記録している。"
points:
  - "原因の決め手はgh apiのhttps_certificateがbad_authz。プロキシ中はACME認可が通らない推定"
  - "暫定はグレー雲→Custom domain再入力→オレンジ雲。Enforce HTTPSが外れる点に注意"
  - "移行のハマり: .html剥がし308、404.html無しのSPAフォールバック、R2のOrigin別エッジキャッシュ"
  - "外形監視をGitHub Actionsで追加。証明書残り日数も見る。約39時間気づかなかった反省"
category: frontend
sourceName: "Zenn（unsoluble_sugar氏）"
sourceUrl: "https://zenn.dev/unsoluble_sugar/articles/6a3fd085a60ec6"
publishedAt: "2026-10-14T09:10:00+09:00"
---

## どんな実践報告か

これは、Zennのunsoluble_sugar氏による実践記事です（2026年10月12日公開）。静的配信のWebアプリを、Cloudflareプロキシ配下のGitHub Pagesで公開していたところ、オリジン証明書の失効でError 526になり、約39時間ダウンした経緯から、暫定復旧とCloudflare Pagesへの移行を記録しています。作業にはClaude Codeも使った、と書かれています。

## 障害と暫定復旧

構成はGitHub Pages（Actions）＋Cloudflareのオレンジ雲（Full Strict）でした。期限切れはGitHub Pages側のLet's Encryptで、エッジ証明書は別物です。`gh api .../pages`の`https_certificate.state`が`bad_authz`だったことが決め手で、プロキシ配下ではGitHubのACME認可（ドメインがPagesのIPを直接返すことの確認）が通らない、という推定です。

暫定手順は「apexをグレー雲→PagesのCustom domain再入力→approved確認→オレンジ雲に戻す」。再入力でEnforce HTTPSが外れるため、戻す必要がある、と注意しています。

## 移行で踏んだ3つ

再発防止としてCloudflare Pages（wrangler Direct Upload）へ移行しました。プレビューURLで並行検証し、次の3点にハマったと報告しています。

1. **`.html`自動剥がしで308** — 書き換えルールの向き先を`.dc.html`から`.dc`へ変更
2. **`404.html`が無いと未知パスが200** — SPAフォールバック。アプリの404前提ロジックが壊れるため`404.html`を追加
3. **R2のCORS変更後も古いエッジキャッシュ** — `Origin`ごとにキャッシュが分かれ、ダッシュボードのURL指定パージでは消えない。ホスト名指定パージで解消

wwwはPagesに載せらず、`AAAA 100::`（プロキシ済み）とリダイレクトルールだけの転送専用にしています。移行後は外形監視（本文目印・301・404・CORS・証明書残日数）をActionsで入れ、気づき遅れへの反省を実装に落としています。
