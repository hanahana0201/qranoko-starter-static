//----------------------------------------------------
// Gulp > npx gulp
//----------------------------------------------------

const fs = require("fs")
const gulp = require("gulp")
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const rename = require("gulp-rename")
const browserSync = require("browser-sync")
const pug = require("gulp-pug")
const data = require("gulp-data")
const yaml = require("js-yaml")
const sass = require("gulp-sass")
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const flexBugsFixes = require("postcss-flexbugs-fixes")
const gcmq = require("gulp-group-css-media-queries")
const cleanCSS = require("gulp-clean-css")
const packageImporter = require("node-sass-package-importer")

// Setting : Paths
const paths = {
  config: "",
  src_pug: "src/pug/",
  src_scss: "src/scss/",
  src_js: "src/js/",
  src_img: "src/img/",
  out_html: "dist/",
  out_css: "dist/css/",
  out_js: "dist/js/",
  out_img: "dist/img/",
  base_html: "dist/"
}

// Setting : Pug Options
const pugOptions = {
  pretty: true,
  basedir: paths.src_pug
}

// Setting : Sass Options
const sassOptions = {
  outputStyle: "expanded",
  importer: packageImporter({
    extensions: [".scss", ".css"]
  })
}

// Setting : Autoprefixer Options
const autoprefixerOption = {
  grid: true
}

// Setting : PostCSS Options
const postcssOption = [flexBugsFixes, autoprefixer(autoprefixerOption)]

// Setting : BrowserSync Options
const browserSyncOption = {
  server: {
    baseDir: paths.base_html
  },
  startPath: "./develop.html",
  notify: false
}

// Pug > HTML
gulp.task("pug", () => {
  return gulp
    .src([paths.src_pug + "**/*.pug", "!" + paths.src_pug + "**/_*.pug"])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      data(function(file) {
        return yaml.safeLoad(fs.readFileSync("./config.yml", "utf-8"))
      })
    )
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.out_html))
})

// SCSS > CSS
gulp.task("scss", () => {
  return gulp
    .src(paths.src_scss + "**/*.scss")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sass(sassOptions))
    .pipe(postcss(postcssOption))
    .pipe(gcmq())
    .pipe(gulp.dest(paths.out_css))
})

// CSS Minify
gulp.task("cssmin", () => {
  return gulp
    .src([paths.out_css + "**/*.css", "!" + paths.out_css + "**/*.min.css"])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.out_css))
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
    [
      paths.config + "config.yml",
      paths.src_pug + "**/*.pug",
      "!" + paths.src_pug + "**/_*.pug"
    ],
    gulp.series("pug", "reload")
  )
  gulp.watch(
    paths.src_scss + "**/*.scss",
    gulp.series("scss", "cssmin", "reload")
  )
})

gulp.task("default", gulp.parallel("browser-sync", "watch"))