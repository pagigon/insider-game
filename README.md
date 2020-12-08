# インサイダーゲーム
## 概要
インサイダーゲームのフロントエンドです。

## 開発について
### 環境構築
1. cloneします
```bash
$ git clone git@github.com:CHooooCLate/insider-game.git
```
1. cloneしたディレクトリにて、Nodeモジュールを設置します
```bash
$ cd insider-game/
$ npm install
```
1. ローカルで起動します
```bash
$ npm run serve
```

### 各ディレクトリについて
#### src/
ソースを配置するディレクトリ

#### src/assets/
画像やらを配置

#### src/components/
パーツ化したvueファイルを配置

#### src/router/
ルーティング設定を記述

#### src/store/
ストア（ファイル間を飛び越えて使用する、グローバル変数のようなもの）を定義し、それを扱うためのメソッドを記載する

#### src/views/
各ページのvueファイルを配置

### デプロイについて
developへマージすると、Github Actionsによって自動的にビルド（ `npm run build` ）とデプロイ（ `serverless deploy -v` ）が行われます。
