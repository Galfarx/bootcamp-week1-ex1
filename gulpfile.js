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
var stylesDist = 'dist/styles';

gulp.task('styles', function() {
    var bootstrapStream;
    var customStyleStream;

    bootstrapStream = sass(modules + 'bootstrap/scss/bootstrap.scss');

    customStyleStream = sass(stylesSrc + 'main.scss');

    return merge(bootstrapStream, customStyleStream)
        .pipe(concat('style.css'))
        .pipe(gulp.dest(stylesDist))
        .pipe(notify({ message: 'Styles task complete' }));
});