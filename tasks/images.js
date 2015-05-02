/**
Run the task to optimise images
  - Minify each source image in the folder
  - Move to the public directory
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

    gulp.task('images', (data.task.before) ? data.task.before : [], function() {
        return gulp.src(data.task.src)
            .pipe($.imagemin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                use: [pngquant()]
            }))
            .pipe(gulp.dest(data.task.dest));
    });
}