/**
Run the task to compile the LESS
  - Check for errors
  - Compile LESS
  - Autoprefix for browser compatability
  - Move to the public folder
  - Minify
  - Move to the public folder
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

    gulp.task('less', (data.task.before) ? data.task.before : [], function() {
        return gulp.src(data.task.src)
            .pipe($.plumber())
            .pipe($.less())
            .pipe($.autoprefixer({
                remove: false
            }))
            .pipe(gulp.dest(data.task.dest))
            .pipe($.rename({
                suffix: '.min'
            }))
            .pipe($.minifyCss())
            .pipe(gulp.dest(data.task.dest))
            .pipe($.bless())
            .pipe(gulp.dest(data.task.dest))
            .pipe($.livereload());
    });
}