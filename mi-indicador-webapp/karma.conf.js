// Karma configuration
// Generated on Tue Jul 01 2025 15:59:38 GMT-0400 (hora estándar de Chile)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // AngularJS y mocks
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular-mocks.js',

      // Tu código fuente
      'app/app.js',
      'app/mocks/mock-data.js',

      // Servicios y filtros
      'app/services/api-service.js',
      'app/filters/format-valor.js',
      'app/filters/format-fecha.js',

      // Controladores
      'app/controllers/InicioController.js',
      'app/controllers/list.controller.js',
      'app/controllers/detail.controller.js',

      // Specs
      'test/*.spec.js'
    ],     

    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity
  })
}
