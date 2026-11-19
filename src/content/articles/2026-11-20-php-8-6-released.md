---
title: "「PHP 8.6」が正式リリース　引数を先に決める「部分適用」、時間を表すDurationクラス、大量接続向けのPolling APIなど"
summary: "プログラミング言語PHPの新しい大型アップデート「PHP 8.6.0」が11月19日に公開されました。関数の引数の一部を先に決めておける「部分適用」や、経過時間を表すDurationクラス、多数の接続を効率よく監視できるPolling APIなどが加わっています。"
points:
  - "`version_compare(?, '8.6', '>=')` のように ? で残りの引数を空けると、関数（クロージャ）が返る"
  - "Polling APIはepollやkqueueを自動で選び、stream_select()の1024接続程度の壁を越えられる"
  - "ほかにclamp()関数、SortDirection列挙型、readonlyプロパティの既定値、引数ごとのDocCommentなど"
category: backend
sourceName: "PHP.net"
sourceUrl: "https://www.php.net/releases/8.6/en.php"
publishedAt: "2026-11-20T06:20:00+09:00"
---
PHPはWebサーバーで広く使われるプログラミング言語で、毎年11月ごろに機能が増える大きな更新が出ます（公式は今回を「メジャーアップデート」と呼んでいます）。今回の8.6は、書き方を短くする新しい文法や、時間・入出力を扱う標準部品が中心です。Hacker Newsでも話題になりました。

## 部分適用（Partial Function Application）

関数の引数の一部だけを先に渡し、残りを `?` や `...` で空けておくと、「残りの引数を受け取る関数（クロージャ）」が返る仕組みです。公式の例では、これまで

`array_filter($versions, fn ($version) => version_compare($version, '8.6', '>='))`

と書いていたものを、

`array_filter($versions, version_compare(?, '8.6', '>='))`

と書けるようになります。

## \Time\Duration クラス

ストップウォッチで測るような「経過時間」を表すクラスです。時刻やタイムゾーンとは無関係で、ナノ秒の精度で250年以上の範囲を表せるため、タイムアウトやベンチマークの時間を扱うのに向くとしています。`Duration::fromSeconds(1)` のように作り、足し算や比較もできます。

## Polling API（Io\Poll）

たくさんのストリーム（ネットワーク接続など）を同時に見張るための新しいAPIです。OSごとに最適な仕組み（epoll、kqueue、event ports、WSAPoll）を自動で使い、従来の `stream_select()` が抱えていた、一般に1024接続程度までという制約を受けません。ReactPHPやAMPHPといったイベントループ（非同期処理の土台）のライブラリが共通して使える基盤を目指しています。

## そのほかの変更

- ストリーム操作のエラーを、警告ではなく `StreamException` として受け取れるようにする設定
- 値を範囲内に収める `clamp()` 関数（`max(0, min($x, 100))` のような書き方が不要に）
- 並び順を型安全に表す `SortDirection` 列挙型（Ascending／Descending）
- readonlyプロパティに既定値を書けるように
- 関数の引数ごとにDocComment（説明コメント）を書けるように

## 現場で見るところ

同じ日には、既存の8.2〜8.5系列で17件の脆弱性を直すセキュリティ更新も公開されました。8.6への移行は新機能を試しつつ計画的に、既存系列の更新はすぐに、と分けて考えるのがよさそうです。
