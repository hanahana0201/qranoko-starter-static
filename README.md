# Qranoko Starter Static

## About

Qranoko Starter Static は、Web 制作ユニット「[クラのこ](https://qranoko.jp/)」が静的サイト制作に使っているスターターテンプレートです。

テーマは、実務で使う標準的なコードのテンプレート化・アップデートによって、ユニット・コミュニティメンバー・共同制作者の業務を効率化すること。各項目の実装経緯や詳細は以下 Feature・リポジトリの [Issue](https://github.com/qrac/qranoko-starter-static/issues)、ユニットの選定技術をドキュメント化している [Qranoko Docs](https://docs.qranoko.jp/) をご確認ください。

## Feature

### Organize package.json

[npm の仕様](https://docs.npmjs.com/files/package.json)に基づいた記述に、プロジェクト情報・Organization 情報を加えて `package.json` を作成。設定済み項目を上書きすることで必要な情報を集約、同時にプロジェクト内で変数として使えるようにします。

npm ライブラリを作成する際は、`private` を `false` または項目自体を削除して `npm publish` してください。デフォルトで `true` を設定しているのは、非公開情報をミスで公開しないためです。

- [package.json の書き方を整える · Issue #1 · qrac/qranoko-starter-static](https://github.com/qrac/qranoko-starter-static/issues/1)

## License

MIT

## Credit

- Author: [Qrac](https://qrac.jp)
- Organization: [QRANOKO](https://qranoko.jp)
