module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-replace');
	grunt.registerTask('default', ['bower:install', 'concat', 'replace', 'uglify']);

	var plugins = (grunt.option('plugins') || '*').split(/\s*,\s*/).join(',');
	if (plugins !== '*') plugins = '{' + plugins + '}';

	var files_js = [
		'src/contrib/*.js',
		'src/*.js',
		'!src/selectize.js',
		'!src/selectize.jquery.js',
		'src/selectize.js',
		'src/selectize.jquery.js',
		'src/plugins/' + plugins + '/*.js'
	];

	var files_js_standalone = [
		'src/contrib/*.js',
		'src/*.js',
		'!src/selectize.js',
		'!src/selectize.jquery.js',
		'src/selectize.js',
		'src/selectize.jquery.js',
		//'bower_components/*/*.js',
		//'!bower_components/jquery/*.js',
		'src/plugins/' + plugins + '/*.js'
	];

	var files_css = [
		'src/*.css',
		'src/plugins/' + plugins + '/*.css'
	];

	grunt.initConfig({
		pkg: grunt.file.readJSON('bower.json'),
		umd: {
			main: {
				objectToExport: 'Selectize',
				src: 'dist/selectize.js',
				dest: 'dist/selectize.js'
			},
			standalone: {
				objectToExport: 'Selectize',
				src: 'dist/standalone/selectize.js',
				dest: 'dist/standalone/selectize.js'
			}
		},
		bower: {
			install: {
				options: {
					targetDir: './bower_components',
					layout: 'byComponent'
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
			standalone: {
				options: {
					variables: {
						'version': '<%= pkg.version %>',
						'js': '<%= grunt.file.read("dist/standalone/selectize.js").replace(/\\n/g, "\\n\\t") %>',
						'css': '<%= grunt.file.read("dist/standalone/selectize.css") %>',
					},
				},
				files: [
					{src: ['templates/wrapper.js'], dest: 'dist/standalone/selectize.js'},
					{src: ['templates/wrapper.css'], dest: 'dist/standalone/selectize.css'}
				]
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
					'dist/standalone/selectize.js': files_js_standalone
				}
			},
			css: {
				files: {
					'dist/selectize.css': files_css,
					'dist/standalone/selectize.css': files_css
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