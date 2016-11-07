var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var del = require('del');
var rename = require('gulp-rename');
var merge = require('merge2');

var modules = 'node_modules/';
var stylesSrc = 'src/styles/';
var scriptsSrc = 'src/scripts/';
var stylesDist = 'dist/styles/';
var scriptsDist = 'dist/scripts/';

gulp.task('styles', function() {
    var bootstrapStream;
    var customStyleStream;

    bootstrapStream = sass(modules + 'bootstrap/scss/bootstrap.scss')
        .pipe(autoprefixer('last 2 version'));

    customStyleStream = sass(stylesSrc + 'main.scss')
        .pipe(autoprefixer('last 2 version'));

    return merge(bootstrapStream, customStyleStream)
        .pipe(concat('style.css'))
        .pipe(gulp.dest(stylesDist))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src([
        modules + 'jquery/dist/jquery.js',
        modules + 'bootstrap/dist/js/bootstrap.js',
        scriptsSrc + '**/*.js'
    ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest(scriptsDist))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function() {
    return del([stylesDist + '*.css', scriptsDist + '*.js']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

gulp.task('watch', function() {
    gulp.watch(stylesSrc + '**/*.scss', ['styles']);
    gulp.watch(scriptsSrc + '**/*.js', ['scripts']);
});