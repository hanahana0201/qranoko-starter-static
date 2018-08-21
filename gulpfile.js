//----------------------------------------------------
// gulp: Setting
//----------------------------------------------------

const fs = require("fs")
const gulp = require("gulp")
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const rename = require("gulp-rename")
const header = require("gulp-header")
const browserSync = require("browser-sync")
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

// Require File
const pkg = require("./package.json")

// Read File
const files = {
  pkg: "./package.json",
  cfg: "./config.yml"
}

// Banner
var banner = [
  "/* <%= pkg.name %> v<%= pkg.version %> <%= pkg.license %> by <%= pkg.author %> */"
].join("\n")

// Paths
const paths = {
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

// Pug Options
const pugOptions = {
  pretty: true,
  basedir: paths.src_pug
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

// BrowserSync Options
const browserSyncOption = {
  server: {
    baseDir: paths.base_html
  },
  startPath: "./develop.html",
  notify: false
}

//----------------------------------------------------
// gulp: Task
//----------------------------------------------------

// Pug > HTML
gulp.task("pug", () => {
  return gulp
    .src([paths.src_pug + "**/*.pug", "!" + paths.src_pug + "**/_*.pug"])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      data(function() {
        return JSON.parse(fs.readFileSync(files.pkg))
      })
    )
    .pipe(
      data(function() {
        return yaml.safeLoad(fs.readFileSync(files.cfg))
      })
    )
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.out_html))
})

// SCSS > CSS
gulp.task("scss", () => {
  return gulp
    .src(paths.src_scss + "**/*.scss")
    .pipe(sassGlob())
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sass(sassOptions))
    .pipe(postcss(postcssOption))
    .pipe(gcmq())
    .pipe(header(banner, { pkg: pkg }))
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
    [paths.src_pug + "**/*.pug", "!" + paths.src_pug + "**/_*.pug"],
    gulp.series("pug", "reload")
  )
  gulp.watch(
    paths.src_scss + "**/*.scss",
    gulp.series("scss", "cssmin", "reload")
  )
})

gulp.task("default", gulp.parallel("browser-sync", "watch"))
