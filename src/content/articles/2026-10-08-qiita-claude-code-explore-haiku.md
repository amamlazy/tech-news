---
title: "Claude CodeのExploreは本体と同じモデルで動いていた、Haikuに戻すと費用21〜35%減という実測"
summary: "Claude Codeの調べもの担当サブエージェント「Explore」は、2.1.198から本体と同じモデル（上限Opus）で動くように変わっていたと、筆者が27回の計測で確かめたQiitaの検証記事です。Exploreだけを.claude/agents/Explore.mdでHaikuに戻すと、答えは同じまま費用が21〜35%下がった一方、軽い調べものでは遅くなる回もあったと報告しています。"
points:
  - "登場時はHaikuだったExploreが、2.1.198で本体のモデルを引き継ぐ仕様に変わった"
  - "CLAUDE_CODE_SUBAGENT_MODEL=haikuだけではExploreは変わらず、FORCE=1かExplore.mdが要る"
  - "下がるのはExploreの分だけで、本体のOpus分の費用はそのまま残る"
category: ai
sourceName: "Qiita"
sourceUrl: "https://qiita.com/suwa_nobu/items/be41c19295ef0e58e7f2"
publishedAt: "2026-10-08T07:25:00+09:00"
---

## どんな記事か

JQIT の suwa_nobu 氏による Qiita の検証記事。Claude Code で調べものを任せる「Explore」サブエージェントが、いつの間にか Haiku ではなく本体と同じモデルで動くようになっていたことに気づき、費用と時間を測った実測レポートだ。

Explore は Claude Code 2.0.17（2025年10月）で「Haiku で動く」として登場した。ところが 2.1.198（2026年7月）で「本体のセッションのモデルを引き継ぐ（上限は Opus）」に変わり、公式ドキュメントも同じ説明になっている。筆者は、費用表示の mod を見ていて、ファイルを数えるだけの Explore がセッション費用の約45%を占めていることで気づいたという。

## 測り方

題材は express 4.21.2（コミット固定）。本体は Opus 5.5 で、どちらの課題も「Explore サブエージェントを使って」と明示して頼んだ。

- 軽い課題: `trust proxy` を扱うテストファイルと、`res.redirect` を呼ぶ examples のファイルを挙げる
- 重い課題: `npm install` 後のフォルダー（6,656ファイル）で `package.json` を数える

条件は、A: 既定（Explore も Opus）、B: 全サブエージェントを Haiku、C: Explore だけ Haiku の3つ。各5回の中央値で比べ、Explore が実際にどのモデルで動いたかは stream-json の記録で全回確認した。

## 結果

- 重い調べもの: A が0.162ドル、C が0.106ドル（35%減）。API 時間はほぼ同じで、C の5回すべてが A の最安より安かった
- 軽い調べもの: A が0.164ドル、C が0.129ドル（21%減）。ただし時間は13.2秒から29.6秒に延びた。Haiku は念入りで、10回中2回、見つけた17ファイルを全部開いて確かめていた
- 正答: 全25回、どの条件でも正解

## 戻し方と落とし穴

Explore だけを戻すなら、`.claude/agents/Explore.md` に同名のサブエージェントを置き、`model: haiku` を書く。組み込み版を上書きするので、組み込みの指示ではなくこのファイルの本文で動く点に注意が要る。

環境変数 `CLAUDE_CODE_SUBAGENT_MODEL=haiku` だけでは Explore は変わらない。全サブエージェントを Haiku にするなら `CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1` も必要（2.1.257 以降）。また、下がるのは Explore の分だけで、重い課題の C でも0.106ドルのうち0.096ドルは本体の Opus の分だった。

## 筆者の結論と限界

筆者は「Explore をよく使うなら Explore.md を1枚置く価値はある。ただし速くなるとは限らない」とまとめている。課題は2つ、題材は express だけで、答えが一つに決まる調べものしか測っていない。本体が Sonnet の場合は未測定だとしている。同日公開の Haiku 5.5 を Explore に割り当てた場合の結果も気になるところだ。
