---
title: "「Windows PowerShell 5.1」が非推奨に　次期WindowsからはPowerShell 7が標準搭載"
summary: "Microsoftが、Windowsに長く入っている「Windows PowerShell 5.1」を非推奨にし、次期Windowsから新しい「PowerShell 7」を標準で載せると発表しました。5.1はすぐには消えませんが、将来のWindowsでは使えなくなるため、手持ちのスクリプトの確認が必要です。"
points:
  - "Windows 11 26H2とWindows Server 2025が、5.1を既定で有効にした最後のWindowsになる"
  - "次期Windowsでは5.1は追加機能（FOD）扱いに。将来のWindowsで削除"
  - "PowerShell 7（pwsh.exe）は5.1（powershell.exe）と共存できるので並行して試せる"
category: backend
sourceName: "窓の杜"
sourceUrl: "https://forest.watch.impress.co.jp/docs/news/2157429.html"
publishedAt: "2026-11-19T06:30:00+09:00"
---
PowerShell（パワーシェル）は、Windowsの操作や設定をコマンドやスクリプト（手順を書いたプログラム）で自動化するためのツールです。Windowsには古い「Windows PowerShell 5.1」が標準で入っており、別に新しい「PowerShell 7」が配布されてきました。

## 何が発表されたか

窓の杜によると、Microsoftは11月17日（現地時間）、Windows PowerShell 5.1を非推奨にすると発表しました。非推奨になっても、5.1を載せたWindowsのサポート期間中はセキュリティ更新が続き、既存のスクリプトも動きます。

移行の予定は次の通りです。具体的な時期は利用状況のデータをもとに決め、事前に知らせるとしています。

- **2026年**：5.1を非推奨に。Windows Server 2025とWindows 11 バージョン26H2が、5.1を既定で有効にした最後のWindowsになる
- **次期Windows**：5.1は「オンデマンド機能（FOD）」として提供。新規インストールでは既定で有効
- **将来のWindows**：5.1は使えなくなる

## 今のうちにやっておくこと

PowerShell 7（実行ファイルはpwsh.exe）は、5.1（powershell.exe）と同じPCに同時に入れられます。窓の杜は、今のうちに並行して評価を始めておきたいとしています。どちらで動いているかは、実行ファイル名か `$PSVersionTable.PSEdition` の値で確認できます（「Desktop」なら5.1、「Core」なら7以降）。

注意点として、PowerShell 7はMSIXパッケージで配られますが、従来のMSIインストーラーでできたことの一部にまだ対応していません。SYSTEMアカウントでの実行（スケジュールされたタスクやサービス、リモート処理に影響）、Add-WindowsCapabilityなどのDISMコマンドレット、全ユーザー向けプロファイルといったマシン全体の設定で、現在対応を進めているとのことです。
