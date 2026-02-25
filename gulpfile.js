const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const shell = require('gulp-shell');
const rename = require('gulp-rename');

// Compile PHP to HTML
function buildHtml() {
  return src('bundle.php')
    .pipe(shell([
      'php bundle.php > index.html'
    ]));
}

const paths = {
  scss: 'assets/scss/**/*.scss',
  entries: [
    'assets/scss/styles.scss',
    'assets/scss/in-page.scss'
  ],
  cssDest: 'assets/css'
};

function styles() {
  return src(paths.entries, { allowEmpty: true })
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    .pipe(cleanCSS())
    .pipe(dest(paths.cssDest));
}

function watchFiles() {
  watch(paths.scss, styles);
  watch(
    ['bundle.php', 'sections/**/*.php', paths.scss],
    buildHtml
  );
}

exports.styles = styles;
exports.dev = series(styles, buildHtml, watchFiles);
exports.default = exports.dev;

// once in a while, run:
// npx sass --load-path=node_modules assets/scss/bootstrap-custom.scss assets/css/bootstrap-custom.css --style=compressed --no-source-map