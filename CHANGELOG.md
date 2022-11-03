<!-- Feel free to put either your handle and/or full name, according to
     your privacy needs -->

## v0.15.0 · 03 11 2022

### Breaking changes

- The distribution files no longer include a _standalone_ version. The files in the `dist/js` folder are now standalone by default. If you previously referenced files from the `dist/js/standalone` folder you will need to update your references to `dist/js`.
- We have always included all plugins in the distributions files, but no longer provide a way to exclude them from the build.
- We now build the distribution files using `Gulp` instead of `Grunt`
- the `NPM` package now includes the `dist` folder only. If you previously referenced source files directly you will need to update your references to `dist/js/selectize.js` or `dist/js/selectize.min.js`.

## v0.14.0 · 02 10 2022

- _Breaking change:_ Removed the dependencies on MicroPlugin and Sifter - These are now included in the selectize package directly.

- Fixed missing style for dropdown*header plugin [*@fabienwnklr\_](https://github.com/fabienwnklr)
- Fixed ([#1818](https://github.com/selectize/selectize.js/issues/1818)) Scroll left when I click on a selectized item and page is scrolled right [_@fabienwnklr_](https://github.com/fabienwnklr)
- Added option to enable setting the first option in the list as active.

  _@joshuan92_

## v0.13.0 · 03 11 2020

- Support for Bootstrap v4.x.
  - Adding SASS styles, LESS styles still available for bootstrap 2.x
- Fixed bug (#851) for placeholder text clipping
- Fixed bug (#870) for remove button plugin closing bootstrap modals

  _@risadams_

## v0.12.4, v0.12.5 · 27 June 2018

- Allow the dropdown to reopen on click if it is closed without losing focus
  by closeAfterSelect: true

  _@fishpercolator_

- Fixed bug making `clearOptions` function. Now it doesn't remove already selected options.

  _(thanks @caseymct - #1079)_

- New feature: allow to disable single options or complete optgroups

  _@zeitiger_

## v0.12.3 · 24 August 2016

- Make `label[for]` work after applying Selectize (#755)

  _Barrett Sonntag_ (@barretts)

- Output friendly error message when Microplguin is missing (#1137).
  Special thanks to @styxxx for proposing the improvement.

- Add local server command `grunt server`.

- Stop creating items automatically when text is pasted, only create
  them when pasted text contains delimiter.

- Fix regression 'Required fields can not be focusable' in Chrome
  (#733)

- Fix detection of Validity API, we had false negatives before.

  _Jonathan Allard_ (@joallard)

- Fix open keyboard bug under iOS after closing selection (#1127)

  _@zeitiger_

- Fix highlighting more than one character (#1099, #1098)

  _@skimi_

## v0.12.2 · 23 June 2016

- Fix issue preventing build ("Cannot assign to read only property
  'subarray'") because of bug in uglifyjs. (#1072)

  _@jaridmargolin_

- Fix tabbing issue (#877) on IE11. (#997)

  _@bwilson-ux_

- Fix jQuery initialization for jQuery >= 1.9 (#1045)

  _@mpokrywka_

- Make `remove_button` work for single-option usage (#848)

  _@ChoppyThing_

- Fixed bug that made `allowEmptyOption: true` useless (#739)

  _@mcavalletto_

- Functions in option `render` can now return a DOM node in addition to
  text. (#617)

  _@topaxi_
