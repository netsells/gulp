/**
The default task
*/
var $ = require('gulp-require-modules')([]);

module.exports = function(data) {
    var gulp    = data.gulp;

    gulp.task('default', (data.task.before) ? data.task.before : [], function() {});
}