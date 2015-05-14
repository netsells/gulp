/**
Run the task to compile the underscore templates
*/

var $ = require('gulp-requiremodules')([
    'gulp-sort',
    'gulp-plumber',
    'gulp-jst-concat'
]);

module.exports = function(data) {
    var gulp    = data.gulp;

    gulp.task('templates', (data.task.before) ? data.task.before : [], function() {
        gulp.src(data.task.src)
            .pipe($.sort())
            .pipe($.plumber())
            .pipe($.jstConcat('templates.js', {
                renameKeys: ['^.*templates/(.*).html$', '$1']
            }))
            .pipe(gulp.dest(data.task.dest));
    })
}