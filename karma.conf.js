module.exports = function(config) {
  config.set({
    basePath: '',
    autoWatch: true,
    frameworks: ['mocha'],
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-webpack'
    ],
    files: [
      './test/specs/*.js'
    ],
    preprocessors: {
      './test/specs/*.js': ['webpack']
    },
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: ['--headless', '--disable-gpu', '--remote-debugging-port=9222']
      }
    },
    browsers: ['ChromeHeadless'],
    reporters: ['progress'],

    webpackMiddleware: {
      stats: 'errors-only',
      quiet: true
    }
  })
}
