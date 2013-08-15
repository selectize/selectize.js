module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-bower-cli');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-recess');
	grunt.registerTask('default', [
		'bower:install',
		'concat:js',
		'recess',
		'replace',
		'concat:js_standalone',
		'uglify'
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

	var files_css = [
		'src/*.css'
	];

	var plugins = grunt.option('plugins');
	if (plugins) {
		if (plugins.indexOf(',') !== -1) {
			plugins = '{' + plugins.split(/\s*,\s*/).join(',') + '}';
		}
		files_js.push('src/plugins/' + plugins + '/*.js');
		files_css.push('src/plugins/' + plugins + '/*.css');
	}

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
		replace: {
			options: {prefix: '@@'},
			main: {
				options: {
					variables: {
						'version': '<%= pkg.version %>',
						'js': '<%= grunt.file.read("dist/selectize.js").replace(/\\n/g, "\\n\\t") %>',
						'css': '<%= grunt.file.read("dist/selectize.css") %>',
					},
				},
				files: [
					{src: ['templates/wrapper.js'], dest: 'dist/selectize.js'},
					{src: ['templates/wrapper.css'], dest: 'dist/selectize.css'}
				]
			},
			css_post: {
				options: {
					variables: {
						'version': '<%= pkg.version %>'
					},
				},
				files: [
					{expand: true, flatten: false, src: ['dist/*.css'], dest: ''}
				]
			}
		},
		recess: {
			options: {
				compile: true
			},
			uncompressed: {
				files: {
					'dist/selectize.css': ['src/css/selectize.less'],
					'dist/selectize.default.css': ['src/css/selectize.default.less']
				}
			},
			compressed: {
				options: {
					compress: true
				},
				files: {
					'dist/selectize.min.css': ['src/css/selectize.less'],
					'dist/selectize.default.min.css': ['src/css/selectize.default.less']
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
					'dist/selectize.js': files_js,
				}
			},
			js_standalone: {
				options: {
					stripBanners: false
				},
				files: {
					'dist/standalone/selectize.js': (function() {
						var files = [];
						for (var i = 0, n = files_js_dependencies.length; i < n; i++) {
							files.push(files_js_dependencies[i]);
						}
						files.push('dist/selectize.js');
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
					'dist/selectize.min.js': ['dist/selectize.js'],
					'dist/standalone/selectize.min.js': ['dist/standalone/selectize.js']
				}
			}
		}
	});
};