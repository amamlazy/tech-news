---
title: "「Siri AI」が日本語に対応、iOS 27.2など11本の更新で多数の脆弱性も修正"
summary: "Appleの新しいSiri「Siri AI」が、iOS 27.2などの更新でベータ版として日本語に対応しました。同時に公開された一連のOS更新では多数の脆弱性も修正されており、早めの更新が勧められます。"
points:
  - "画面の内容や個人の文脈を理解してアプリ内の操作もこなし、Yahoo!乗換案内などのアプリにも対応"
  - "Google Geminiと共同開発したApple Foundation Modelsを使い、端末上とPrivate Cloud Computeで処理"
  - "11本の更新で修正、iOS 18.7.11では標的型攻撃に悪用された可能性のある脆弱性も修正"
category: ai
sourceName: "Apple"
sourceUrl: "https://www.apple.com/jp/newsroom/2026/10/siri-ai-is-available-today-in-more-languages/"
publishedAt: "2026-10-28T07:30:00+09:00"
---

Siri AIは、iPhoneやMacの音声アシスタントSiriを、生成AIで大きく作り直した新しいSiriです。今回、iOS 27.2などのOS更新でベータ版（試用段階）として日本語でも使えるようになりました。

## Siri AIでできること

Appleによると、ユーザー個人の文脈（予定やメッセージなど）や、いま画面に表示されている内容を理解し、アプリの中の操作まで代わりに実行できます。他社アプリの例としてYahoo!乗換案内やWhatsAppが挙げられています。専用のSiriアプリが用意され、会話履歴はiCloudで同期されます。カメラにはSiriモードが加わり、写したものについて聞ける「ビジュアルインテリジェンス」も使えます。

土台には、Google Geminiと共同で開発したApple Foundation Modelsを使います。処理は端末上と、Appleの専用サーバー「Private Cloud Compute」で行います。日本語のほか、フランス語、韓国語、ポルトガル語、スペイン語にも対応しました。

## 制限

EUではiOS・iPadOS・watchOSで使えません。13歳未満も対象外です。1日あたりの利用上限があり、Appleは有料で上限を広げる仕組みを予定しています。

## 同時に出たセキュリティ修正

窓の杜（樽井秀人氏）によると、今回は合計11本の更新が公開されました。修正された脆弱性の数（CVE数）は次のとおりです。
- iOS／iPadOS 27.2：163件
- macOS Golden Gate 27.2：263件
- macOS Tahoe 26.7.2：213件
- macOS Sequoia 15.8.2：197件
- visionOS：125件
- tvOS：72件
- watchOS：62件
- Safari：33件

古い機種向けのiOS 18.7.11では、標的型攻撃に悪用された可能性があるCoreGraphicsの脆弱性（CVE-2026-86950）が直されました。対象はiPhone XS／XRや第7世代iPadなどです。

秘密鍵の流出が問題になった認証局eMudhraの証明書は自動でブロックされるようになりました。ただし、/etc/ssl/cert.pemを使うcurlやgitなどのコマンドラインツールは対象外で、今後の更新で対応される予定です。

参考：窓の杜 https://forest.watch.impress.co.jp/docs/news/2151422.html
