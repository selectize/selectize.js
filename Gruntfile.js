var fs = require('fs');

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-replace');

	grunt.registerTask('configure', [
		'clean:pre',
		'bower:install',
	]);

	grunt.registerTask('compile', [
		'copy:less',
		'copy:less_plugins',
		'concat:less_theme_dependencies',
		'concat:less_plugins',
		'concat:js',
		'less:uncompressed',
		'clean_bootstrap2_css',
		'replace',
		'build_standalone',
		'uglify',
		'clean:post',
	]);

	grunt.registerTask('default', [
		'configure',
		'compile'
	]);

	grunt.registerTask('clean_bootstrap2_css', 'Cleans CSS rules ocurring before the header comment.', function() {
		var file = 'dist/css/selectize.bootstrap2.css';
		var source = fs.readFileSync(file, 'utf8');
		grunt.file.write(file, source.replace(/^(.|\s)+?\/\*/m, '/*'));
		grunt.log.writeln('Cleaned "' + file + '".');
	});

	grunt.registerTask('build_standalone', '', function() {
		var files, i, n, source, name, path, modules = [];

		// amd definitions must be changed to be not anonymous
		// @see https://github.com/brianreavis/selectize.js/issues/89
		files = [];
		for (i = 0, n = files_js_dependencies.length; i < n; i++) {
			path = files_js_dependencies[i];
			name = path.match(/([^\/]+?).js$/)[1];
			source = grunt.file.read(path).replace('define(factory);', 'define(\'' + name + '\', factory);');
			modules.push(source);
		}

		path = 'dist/js/selectize.js';
		source = grunt.file.read(path).replace(/define\((.*?)factory\);/, 'define(\'selectize\', $1factory);');
		modules.push(source);

		// write output
		path = 'dist/js/standalone/selectize.js';
		grunt.file.write(path, modules.join('\n\n'));
		grunt.log.writeln('Built "' + path + '".');
	});

	var files_js = [
		'src/contrib/*.js',
		'src/*.js',
		'!src/.wrapper.js',
		'!src/defaults.js',
		'!src/selectize.js',
		'!src/selectize.jquery.js',
		'src/selectize.js',
		'src/defaults.js',
		'src/selectize.jquery.js',
	];

	var files_js_dependencies = [
		'bower_components/sifter/sifter.js',
		'bower_components/microplugin/src/microplugin.js',
	];

	var less_imports = [];
	var less_plugin_files = [];

	// enumerate plugins
	(function() {
		var selector_plugins = grunt.option('plugins');
		if (!selector_plugins) return;

		if (selector_plugins.indexOf(',') !== -1) {
			selector_plugins = '{' + selector_plugins.split(/\s*,\s*/).join(',') + '}';
		}

		// javascript
		files_js.push('src/plugins/' + selector_plugins + '/*.js');

		// less (css)
		var matched_files = grunt.file.expand(['src/plugins/' + selector_plugins + '/plugin.less']);
		for (var i = 0, n = matched_files.length; i < n; i++) {
			var plugin_name = matched_files[i].match(/src\/plugins\/(.+?)\//)[1];
			less_imports.push('@import "plugins/' +  plugin_name + '";');
			less_plugin_files.push({src: matched_files[i], dest: 'dist/less/plugins/' + plugin_name + '.less'});
		}
	})();

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			install: {
				options: {
					copy: false,
					clean: false,
					layout: 'byComponent',
					action: 'install'
				}
			}
		},
		clean: {
			pre: ['dist'],
			post: ['**/*.tmp*']
		},
		copy: {
			less: {
				files: [{expand: true, flatten: true, src: ['src/less/*.less'], dest: 'dist/less'}]
			},
			less_plugins: {
				files: less_plugin_files
			}
		},
		replace: {
			options: {prefix: '@@'},
			main: {
				options: {
					variables: {
						'version': '<%= pkg.version %>',
						'js': '<%= grunt.file.read("dist/js/selectize.js").replace(/\\n/g, "\\n\\t") %>',
						'css': '<%= grunt.file.read("dist/css/selectize.css") %>',
					},
				},
				files: [
					{src: ['src/.wrapper.js'], dest: 'dist/js/selectize.js'},
					{src: ['src/less/.wrapper.css'], dest: 'dist/css/selectize.css'}
				]
			},
			css_post: {
				options: {
					variables: {
						'version': '<%= pkg.version %>'
					},
				},
				files: [
					{expand: true, flatten: false, src: ['dist/css/*.css'], dest: ''},
					{expand: true, flatten: false, src: ['dist/less/*.less'], dest: ''},
					{expand: true, flatten: false, src: ['dist/less/plugins/*.less'], dest: ''},
				]
			}
		},
		less: {
			options: {},
			uncompressed: {
				files: {
					'dist/css/selectize.css': ['dist/less/selectize.less'],
					'dist/css/selectize.default.css': ['dist/less/selectize.default.less'],
					'dist/css/selectize.legacy.css': ['dist/less/selectize.legacy.less'],
					'dist/css/selectize.bootstrap2.css': ['dist/less/selectize.bootstrap2.tmp.less'],
					'dist/css/selectize.bootstrap3.css': ['dist/less/selectize.bootstrap3.tmp.less']
				}
			}
		},
		concat: {
			options: {
				stripBanners: true,
				separator: grunt.util.linefeed + grunt.util.linefeed
			},
			js: {
				files: {
					'dist/js/selectize.js': files_js,
				}
			},
			less_plugins: {
				options: {
					banner: less_imports.join('\n') + grunt.util.linefeed + grunt.util.linefeed
				},
				files: {
					'dist/less/selectize.less': ['dist/less/selectize.less']
				}
			},
			less_theme_dependencies: {
				options: {stripBanners: false},
				files: {
					'dist/less/selectize.bootstrap2.tmp.less': [
						'bower_components/bootstrap2/less/variables.less',
						'bower_components/bootstrap2/less/mixins.less',
						'dist/less/selectize.bootstrap2.less'
					],
					'dist/less/selectize.bootstrap3.tmp.less': [
						'bower_components/bootstrap3/less/variables.less',
						'bower_components/bootstrap3/less/mixins/nav-divider.less',
						'dist/less/selectize.bootstrap3.less'
					]
				}
			}
		},
		uglify: {
			main: {
				options: {
					'banner': '/*! selectize.js - v<%= pkg.version %> | https://github.com/selectize/selectize.js | Apache License (v2) */\n',
					'report': 'gzip',
					'ascii-only': true
				},
				files: {
					'dist/js/selectize.min.js': ['dist/js/selectize.js'],
					'dist/js/standalone/selectize.min.js': ['dist/js/standalone/selectize.js']
				}
			}
		}
	});
};
