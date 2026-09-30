---
title: "Vercel CDN、Vary: Cookie付きレスポンスをキャッシュしなくなった"
summary: "Vercel CDNが、VaryヘッダにCookieが含まれるオリジンレスポンスをキャッシュしなくなりました。応答自体は通常どおり返りますが、x-vercel-cacheはMISSとなり、ログにvary_key_denied:cookieと記録されます。"
points:
  - "Cookie依存の高カーディナリティキャッシュを抑制"
  - "キャッシュ期待ルートはVaryからCookie除去を検討"
  - "個別化レスポンスはCache-Control: privateを併用"
category: frontend
sourceName: "Vercel Changelog"
sourceUrl: "https://vercel.com/changelog/vary-cookie-responses-no-longer-cached"
publishedAt: "2026-10-01T07:21:00+09:00"
---

## 何が変わったか

Vercel は 2026年9月30日、CDN が `Vary` に `Cookie` を含むオリジンレスポンスをキャッシュしない変更を入れた。`Vary` は応答が変わりうるリクエストヘッダを示すが、Cookie は訪問者ごとに異なりやすく、再利用されないキャッシュエントリが増えやすい。

該当レスポンスはこれまでどおり配信されるが共有キャッシュには載らない。識別には `x-vercel-cache: MISS` と Runtime Logs の `vary_key_denied:cookie` が使える。他のサポート対象 `Vary` ヘッダの挙動は変わらない。

## 現場で見るところ

「キャッシュされるはずなのに常に MISS」というルートは、オリジンが返す `Vary` を確認したい。Cookie によらず同じ応答なら `Vary` から `Cookie` を外す。Cookie 依存なら `Cache-Control: private` で共有キャッシュへの保存を防ぐ。CDN ヒット率を見ているチームは、変更翌日以降のキャッシュ理由をログで一度棚卸しすると安心だ。
