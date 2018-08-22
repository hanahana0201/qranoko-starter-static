const path = require("path")
const webpack = require("webpack")
const package = require("./package.json")
const MODE = "development" // development or production

module.exports = {
  mode: MODE,
  entry: "./src/js/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist/assets/js")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
              minimize: true,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [
                require("postcss-flexbugs-fixes"),
                require("autoprefixer")({
                  grid: true
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `${package.name} v${package.version} ${package.license} by ${
        package.author
      }`
    })
  ]
}
