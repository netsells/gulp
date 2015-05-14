var gulp        = require('gulp'),
    _           = require('lodash');

module.exports = function(data) {
    c = data.config;
    component = data.component;

    _.forEach(c[component], function(n, key) {
        require('./tasks/'+key)({
            gulp:   gulp,
            task:   c[component][key]
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
