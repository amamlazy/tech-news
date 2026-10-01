---
title: "AWS Well-Architected Agentがプレビュー、IaCまで踏まえた最適化提案"
summary: "AWSがWell-Architected Agentのプレビューを発表しました。コスト・セキュリティ・性能・信頼性を横断分析し、TerraformやCDK、CloudFormation向けの修正案も返します。"
points:
  - "Trusted AdvisorとWell-Architected Toolの次世代"
  - "SSM RunbookやCLI、コンソール手順付きの推奨"
  - "バージニア・オハイオ・オレゴンで提供、Support契約が必要"
category: ai
sourceName: "AWS What's New"
sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2026/10/aws-well-architected-agent/"
publishedAt: "2026-10-02T07:30:00+09:00"
---

## 何が変わったか

AWS は 2026年10月1日、AWS Well-Architected Agent のプレビューを発表した。Trusted Advisor と Well-Architected Tool の次世代と位置づけられ、メトリクスやトポロジをベストプラクティスと照合し、ビジネス目標に沿って優先度付きの推奨を返す。

Terraform、CDK、CloudFormation を解析してギャップを指摘し、適用可能なIaC変更も返す。推奨にはSSM Runbook、CLIスクリプト、コンソール手順が付く場合がある。提供リージョンは米国東部（バージニア／オハイオ）と西部（オレゴン）で、ワークロード自体は商用リージョンからオンボード可能。AWS Supportプラン契約者向けだ。

## 現場で見るところ

信頼性優先ならマルチAZフェイルオーバー提案と横断影響の説明、といった目標駆動の使い方が想定される。手動監査やチェックリスト依存を減らしたいチーム向け。プレビュー範囲とサポート契約要件を確認したうえで、重要ワークロードから試すのが安全だ。
