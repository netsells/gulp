# Gulp
Netsells custom gulp file. This module is intended to speed up development by making tasks consistent, as well as providing documentation and source control as improvements are made. 

If working on multiple projects using the this gulpfile, I would recommend installing this module globally (```npm install -g netsells-gulp```) so that you don't need to install all the dependencies in each project.

More tasks will be added eventually, as well as improvements in performance.

## Setup

The gulpfile itself needs only be the following:

```javascript
var gulp = require('gulp');

gulp.tasks = require('netsells-gulp')({
    config: require('./gulp.config')
});
```

You can specify the default component to compile, or you can specify the ``--c=<component>`` flag after the gulp command. This works for any specific gulp too, e.g. ``gulp less``, ``gulp watch``, etc.

The ``gulp watch`` command also accepts a ``--build`` flag which will run the ``default`` task specified in your config.

This module will handle the rest, as long as you provide a valid config for it to read.

## Config

Config should be provided in the form of a ``gulp.config.js`` file in the same directory as your gulpfile. The basic config format is as follows:

```javascript
var path = require('gulp-paths');

module.exports = {
    component: {
        task: {
            before: ['Array of tasks to perform before this one'],
            watch: {
                src: 'Array or string of files to watch',
                task: 'Task to execute when changes are made'
            },
            src: [
            	'Array of files to pass into the pipe'
            ],
            dest: 'Path to move files to'
        }
    }
}
```

In context:

```javascript
var path = require('gulp-paths');

module.exports = {
    global: {
        install: {
            watch: ['./bower.json', './package.json'],
            src: ['./bower.json', './package.json']
        }
    },
    app: {
        default: {
            before: ['javascript', 'less']
        },
        coffee: {
            watch: {
                src: path.asset('app/coffee/**/**'),
                task: ['javascript']
            },
            src: [
                ...
                path.asset('app/coffee/app.coffee'),
            ],
            dest: path.asset('app/js')
        },
        less: {
            ...
        },
        images: {
            ...
        },
        javascript: {
            before: ['templates', 'coffee'],
            src: [
                path.bower('jquery/dist/jquery.js'),
                // Place additional bower dependencies here in the format used above
                path.asset('app/js/templates.js'),
                path.asset('app/js/app.js')
            ],
            dest: path.js('app')
        },
        templates: {
            ...
        },
    },
    frontend: {
        default: {
            before: ['javascript', 'less']
        },
        less: {
            ...
        },
        images: {
            ...
        },
        ...
    },
}
```



## Tasks
* Install
	* Bower install and npm install
* CoffeeScript
	* Concats all coffeescript files into a single file
	* Compiles to Javascript
	* Moves to the JavaScript staging folder  
* JST Templates
	* .html templates that use the lodash/underscore templating syntax
	* Compiles to JavaScript
	* Moves to the JavaScript staging folder
* JSX
	* Compiles JSX files to javascript
	* Moves to the JavaScript staging folder
* JavaScript
	* Concats all JavaScript files including those in the staging area (if specified in config)
	* Moved to the public folder
	* A Minified version is created
	* Moved to the public folder also
* LESS
	* Compiles to CSS
	* Auto-prefixes any vendor specific attributes
	* Moved to the public folder
	* Minified
	* Moved to the public folder
	* Split up into multiple files if IE selector limit is reached
* SASS
	* Compiles to CSS
	* Auto-prefixes any vendor specific attributes
	* Moved to the public folder
	* Minified
	* Moved to thje public folder
	* Split up into multiple files if IE selector limit is reached
* Images
	* Images are compressed
	* Moved to the public folder

## Vendor tasks
Need to compile certain files but don't want these compiled into a single bloated file with your app logic especially if they're not going to change often (mainly package manager dependencies such as bower)? Well no problem! Simply name the task in the following format: ```vendor:javascript``` for example, and a separate file will be compiled named ```vendor.javascript.js``` on compile. This also speeds up compiling on save immensely - [Craig](http://craigy.co.uk/) will be happy!

## To-do
### Functionality
* ~~Require dependencies on a per task basis, rather than all at once through the ``$`` prefix~~
* Prompt for component
* Overridable tasks
* Better error catching
* Gutils functionality
* Cleanup of compiled assets before running
* ~~Vendor tasks~~

### Tasks
* PHPUnit
* Codecept
* ~~SASS/SCSS~~
