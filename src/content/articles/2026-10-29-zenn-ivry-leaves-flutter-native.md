---
title: "IVRyが電話アプリをFlutterからネイティブに移行した理由　起動は約74%速くなったが、運用コストは増える"
summary: "IVRyのエンジニアリングマネージャーがZennで、電話アプリをFlutterからSwiftとKotlinによる開発に切り替えた理由を書いた。実験では、Androidの起動時間の中央値が約74%短くなったという。"
points:
  - "iOSはSwift/SwiftUI、AndroidはKotlin/Jetpack Composeで作り直し、全面展開は2026年10月"
  - "ネイティブとFlutterの間のやり取りが約50か所あり、起動の中央値は192.5msから49.6msに"
  - "AIコーディングツールを使うと、実験では2〜3日で基本の通話画面が動いた"
  - "Flutterの否定ではなく、選んだ前提を見直した結果。リリースや運用、OSごとの設計のコストは増える"
category: frontend
sourceName: "Zenn（IVRy）"
sourceUrl: "https://zenn.dev/ivry/articles/d155267331a3ca"
publishedAt: "2026-10-29T10:25:00+09:00"
---

Flutter（フラッター）は、Googleが作っている、1つのコードでiPhoneとAndroidの両方のアプリを作れる開発の仕組みです。「ネイティブ」は、iPhoneならSwift、AndroidならKotlinという、それぞれの専用の言語と部品で作る方法です。この記事は、IVRyのエンジニアリングマネージャーによる、開発方針の見直しの体験談です。

## 何をしたのか

IVRyは、電話に関するアプリを、Flutterで作っていました。これをiOSはSwift/SwiftUI、AndroidはKotlin/Jetpack Composeで作り直し、2026年10月に全面展開を終えました。DroidKaigi 2026でも発表したそうです。

## 理由と数字

- **ネイティブ機能との橋渡しが多かった**：電話の機能は端末の機能に強く依存し、ネイティブとFlutterの間でやり取りする「Platform Channel」が約50か所ありました
- **起動が速くなった**：実験で、Androidの起動時間の中央値が192.5msから49.6msに、約74%短くなりました。ただし、差のすべてがPlatform Channelのせいとは言えない、と注意書きがあります
- **AIで書き直しやすくなった**：Claude CodeやDevinを使って、DartからSwiftとKotlinに移したところ、実験では2〜3日で基本の通話の流れが動きました

## 増えるもの

ネイティブにすると、iOSとAndroidで別々にリリース作業や運用が必要になり、OSごとの設計も考える必要があります。コストは増える、と筆者も認めています。

## 筆者の結論

筆者は、Flutterが悪いと言っているのではなく、最初にFlutterを選んだときの前提が、今のアプリにも当てはまるかを見直した結果だと述べています。NotionやShopifyがネイティブに寄せている例にも触れています。技術の選び方を見直す参考になる記事です。
