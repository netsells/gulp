var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')({ pattern: '*', replaceString: /\bgulp[\-.]/ }),
    _           = require('lodash'),
    pngquant    = require('imagemin-pngquant'),
    vinylPaths  = require('vinyl-paths'),
    path        = require('gulp-paths');

module.exports = function(data) {
    c = data.config;
    component = data.component;

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
    gulp.task('less', function() {
        if (!c[component].less) { return; }
        return gulp.src(c[component].less.src)
            .pipe($.plumber())
            .pipe($.less())
            .pipe($.autoprefixer({
                remove: false
            }))
            .pipe(gulp.dest(c[component].less.dest))
            .pipe($.rename({
                suffix: '.min'
            }))
            .pipe($.minifyCss())
            .pipe(gulp.dest(c[component].less.dest))
            .pipe($.bless())
            .pipe(gulp.dest(c[component].less.dest))
            .pipe($.livereload());
    });

    /**
    Run the task to optimise images
      - Minify each source image in the folder
      - Move to the public directory
    */
    gulp.task('images', function() {
        if (!c[component].images) { return; }
        return gulp.src(c[component].images.src)
            .pipe($.imagemin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                use: [pngquant()]
            }))
            .pipe(gulp.dest(c[component].images.dest));
    });

    /**
    Run the task to compile the coffeescript
      - Check the coffeescript for errors
      - Concatenate into a single file
      - Compile the coffeescript to javascript
      - Move the file to our temporary storage
    */
    gulp.task('coffee', function() {
        if (!c[component].coffee) { return; }
        return gulp.src(c[component].coffee.src)
            .pipe($.plumber())
            .pipe($.concat('app.js'))
            .pipe($.coffee())
            .pipe(gulp.dest(c[component].coffee.dest));
    });

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
    gulp.task('javascript', ['template', 'coffee'], function() {
        if (!c[component].js) { return; }
        return gulp.src(c[component].js.src)
            .pipe($.sourcemaps.init())
            .pipe($.plumber())
            .pipe($.concat('app.js'))
            .pipe(gulp.dest(c[component].js.dest))
            .pipe($.rename({
                suffix: '.min'
            }))
            .pipe($.uglify())
            .pipe(gulp.dest(c[component].js.dest))
            .pipe($.sourcemaps.write())
            .pipe($.livereload());
    })

    /**
    Run the task to compile the underscore templates
    */
    gulp.task('template', function () {
        if (!c[component].templates) { return; }
        gulp.src(c[component].templates.src)
            .pipe($.sort())
            .pipe($.plumber())
            .pipe($.jstConcat('templates.js', {
                renameKeys: ['^.*templates/(.*).html$', '$1']
            }))
            .pipe(gulp.dest(c[component].templates.dest))
            .pipe($.livereload());
    })

    /**
    Watch for changes in files and
    refresh the browser
    */
    gulp.task('watch', ['install'], function(){
        if (argv.build) {
            gulp.run('default');
        }
        $.livereload.listen();
        if (c[component].less) {
            gulp.watch(c[component].less.watch, ['less']);
        }
        if (c[component].coffee) {
            gulp.watch(c[component].coffee.watch, ['javascript']);
        }
        if (c[component].images) {
            gulp.watch(c[component].images.watch, ['images']);
        }
        if (c[component].templates) {
            gulp.watch(c[component].templates.watch, ['javascript']);
        }
        if (c[component].phpunit) {
            gulp.watch(c[component].phpunit.watch, ['phpunit']);
        }
        if (c[component].codecept) {
            if (c[component].codecept.acceptance) {
                gulp.watch(c[component].codecept.acceptance.watch, ['codecept::acceptance']);
            }
            if (c[component].codecept.functional) {
                gulp.watch(c[component].codecept.functional.watch, ['codecept::functional']);
            }
        }
        if (c['global'].install) {
            gulp.watch(c['global'].install.watch, ['install']);
        }
    });

    /**
    Run PHPUnit
    */
    gulp.task('phpunit', function() {
        if (!c[component].phpunit) { return; }
        gulp.src(c[component].phpunit.src)
            .pipe($.phpunit('', { notify : true }))
            .on('error', $.notify.onError(testNotification('fail', 'phpunit')))
            .pipe($.plumber())
            .pipe($.notify(testNotification('pass', 'phpunit')));
    });

    /**
    Run Codeceptionceptionceptionception task
    */
    gulp.task('codecept', ['codecept::acceptance', 'codecept::functional']);

    gulp.task('codecept::acceptance', function() {
        if (!c[component].codecept && !c[component].codecept.acceptance) { return; }
        gulp.src(c[component].codecept.acceptance.src)
            .pipe($.codeception('./vendor/bin/codecept', { flags: 'acceptance', notify: true }))
            .on('error', $.notify.onError(testNotification('fail', 'codeception')))
            .pipe($.plumber())
            .pipe($.notify(testNotification('pass', 'codeception')));
    });
    gulp.task('codecept::functional', function() {
        if (!c[component].codecept && !c[component].codecept.functional) { return; }
        gulp.src(c[component].codecept.functional.src)
            .pipe($.codeception('./vendor/bin/codecept', { flags: 'functional', notify: true }))
            .on('error', $.notify.onError(testNotification('fail', 'codeception')))
            .pipe($.plumber())
            .pipe($.notify(testNotification('pass', 'codeception')));
    });
    gulp.task('install', function() {
        if (!c['global'].install) { return; }
        gulp.src(c['global'].install.src)
            .pipe($.install());
    });

    /**
    The default task
    */
    gulp.task('default', ['install', 'less', 'javascript']);

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

module.exports = gulp;