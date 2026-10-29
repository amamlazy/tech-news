---
title: "【Xで話題】情報窃取マルウェア「Aokigahara」がClaudeやCodex、Cursorの認証情報を狙う"
summary: "マルウェア研究者の吉川孝志氏が、Check Point Researchの報告をもとに、情報を盗むマルウェア「Aokigahara」がAIツールの認証情報を狙っているとXで注意を呼びかけました。ブラウザーのパスワードなどに加え、開発者のAI環境やクラウドの鍵も対象です。"
points:
  - "Claude、ChatGPT Desktop、Codex、Cursor、Windsurf、GitHub Copilotが標的に含まれる"
  - "AWSなどクラウドの認証情報や、Gitや.sshの情報も集める"
  - "ブラウザーのパスワードやCookie、暗号資産のウォレットも狙う"
  - "盗んだ情報をどう悪用しているかは確認されていない"
category: x-trend
sourceName: "X"
sourceUrl: "https://x.com/MalwareBibleJP/status/2115825742630342965"
publishedAt: "2026-10-30T11:00:00+09:00"
---

インフォスティーラー（情報窃取マルウェア）は、パソコンに入り込んで、パスワードやログイン状態などを盗み出す悪意のあるプログラムです。今回のものは、AIツールを使う開発者のパソコンも狙っている点が特徴です。

## 何を投稿したのか

「マルウエアの教科書」の著者で研究者の吉川孝志氏（@MalwareBibleJP）は、10月30日0時19分（日本時間）に、Check Point Researchの報告を紹介する形で、Aokigaharaと呼ばれるマルウェアがAIツールの認証情報を狙っていると投稿しました。

投稿によると、「aisessions」という処理でClaudeのcredentials.json、Codexのauth.json、CursorやWindsurfのstate.vscdb、AWSの認証情報などを集め、「ide」という処理でGitの認証情報や.sshのファイル、AWS・Azure・GCPの設定を集めるといいます。集めたデータはZIPにまとめ、AES-256-GCMで暗号化して攻撃者のサーバーに送ると投稿しました。

## Check Pointの報告では

Check Point Researchの報告では、標的としてClaude、ChatGPT Desktop、Codex、Cursor、Windsurf、GitHub Copilotを挙げています。ほかにも、ChromeやFirefoxなどのブラウザーの保存パスワードとCookie、暗号資産のウォレット、DiscordやTelegram、Steam、パスワードマネージャー、VPNの設定なども狙います。

報告は、盗まれた認証情報で会話や開発データが見られたり、有料サービスを不正に使われたり、アカウントが売られたりする可能性を指摘しつつ、実際にどう悪用されているかは確認できていないとしています。

## 読みどころ

AIツールのログイン情報やAPIキーが、パスワードと同じくらい価値のある“盗む対象”になってきたことを示す話題です。怪しいファイルを開かないことに加え、使っていないAPIキーを無効にする、クラウドの鍵に有効期限をつけるなど、盗まれても被害を小さくする備えが大切です。
