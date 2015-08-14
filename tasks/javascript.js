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

var $ = require('gulp-requiremodules')([
    'gulp-sourcemaps',
    'gulp-plumber',
    'gulp-concat',
    'gulp-rename',
    'gulp-uglify',
    'gulp-livereload'
]);

module.exports = function(data) {
    var gulp    = data.gulp;

    gulp.task(data.taskName, (data.task.before) ? data.task.before : [], function() {
        return gulp.src(data.task.src)
            .pipe($.sourcemaps.init())
            .pipe($.plumber())
            .pipe($.concat(data.fileName+'.js'))
            .pipe(gulp.dest(data.task.dest))
            .pipe($.rename({
                suffix: '.min'
            }))
            .pipe($.uglify())
            .pipe(gulp.dest(data.task.dest))
            .pipe($.sourcemaps.write())
            .on('end', function() {
                return gulp.run((data.task.after) ? data.task.after : []);
            })
            .pipe($.livereload());
    })
}