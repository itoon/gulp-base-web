'use strict';

var gulp         = require('gulp');
var fs           = require('fs');
var path         = require('path');
var sass         = require('gulp-sass');
var cleanCSS     = require('gulp-clean-css');
var browserSync  = require('browser-sync');
var autoprefixer = require('autoprefixer');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat       = require('gulp-concat');
var reload       = browserSync.reload;

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

function sass_min(dir) {
    // css file
    gulp.src('./sass/'+dir+'/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest('../assets/'+dir+'/css'))
        .pipe(browserSync.stream());

    return gulp.src('./sass/'+dir+'/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('../assets/'+dir+'/css'))
        .pipe(browserSync.stream());
}

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync',['sass_site'], function() {
    browserSync.init({
        proxy: 'http://abc.dev/'
    });
    gulp.watch('./sass/site/*.scss', ['sass_site']);
    gulp.watch('../index.php').on('change', browserSync.reload);
});

gulp.task('sass_site', function () {
    sass_min('site');
});
