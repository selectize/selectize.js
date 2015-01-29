module.exports = function(config) {
	var saucelabs_browsers = {
		sl_chrome: {base: 'SauceLabs', browserName: 'chrome', platform: 'Windows 7', version: '35'},
		sl_firefox: {base: 'SauceLabs', browserName: 'firefox', version: '30'},
		sl_ios_safari: {base: 'SauceLabs', browserName: 'iphone', platform: 'OS X 10.9', version: '7.1'},
		sl_ie_11: {base: 'SauceLabs', browserName: 'internet explorer', platform: 'Windows 8.1', version: '11'}
	};

	var targets = {
		'saucelabs': Object.keys(saucelabs_browsers),
		'phantomjs': ['PhantomJS']
	};

	config.set({
		frameworks: ['mocha', 'chai'],
		files: [
			'bower_components/jquery/jquery.js',
			'bower_components/microplugin/src/microplugin.js',
			'bower_components/sifter/sifter.js',
			'test/support/*.js',
			'src/contrib/*.js',
			'src/constants.js',
			'src/utils.js',
			'src/selectize.js',
			'src/defaults.js',
			'src/selectize.jquery.js',
			'test/*.js'
		],
		preprocessors: {
			'src/**/*.js': ['coverage']
		},
		coverageReporter: {
			type: 'text-summary',
			dir: 'coverage/'
		},
		sauceLabs: {
			username: process.env.SAUCE_USERNAME,
			accessKey: process.env.SAUCE_ACCESS_KEY,
			build: process.env.TRAVIS_BUILD_NUMBER,
			testName: process.env.COMMIT_MESSAGE,
			tags: ['selectize', 'test']
		},
		customLaunchers: saucelabs_browsers,
		reporters: ['mocha', 'coverage'],
		port: 8888,
		colors: true,
		logLevel: config.LOG_INFO,
		browsers: targets[process.env.TARGET || 'phantomjs'],
		singleRun: true
	});
};