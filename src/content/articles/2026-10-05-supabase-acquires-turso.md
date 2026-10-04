---
title: "SupabaseがSQLite系DBサービスのTursoを買収、エージェント時代のDB需要に対応"
summary: "PostgreSQLベースのSupabaseが、SQLite互換DBサービスを提供するTursoの買収を発表しました。AIエージェントが大量の小さなDBを立ち上げる需要を見込んだ動きです。"
points:
  - "Turso Cloudは1サーバで数百万のDBをホストでき、停止中はストレージ料金のみ"
  - "小規模DBはTurso、大規模はPostgresという役割分担を描く"
  - "Turso Cloudは買収後も従来どおり提供を続けるとしている"
category: backend
sourceName: "Publickey"
sourceUrl: "https://www.publickey1.jp/blog/26/supabase1sqlitetursoaidb.html"
publishedAt: "2026-10-05T07:00:00+09:00"
---

## 何が起きたか

Supabase は、SQLite 互換のデータベースサービス「Turso Cloud」を手がける Turso を買収すると発表した。Turso 側も X 上で「Supabase に参加する」と告知し、軽量なデータベースからペタバイト級の Postgres まで、エージェントが必要とするものをそろえたプラットフォームを目指すと説明している。

Turso は SQLite をフォークした libSQL を基盤に、MVCC による並列書き込み、非同期 I/O、ベクトル検索、暗号化などを加えている。S3 上に構築され、最大90日のバックアップとポイントインタイム復元、ブランチ作成、WebAssembly 版によるブラウザ実行にも対応する。

## なぜ買収するのか

Publickey によると、Supabase は AI エージェントがプロトタイプやダッシュボード、分析用に新しいデータベースを次々と作るようになり、需要が急増していることを理由に挙げている。こうした DB は最初は小さくてよいため、起動が速くコストの低い SQLite 系が向くという判断だ。

Turso は Rust で書き直した SQLite 互換エンジン「Turso Database」や、Copy-on-Write でファイルを分離するエージェント向けファイルシステム「AgentFS」も開発している。

## 現場で見るところ

Turso Cloud の既存ユーザーにとっては、当面サービスが変わらない点がまず重要だ。中長期では Supabase の認証やストレージと SQLite 系 DB がどう統合されるか、料金体系がどうなるかを追っておきたい。
