/*
Run the task to install node and bower dependencies
*/

var $ = require('gulp-requiremodules')([
    'gulp-install'
]);

module.exports = function(data) {
    var gulp    = data.gulp;

    gulp.task(data.taskName, (data.task.before) ? data.task.before : [], function() {
        return gulp.src(data.task.src)
            .pipe($.install());
    })
}