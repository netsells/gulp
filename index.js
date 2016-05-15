var elixir = require('laravel-elixir'),
    gutils = require('gulp-util'),
    fs = require('fs');

// Register our components from a literal
// object or from a json file
function registerComponents(components) {
    // Default it to the app component
    if (components == null) {
        return {
            app: {
                default: true,
                version: [
                    "css/app/app.css",
                    "js/app/app.js"
                ]
            }
        };
    }

    // If it's a string, it's probably a file path
    if ((typeof components == 'string') && (fs.existsSync(components))) {
        return JSON.parse(fs.readFileSync(components, 'utf8'));
    }

    // TODO: Catch !fileExist

    return components;
}


// The Netsells Gulp instance
function NetsellsGulp(components) {
    this.elixir = elixir;
    this.components = registerComponents(components);
    this.customComponents = [];

    // Register a single custom component handler
    this.component = function(name, mix) {
        // Add it to an array of customs
        this.customComponents.push(name);

        // Only run if this custom component was requested
        if (this.getComponent() == name) {
            this.run(mix);
        }
    }

    // Default component handler unless overidden
    this.default = function(mix) {
        // Only run if the requested component isn't 
        // registered as custom
        if (this.customComponents.indexOf(this.getComponent()) == -1) {
            this.run(mix);
        }
    }

    // Run the mix!
    this.run = function(mix) {
        this.setComponentConfig();
        this.elixir(mix);
    }

    // Get the default component to run when no 
    // extra parameter is passed in
    this.getDefaultComponent = function() {
        // Find the first component with 
        // the 'default' property set
        for (var component in this.components) {
            if (this.components[component].default) {
                return component;
            }
        }
        // If not found, return the first component
        return Object.keys(components)[0];
    }

    this.getComponent = function() {
        // Legacy component catching
        if (gutils.env.c && this.components[gutils.env.c]) {
            return gutils.env.c;
        }

        // Loop through the command parameters and see if 
        // they match any of our components
        for (var key in gutils.env) {
            if (!gutils.env.hasOwnProperty(key)) continue;

            if (this.components[key]) {
                return key;
            }
        }

        // Otherwise return default
        return this.getDefaultComponent();
    }

    // Concat our version files so that elixir 
    // processes them properly.
    this.getVersionFiles = function() {
        var version = [];
        for (var component in this.components) {
            if (versionFiles = this.components[component].version) {
                version = version.concat(versionFiles);
            }
        }

        return version;
    }

    // Set the elixir config on a per component 
    // basis so our paths match up how we want them
    this.setComponentConfig = function() {
        component = this.getComponent();

        this.elixir.config.assetsPath = this.elixir.config.assetsPath + '/' + component;
        this.elixir.config.js.outputFolder = this.elixir.config.js.outputFolder + '/' + component;
        this.elixir.config.css.outputFolder = this.elixir.config.css.outputFolder + '/' + component;
    }

    // Let the user know which component they ran.
    // TODO: Make this more eye catching
    gutils.log("Running component:", this.getComponent());

    return this;
};

module.exports = NetsellsGulp;