const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const plumber = require("gulp-plumber");
const shell = require("gulp-shell");

// --------------------
// Paths
// --------------------
const paths = {
  scss: "assets/scss/**/*.scss",
  entries: [
    "assets/scss/styles.scss",
    "assets/scss/in-page.scss"
  ],
  cssDest: "assets/css",
  php: ["bundle.php", "sections/**/*.php"]
};

// --------------------
// Styles task
// --------------------
function styles() {
  return src(paths.entries, { allowEmpty: true })
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "expanded"
      }).on("error", sass.logError)
    )
    .pipe(cleanCSS())
    .pipe(dest(paths.cssDest));
}

// --------------------
// Build HTML from PHP
// --------------------
function buildHtml() {
  return shell.task("php bundle.php > index.html")();
}

// --------------------
// Composed tasks
// --------------------
const build = series(styles, buildHtml);

// --------------------
// Watchers
// --------------------
function watchFiles() {
  watch(paths.scss, build);          // SCSS → styles → buildHtml
  watch(paths.php, buildHtml);       // PHP only → buildHtml
}

// --------------------
// Exports
// --------------------
exports.styles = styles;
exports.build = build;
exports.dev = series(build, watchFiles);
exports.default = exports.dev;