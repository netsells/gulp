# Gulp
Netsells custom gulp file. This module is intended to speed up development by making tasks consistent, as well as providing documentation and source control as improvements are made. 

As of the major version 1 release, this package now runs ontop of laravel-elixir, so all api features are available for use.

## Setup

The gulpfile itself is not that dissimilar from your usual elixir gulpfile, you just need to utilise a different wrapper, and pass in either a json file path or a literal component object.

### Initialising the gulpfile
```javascript
var NetsellsGulp = require('netsells-gulp')('./gulp.config.json');
```
or
```javascript
var NetsellsGulp = require('netsells-gulp')({
    frontend: {
        default: true,
        version: [
            "css/app/app.css",
            "js/app/app.js"
        ]
    },
    app: {
        version: [
            "css/frontend/app.css",
            "js/frontend/app.js"
        ]
    }
});
```

### Adding tasks
Default mix to run for all components:
```javascript
NetsellsGulp.default(function(mix) {
    mix
        .sass('app.scss')
        .browserify('app.js')
        .version(NetsellsGulp.getVersionFiles())
        .browserSync({
            proxy: 'project.app'
        });
});
```

Specific mix for a single component:
```javascript
NetsellsGulp.component('frontend', function(mix) {
    mix
        .sass('app.scss');
});
```

When defining the mix, you have the whole of laravel elixir's API at your disposal.

You can specify the default component to compile, or you can provide a flag after the gulp command for the desired component, e.g. ``gulp --app``. This works for any specific gulp too, e.g. ``gulp less``, ``gulp watch``, etc.

This module will handle the rest, as long as you provide a valid config for it to read.

## Config

Config should be provided in the form of a json file somewhere in your project. The basic config format is as follows:

```json
{
    "taskName": {
        "default": true/false,
        "version": [
            "array of file paths to pass to the version command"
        ]
    },
}
```

In context:

```json
{
    "frontend": {
        "default": true,
        "version": [
            "css/app/app.css",
            "js/app/app.js"
        ]
    },
    "app": {
        "version": [
            "css/frontend/app.css",
            "js/frontend/app.js"
        ]
    }
}
```

## Caveats
Avoid manually running version in your mix, as this will mess with the paths and placement of the revisions manifest and content required by elixirs cache busting.


## License

[MIT](http://opensource.org/licenses/MIT)
