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
		'concat:js',
		'concat:css_theme_dependencies',
		'recess',
		'replace',
		'concat:js_standalone',
		'uglify',
		'clean:post',
		'copy:less'
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
		clean: {
			pre: ['dist'],
			post: ['src/css/*.tmp*']
		},
		copy: {
			less: {
				files: [{expand: true, flatten: true, src: ['src/css/*.less'], dest: 'dist/less'}]
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
					{expand: true, flatten: false, src: ['dist/css/*.css'], dest: ''}
				]
			}
		},
		recess: {
			options: {
				compile: true
			},
			uncompressed: {
				files: {
					'dist/css/selectize.css': ['src/css/selectize.less'],
					'dist/css/selectize.default.css': ['src/css/selectize.default.less'],
					'dist/css/selectize.bootstrap2.css': ['src/css/selectize.bootstrap2.tmp.less'],
					'dist/css/selectize.bootstrap3.css': ['src/css/selectize.bootstrap3.tmp.less']
				}
			},
			compressed: {
				options: {
					compress: true
				},
				files: {
					'dist/css/selectize.min.css': ['src/css/selectize.less'],
					'dist/css/selectize.default.min.css': ['src/css/selectize.default.less'],
					'dist/css/selectize.bootstrap2.min.css': ['src/css/selectize.bootstrap2.tmp.less'],
					'dist/css/selectize.bootstrap3.min.css': ['src/css/selectize.bootstrap3.tmp.less']
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
			css_theme_dependencies: {
				options: {stripBanners: false},
				files: {
					'src/css/selectize.bootstrap2.tmp.less': [
						'bower_components/bootstrap2/less/variables.less',
						'bower_components/bootstrap2/less/mixins.less',
						'src/css/selectize.bootstrap2.less'
					],
					'src/css/selectize.bootstrap3.tmp.less': [
						'bower_components/bootstrap3/less/variables.less',
						'bower_components/bootstrap3/less/mixins.less',
						'src/css/selectize.bootstrap3.less'
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