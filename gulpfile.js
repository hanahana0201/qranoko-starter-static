//----------------------------------------------------
// gulp: Setting
//----------------------------------------------------

const fs = require("fs")
const gulp = require("gulp")
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const rename = require("gulp-rename")
const header = require("gulp-header")
const gulpif = require("gulp-if")
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
const babel = require("gulp-babel")
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")

// Require File
const package = require("./package.json")

// Read File
const files = {
  package: "./package.json",
  config: "./config.yml"
}

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
    pug: package.project.src + "/pug/",
    scss: package.project.src + "/scss/",
    js: package.project.src + "/js/"
  },
  dist: {
    dir: package.project.dist + "/",
    html: package.project.dist + "/",
    css: package.project.dist + "/assets/css/",
    js: package.project.dist + "/assets/js/"
  }
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

// Pug > HTML
gulp.task("pug", () => {
  return gulp
    .src([paths.src.pug + "**/*.pug", "!" + paths.src.pug + "**/_*.pug"])
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
        presets: ["env"]
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
    [paths.src.pug + "**/*.pug", "!" + paths.src.pug + "**/_*.pug"],
    gulp.series("pug", "reload")
  )
  gulp.watch(
    paths.src.scss + "**/*.scss",
    gulp.series("scss", "cssmin", "reload")
  )
  gulp.watch(paths.src.js + "**/*.js", gulp.series("babel", "uglify", "reload"))
})

gulp.task("default", gulp.parallel("browser-sync", "watch"))

//----------------------------------------------------
// gulp: Build
//----------------------------------------------------

gulp.task(
  "build",
  gulp.parallel(
    gulp.series("pug"),
    gulp.series("scss", "cssmin"),
    gulp.series("babel", "uglify")
  )
)
