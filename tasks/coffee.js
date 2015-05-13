/**
Run the task to compile the coffeescript
  - Check the coffeescript for errors
  - Concatenate into a single file
  - Compile the coffeescript to javascript
  - Move the file to our temporary storage
*/

var $ = require('gulp-requiremodules')([
    'gulp-plumber',
    'gulp-concat',
    'gulp-coffee'
]);

module.exports = function(data) {
    var gulp    = data.gulp;

    gulp.task('coffee', (data.task.before) ? data.task.before : [], function() {
        return gulp.src(data.task.src)
            .pipe($.plumber())
            .pipe($.concat('app.js'))
            .pipe($.coffee())
            .pipe(gulp.dest(data.task.dest));
    });
}