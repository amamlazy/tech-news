---
title: "AWSがStrands Boxを開発者プレビュー公開、OS隔離とDogwoodポリシーでエージェントを制御"
summary: "AWSは10月7日、AIエージェント向けオープンソースサンドボックス「Strands Box」をApache 2.0で開発者プレビュー公開しました。macOSの隔離に加え、過去の行動も踏まえるDogwoodポリシーでシェル・Python・HTTP・MCPを許可拒否します。"
points:
  - "box.tomlとpolicy.dwで環境とルールを定義し、box runでエージェントを起動"
  - "時間窓付きの投稿上限など、履歴依存のforbidルールを書ける"
  - "現状はAppleシリコンのmacOS 15以上。Linux/Windowsは今後対応予定"
category: backend
sourceName: "AWS Open Source Blog"
sourceUrl: "https://aws.amazon.com/blogs/opensource/introducing-strands-box-ai-agent-sandboxes-powered-by-dogwood/"
publishedAt: "2026-10-09T07:30:00+09:00"
---

## 何が出たか

AWS は10月7日、AI エージェント用サンドボックス「Strands Box」を Apache 2.0 のオープンソースとして開発者プレビュー公開した。コンテナや microVM だけの隔離ではなく、OS レベルの封じ込めと、オープンソースのポリシー言語 Dogwood／Local Engine による細かい許可拒否を組み合わせる。

エージェントが読む・実行する・API を叩く自由がそのままリスクになる、という問題意識から始まっている。サンドボックスは到達範囲の境界を作り、その内側で「何をしてよいか」をポリシーが決める、という二層だ。

## ポリシーが効く場所

ネットワーク送信、埋め込みの Python／Shell インタプリタ、MCP ブローカなど複数の執行点があり、ファイル読み取りは `fs:read`、HTTP は `http:request` のように同じイベント形で記録される。そのため「顧客データディレクトリを読んだあとは外向き HTTP を止める」といった、ツール横断のルールを書ける。

例として、Slack への投稿を10分あたり3回までに制限する時間付き forbid が紹介されている。拒否時はルールの `@id` と説明文が返り、エージェントが待ちに切り替えやすい。egress ゲートウェイは許可したリクエストにだけ実シークレットを付与し、エージェント環境にはプレースホルダしか渡さない。

## 現状の制約

はじめにサポートするのは macOS（Seatbelt など）で、Linux と Windows は今後の優先事項としている。設定は `box.toml` と `policy.dw`。リポジトリは github.com/strands-agents/box。
