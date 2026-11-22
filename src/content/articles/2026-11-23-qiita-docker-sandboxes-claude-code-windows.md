---
title: "【試してみた】Claude Codeを安全に「自走」させるならDocker Sandboxesでいい？　Windowsでゼロから入れて確かめた手順と注意点"
summary: "Claude CodeやCodexを、毎回の確認なしで安全に動かすための隔離ツール「Docker Sandboxes（sbx）」を、Windows 11にゼロから導入して試したQiitaの実践レポートです。インストールから通信の許可、非公開リポジトリやスキルの扱い、業務で使う前の確認点までを手順付きでまとめ、著者は「9割くらいのケースはこれで解決する」と評価しています。"
points:
  - "winget install -h Docker.sbx で導入し、sbx run claude . でフォルダーを共有したままClaude Codeを起動"
  - "MicroVMでカーネルごと隔離し、通信は既定で拒否。Network Logで許可・拒否を確認できる"
  - "標準構成ではClaude Codeが承認なしモードで起動する。共有フォルダー内の.envは読めてしまうので要注意"
category: ai
sourceName: "Qiita"
sourceUrl: "https://qiita.com/yamac_tech/items/2f1d598288990c381f2d"
publishedAt: "2026-11-23T05:55:00+09:00"
---
Docker Sandboxes（ドッカー・サンドボックス、コマンド名はsbx）は、Docker社が提供する、Claude CodeやCodexのようなAIコーディングエージェントを隔離された箱の中で動かすための専用ツールです。この記事は、yamac_tech氏がQiitaに書いた、Windows 11で実際に導入して試した実践レポートの要約です。

## なぜDocker Sandboxesなのか

AIエージェントに毎回の確認なしで作業させたいけれど、判断ミスで大事なファイルを消したり、.envを外部に送ったりしないか不安。これまでは自分でDockerfileを書き、ファイアウォールや認証用プロキシまで整える必要がありました。著者は2026年11月時点で、9割くらいのケースはsbxで解決すると考えています。

- Docker Desktopは不要で、macOS／Windows／UbuntuなどのPCでのローカル実行は商用利用を含めて無料（記事による）
- MicroVM（軽量な仮想マシン）でカーネルごと隔離するため、通常のコンテナより箱の外に抜け出しにくい
- 通信は既定で拒否。「Balanced」ではGitHubなどよく使う接続先だけ許可される

Claude Code標準の`/sandbox`機能はシェルコマンドしか隔離せず、ファイル操作やMCPサーバーはホスト側で動くため、完全な無人実行には向かないと説明しています。

## Windows 11での手順

```powershell
winget install -h Docker.sbx
# 管理者権限のPowerShellで（再起動を求められたら再起動）
Enable-WindowsOptionalFeature -Online -FeatureName HypervisorPlatform -All
sbx version
sbx login
```

まず練習用フォルダーで`sbx run shell .`を実行し、共有したフォルダーにWindows側とサンドボックス側の両方から書き込めることを確かめます。初回に聞かれるネットワークポリシーは「2. Balanced」で良いとしています。続いて`sbx run claude .`でClaude Codeを起動します。`sbx`とだけ打つと管理画面が開き、Claude CodeやCodexのサンドボックスの起動・停止、Network Log（接続先ごとの許可・拒否の記録）を確認できます。

## 試して分かったこと

- 標準構成では、Claude Codeは`--dangerously-skip-permissions`（承認を省略するモード）付きで、Codexも承認を省略するモードで起動する。承認を挟みたいならセッション内で切り替える
- 承認を省略していても、Docker側の通信ルールは別に効く。example.comはBlocked、api.anthropic.comはAllowedだった
- 特定のサイトを許可するには`sbx policy allow network --sandbox <名前> www.youtube.com`のようにする
- 非公開のGitHubリポジトリには`sbx secret set github --sandbox <名前>`でトークンを渡す。トークンはプロンプトや共有フォルダーに書かない
- スキルは`sbx skills add https://github.com/anthropics/skills --skill frontend-design`のように共有ストアへ追加できる。スキルはAIへの指示なので、信頼できる配布元を選び、中身を確認してから取り込む

## 業務で使う前の確認点

共有フォルダーの中に.envがあれば、エージェントからは読めてしまいます。`sbx policy ls`でルールを確認し、渡すフォルダーと通信先を業務に必要な範囲に絞るよう勧めています。組織としてポリシーを強制・記録したい場合は、Docker の有料機能「AI Governance」も選択肢になるとしています。
