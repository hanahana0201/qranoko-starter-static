//----------------------------------------------------
// gulp: Setting
//----------------------------------------------------

const gulp = require("gulp")
const fs = require("fs")
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const rename = require("gulp-rename")
const header = require("gulp-header")
const gulpif = require("gulp-if")
const browserSync = require("browser-sync")
const htmlbeautify = require("gulp-html-beautify")
const ejs = require("gulp-ejs")
const pug = require("gulp-pug")
const data = require("gulp-data")
const yaml = require("js-yaml")
const sass = require("gulp-sass")
const sassGlob = require("gulp-sass-glob")
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const flexBugsFixes = require("postcss-flexbugs-fixes")
const gcmq = require("gulp-group-css-media-queries")
const cleanCSS = require("gulp-clean-css")
const packageImporter = require("node-sass-package-importer")
const babel = require("gulp-babel")
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")
const svgSprite = require("gulp-svg-sprite")

// Read File
const files = {
  package: "./package.json",
  config: "./config.yml"
}
const package = JSON.parse(fs.readFileSync(files.package))
const config = yaml.safeLoad(fs.readFileSync(files.config))

// Banner
const banner = {
  basic: [
    "/*! <%= package.project.name %> v<%= package.version %> <%= package.license %> by <%= package.author.name %> */",
    "",
    ""
  ].join("\n"),
  visible: package.project.banner
}

// Paths
const paths = {
  src: {
    dir: package.project.src + "/",
    ejs: package.project.src + "/ejs/",
    pug: package.project.src + "/pug/",
    scss: package.project.src + "/scss/",
    js: package.project.src + "/js/",
    icon: package.project.src + "/icon/"
  },
  dist: {
    dir: package.project.dist + "/",
    html: package.project.dist + "/",
    css: package.project.dist + "/assets/css/",
    js: package.project.dist + "/assets/js/",
    img: package.project.dist + "/assets/img/"
  }
}

// HTML Beauty Options
const htmlbeautifyOptions = {
  indent_size: 2,
  max_preserve_newlines: 0,
  indent_inner_html: true,
  extra_liners: []
}

// Pug Options
const pugOptions = {
  pretty: true,
  basedir: paths.src.pug
}

// Sass Options
const sassOptions = {
  outputStyle: "expanded",
  importer: packageImporter({
    extensions: [".scss", ".css"]
  })
}

// Autoprefixer Options
const autoprefixerOption = {
  grid: true
}

// PostCSS Options
const postcssOption = [flexBugsFixes, autoprefixer(autoprefixerOption)]

// Uglify Options
const uglifyOption = {
  output: { comments: /^!/ }
}

// BrowserSync Options
const browserSyncOption = {
  server: {
    baseDir: paths.dist.html
  },
  startPath: "./develop.html",
  open: false,
  notify: false
}

//----------------------------------------------------
// gulp: Task
//----------------------------------------------------

// EJS > HTML
gulp.task("ejs", function(done) {
  for (const key in config.pages) {
    const page = config.pages[key]
    page.path = key
    const layout = page.layout
    gulp
      .src(paths.src.ejs + layout + ".ejs")
      .pipe(
        plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
      )
      .pipe(
        data(function() {
          return JSON.parse(fs.readFileSync(files.package))
        })
      )
      .pipe(
        data(function() {
          return yaml.safeLoad(fs.readFileSync(files.config))
        })
      )
      .pipe(ejs(page))
      .pipe(rename(key + ".html"))
      .pipe(htmlbeautify(htmlbeautifyOptions))
      .pipe(gulp.dest(paths.dist.html))
    done()
  }
})

// Pug > HTML (Develop)
gulp.task("pug", () => {
  return gulp
    .src(paths.src.pug + "develop.pug")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      data(function() {
        return JSON.parse(fs.readFileSync(files.package))
      })
    )
    .pipe(
      data(function() {
        return yaml.safeLoad(fs.readFileSync(files.config))
      })
    )
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.dist.html))
})

// SCSS > CSS
gulp.task("scss", () => {
  return gulp
    .src(paths.src.scss + "**/*.scss")
    .pipe(sassGlob())
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sass(sassOptions))
    .pipe(postcss(postcssOption))
    .pipe(gcmq())
    .pipe(gulpif(banner.visible, header(banner.basic, { package: package })))
    .pipe(gulp.dest(paths.dist.css))
})

// CSS Minify
gulp.task("cssmin", () => {
  return gulp
    .src([paths.dist.css + "**/*.css", "!" + paths.dist.css + "**/*.min.css"])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.dist.css))
})

// Babel
gulp.task("babel", () => {
  return gulp
    .src(paths.src.js + "**/*.js")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(concat("app.js"))
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(gulpif(banner.visible, header(banner.basic, { package: package })))
    .pipe(gulp.dest(paths.dist.js))
})

// Uglify
gulp.task("uglify", () => {
  return gulp
    .src([paths.dist.js + "**/*.js", "!" + paths.dist.js + "**/*.min.js"])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(uglify(uglifyOption))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.dist.js))
})

// SVG Sprite Icon
gulp.task("sprite", function() {
  return gulp
    .src(paths.src.icon + "**/*.svg")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: "./",
            sprite: "sprite.svg"
          }
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  { removeTitle: true },
                  { removeStyleElement: true },
                  { removeAttrs: { attrs: "fill" } }
                ]
              }
            }
          ]
        },
        svg: {
          xmlDeclaration: true,
          doctypeDeclaration: true
        }
      })
    )
    .pipe(gulp.dest(paths.dist.img))
})

// Browser Sync
gulp.task("browser-sync", function(done) {
  browserSync.init(browserSyncOption)
  done()
})

gulp.task("reload", function(done) {
  browserSync.reload()
  done()
})

// Watch
gulp.task("watch", () => {
  gulp.watch(
    [paths.src.ejs + "**/*.ejs", "!" + paths.src.ejs + "**/_*.ejs"],
    gulp.series("ejs", "reload")
  )
  gulp.watch(
    paths.src.scss + "**/*.scss",
    gulp.series("scss", "cssmin", "reload")
  )
  gulp.watch(paths.src.js + "**/*.js", gulp.series("babel", "uglify", "reload"))
  gulp.watch(paths.src.icon + "**/*.svg", gulp.series("sprite"))
})

gulp.task("default", gulp.parallel("browser-sync", "watch"))

//----------------------------------------------------
// gulp: Build
//----------------------------------------------------

gulp.task(
  "build",
  gulp.parallel(
    gulp.series("ejs"),
    gulp.series("pug"),
    gulp.series("scss", "cssmin"),
    gulp.series("babel", "uglify"),
    gulp.series("sprite")
  )
)
