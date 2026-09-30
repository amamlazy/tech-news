---
title: "Vercel、本日Node.js 20をBuilds/Functionsで非推奨化"
summary: "Vercelが2026年10月1日をもって Node.js 20 を Builds と Functions の新規デプロイ対象から外します。既存デプロイの実行は継続しますが、新規デプロイは Node.js 24 などへの移行が必要です。"
points:
  - "Project SettingsからNode 20が無効化され新規デプロイがエラーに"
  - "既存のデプロイ済みFunctionsの呼び出しは影響なし"
  - "upgrade確認は vercel project ls --update-required"
category: frontend
sourceName: "Vercel Changelog"
sourceUrl: "https://vercel.com/changelog/node-js-20-is-being-deprecated"
publishedAt: "2026-10-01T07:19:00+09:00"
---

## 何が変わったか

Vercel は、Node.js 20 の EOL（2026年4月30日）を受け、2026年10月1日に Builds と Functions 向け Node.js 20 を非推奨化する。本日以降、Project Settings で Node 20 は無効になり、Functions のバージョンが 20 のままのプロジェクトは新規デプロイ時にエラーとなる。

すでにデプロイ済みの Serverless Functions の呼び出しはそのまま動き続ける。影響確認には最新 CLI で `vercel project ls --update-required` が案内されている。移行先としては Node.js 24 が推奨され、`package.json` の `engines.node` を `24.x` にする方法などが示されている。

## 現場で見るところ

今日が締め切り日なので、未移行プロジェクトは最優先でバージョンを上げたい。間に合わない場合の回避策として `Dockerfile.vercel` によるコンテナデプロイも案内されているが、ランタイムのセキュリティ更新は自己管理になる。ローカルの `.nvmrc` / CI ピン留めも合わせて直し、`process.version` で本番ランタイムを確認する運用が安全だ。
