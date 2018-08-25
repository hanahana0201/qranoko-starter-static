# Qranoko Starter Static

## About

Qranoko Starter Static は、Web 制作ユニット「[クラのこ](https://qranoko.jp/)」が静的サイト制作に使っているスターターテンプレートです。

テーマは、実務で使う標準的なコードのテンプレート化・アップデートによって、ユニット・コミュニティメンバー・共同制作者の業務を効率化すること。各項目の実装経緯や詳細は以下 [Feature](#Feature)・リポジトリの [Issue](https://github.com/qrac/qranoko-starter-static/issues)、ユニットの選定技術をドキュメント化している [Qranoko Docs](https://docs.qranoko.jp/) をご確認ください。

## Feature

### Organize package.json #1

[npm の仕様](https://docs.npmjs.com/files/package.json)に基づいた記述に、プロジェクトの情報・Organization 情報を加えて `package.json` を作成。設定済みの項目を上書きすることで必要な情報を埋められます。

npm ライブラリを作成する際は、`private` を `false` または項目自体を削除して `npm publish` してください。デフォルトで `true` を入れているのはミスを防止するためです。

## License

MIT

## Credit

- Author: [Qrac](https://qrac.jp)
- Organization: [QRANOKO](https://qranoko.jp)
