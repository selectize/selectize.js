const concat = require('gulp-concat');
const dartSass = require('sass');
const del = require('del');
const fs = require('fs');
const gulpSass = require('gulp-sass');
const less = require('gulp-less');
const path = require('path');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = gulpSass(dartSass);
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const wrapper = require('@risadams/gulp-wrapper');

const { src, dest, series, watch } = require('gulp');

const cleanLibs = async () => del('dist/**/*');
const loadDependencies = async () => await _copyLibs();
const copyDependencies = async () => src(['lib/**/*']).pipe(dest('dist/lib'));
const copySrc = async () => {

  let scripts = [
    'src/contrib/*.js',
    'src/constants.js',
    'src/utils.js',
    'src/selectize.js',
    'src/defaults.js',
    'src/selectize.jquery.js'
  ];

  // Add in all plugin scripts in a predictable order
  fs.readdirSync('src/plugins').sort().forEach((file) => {
    scripts.push(`src/plugins/${file}/plugin.js`);
  });

  setTimeout(async () => {
    await _compileLess();
    await _compileSass();
    await _compileJavascript(scripts);
    await _minifyScripts(scripts);
  }, 1000);
};
const watchFiles = async () => watch(['src/**/*.{js,css,less,scss}']).on('change', series(loadDependencies, copyDependencies, copySrc));

async function _copyLibs() {
  'use strict';

  src(['node_modules/bootstrap2/less/**/**.*']).pipe(dest('lib/bootstrap2'));
  src(['node_modules/bootstrap3/less/**/**.*']).pipe(dest('lib/bootstrap3'));
  src(['node_modules/bootstrap4/scss/**/**.*']).pipe(dest('lib/bootstrap4'));
  src(['node_modules/bootstrap5/scss/**/**.*']).pipe(dest('lib/bootstrap5'));

  src(['node_modules/bootstrap-sass/assets/stylesheets/bootstrap/**/**.*']).pipe(dest('lib/bootstrap-sass'));
}

const _compileLess = async () => {
  src(['src/less/**.less']).pipe(dest('dist/less'));
  src(['src/plugins/**/*.less']).pipe(rename(renameFileToParentDirName)).pipe(dest('dist/less/plugins'));

  src([
    'src/less/selectize.less',
    'src/plugins/**/*.less'
  ])
    .pipe(concat('selectize.legacy.css'))
    .pipe(less({
      paths: ['lib', 'src/less'],
      math: 'always'
    }))
    .pipe(sourcemaps.init())
    .pipe(uglifycss())
    .pipe(sourcemaps.write())
    .pipe(wrapper({ header: license_header }))
    .pipe(replace(/@@YEAR/g, getYear()))
    .pipe(replace(/@@version/g, getVersion()))
    .pipe(dest('dist/css'));

  src([
    'src/less/selectize.bootstrap2.less',
    'src/plugins/**/*.less'
  ])
    .pipe(concat('selectize.bootstrap2.css'))
    .pipe(less({
      paths: ['lib', 'src/less'],
      math: 'always'
    }))
    .pipe(sourcemaps.init())
    .pipe(uglifycss())
    .pipe(sourcemaps.write())
    .pipe(wrapper({ header: license_header }))
    .pipe(replace(/@@YEAR/g, getYear()))
    .pipe(replace(/@@version/g, getVersion()))
    .pipe(dest('dist/css'));
}

const _compileSass = async () => {
  src(['src/scss/**.scss'])
    .pipe(replace(/\.\.\/plugins\/(.+)\/plugin.scss/g, 'plugins/$1.scss')) // fix relative paths GH#1886
    .pipe(dest('dist/scss'));
  src(['src/plugins/**/*.scss']).pipe(rename(renameFileToParentDirName)).pipe(dest('dist/scss/plugins'));

  src([
    'src/scss/selectize.scss',
    'src/plugins/**/*.scss'
  ])
    .pipe(concat('selectize.css'))
    .pipe(sass({
      includePaths: ['lib', 'src/scss'],
    }).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(uglifycss())
    .pipe(sourcemaps.write())
    .pipe(wrapper({ header: license_header }))
    .pipe(replace(/@@YEAR/g, getYear()))
    .pipe(replace(/@@version/g, getVersion()))
    .pipe(dest('dist/css'));

  src([
    'src/scss/selectize.default.scss',
    'src/plugins/**/*.scss'
  ])
    .pipe(concat('selectize.default.css'))
    .pipe(sass({
      includePaths: ['lib', 'src/scss'],
    }).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(uglifycss())
    .pipe(sourcemaps.write())
    .pipe(wrapper({ header: license_header }))
    .pipe(replace(/@@YEAR/g, getYear()))
    .pipe(replace(/@@version/g, getVersion()))
    .pipe(dest('dist/css'));

  // build the bootstrap base sccss styles
  for (let bs_version = 3; bs_version <= 5; bs_version++) {
    src([
      'src/scss/selectize.bootstrap' + bs_version + '.scss',
      'src/plugins/**/*.scss'
    ])
      .pipe(concat('selectize.bootstrap' + bs_version + '.css'))
      .pipe(sass({
        includePaths: ['lib', 'src/scss'],
      }).on('error', sass.logError))
      .pipe(sourcemaps.init())
      .pipe(uglifycss())
      .pipe(sourcemaps.write())
      .pipe(wrapper({ header: license_header }))
      .pipe(replace(/@@YEAR/g, getYear()))
      .pipe(replace(/@@version/g, getVersion()))
      .pipe(dest('dist/css'));
  }
}

const _compileJavascript = async (scripts) =>
  src(scripts)
    .pipe(concat('selectize.js'))
    .pipe(wrapper({
      header: amd_header,
      footer: amd_footer
    }))
    .pipe(wrapper({ header: license_header }))
    .pipe(replace(/@@YEAR/g, getYear()))
    .pipe(replace(/@@version/g, getVersion()))
    .pipe(dest('dist/js'));

const _minifyScripts = async (scripts) =>
  src(scripts)
    .pipe(concat('selectize.min.js'))
    .pipe(wrapper({
      header: amd_header,
      footer: amd_footer
    }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(wrapper({ header: license_header }))
    .pipe(replace(/@@YEAR/g, getYear()))
    .pipe(replace(/@@version/g, getVersion()))
    .pipe(dest('dist/js'));

// Helper methods and constants
const getYear = () => new Date().getFullYear();
const getVersion = () => process.env.npm_package_version;
const renameFileToParentDirName = (filepath) => {
  filepath.basename = path.basename(filepath.dirname);
  filepath.dirname = path.dirname(filepath.dirname);
}

const license_header = `/**
 * Selectize (v@@version)
 * https://selectize.dev
 *
 * Copyright (c) 2013-2015 Brian Reavis & contributors
 * Copyright (c) 2020-@@YEAR Selectize Team & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 * @author Ris Adams <selectize@risadams.com>
 */
`;

const amd_header = `(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.Selectize = factory(root.jQuery);
  }
}(this, function ($) {
  'use strict';
`;

const amd_footer = `
  return Selectize;
}));
`

// public task definitions
exports.default = series(copyDependencies, copySrc);
exports.loadDependencies = series(cleanLibs, loadDependencies);
exports.watch = series(watchFiles);
