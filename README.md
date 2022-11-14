# selectize.js

![Selectize.js](docs/selectize-wordmark.png)

→ Selectize is looking for [new members on the maintenance team](https://github.com/selectize/selectize.js/discussions/1678)!

[![NPM version](http://img.shields.io/npm/v/@selectize/selectize.svg?style=flat)](https://www.npmjs.com/package/@selectize/selectize)
[![CDNJS version](http://img.shields.io/cdnjs/v/selectize.js.svg?style=flat)](https://cdnjs.com/libraries/selectize.js)
\
![Node.js CI](https://github.com/selectize/selectize.js/workflows/Node.js%20CI/badge.svg)
\
[![Discussion & Help](https://img.shields.io/badge/Discuss-Keybase-cc004c?style=flat)](https://keybase.io/team/selectize)

Selectize is an extensible [jQuery](http://jquery.com/)-based custom `<select>`; UI control. It's useful for tagging, contact lists, country selectors, and so on. The goal is to provide a solid & usable experience with a clean and powerful API.

- [Demos](https://selectize.dev/demos.html)
- [Changelog](https://github.com/selectize/selectize.js/releases)
- [Documentation](https://selectize.dev/docs.html)

## Features

- **Smart Option Searching / Ranking**
  Options are efficiently scored and sorted on-the-fly (using [sifter](https://github.com/brianreavis/sifter.js)). Want to search for an item's title _and_ description? No problem.
- **Caret between items**
  Order matters sometimes. Use the <kbd>&larr;</kbd> and <kbd>&rarr;</kbd> arrow keys to move between selected items.
- **Select & delete multiple items at once**
  Hold down <kbd>option</kbd> on Mac or <kbd>ctrl</kbd> on Windows to select more than one item to delete.
- **Díåcritîçs supported**
  Great for international environments.
- **Item creation**
  Allow users to create items on the fly (async saving is supported; the control locks until the callback is fired).
- **Remote data loading**
  For when you have thousands of options and want them provided by the server as the user types.
- **Clean API &amp; code**
  Interface with it and make modifications easily. Pull requests are always welcome!
- **Extensible**
  [Plugin API](docs/plugins.md) for developing custom features (uses [microplugin](https://github.com/brianreavis/microplugin.js)).
- **Touch Support**
  Plays nice with iOS 5+ devices.

### Dependencies

- [jquery](https://github.com/jquery/jquery) (1.7 and greater), as [peer dependency](https://nodejs.org/en/blog/npm/peer-dependencies/)
  - **Note:** it is installed automatically in development, or in projects using NPM 1 or 2. When using NPM from version 3 on, just a warning is thrown and the user needs to manually install an explicit version in their own project (e.g. `npm install --save jquery@3.5.1`).

**Optional:**

- [jquery-ui](https://github.com/jquery/jquery-ui) (required by `drag_drop` plugin)

### Installation

Selectize can be installed via NPM `npm install @selectize/selectize`

#### Installing Manually

All pre-built files needed to use Selectize can be found in the
["dist"](dist/) folder.

If you're looking to get started with minimal fuss, include
`selectize.min.js` (bundles Sifter and Microplugin
dependencies – also available un-minified for debugging, just remove the
`.min` part) and `css/selectize.default.css`.

Selectize is available at [cdnjs](https://cdnjs.com/libraries/selectize.js).

- [**js/**](dist/js)
  - [selectize.js](dist/js/selectize.js) — With dependencies, minus jquery
  - [selectize.min.js](dist/js/selectize.min.js) — With dependencies, minus jquery
- [**scss/**](dist/scss) — Sass source files for customization (Bootstrap 3+ compatible)
- [**less/**](dist/less) — Less source files for customization (Bootstrap 2/3 compatible)
- [**css/**](dist/css)
  - [selectize.css](dist/css/selectize.css) — Core styles
  - [selectize.default.css](dist/css/selectize.default.css) — Default theme (with core styles)
  - [selectize.default.css](dist/css/selectize.legacy.css) — Default Legacy theme (with core styles)
  - [selectize.bootstrap2.css](dist/css/selectize.bootstrap2.css) - Bootstrap 2 theme
  - [selectize.bootstrap3.css](dist/css/selectize.bootstrap3.css) - Bootstrap 3 theme
  - [selectize.bootstrap4.css](dist/css/selectize.bootstrap4.css) - Bootstrap 4 theme
  - [selectize.bootstrap5.css](dist/css/selectize.bootstrap5.css) - Bootstrap 5 theme

### Usage

```js
$("select").selectize(options);
```

The available options are [documented here](https://selectize.dev/docs.html).

### Contributing

When issuing a pull request:

- please **do not include/commit changes in the `dist/` or `lib/` folders** to avoid
  merge conflicts. A good way to include the right files is to use
  `git gui` or `git add` when committing to select the files you want to
  add to your commit.

- please **include tests** with your feature so that we're not tempted to
  break it in the future!

Add an entry to the top of the CHANGELOG, and update the documentation
in `docs/` as needed. (Refactors and documentation changes don't need a
changelog entry.)

Squash your commits together in one or a few complete, logical commits,
with a concise and descriptive message. One commit means one
feature/bugfix/thing that has changed, or a diff bringing the code one
step forward to a better, working state.

Once your commit is nice and clean, and you want to _discard the other
changes_, you can use `git checkout .` (that will erase changes to
tracked files) and `git clean [-i/--interactive]` (to erase untracked
files). **However, be careful with those commands, as their function
is to erase things/changes.**

However, be careful not to add the `dist/` files in your commit, as
Grunt automatically regenerates the files in `dist/` as the source is
changed.

#### Tests

Please ensure all the tests pass:

```sh
npm test # phantomjs
BROWSERS=Firefox npm test
BROWSERS=Firefox,Chrome npm test
BROWSERS=Firefox,Chrome,Safari npm test
```

#### Local environment

To run Selectize locally:

```sh
npm start
```

You can then run the examples at `http://localhost:4000/`.

## License

Copyright &copy; 2013–2016 [Brian Reavis](http://twitter.com/brianreavis) & [Contributors](https://github.com/selectize/selectize.js/graphs/contributors)\
Copyright &copy; 2020-2022 Selectize Team & [Contributors](https://github.com/selectize/selectize.js/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: <http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
