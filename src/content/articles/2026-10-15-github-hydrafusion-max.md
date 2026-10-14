---
title: "Copilotの複数モデル統合「HydraFusion」更新、深い推論向けの「Max」が登場"
summary: "GitHubはCopilotで複数モデルを束ねて1つの回答を作るHydraFusionを更新し、より難しいタスク向けのHydraFusion Maxを追加した。モデルプールの刷新や工程ごとの推論強度調整、Cascade／Critiqueワークフローの改良も含む。"
points:
  - "モデルプールにClaude Opus 5.5、GPT-6 Astra、GPT-6.1 Sol、GPT-6 Lunaを追加"
  - "下書きはmedium、レビューはhighと工程ごとに推論強度を使い分け"
  - "Cascadeに判定ステップ、Critiqueはツールでワークスペースを直接検査し並列批評"
  - "VS Code・Copilotアプリ・Copilot CLIで利用可能、引き続きリサーチプレビュー"
category: ai
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-14-hydrafusion-updates-and-new-max-option"
publishedAt: "2026-10-15T07:05:00+09:00"
---

## HydraFusionとは

HydraFusionは、GitHub Copilotで複数のAIモデルをオーケストレーションし、1つの回答にまとめる仕組みです。タスクごとに利用者がモデルを選ばなくても、各モデルの強みを組み合わせることを狙っています。10月14日（米国時間）の更新で、モデルプールとワークフローが見直され、上位オプション「HydraFusion Max」が加わりました。

## 主な変更点

- **モデルプールの更新**：Claude Opus 5.5、GPT-6 Astra、GPT-6.1 Sol、GPT-6 Lunaが含まれるようになりました。どのモデルが使われるかはワークフローによって変わります。
- **工程ごとの推論強度**：これまでは各モデルの既定の推論強度を使っていましたが、初稿はmedium、レビューはhighと段階ごとに明示的に変えるようになりました。
- **Cascadeの改良**：初期モデルで解き、必要なら強いモデルへエスカレーションする方式に、初期成果物を検査して必要時だけ修正を依頼する「判定」ステップを追加できるようになりました。
- **Critiqueの改良**：テキスト要約への依存を減らし、ツールで実際のワークスペースを直接調べる方式に変更。批評役のモデルを並列で走らせます。

## HydraFusion Maxの位置づけ

Maxは同じアーキテクチャとワークフロー技法を使いながら、より要求の高いタスク向けにチューニングされ、深さが必要な箇所で高い推論強度を適用します。通常版は速度・コスト・性能のバランス型、Maxは最も深い推論と徹底した分析が必要な作業向け、と整理されています。

どちらもVS Code、GitHub Copilotアプリ、Copilot CLIで使え、Copilot Pro／Pro+／Business／Enterpriseで実験的機能・プレビュー機能を有効にしている場合に、組織のモデルポリシーの範囲内で利用できます。
