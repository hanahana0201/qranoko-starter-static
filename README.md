# Qranoko Starter Static

## About

Qranoko Starter Static は、Web 制作ユニット「[クラのこ](https://qranoko.jp/)」が静的サイト制作に使っているスターターテンプレートです。

目的は、実務で使う標準的なコードのテンプレート化・アップデートによって、ユニット・コミュニティメンバー・共同制作者の業務を効率化すること。各項目の実装経緯や詳細はリポジトリの [Issue](https://github.com/qrac/qranoko-starter-static/issues)、ユニットの技術をドキュメント化している [Qranoko Docs](https://docs.qranoko.jp/) からある程度辿れます。

## Feature

- [gulp v4](https://gulpjs.com/)
- [EJS](http://ejs.co/)
- [Pug](https://pugjs.org/)
- [Sass(SCSS)](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Babel](https://babeljs.io/)
- [UglifyJS 3](https://github.com/mishoo/UglifyJS2)
- [SVG Sprite](https://github.com/jkphl/svg-sprite)
- [Browsersync](https://browsersync.io/)

## Install

```bash
$ git clone --depth 1 https://github.com/qrac/qranoko-starter-static.git && cd qranoko-starter-static && rm -rf ./.git ./README.md && mv * ../ && cd ../ && rm -rf ./qranoko-starter-static
```

## Support

| Chrome | Firefox | IE  |  Ege   | Safari(Mac) |
| :----: | :-----: | :-: | :----: | :---------: |
| Newest | Newest  | 11~ | Newest |   Newest    |

| Safari(iOS) | Chrome(Android) | Browser(Android) |
| :---------: | :-------------: | :--------------: |
|   Newest    |     Newest      |       4.4~       |

## Develop

- MacBook Pro: 13-inch 2016 No-touchbar
- OS: macOS High Sierra 10.13.6
- Node.js: v10.9.0

## License

- MIT

## Credit

- Author: [Qrac](https://qrac.jp)
- Organization: [QRANOKO](https://qranoko.jp)
