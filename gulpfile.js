const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
let autoprefixBrowsers = ['last 10 version'];
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function () {
    return gulp.src('css/scss_input/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('css/css_output'));
});

gulp.task('autoprefixer', function () {
    return gulp.src('css/css_output/main.css')
        .pipe(autoprefixer({
            overrideBrowserslist: autoprefixBrowsers,
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'safari'
        }))
        .pipe(gulp.dest('css/css_output'));
});

gulp.task('minify-js', function () {
    return gulp.src('js/js_input/*.scss')
        .pipe(uglify())
        .pipe(gulp.dest('js/js_output/'));
});

gulp.task('watch', function () {
    gulp.watch('css/scss_input/**/*.scss', gulp.series('sass'));
    // gulp.watch('css/css_output/**/*.css', gulp.series('autoprefixer'));
});