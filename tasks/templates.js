/**
Run the task to compile the underscore templates
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

    gulp.task('templates', (data.task.before) ? data.task.before : [], function() {
        gulp.src(data.task.src)
            .pipe($.sort())
            .pipe($.plumber())
            .pipe($.jstConcat('templates.js', {
                renameKeys: ['^.*templates/(.*).html$', '$1']
            }))
            .pipe(gulp.dest(data.task.dest))
            .pipe($.livereload());
    })
}