---
title: "次期サーバーOS「Windows Server 2028」のプレビュー公開　社内でAIを動かす基盤にも"
summary: "Microsoftが、企業のサーバー用OSの次期版「Windows Server 2028」のパブリックプレビュー（誰でも試せる先行版）を公開しました。最初から守りを固めた設定やNVMe対応の強化に加え、社内のサーバーでAIの推論を動かす基盤としての役割も持たせます。"
points:
  - "Windows Server 2025に続くメジャー版。Windows Server Insider Programで試せる"
  - "既定で堅牢化したServer Core、Confidential VM、耐量子計算機暗号などセキュリティを強化"
  - "Foundry Local、vLLM、llama.cppなどで社内AI推論を支える取り組みは一部顧客向けの早期提供"
category: backend
sourceName: "窓の杜"
sourceUrl: "https://forest.watch.impress.co.jp/docs/news/2157329.html"
publishedAt: "2026-11-19T06:35:00+09:00"
---
Windows Serverは、企業のサーバーで使われるMicrosoftのOSです。社員のアカウント管理（Active Directory）や業務アプリの実行に長く使われてきました。その次の大型版「Windows Server 2028」が、Microsoft Ignite 2026で発表されました。

## 何が変わるか

窓の杜とPublickeyによると、主な強化点は次の通りです。

- **セキュリティ**：初期状態から守りを固めた「Server Core」（画面を持たない最小構成）、新しいセキュリティの基準、仮想マシンの起動を保護する「Trusted Launch」、処理内容をハードウェアで暗号化して外から読めなくする「Confidential VM」、証明書の自動管理、将来の量子コンピューターでも破られにくい暗号（耐量子計算機暗号）への対応
- **ストレージ**：高速なNVMeストレージの仕組みを既定で有効化。ネットワーク越しにNVMeを使うNVMe over TCP/RDMAや、ReFS（Windowsの新しいファイルシステム）からの起動にも対応
- **管理**：プレビューとして、端末管理サービス「Intune」でWindows Serverの設定や更新状況を管理できるようになる

## 社内でAIを動かす基盤へ

MicrosoftはWindows Server 2028を「AI対応インフラ基盤」と位置づけ、AIの処理をパソコン、社内のサーバー、Azureクラウドの間で柔軟に置ける世界を目指すとしています。オープンウェイトモデル（中身が公開されたAIモデル）や独自モデルを、Foundry Local、Windows ML、vLLM、llama.cppといった技術で動かせるようにする取り組みが進み、AMDのAIアクセラレーター「Instinct MI350P」も2027年上半期からプレビュー提供の予定です。

ただし窓の杜は、こうした「ハイブリッドインテリジェンス」機能は早期アクセスプログラムを通じた一部顧客向けで、OSとは別にハードウェア要件もあると伝えています。
