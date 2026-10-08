---
title: "【分析】Claude Code v2.1.294、prompt/agent hooksの遮断バグ修正が意味すること"
summary: "labmemoの解説記事は、Claude Code v2.1.294のCHANGELOGを読み解き、指示文で書いたprompt/agentフックがブロックすべき操作を許可してしまうバグ修正の実務影響を整理しています。セキュリティ境界はcommandフックに寄せる、という設計指針を勧めています。"
points:
  - "「Block commands that…」系の指示文フックが逆方向に誤判定していた問題を修正"
  - "Stop/SubagentStopの継続判定も改善し、早すぎる完了を減らす"
  - "著者は決定的なcommandフックと判断型hooksの棲み分けを強調"
category: ai
sourceName: "labmemo"
sourceUrl: "https://labmemo.com/claude-code-v21294-prompt-agent-hooks-block-fix-2026-10/"
publishedAt: "2026-10-09T08:00:00+09:00"
---

## どんな分析か

これは labmemo による Claude Code v2.1.294 の解説（2026年10月9日付）だ。npm の `latest` が同バージョンを指している時点での実測に基づき、公式 CHANGELOG の2行を実務視点で読み解いている。機能追加ではなく、hooks のセキュリティ修正が中心だ。

## 何が直ったか

1件目は、`type: "prompt"` / `"agent"` のフックを「Block commands that …」のような指示文で書いたとき、本来ブロックすべき操作を許可してしまう問題だ。判定モデルが指示を「ユーザー入力の一部」として扱い、ok を返す逆方向ミスだった、と整理している。2件目は Stop / SubagentStop の prompt フックで、「ビルドが壊れていたら続けろ」のような完了条件の判定を改善し、早すぎる切り上げを減らした点だ。

## 著者の主張

記事は、hooks を「決定的制御」として売ってきた公式の位置づけと、判断型フックの需要の緊張を指摘する。セキュリティ境界やコンプライアンス強制は退出コードで決まる command フックに書き、prompt/agent は品質改善の助言レイヤーに留める、という棲み分けを勧めている。agent フックは experimental であり本番の境界には向かない、という公式案内とも整合する読みだ。hooks 運用環境には即時更新を推奨し、更新後にブロック系と完了条件の1回通し確認を提案している。
