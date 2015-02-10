'use strict';

var gulp = require('gulp');

var gutil = require('gulp-util');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


gulp.task('deploy', function () {
    return gulp.src([
        '/*/**',
        '!bower_components',
        '!node_modules'
        ])
        .pipe($.ftp({
            host: 's112896.gridserver.com',
            remotePath: '/domains/demos.kirbythemes.com/html',
            user: 's112896.gridserver.com',
            pass: 'C@RTmin01'
        }))
        // you need to have some kind of stream after gulp-ftp to make sure it's flushed
        // this can be a gulp plugin, gulp.dest, or any kind of stream
        // here we use a passthrough stream
        .pipe(gutil.noop());
});
