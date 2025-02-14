// Karma configuration

module.exports = function (config) {
    config.set({
// base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'angular-filesort'],
        // list of files / patterns to load in the browser
        files: [
            'https://test.betha.com.br/base/g4/front-end/2.3/js/base.js',
            'https://test.betha.com.br/base/g4/front-end/2.3/angular/base.js',
            'https://test.betha.com.br/base/g4/design/2.1/js/base.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/ui-components/dist/ui-components.js',
            'src/**/*.js',
            'src/**/*.html'
        ],
        // list of files to exclude
        exclude: [],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*.html': ['ng-html2js'],
            '**/*.js': ['sourcemap']
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots', 'junit'],
        junitReporter: {
            outputDir: 'test-results',
            outputFile: 'test-results.xml'
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/'
        },

        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};