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
- src/imgとsrc/iconは、dist/assets/imgとdist/assets/iconにコピーする

## Install

```bash
$ git clone --depth 1 https://github.com/hanahana0201/qranoko-starter-static.git && cd qranoko-starter-static && rm -rf ./.git ./README.md && mv * .[^\.]* ../ && cd ../ && rm -rf ./qranoko-starter-static && mkdir -p dist/assets/img dist/assets/icon && cp -pR src/img/* dist/assets/img && cp -pR src/icon/* dist/assets/icon
```
```fish
$ git clone --depth 1 https://github.com/hanahana0201/qranoko-starter-static.git; and cd qranoko-starter-static; and rm -rf ./.git ./README.md; and mv * .* ../; and cd ../; and rm -rf ./qranoko-starter-static; and mkdir -p dist/assets/img dist/assets/icon; and cp -pR src/img/* dist/assets/img; and cp -pR src/icon/* dist/assets/icon;
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
