module.exports = function (config) {
  var targets = {
    'ChromeHeadless': ['ChromeHeadless']
  };

  var browsers = targets[process.env.TARGET || 'ChromeHeadless'];
  if (process.env.BROWSERS) {
    browsers = process.env.BROWSERS.split(',');
  }

  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'dist/css/selectize.default.css',
      'node_modules/jquery/dist/jquery.js',
      'test/support/*.js',
      'src/contrib/*.js',
      'src/utils.js',
      'src/constants.js',
      'src/selectize.js',
      'src/defaults.js',
      'src/selectize.jquery.js',
      'test/*.js'
    ],
    preprocessors: {
      'src/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    port: 8888,
    colors: true,
    captureTimeout: 0,
    logLevel: config.LOG_INFO,
    browsers: browsers,
    browserDisconnectTolerance: 2,
    browserDisconnectTimeout: 10000,
    browserNoActivityTimeout: 120000,
    singleRun: true
  });
};
