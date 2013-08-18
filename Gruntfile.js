module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-bower-cli');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-recess');
	grunt.registerTask('default', [
		'clean:pre',
		'bower:install',
		'copy:less',
		'copy:less_plugins',
		'concat:less_theme_dependencies',
		'concat:less_plugins',
		'concat:js',
		'recess',
		'replace',
		'concat:js_standalone',
		'uglify',
		'clean:post',
	]);

	var files_js = [
		'src/contrib/*.js',
		'src/*.js',
		'!src/selectize.js',
		'!src/selectize.jquery.js',
		'src/selectize.js',
		'src/selectize.jquery.js'
	];

	var files_js_dependencies = [
		'bower_components/sifter/sifter.js'
	];

	var less_imports = [];
	var less_plugin_files = [];

	// enumerate plugins
	(function() {
		var selector_plugins = grunt.option('plugins');
		if (!selector_plugins) return;

		if (selector_plugins.indexOf(',') !== -1) {
			selector_plugins = '{' + plugins.split(/\s*,\s*/).join(',') + '}';
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
		pkg: grunt.file.readJSON('bower.json'),
		bower: {
			install: {
				options: {
					directory: 'bower_components',
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
				files: [{expand: true, flatten: true, src: ['src/css/*.less'], dest: 'dist/less'}]
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
					{src: ['templates/wrapper.js'], dest: 'dist/js/selectize.js'},
					{src: ['templates/wrapper.css'], dest: 'dist/css/selectize.css'}
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
		recess: {
			options: {
				compile: true
			},
			uncompressed: {
				files: {
					'dist/css/selectize.css': ['dist/less/selectize.less'],
					'dist/css/selectize.default.css': ['dist/less/selectize.default.less'],
					'dist/css/selectize.bootstrap2.css': ['dist/less/selectize.bootstrap2.tmp.less'],
					'dist/css/selectize.bootstrap3.css': ['dist/less/selectize.bootstrap3.tmp.less']
				}
			},
			compressed: {
				options: {
					compress: true
				},
				files: {
					'dist/css/selectize.min.css': ['dist/less/selectize.less'],
					'dist/css/selectize.default.min.css': ['dist/less/selectize.default.less'],
					'dist/css/selectize.bootstrap2.min.css': ['dist/less/selectize.bootstrap2.tmp.less'],
					'dist/css/selectize.bootstrap3.min.css': ['dist/less/selectize.bootstrap3.tmp.less']
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
						'bower_components/bootstrap3/less/mixins.less',
						'dist/less/selectize.bootstrap3.less'
					]
				}
			},
			js_standalone: {
				options: {
					stripBanners: false
				},
				files: {
					'dist/js/standalone/selectize.js': (function() {
						var files = [];
						for (var i = 0, n = files_js_dependencies.length; i < n; i++) {
							files.push(files_js_dependencies[i]);
						}
						files.push('dist/js/selectize.js');
						return files;
					})()
				}
			}
		},
		uglify: {
			main: {
				options: {
					'banner': '/*! selectize.js - v<%= pkg.version %> | https://github.com/brianreavis/selectize.js | Apache License (v2) */\n',
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