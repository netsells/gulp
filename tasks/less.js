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
    'gulp-less',
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
            .pipe($.plumber({
                errorHandler: function(err) {
                    console.log(err.toString());
                    this.emit('end');
                }
            }))
            .pipe($.less())
            .pipe($.autoprefixer({
                remove: false
            }))
            .pipe($.bless({
                imports: false
            }))
            .pipe($.minifyCss())
            .pipe($.rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(data.task.dest))
            .on('end', function() {
                return gulp.run((data.task.after) ? data.task.after : []);
            })
            .pipe($.livereload());
    });
}
