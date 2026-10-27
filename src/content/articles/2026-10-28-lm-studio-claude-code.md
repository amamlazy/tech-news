---
title: "【実践レポート】LM StudioのローカルAIでClaude Codeを動かす、Qwen3.6でタイマーアプリを作るまで"
summary: "窓の杜の連載「ローカルAIの杜」で高橋正和氏が、手元のPCで動くAIをLM Studioで用意し、Claude Codeからつないでキッチンタイマーアプリを作るまでを手順付きで紹介しました。ビルドエラーもClaude Codeが自分で直しましたが、完成までに半日近くかかったといいます。"
points:
  - "環境はRTX 5070（VRAM 12GB）と32GBメモリのPC、モデルはQwen3.6 35B A3B"
  - "LM Studioで「Use LM Studio Engine Protocol」をオフにし、ANTHROPIC_BASE_URLなど4つの環境変数を設定"
  - "CLAUDE_CODE_ATTRIBUTION_HEADER=0を入れないとLM StudioのKVキャッシュが効かない"
category: ai
sourceName: "窓の杜（高橋 正和）"
sourceUrl: "https://forest.watch.impress.co.jp/docs/review/localai/2151348.html"
publishedAt: "2026-10-28T08:05:00+09:00"
---

LM Studioは、AIモデルを自分のPCで動かすための無料アプリです。Claude Codeは、本来はAnthropicのクラウドAIを使ってプログラムを書くツールです。この記事は、高橋正和氏が両者をつなぎ、ネットに頼らないローカルAIでアプリを作った実践レポートです。

## 使った環境

PCはCore Ultra 7 265KF、メモリ32GB、GeForce RTX 5070（ビデオメモリ12GB）です。モデルは「Qwen3.6 35B A3B」を使いました。全体で350億パラメーターあり、そのうち実際に動くのは30億だけという、軽く動かせる構造のモデルです。読み込める文章の長さ（コンテキスト長）は最大に設定しています。バージョンはLM Studio 0.4.26、Claude Code 2.1.311です。

## 手順

1. PowerShellで`irm https://claude.ai/install.ps1 | iex`を実行してClaude Codeを入れ、`%USERPROFILE%\.local\bin`をPathに追加し、`gcm claude`で確認する。
2. LM Studioで開発者モードをオンにし、「Use LM Studio Engine Protocol」をオフにする（Qwenでエラーになることがあるため）。サーバーを起動し、http://127.0.0.1:1234 で待ち受けさせる。
3. 環境変数を設定する。
   - `$Env:ANTHROPIC_BASE_URL="http://127.0.0.1:1234"`
   - `ANTHROPIC_AUTH_TOKEN="lmstudio"`
   - `CLAUDE_CODE_ATTRIBUTION_HEADER="0"`（これがないとLM StudioのKVキャッシュ＝会話の作業用メモリが効かない）
   - `CLAUDE_CODE_USE_POWERSHELL_TOOL="1"`
4. `claude --model qwen/qwen3.6-35b-a3b`で起動する。「モデルを認識できない」という警告は出ても問題ないとしています。

## 開発の進め方

まずShift+Tabで「プランモード」（いきなり書かずに計画を立てるモード）にし、作る内容の計画を立てさせます。計画は`~\.claude\plans\*.md`に保存され、Ctrl+Gで開けます。次に`/clear`で会話をリセットし、`/effort low`で考える量を抑えて実装させました。

## 結果

TypeScriptで書いたキッチンタイマーアプリが完成し、dist/index.htmlとして出力されました。ビルドエラーもClaude Codeが自分で直しましたが、完成までには半日近くかかったといいます。
