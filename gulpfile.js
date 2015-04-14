'use strict';

var gulp = require('gulp');
//var gutil = require('gulp-util');

var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var sass = require('gulp-sass');


gulp.task('sass', function () {
    return gulp.src('./public/style/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/style'));
});

gulp.task('usemin', function () {
    return gulp.src('./public/**/*.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            html: [minifyHtml({empty: true})],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

var filesToMove = [
    './public/**/*.html',
    './public/**/main.css'
];

gulp.task('move', function(){
    return gulp.src(filesToMove, { base: './public' })
        .pipe(gulp.dest('dist'));
});

gulp.task('dist', ['sass', 'usemin', 'move'], function(){

});