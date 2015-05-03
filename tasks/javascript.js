/**
Run the task to compile the javascript
  - Run the coffeescript task beforehand
  - Check the javascript for errors
  - Concatenate into a single file
  - Move to the public directory
  - Create a copy for minification
  - Minify the concatenated file
  - Move to the public directory
  - Reload if using a watch task
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

    gulp.task('javascript', (data.task.before) ? data.task.before : [], function() {
        return gulp.src(data.task.src)
            .pipe($.sourcemaps.init())
            .pipe($.plumber())
            .pipe($.concat('app.js'))
            .pipe(gulp.dest(data.task.dest))
            .pipe($.rename({
                suffix: '.min'
            }))
            .pipe($.uglifyjs())
            .pipe(gulp.dest(data.task.dest))
            .pipe($.sourcemaps.write())
            .pipe($.livereload());
    })
}