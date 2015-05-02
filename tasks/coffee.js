/**
Run the task to compile the coffeescript
  - Check the coffeescript for errors
  - Concatenate into a single file
  - Compile the coffeescript to javascript
  - Move the file to our temporary storage
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

    gulp.task('coffee', (data.task.before) ? data.task.before : [], function() {
        return gulp.src(data.task.src)
            .pipe($.plumber())
            .pipe($.concat('app.js'))
            .pipe($.coffee())
            .pipe(gulp.dest(data.task.dest));
    });
}