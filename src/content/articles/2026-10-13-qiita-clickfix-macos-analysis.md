---
title: "【試してみた】ClickFixに感染したMacで何が起きたか　偽Finderと公開Stealerの静的解析"
summary: "QiitaのTIshow氏は、偽CAPTCHAからTerminalへコマンドを貼らせるClickFixに自身のMacが感染したあと、シェル履歴やUnified Log、Mach-Oを追い、何が起きたかを切り分けて報告している。実機で確認できた事実と、比較用公開サンプルの解析は明確に分けている。"
points:
  - "感染チェーンは偽CAPTCHA→Terminal貼り付け→curl→JXA→偽Finder.app→Universal Mach-Oのバックグラウンド実行"
  - "偽Finderは~/Library/Caches/com.apple.finder/にあり、LSBackgroundOnlyとLSUIElementがtrue、署名はad-hocだった"
  - "実機では保護データへのアクセス要求を確認。本体バイナリは調査前に削除してしまい完全な静的解析はできなかった"
  - "比較用の公開macOS Stealerでは、XOR難読化のあとdscl -authonlyでパスワード候補をOSに検証させる処理が見つかった"
category: backend
sourceName: "Qiita（TIshow氏）"
sourceUrl: "https://qiita.com/TIshow/items/e815235eac66f656c3b6"
publishedAt: "2026-10-13T06:35:00+09:00"
---

## どんな実践報告か

これは、QiitaのTIshow氏によるインシデント解析の実践記事です。Web上の偽CAPTCHA（ClickFix）からTerminalを開かされ、表示されたコマンドを貼って実行するタイプの攻撃に、著者自身のMacが巻き込まれました。削除して終わりにせず、シェル履歴、macOS Unified Log、TCC、Mach-O、コード署名を調査しています。

重要な前提として、**実際に動いていたマルウェア本体は途中で削除してしまっており**、実感染で確認できた事実と、後から解析した公開サンプルの挙動は記事内で明確に分けられています。両者が同一バイナリであることは確認できていません。

## 実機で確認できたこと

おおよそのチェーンは次のとおりです。

```text
cloudflareを装った偽CAPTCHA (ClickFix)
  → Terminalへコマンド貼り付け
  → curl → 条件が揃うと次のコマンド
  → osascript -l JavaScript (JXA)
  → ~/Library/Caches/com.apple.finder/Finder.app
  → Universal Mach-O がバックグラウンド実行
  → 保護データへのアクセス要求
```

偽Finderの`Info.plist`では表示名がFinder、`LSBackgroundOnly`と`LSUIElement`がtrueで、GUIを隠して動かす想定でした。実行ファイルはx86_64とarm64のUniversal Binaryで、署名はad-hoc、TeamIdentifierなしでした。Unified Logなどからは`SystemPolicyAllFiles`の拒否や`SystemPolicyAppData`のプロンプトが確認でき、保護対象データへのアクセスを試みていたことが分かります（著者は許可していません）。

## 公開サンプルで見えたこと

比較学習用に公開されているmacOS Stealerサンプルを、実行せず静的解析だけ行った結果です。重要な文字列はXORで隠されており、`strings`ではほぼ出ません。復号すると例えば次のような処理が見つかりました。

- `killall Terminal`
- `system_profiler`で端末情報を取得
- `$HOME/.hlpr/.pass`から候補を読む
- 現在ユーザー名を取得し、`dscl . -authonly`でmacOS自身にパスワードの正誤を問い合わせる
- 成功した値を`User Password.txt`へ保存する

「実際にCookieやKeychainを盗んだ」「C2へ送った」ところまでは、この記事では証明できていません。感染が疑われる場合は、関連する認証情報のローテーションを勧めています。
