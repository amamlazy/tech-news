---
title: "【実践レポート】改ざんされたClaude Code拡張、自分のWindows PCは大丈夫？　読み取り専用スクリプトで確かめた手順"
summary: "Cursorの拡張機能ストアでClaude Code拡張の2.1.312／2.1.313が改ざんされていた件で、自分のWindows PCに被害の痕跡がないかをPowerShellで確かめた実録がQiitaで公開されました。"
points:
  - "何も変えず何も消さない、読み取り専用のPowerShellスクリプトで確認"
  - "extension.jsのハッシュ値を改ざん版と照合し、SSH鍵や自動起動の痕跡も調べる"
  - "ポイントは「どのエディターから入れたか」と「その時間帯に開いていたか」"
  - "改ざん版は本物と同じ版番号なので、番号だけでは見分けられない"
category: ai
sourceName: "Qiita（suwa_nobu）"
sourceUrl: "https://qiita.com/suwa_nobu/items/3cd02fa0f1cec7ea979c"
publishedAt: "2026-11-03T06:25:00+09:00"
---
この記事は、Qiitaに投稿された実践レポートの紹介です。Cursorの拡張機能ストアで、AIコーディング機能「Claude Code」の拡張機能が改ざんされ、PCに「裏口」を作る不正版が配られていた件（今日のニュース参照）を受けて、筆者のsuwa_nobuさんが自分のWindows PCを実際に点検しました。

## 何を確かめたのか

suwa_nobuさんはVS CodeとCursorの両方にClaude Code拡張を入れていました。そこで、Cursorの告知にある「痕跡」を、管理者として開いたPowerShell（Windowsのコマンド操作ツール）で読み取るだけのスクリプトを作り、確認しています。スクリプトは何も変えず、何も消しません。

結論は「このPCに痕跡はなかった」。見るべきポイントは「どのエディターから入れたか」と「その時間帯（日本時間10月29日18時27分〜30日5時35分）にそのエディターを開いていたか」だそうです。

## 確認の手順

- 各エディターの拡張フォルダ（.vscode、.cursor、.windsurf など）から anthropic.claude-code-* を探す
- 中の extension.js のSHA256ハッシュ（ファイルの指紋のような値）を、改ざん版の値（ecb58cb2…）と照合
- SSHの authorized_keys（ログインを許す鍵の一覧）に「svc-telemetry」がないか
- タスクスケジューラーの「SysMon」、スタートアップの sysmon.cmd、`.config\smt.cmd`／`.config\smtk`、TEMPフォルダの `.stk_*` がないか

検出がきちんと働くかも、ハッシュ値を手元の版に差し替えたり、空のテストファイルを置いたりして確かめています。

## 分かったこと・注意点

- VS Codeから入れた2.1.312は、改ざん版とハッシュが違った。改ざん版は本物と同じ版番号なので、版番号だけでは見分けられない
- Cursorは長く開いていなかったため、拡張は2.0.1のままで更新されていなかった
- 2.1.313は公式の配布元には存在しない版番号だった
- `administrators_authorized_keys` は管理者権限がないと読めないため、普通のPowerShellではFalseと出てしまう
- 確認したのは筆者のPC 1台だけ

## 読みどころ

不安なときに「どこを見ればいいか」を具体的なコマンドで示してくれる記事です。痕跡が見つかった場合は、Cursorの告知の手順（Windowsは remediate-windows.ps1）に従うよう案内しています。拡張を消すだけでは足りない点にも注意です。
