---
title: "VS Code 1.144公開　AIエージェントをつなぐ共通規格「Agent Host Protocol 1.0」など"
summary: "Microsoftのコードエディター「VS Code」の最新版1.144が公開されました。AIエージェントとエディターをつなぐ共通の取り決め「Agent Host Protocol」が1.0になり、6言語向けのライブラリが用意されています。"
points:
  - "Agent Host Protocol 1.0が登場し、6言語のライブラリを提供"
  - "定期実行の「Cloud Automations」がプレビューで登場"
  - "複数モデルを比べる「Agent Bake-Off」が既定で有効に"
  - "画像生成のプレビューや、PCを操作するComputer Use（実験的）も追加"
category: frontend
sourceName: "窓の杜"
sourceUrl: "https://forest.watch.impress.co.jp/docs/news/2153125.html"
publishedAt: "2026-11-03T06:45:00+09:00"
---
VS Code（Visual Studio Code）は、Microsoftが無料で配っている定番のコードエディターです。その10月分のアップデートとなるv1.144が公開され、AIエージェント（自分で作業を進めるAI）まわりの機能が大きく増えました。

## Agent Host Protocol 1.0

窓の杜によると、目玉は「Agent Host Protocol（AHP）」が1.0になったことです。プロトコルは「通信のしかたの取り決め」のことで、AHPはAIエージェントとそれを動かす側（エディターなど）のやり取りをそろえるためのものです。6つのプログラミング言語向けにライブラリが用意されました。

## そのほかの主な新機能

- Cloud Automations（プレビュー）：クラウド上でエージェントの作業を自動で回す仕組み
- Agent Bake-Off：同じ作業を複数のAIモデルにやらせて比べる機能が既定で有効に
- 画像生成（プレビュー）：GPT Image 2.5 Flareを使って画像を作れる
- Computer Use（実験的）：AIがPCの画面を操作する機能
- Assisted permissions：AIの操作の許可を手伝う機能が正式版（GA）に

また、GitHub Copilotの30％割引が11月30日まで実施されています。

## 読みどころ

エディターとAIエージェントの間をつなぐ「共通の規格」を作ろうとする動きです。規格がそろえば、好きなエージェントを好きな道具から呼び出しやすくなります。
