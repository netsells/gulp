var $ = require('gulp-requiremodules')([
    'gulp-livereload',
    'yargs',
    'lodash'
]);

var _ = $.lodash;

module.exports = function(data) {
    var gulp    = data.gulp;
    var c       = data.c;

    gulp.task('watch', function(){
        if ($.yargs.argv.build) {
            gulp.run('default');
        }
        $.livereload.listen();

        _.forEach(c[component], function(n, key) {
            if (c[component][key]['watch']) {
                watchSrc = c[component][key].watch;
                if (watchSrc.src) {
                    watchSrc = watchSrc.src;
                }

                watchTask = key;
                if (c[component][key]['watch'] && c[component][key]['watch']['task']) {
                    watchTask = c[component][key]['watch']['task'];
                }

                if (typeof watchTask != "object") {
                    watchTask = watchTask.split(" ");
                }

                gulp.watch(watchSrc, watchTask);
            }
        });

        if (c['global'].install) {
            gulp.watch(c['global'].install.watch, ['install']);
        }
    });
}