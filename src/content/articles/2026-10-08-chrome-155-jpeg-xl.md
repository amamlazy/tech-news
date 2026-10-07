---
title: "Chrome 155がJPEG XLのデコードに対応、Rust製デコーダーを採用しWebCryptoには耐量子暗号"
summary: "Chrome 155の安定版が公開され、画像形式JPEG XLの表示に標準で対応しました。デコーダーはメモリ安全なRustで書き直したjxl-rsで、WebCryptoへの耐量子暗号の追加や247件の脆弱性修正も含まれます。"
points:
  - "JPEG XLはJPEGより30〜50%よく圧縮でき、可逆圧縮やHDRにも対応する"
  - "Googleは高画質・可逆の写真や段階的な表示が欲しい場面に向くとし、AVIFとの比較を勧める"
  - "WebCryptoにML-KEM、ML-DSA、X-Wingを追加し、Criticalを含む247件を修正"
category: frontend
sourceName: "Chrome for Developers"
sourceUrl: "https://developer.chrome.com/blog/jpeg-xl-in-chrome"
publishedAt: "2026-10-08T07:50:00+09:00"
---

## 何が変わったか

Google は10月6日（米国時間）、デスクトップ向け Chrome の安定版を155（v155.0.8059.39/.40）に更新した。機能面の目玉は、画像形式 JPEG XL（`.jxl`、`image/jxl`）のデコード対応だ。

Chrome for Developers のブログによると、JPEG XL は JPEG より30〜50%よく圧縮でき、可逆圧縮、HDR、JPEG からの可逆な変換などに対応する。Google は一般には AVIF と JPEG XL の両方を試すよう勧めたうえで、JPEG XL が特に役立つのは写真の高画質・可逆圧縮や、細かな段階的表示（プログレッシブデコード）が欲しい場面だとしている。

## Rust で書き直したデコーダー

画像デコーダーは、ネットワークから来た信頼できないデータをレンダラーの中で処理するため、ブラウザーで最も狙われやすい部分の一つだ。Chrome は C++ 製のリファレンス実装 libjxl ではなく、Rust だけで書かれた jxl-rs を組み込んだ。

速度を落とさないために、unsafe なコードなしで SIMD 命令を使える Rust の機能の安定化を待ち、C++ の Highway ライブラリにならった SIMD 抽象化層（jxl_simd）も作った。unsafe な操作は、よく検証した少数の箇所に閉じ込めている。ファジングや AI によるコードレビューでも検証し、開発の全期間を通じてメモリ安全性のバグは見つからなかったという。

採用を決めた理由として、Google は Web 開発者からの継続的な要望、特に Interop の提案で JPEG XL が何年も人気だったことを挙げている。

## そのほかの変更

窓の杜によると、Chrome 155 では次の変更もある。

- WebCrypto に耐量子暗号（ML-KEM、ML-DSA、X-Wing）を追加
- ウィンドウ管理の権限を持つ PWA が、最大化・最小化・復元などネイティブアプリに近い操作をできるように
- CSS の `symbols()` 関数や `margin-trim` プロパティ
- 247件の脆弱性を修正（Critical 4件、High 53件）。Claude の支援で報告されたものが12件、OpenAI Codex Security による報告が2件含まれる

## 現場で見るところ

`<picture>` で JPEG XL を先に並べ、AVIF や JPEG にフォールバックさせる形なら今からでも試せる。画像変換のパイプラインに jxl の出力を足すかどうかは、自サイトの写真で AVIF と画質・サイズを比べてから決めるのがよさそうだ。
