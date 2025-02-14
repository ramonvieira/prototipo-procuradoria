'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({pattern: ['gulp-*', 'del']});
var runSequence = require('run-sequence');

var config = {
    src: 'src',
    dist: 'dist'
};

function plumbedSrc() {
    return gulp.src
        .apply(gulp, arguments)
        .pipe($.plumber({
            errorHandler: function (error) {
                console.log(error);
                this.emit('end');
            }
        }));
}

gulp.task('js', function () {
    return plumbedSrc([config.src + '/**/*.js', '!**/*.spec.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.angularFilesort())
        .pipe($.sourcemaps.init())
        .pipe($.concat('ui-commons.js'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('dist'))

        .pipe($.uglify())
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    $.del.sync([config.dist]);
});

gulp.task('build', ['clean'], function (done) {
    runSequence('js', done);
});

gulp.task('default', ['build']);