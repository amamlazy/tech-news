---
title: "【実践】Azure VMをv5からv6へ移すには「ディスクの種類の変換」が必要　手順と前提を試した記事"
summary: "MasakiKakimoto氏がQiitaで、Azure VMをDds_v5からDds_v6へ変える手順を、前提条件と一緒にまとめた。v6はNVMeが必須なので、ポータルでサイズを選び直すだけでは変えられない。"
points:
  - "v6シリーズはディスクコントローラーがNVMe必須で、SCSIのv5からはスクリプトで変換が必要"
  - "第2世代VM、NVMe対応OS、サードパーティ製のストレージ系ソフトがないことが前提"
  - "v6の一時ディスクは未フォーマットで、停止のたびに初期化される。ページファイルをDドライブに置いていたら要注意"
  - "事前にVMTempDiskResizePreviewの登録（約10分）とバックアップが必須。筆者の環境では停止は約3分"
category: backend
sourceName: "Qiita（MasakiKakimoto）"
sourceUrl: "https://qiita.com/MasakiKakimoto/items/9356d8820157c32ad955"
publishedAt: "2026-10-29T10:10:00+09:00"
---

Azure（アジュール）は、Microsoftのクラウドサービスです。VM（仮想マシン）は、クラウド上に借りるパソコンのようなもので、「v5」「v6」はそのVMの世代を表します。この記事は、MasakiKakimoto氏がQiitaに書いた、実際に試した手順の実践レポートです。

## 何が問題なのか

Azure VMの新しい世代「v6」は、ディスクとのつなぎ方（ディスクコントローラー）が「NVMe」（高速な接続方式）でなければ動きません。v5以前のVMは古い「SCSI」方式なので、Azureポータルでサイズを選び直すだけでは変えられず、コントローラーの変換が必要です。記事は、`Standard_D8ds_v5` から `Standard_D8ds_v6`（どちらも8vCPU・32GiB、Windows Server 2022、第2世代）への変換を例にしています。

## 作業の前に確認すること

- **第2世代のVMか**：`Get-AzVM -ResourceGroupName <RG名> -Name <VM名> -Status | Select-Object Name, HyperVGeneration` で `V2` と出ること
- **OSがNVMeに対応しているか**：同じコマンドで `OsName` を確認する（VMを起動した状態で）
- **サードパーティ製ソフトがないか**：起動、ストレージドライバー、ディスク列挙に影響するバックアップやセキュリティ製品などが入っていると、変換の対象外
- **一時ディスクの使い方**：v6の一時ディスクはローカルNVMeで、未フォーマットで渡され、停止や割り当て解除のたびに初期化されます。Windowsで既定のDドライブにページングファイルを置いていると要注意
- **機能の登録**：`Register-AzProviderFeature -FeatureName VMTempDiskResizePreview -ProviderNamespace Microsoft.Compute` を実行し、約10分待ってから `Get-AzProviderFeature` で `Registered` を確認。未登録だとスクリプトがエラーで止まります
- **バックアップ**：失敗するとOSが起動しなくなる可能性があるため、AzureバックアップやスナップショットでVMを保存しておく

## 変換の手順

1. PowerShellのセッションだけ、署名のないスクリプトを許可します（Cloud Shellなら不要）。`Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process`
2. AzureがGitHubで公開しているスクリプト `Azure-NVMe-Conversion.ps1` をダウンロードします（利用は自己責任）
3. 次のコマンドで変換します

```powershell
.\Azure-NVMe-Conversion.ps1 -ResourceGroupName <RG名> -VMName <VM名> -NewControllerType NVMe -VMSize Standard_D8ds_v6 -FixOperatingSystemSettings -StartVM
```

4. `Get-AzVM ... | Select-Object @{N='VmSize';E={$_.HardwareProfile.VmSize}}, @{N='DiskControllerType';E={$_.StorageProfile.DiskControllerType}}` で、`Standard_D8ds_v6` と `NVMe` になったことを確認します

実行中にVMは一度停止（割り当て解除）され、筆者の環境では約3分でした。

## 切り戻しと注意点

完了時に切り戻し用のコマンドが表示されるので、保存しておきます。戻すときは `-NewControllerType SCSI -VMSize Standard_D8ds_v5 -StartVM` を付けて実行します。戻せなければバックアップから復元します。以前は、トラステッド起動のVMは変換できないとされていましたが、2026年9月ごろに公式ドキュメントから、その制限の記載が消えたそうです。筆者は、仕様が変わることがあるので、作業前にMicrosoft Learnの最新の説明を読み、まず検証環境で停止時間も測るよう勧めています。
