# Qranoko Starter Static - for Propres

## About

Qranoko Starter Staticは、Web制作ユニット「[クラのこ](https://qranoko.jp/)」が静的サイト制作に使っているスターターテンプレート「Qranoko Starter Static（https://github.com/qrac/qranoko-starter-static）」をgulpやyarnを使わずPreprosで使えるようにしたものです。

目的は、ターミナルが苦手な人でも作業効率化できるようにしたいと思い作成しました。

## Modification

基本的には、gulpfileの内容をPreprosで扱えるように変更しただけです。

- ejsからpugに過去のバージョンを参考に変更しました。
- iostone,moftone,musubii,shitakocss,sass-dashiのscssファイルをsrc/scssフォルダーに追加しました。
- project.jsonをsrc/pug/base/_config.pugに変更しました。
- src/js/app.jsを作成し、1つのファイルにまとめました。
- src/imgとsrc/iconは、dist/imageにコピーする

## Install

```bash
$ git clone --depth 1 https://github.com/hanahana0201/qranoko-starter-static.git && cd qranoko-starter-static && rm -rf ./.git ./README.md && mv * .[^\.]* ../ && cd ../ && rm -rf ./qranoko-starter-static
```

## Support

| Chrome | Firefox | IE  |  Ege   | Safari(Mac) |
| :----: | :-----: | :-: | :----: | :---------: |
| Newest | Newest  | 11~ | Newest |   Newest    |

| Safari(iOS) | Chrome(Android) | Browser(Android) |
| :---------: | :-------------: | :--------------: |
|   Newest    |     Newest      |       4.4~       |

## Develop

- Mac mini 2018
- OS: macOS Mojave 10.14.3
- Prepros: 6.3.0

## License

- MIT

## Credit

- Author: [Centimeter](https://centi-meter.net/)
