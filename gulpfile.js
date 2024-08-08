'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');

function buildStyles() {
  return gulp.src('./src/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
};

function buildHTML() {
    return gulp.src('./src/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./'));
};


exports.buildStyles = buildStyles;
exports.buildHTML = buildHTML;
exports.watch = function () {
    gulp.watch('./src/sass/**/*.scss',  gulp.series('buildStyles'));
    gulp.watch('./src/**/*.pug',  gulp.series('buildHTML'));
}