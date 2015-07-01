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

var $ = require('gulp-requiremodules')([
    'gulp-plumber',
    'gulp-sass',
    'gulp-autoprefixer',
    'gulp-rename',
    'gulp-minify-css',
    'gulp-bless',
    'gulp-livereload'
]);

module.exports = function(data) {
    var gulp    = data.gulp;

    gulp.task(data.taskName, (data.task.before) ? data.task.before : [], function() {
        return gulp.src(data.task.src)
            .pipe($.plumber())
            .pipe($.sass())
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