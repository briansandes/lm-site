const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');

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
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.cssDest));
}

function watchFiles() {
  watch(paths.scss, styles);
}

exports.styles = styles;
exports.dev = series(styles, watchFiles);
exports.default = exports.dev;