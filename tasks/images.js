/**
Run the task to optimise images
  - Minify each source image in the folder
  - Move to the public directory
*/

var $ = require('gulp-requiremodules')([
    'gulp-imagemin',
    'imagemin-pngquant'
]);

module.exports = function(data) {
    var gulp    = data.gulp;

    gulp.task(data.taskName, (data.task.before) ? data.task.before : [], function() {
        return gulp.src(data.task.src)
            .pipe($.imagemin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                use: [$.imageminPngquant()]
            }))
            .pipe(gulp.dest(data.task.dest));
    });
}