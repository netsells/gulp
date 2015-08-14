/**
Run the task to compile the jsx templates
*/

var $ = require('gulp-requiremodules')([
    'gulp-plumber',
    'gulp-concat',
    'gulp-react',
    'gulp-livereload'
]);

module.exports = function(data) {
    var gulp    = data.gulp;

    gulp.task(data.taskName, (data.task.before) ? data.task.before : [], function() {
        return gulp.src(data.task.src)
            .pipe($.plumber())
            .pipe($.react({
                harmony: true
            }))
            .pipe($.concat(data.fileName+'.js'))
            .pipe(gulp.dest(data.task.dest))
            .on('end', function() {
                return gulp.run((data.task.after) ? data.task.after : []);
            })
            .pipe($.livereload());
    });
}
