var gulp        = require('gulp'),
    _           = require('lodash');

module.exports = function(data) {
    c = data.config;
    component = data.component;

    _.forEach(c[component], function(n, key) {
        // Get the task
        task = key;
        // Is it a subtask?
        isSub = (task.split(':').length == 2);
        // Get the main task
        if (isSub) {
            task = task.split(':')[1]
        }
        // Pull in the task module
        require('./tasks/'+task)({
            gulp:     gulp,
            task:     c[component][key],
            taskName: key,
            fileName: (isSub) ? 'vendor.' + task : 'app'
        });
    });

    /**
    Watch for changes in files and
    refresh the browser
    */

    require('./tasks/watch')({
        gulp:       gulp,
        component:  component,
        c:          c
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
