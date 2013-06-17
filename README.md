# selectize.js
[![Build Status](https://travis-ci.org/brianreavis/selectize.js.png?branch=master)](https://travis-ci.org/brianreavis/selectize.js)

Selectize is an extensible jQuery-based custom &lt;select&gt; UI control. It's useful for tagging, contact lists, country selectors, and so on. It clocks in at around ~8kb (gzipped). The goal is to provide a solid & usable user-experience with a clean and powerful API.

- [Demos](http://brianreavis.github.io/selectize.js/)
- [Examples](examples/)
- [Usage Documentation](docs/usage.md)
- [API Documentation](docs/api.md)
- [Plugin Documentation](docs/plugins.md)

### Features

- **Smart Option Ranking**<br>As the user types, options are efficiently scored and sorted on-the-fly.
- **Multi-property searching**<br>Want to search an item's title *and* description? No problem.
- **Caret between items**<br>Order matters sometimes. Use the [left] and [right] arrow keys to move between selected items.</li>
- **Select &amp; delete multiple items at once**<br>Hold down [option] on Mac or [ctrl] on Windows to select more than one item to delete.
- **Díåcritîçs supported**<br>Great for international environments.
- **Item creation**<br>Allow users to create items on the fly (async saving is supported; the control locks until the callback is fired).
- **Remote data loading**<br>For when you have thousands of options and want them provided by the server as the user types.
- **Clean API &amp; code**<br>Interface with it and make modifications easily. Pull requests welcome!
- **Touch Support**<br> Plays nice with iOS 5+ devices.
- **Extensible**<br> [Plugin API](docs/plugins.md) for developing custom features.

### Usage

If using [Bower](http://bower.io/), run `bower install selectize`. Otherwise,
grab ["selectize.min.js"](selectize.min.js) (or ["selectize.js"](selectize.js)
if in a development environment) and ["selectize.css"](selectize.css) and include them in your project.

```js
$('select').selectize(options);
```

The available options are [documented here](docs/usage.md).

#### IE8 Support

To support Internet Explorer 8, [es5-shim](https://github.com/kriskowal/es5-shim/) must be added your page.

### Custom Builds

By default, all [plugins](src/plugins) are included. To hand-pick what plugins (if any) to include, run `make` with the "plugins" setting. After this completes, grab the js and css from the project root as described above.

```sh
make plugins=
make plugins=*
make plugins=remove_button,restore_on_backspace
```

### Contributing

First build your copy with `make` then try out the [bundled examples](examples/).

To use the automated test runner, either open ["tests/index.html"](tests/index.html) in a browser, or run `make test`. That latter requires [node.js](http://nodejs.org/) and [testem](https://github.com/airportyh/testem) to be installed (`npm install -g testem`).

When issuing a pull request, please exclude "selectize.js" and "selectize.min.js" in the project root.

## License

Copyright &copy; 2013 [Brian Reavis](http://twitter.com/brianreavis), & Contributors

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
