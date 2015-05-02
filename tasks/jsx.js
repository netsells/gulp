/**
Run the task to compile the jsx templates
*/

var gulp,
    argv        = require('yargs').argv,
    _           = require('lodash'),
    pngquant    = require('imagemin-pngquant'),
    vinylPaths  = require('vinyl-paths'),
    path        = require('gulp-paths');

module.exports = function(data) {
    var gulp    = data.gulp;
    var $       = data.$;

    gulp.task('jsx', (data.task.before) ? data.task.before : [], function() {
        return gulp.src(data.task.src)
            .pipe($.plumber())
            .pipe($.react())
            .pipe($.concat('app.js'))
            .pipe(gulp.dest(data.task.dest));
    });
}