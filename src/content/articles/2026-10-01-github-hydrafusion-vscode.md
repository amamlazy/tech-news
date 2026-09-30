---
title: "GitHub CopilotのHydraFusionがVS CodeとCopilotアプリへ拡大"
summary: "GitHubのマルチモデル連携プレビュー HydraFusion が、Copilot CLIに加え Visual Studio Code と GitHub Copilot アプリでも利用可能になりました。単一・Cascade・Critiqueの3ワークフローで品質と効率を両立します。"
points:
  - "VS Code 1.140以降またはInsidersのモデルピッカーから選択"
  - "Single / Cascade / Critique の3種ワークフローを自動選択"
  - "Pro以上で利用、Business/Enterpriseはプレビュー機能の管理者許可が必要"
category: ai
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-09-30-hydrafusion-in-vs-code-and-the-github-copilot-app/"
publishedAt: "2026-10-01T07:17:00+09:00"
---

## 何が変わったか

GitHub は 2026年9月30日、研究プレビューの HydraFusion を Visual Studio Code と GitHub Copilot アプリへ拡大した。HydraFusion は単一モデルではなく、推論・コード生成・デバッグ・ツール利用の能力シグナルに基づき実行パターンを選ぶオーケストレーション層だ。

ワークフローは次の3種。Single は1モデルで直接解く。Cascade は効率的なモデルが草案を出し、品質ゲートが必要ならより強いモデルへエスカレーションする。Critique は別モデルファミリーの読み取り専用批評者がレビューし、草案モデルが一度改訂する。

## 現場で見るところ

VS Code ではモデルピッカーから選択し、表示されない場合は `chat.copilot.hydraFusion.enabled` を有効化する。組織契約では管理者によるプレビュー機能許可が必要な場合がある。Auto がリクエストごとにモデルを選ぶのに対し、HydraFusion は1ターン内でワークフローと複数モデル協調まで扱う点が違いとして説明されている。研究プレビューのため挙動変更があり得る前提で、長めの実装タスクで透明性や進捗表示の改善を試す用途が合う。
