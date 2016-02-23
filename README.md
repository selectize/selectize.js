[**Selectize needs your help. I'm looking for maintainers!**](https://github.com/selectize/selectize.js/issues/752)

# selectize.js

[![NPM version](http://img.shields.io/npm/v/selectize.svg?style=flat)](https://www.npmjs.org/package/selectize)
![Bower version](http://img.shields.io/bower/v/selectize.svg?style=flat)
[![Build Status](http://img.shields.io/travis/selectize/selectize.js/master.svg?style=flat)](https://travis-ci.org/selectize/selectize.js)
[![Coverage Status](http://img.shields.io/coveralls/selectize/selectize.js/master.svg?style=flat)](https://coveralls.io/r/selectize/selectize.js)

Selectize is an extensible [jQuery](http://jquery.com/)-based custom &lt;select&gt; UI control. It's useful for tagging, contact lists, country selectors, and so on. It clocks in at around ~7kb (gzipped). The goal is to provide a solid & usable experience with a clean and powerful API.

- [Demos](http://selectize.github.io/selectize.js/)
- [Changelog](https://github.com/selectize/selectize.js/releases)
- [Examples](examples/)
- [Usage Documentation](docs/usage.md)
- [API Documentation](docs/api.md)
- [Plugin Documentation](docs/plugins.md)
- [Browser Test Matrix](https://saucelabs.com/u/selectize)

### Features

- **Smart Option Searching / Ranking**<br>Options are efficiently scored and sorted on-the-fly (using [sifter](https://github.com/brianreavis/sifter.js)). Want to search an item's title *and* description? No problem.
- **Caret between items**<br>Order matters sometimes. Use the <kbd>&larr;</kbd> and <kbd>&rarr;</kbd> arrow keys to move between selected items.</li>
- **Select &amp; delete multiple items at once**<br>Hold down <kbd>option</kbd> on Mac or <kbd>ctrl</kbd> on Windows to select more than one item to delete.
- **Díåcritîçs supported**<br>Great for international environments.
- **Item creation**<br>Allow users to create items on the fly (async saving is supported; the control locks until the callback is fired).
- **Remote data loading**<br>For when you have thousands of options and want them provided by the server as the user types.
- **Clean API &amp; code**<br>Interface with it and make modifications easily. Pull requests welcome!
- **Extensible**<br> [Plugin API](docs/plugins.md) for developing custom features (uses [microplugin](https://github.com/brianreavis/microplugin.js)).
- **Touch Support**<br> Plays nice with iOS 5+ devices.

### Dependencies

- [jquery](https://github.com/jquery/jquery) (1.7 and greater)
- [sifter](https://github.com/brianreavis/sifter.js) (bundled in ["standalone" build](dist/js/standalone))
- [microplugin](https://github.com/brianreavis/microplugin.js) (bundled in ["standalone" build](dist/js/standalone))

### Files

All pre-built files needed to use Selectize can be found in the ["dist"](dist/) folder.

- [**js/**](dist/js)
	- [**standalone/**](dist/js/standalone)
		- [selectize.js](dist/js/standalone/selectize.js) — With dependencies, minus jquery
	- [selectize.js](dist/js/selectize.js) — Without dependencies
- [**less/**](dist/less)
	- [selectize.less](dist/less/selectize.less) — Core styles
	- [selectize.default.less](dist/less/selectize.default.less) — Default theme
	- [selectize.bootstrap2.less](dist/less/selectize.bootstrap2.less) — Bootstrap 2 theme
	- [selectize.bootstrap3.less](dist/less/selectize.bootstrap3.less) — Bootstrap 3 theme
	- [**plugins/**](dist/less/plugins) — Individual plugin styles
- [**css/**](dist/css)
	- [selectize.css](dist/css/selectize.css) — Core styles
	- [selectize.default.css](dist/css/selectize.default.css) — Default theme (with core styles)
	- [selectize.bootstrap2.css](dist/css/selectize.bootstrap2.css) - Bootstrap 2 theme
	- [selectize.bootstrap3.css](dist/css/selectize.bootstrap3.css) - Bootstrap 3 theme

### Usage

```js
$('select').selectize(options);
```

The available options are [documented here](docs/usage.md).

#### IE8 Support

To support Internet Explorer 8, [es5-shim](https://github.com/kriskowal/es5-shim/) must be added your page.

```html
<!--[if lt IE 9]><script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.0.8/es5-shim.min.js"></script><![endif]-->
```

### Custom Builds

By default, all [plugins](src/plugins) are included. To hand-pick what plugins (if any) to include, run [`grunt`](http://gruntjs.com/) with the "--plugins" flag. After this completes, grab the files you need from the ["dist"](dist) folder.

```sh
# dependencies
npm install

# build selectize
grunt --plugins=
grunt --plugins=*
grunt --plugins=remove_button,restore_on_backspace
```

### Contributing

When issuing a pull request, *please exclude changes in the "dist"
folder to avoid merge conflicts*. Please include tests with your feature
so that we're not tempted to break it in the future!

Add an entry to the top of the CHANGELOG, and update the documentation
in `docs/` as needed. (Refactors and documentation changes don't need a
changelog entry.)

Squash your commits together in one or a few complete, logical commits,
with a concise and descriptive message. One commit means one
feature/bugfix/thing that has changed, or a diff bringing the code one
step forward to a better, working state.

Also, please ensure all the tests pass:

```sh
$ npm test # phantomjs
$ BROWSERS=Firefox npm test
$ BROWSERS=Firefox,Chrome npm test
$ BROWSERS=Firefox,Chrome,Safari npm test
```

## License

Copyright &copy; 2013–2016 [Brian Reavis](http://twitter.com/brianreavis) & [Contributors](https://github.com/selectize/selectize.js/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
