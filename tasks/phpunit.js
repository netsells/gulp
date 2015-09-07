/**
Run the task for PHP testing

*/

var $ = require('gulp-requiremodules')([
    'gulp-phpunit',
    'gulp-notify',
    'lodash'
]);

function testNotification(status, pluginName, override) {
    var options = {
        title:   ( status == 'pass' ) ? 'Tests Passed' : 'Tests Failed',
        message: ( status == 'pass' ) ? '\n\nAll tests have passed!\n\n' : '\n\nOne or more tests failed...\n\n',
        icon:    __dirname + '/node_modules/gulp-' + pluginName +'/assets/test-' + status + '.png'
    };
    options = lodash.merge(options, override);
    return options;
}

module.exports = function(data) {
    var gulp    = data.gulp;

    gulp.task(data.taskName, (data.task.before) ? data.task.before : [], function() {
        return gulp.src(data.task.src)
            .pipe($.phpunit('', { notify : true }))
            .on('error', $.notify.onError(testNotification('fail', 'phpunit')))
            .pipe($.notify(testNotification('pass', 'phpunit')))
            .on('end', function() {
                return gulp.run((data.task.after) ? data.task.after : []);
            });
    });
}