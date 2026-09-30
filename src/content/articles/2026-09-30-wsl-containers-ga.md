---
title: "「WSL Containers」が正式リリース、Docker不要でWindows上にLinuxコンテナ"
summary: "マイクロソフトは、WSL上でLinuxコンテナを作成・実行できる新機能「WSL Containers」を正式リリースしました。Dockerなどのサードパーティ製ソフトを入れずに、コマンドライン（wslc）やAPIからコンテナを扱えます。"
points:
  - "Microsoft IntuneやDefender for Endpointと統合し、組織での一括管理にも対応"
  - "正式版で wslc container restart や wslc system info、wslc network connect/disconnect などを追加"
  - "複数コンテナを1つの設定ファイルで扱う wslc compose は開発中"
  - "wsl --update で最新版にするか、GitHubから最新版を入手して利用する"
category: backend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/windowslinuxwsl_containersapi.html"
publishedAt: "2026-09-30T09:20:00+09:00"
---

## ここまでの経緯

WSL Containersは、2026年6月のMicrosoft Build 2026で発表され、7月にパブリックプレビューになっていました。プレビュー段階で、デフォルトのファイルシステムにvirtiofsを採用して高速化し、新しいネットワークモード「consomme」によってWindowsアプリと同じネットワーク環境やセキュリティポリシーを使えるようになっています。

## 正式版で増えたこと

今回の正式版では、起動中のコンテナの再起動、コンテナ環境の情報表示、ネットワークの接続・切断といったコマンドが加わりました。複数コンテナをまとめて定義して運用する `wslc compose` も開発中とされており、Docker Composeに近い使い勝手が今後の焦点になりそうです。

## 現場で見るところ

Windowsの開発端末でDocker Desktopのライセンスや常駐プロセスを避けたいチームには有力な選択肢です。一方で、CIや本番のKubernetesと同じイメージ・マウント・ネットワークの挙動になるかは、実際のプロジェクトで確かめておきたいところです。
