import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import pug  from 'gulp-pug';

const sass = gulpSass(dartSass);

function buildStyles() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
};

function buildHTML() {
    return gulp.src('./src/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./'));
};
const watch = function () {
    gulp.watch('./src/sass/**/*.scss',  gulp.series('buildStyles'));
    gulp.watch('./src/**/*.pug',  gulp.series('buildHTML'));
}

export { buildStyles, buildHTML, watch};