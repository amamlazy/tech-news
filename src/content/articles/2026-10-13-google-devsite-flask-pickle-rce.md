---
title: "Google開発者サイトでFlaskセッションのpickle RCE、報奨9万ドル　署名鍵がクッキー内にあった"
summary: "セキュリティ研究者Simon Koeck氏は、developers.google.comなどの共有DevSiteで、FlaskセッションクッキーからOAuthのclient_secretを取り出し、同じ値で署名を偽造してリモートコード実行に至る経路を報告した。修正済みで、報奨は9万ドルだった。"
points:
  - "署名付きだが暗号化されていないFlaskクッキーに、pickle化されたOAuthフローとclient_secretが含まれていた"
  - "そのclient_secretがFlaskの署名鍵としても使われており、任意のセッションを偽造できた"
  - "コールバックがセッション内のフローをpickle.loadsするため、偽クッキーで任意コード実行が可能だった"
  - "firebase.google.comやdeveloper.android.comなど複数ドメインで同じ鍵が有効。2026年10月7日に修正完了"
category: backend
sourceName: "Simon Koeck"
sourceUrl: "https://simonkoeck.com/writeups/google-devsite-flask-session-pickle-rce"
publishedAt: "2026-10-13T07:30:00+09:00"
---

## どんな脆弱性か

研究者のSimon Koeck氏が2026年10月12日付で公開したライトアップです。対象はGoogleの開発者向けドキュメント群が共有するDevSiteプラットフォームで、`/oauth2authorize`が返すFlaskのセッションクッキーが起点でした。

Flaskのセッションはふつう`<payload>.<timestamp>.<signature>`の形で、署名は付きますが中身は暗号化されません。今回のクッキーは約1,200バイトと大きく、展開するとOAuth用のCSRFトークンに加え、`oauth2client`のフローオブジェクトがpickleとして入っていました。その中にOAuthの`client_id`と`client_secret`が平文で含まれていました。

決定的だったのは、その`client_secret`がFlaskの`SECRET_KEY`としても使われていたことです。研究者はオフラインで署名を再計算し、発行されたクッキーと一致することを確認しました。署名鍵が手元にあるため、任意のキーと値を持つセッションを作れます。

## 偽造セッションからコード実行へ

コールバック側は、セッションからフローを取り出し、`pickle.loads`していました。署名が信頼できる前提では「安全」に見えますが、鍵が漏れた瞬間に破綻します。攻撃者は自分で選んだCSRFトークン付きのセッションを作り、好きなpickleを流し込めます。

本番でコマンドを実行せず、`time.sleep(N)`をREDUCEするペイロードで応答時間を測り、サーバ側で実際に`sleep`が呼ばれていることを示しました。署名を1バイト壊す、フロー項目を外すといった対照実験も行い、偶然の遅延ではないことを確かめています。

同じ鍵は次のドメインでも有効でした。

- developers.google.com
- firebase.google.com
- developer.android.com
- source.android.com
- docs.partner.android.com

## タイムラインと教訓

- 2026年8月6日：報告
- 8月7日：トリアージ・受理
- 8月27日：報奨9万ドル（通常アプリT2のS0 RCE、品質加算あり）
- 10月7日：修正完了

研究者が挙げた対策は、(1) 漏れたOAuthシークレットのローテーションと既存セッションの無効化、(2) デプロイごとに独立した高エントロピーのFlask署名鍵、(3) OAuthフローはサーバ側に置きクッキーには参照だけ入れる、(4) クライアント境界をまたぐpickleの廃止、です。どれか1つでも欠けていなければ、この連鎖は切れます。
