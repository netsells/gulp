var gulp        = require('gulp'),
    argv        = require('yargs').argv,
    $           = require('gulp-load-plugins')({ pattern: '*', replaceString: /\bgulp[\-.]/ }),
    _           = require('lodash'),
    pngquant    = require('imagemin-pngquant'),
    vinylPaths  = require('vinyl-paths'),
    path        = require('gulp-paths');

module.exports = function(data) {
    c = data.config;
    component = data.component;

    _.forEach(c[component], function(n, key) {
        require('./tasks/'+key)({
            gulp:   gulp,
            $:      $,
            task:   c[component][key]
        });
    });

    /**
    Watch for changes in files and
    refresh the browser
    */
    gulp.task('watch', function(){
        if (argv.build) {
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

    /**
    Pretty notifications
    */
    function testNotification(status, pluginName, override) {
        var options = {
            title:   ( status == 'pass' ) ? 'Tests Passed' : 'Tests Failed',
            message: ( status == 'pass' ) ? '\n\nAll tests have passed!\n\n' : '\n\nOne or more tests failed...\n\n',
            icon:    __dirname + '/node_modules/gulp-' + pluginName +'/assets/test-' + status + '.png'
        };
        options = _.merge(options, override);
        return options;
    }
}
