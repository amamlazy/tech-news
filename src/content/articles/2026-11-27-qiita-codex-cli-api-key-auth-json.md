---
title: "【やってみた】Codex CLIのAPIキーは~/.codex/auth.jsonに平文で残る　logoutしてもコピーは消えない、keyring設定の落とし穴も検証　Qiita"
summary: "Qiitaで、OpenAIのコーディングAI「Codex CLI」にAPIキーでログインしたとき、キーがどこにどう残るかをダミーのキーで確かめた検証記事が公開されました。キーはauth.jsonに平文で保存され、logoutで消えるのはその1ファイルだけで、dotfilesなどのコピーは残ることを確認しています。"
points:
  - "codex login --with-api-keyでauth.json（パーミッション600）に平文で保存。書き直すと600に戻る"
  - "keyringはSecret ServiceのないLinuxでログイン自体が失敗、autoは同じ環境で平文に落ちる"
  - "値を画面に出さずに確認するfind／grep／git ls-filesのコマンドも掲載"
category: ai
sourceName: "Qiita（supportapp3）"
sourceUrl: "https://qiita.com/supportapp3/items/8124ba9be236314cc5f2"
publishedAt: "2026-11-27T05:20:00+09:00"
---
この記事は、Qiitaに投稿された筆者（supportapp3氏）本人による検証レポートの紹介です。Codex CLIは、OpenAIが提供するターミナルで動くコーディングAIで、APIキーやChatGPTアカウントでログインして使います。

## 試した環境

Codex CLI 0.171.0（npmでインストール）をLinuxで使い、HOMEを空のフォルダーに向けて自分の設定に触れない状態で試しています。キーは`sk-proj-dummy...`というダミー値で、APIへのリクエストはしていません。

## わかったこと

- `printenv KEY | codex login --with-api-key`でログインすると、`~/.codex/auth.json`にキーがそのまま（平文で）書き込まれた。パーミッションは600（自分だけ読める）で、umask 022でも600になった
- auth.jsonを644にしてからログインし直すと、600に戻った
- `codex login status`では`sk-proj-***DUMMY`のように先頭と末尾だけが表示される。キーを確かめたいときは`cat`よりこちらが安全
- 環境変数`OPENAI_API_KEY`を置くだけでは、ファイルには保存されない
- `codex logout`で消えるのは`CODEX_HOME`（既定は`~/.codex`）の中のauth.jsonだけ。dotfilesやバックアップに置いたコピーは残った

## 保存先の設定を変えると

設定`cli_auth_credentials_store`では、保存先を`file`（既定）／`keyring`／`auto`／`ephemeral`から選べます。

- **keyring**：OSの鍵束に保存する設定。デスクトップの鍵束（Secret Service）が入っていないLinuxでは、ログイン自体がエラーで失敗し、平文に黙って落ちることはなかった
- **auto**：同じ環境では、auth.jsonに平文で保存された。「autoだから鍵束に入っている」とは限らない
- **ephemeral**：「API key saved.」と出るがファイルは作られず、次のコマンドでは未ログインになる

筆者は、SSH先のサーバーやWSL、コンテナでもautoが平文に落ちる可能性があると推測しています（macOSや鍵束のあるLinuxは未検証）。

## 確認と対策

記事には、キーの値を画面に出さずに確かめるコマンドがまとまっています。

```bash
AUTH="${CODEX_HOME:-$HOME/.codex}/auth.json"
stat -c '%a %n' "$AUTH"
find ~ -name 'auth.json*' -not -path '*/node_modules/*' 2>/dev/null
git ls-files | grep -E '(^|/)auth\.json$'
git log --all --oneline -- '*auth.json'
```

見つかった場合は、コピーやバックアップを消し、gitに入れてしまったなら履歴から消すだけでなくキーを無効化して作り直すこと、`.gitignore`に`auth.json`を入れること、鍵束が使えるPCなら`config.toml`に`cli_auth_credentials_store = "keyring"`を書いてログインし直すことを勧めています。公式ドキュメントにも「auth.jsonはパスワードと同じように扱う」とあり、本体よりもdotfilesやバックアップに紛れたコピーが危ない、というのが筆者の結論です。
