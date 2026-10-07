---
title: "CPUが2コアだとjestが終わらない、in-band実行とpendingのままのMutationが原因だった調査記録"
summary: "React NativeとTanStack Queryのアプリで「CIでだけjestが終わらない」問題を追ったZennの調査記録です。2コアのランナーではjestが本体プロセスで直接テストを走らせ、resolveしないPromiseを渡したMutationのgcタイマーが5分ごとに張り直され続けていたと突き止め、CIは30分のタイムアウトから3分に縮みました。"
points:
  - "ワーカー数の既定は「コア数−1」で、2コアだとin-band実行になりタイマーが残ると終わらない"
  - "手元の多コア環境ではワーカーの強制終了が問題を隠していた。-iで再現できる"
  - "timeoutManagerでタイマーをunrefし、new Promise(() => {})をmutateに渡すのをやめた"
category: frontend
sourceName: "Zenn"
sourceUrl: "https://zenn.dev/hopetekigozaru/articles/jest-ci-hang-2core-tanstack-query"
publishedAt: "2026-10-08T07:20:00+09:00"
---

## どんな記事か

React Native（Expo）と TanStack Query で作ったアプリで、CI の jest だけが30分のタイムアウトまで終わらなかった問題の調査記録。手元の10コアの Mac では1,483件のテストが数十秒で通るのに、GitHub Actions の ubuntu-latest（2コア）では止まる。違いはコア数だけだった。

## 原因1: 2コアだと in-band 実行になる

jest のワーカー数の既定は「コア数 − 1」なので、2コアでは1になる。ワーカーが1つ以下だと、jest はワーカーを立てずに本体プロセスで直接テストを走らせる（in-band 実行）。

- in-band: タイマーが1つでも残るとイベントループが空にならず、プロセスが終わらない
- ワーカー: 警告を1行出してワーカーごと強制終了し、exit 0 で終わる

つまり手元の緑は、ワーカーの強制終了が問題を隠した結果だった。手元で CI と同じ状況を作るには `CI=true npx jest --ci -i` と `-i`（`--runInBand`）を付ければよい。

## 原因2: pending の Mutation が gc を張り直し続ける

`--detectOpenHandles` を付けても犯人は出てこなかった。そこで筆者は `setTimeout` を横取りして、どこで作られたタイマーが残っているかを記録する仕込みを `NODE_OPTIONS=--require` で入れた。

全テスト終了時に残っていたタイマーは252個。多くは TanStack Query の gc タイマー（既定の gcTime 5分）で、5分たつと消えていった。最後の1個は Mutation の gc タイマーで、Mutation が pending のままだと削除せずに5分後の削除予約をし直す。楽観的更新を検証するテストが、絶対に resolve しない `new Promise(() => {})` を返していたため、永久に張り直しが続いていた。

React Native だけで起きる理由もある。TanStack Query は `window` がない環境をサーバーとみなして gcTime を Infinity にする（タイマーを張らない）が、React Native の jest プリセットは `window` を定義しているので、ブラウザー扱いになって5分のタイマーが張られる。jsdom 環境でも同じだ。

## 直し方

1. `timeoutManager.setTimeoutProvider` で TanStack Query の内部タイマーをすべて `unref()` する。jest のフェイクタイマーに追従するため、`setTimeout` は呼び出すたびに参照する
2. テストでは resolve を手元に保持し、検証のあとで必ず完了させる。チームでは `new Promise(() => {})` を mutate に渡す書き方を禁止にした
3. テスト終了後も `Animated.timing` が動いて破棄済みの jest 環境に触っていた2ファイルで、`jest.useFakeTimers()` を使った

結果、手元の in-band 実行は「終わらない」から47秒に、CI は30分のタイムアウトから3分になった。

## 読みどころ

「手元では通るのに CI で止まる」ときに、`--forceExit` で黙らせる前に `-i` で再現させる、という切り分けの手順がそのまま使える。jest の内部コードと TanStack Query のソースを引きながら、なぜそうなるのかを一つずつ確かめていく過程が丁寧だ。
