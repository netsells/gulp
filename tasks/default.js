/**
The default task
*/
var $ = require('gulp-requiremodules')([]);

module.exports = function(data) {
    var gulp    = data.gulp;

    gulp.task(data.taskName, (data.task.before) ? data.task.before : [], function() {});
}