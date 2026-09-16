# Backlog

教材として後から埋める積み残しです。読者向け本文（`docs/**`）には TODO／WIP を書かず、ここに記録します。

## データ / SQL

- [x] [データ](docs/data/index.mdx) に SQL / RDB の本編を追加する（表・行・主キー、SELECT / INSERT、トランザクションの感覚）
- [x] SQL 章が揃ったら [JDBC の基礎](docs/languages/java/basics/220_jdbc-basics.mdx) を厚くする
  - DriverManager または DataSource の最小セットアップ例
  - データ章との相互リンク（表と行 ↔ JDBC の読み方）
  - 接続プール（DataSource）の説明をデータまたはアプリ部品側と分担する

## 共通基盤 / HTTP

- [ ] [共通基盤](docs/foundations/index.mdx) の HTTP 本編が揃ったら、Java アプリ部品の REST／Filter 比喩から本編へリンクを張り替える
