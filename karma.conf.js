module.exports = function(config) {
	var saucelabs_browsers = {
		'SL_Chrome': {
			base: 'SauceLabs',
			browserName: 'chrome',
			version: '39'
		},
		'SL_Firefox': {
			base: 'SauceLabs',
			browserName: 'firefox',
			version: '31'
		},
		'SL_Safari': {
			base: 'SauceLabs',
			browserName: 'safari',
			platform: 'OS X 10.10',
			version: '8'
		},
		'SL_IE_9': {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			platform: 'Windows 2008',
			version: '9'
		},
		'SL_IE_10': {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			platform: 'Windows 2012',
			version: '10'
		},
		'SL_IE_11': {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			platform: 'Windows 8.1',
			version: '11'
		}
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
			startConnect: true,
			tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
			build: process.env.TRAVIS_BUILD_NUMBER,
			testName: process.env.COMMIT_MESSAGE,
			tags: ['selectize', 'test'],
			options: {
				'selenium-version': '2.41.0'
			}
		},
		customLaunchers: saucelabs_browsers,
		reporters: ['mocha', 'coverage'],
		port: 8888,
		colors: true,
		captureTimeout: 0,
		logLevel: config.LOG_INFO,
		browsers: targets[process.env.TARGET || 'phantomjs'],
		browserDisconnectTolerance: 2,
		browserDisconnectTimeout: 10000,
		browserNoActivityTimeout: 120000,
		singleRun: true
	});
};