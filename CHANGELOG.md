<!-- Feel free to put either your handle and/or full name, according to
     your privacy needs -->

## v0.12.3 · 24 August 2016
*  Make `label[for]` work after applying Selectize (#755)

   *Barrett Sonntag* (@barretts)

*  Output friendly error message when Microplguin is missing (#1137).
   Special thanks to @styxxx for proposing the improvement.

*  Add local server command `grunt server`.

*  Stop creating items automatically when text is pasted, only create
   them when pasted text contains delimiter.

*  Fix regression 'Required fields can not be focusable' in Chrome
	(#733)

*  Fix detection of Validity API, we had false negatives before.

   *Jonathan Allard* (@joallard)

*  Fix open keyboard bug under iOS after closing selection (#1127)

   *@zeitiger*

*  Fix highlighting more than one character (#1099, #1098)

   *@skimi*


## v0.12.2 · 23 June 2016
*  Fix issue preventing build ("Cannot assign to read only property
   'subarray'") because of bug in uglifyjs. (#1072)

   *@jaridmargolin*

*  Fix tabbing issue (#877) on IE11. (#997)

   *@bwilson-ux*

*  Fix jQuery initialization for jQuery >= 1.9 (#1045)

   *@mpokrywka*

*  Make `remove_button` work for single-option usage (#848)

   *@ChoppyThing*

*  Fixed bug that made `allowEmptyOption: true` useless (#739)

   *@mcavalletto*

*  Functions in option `render` can now return a DOM node in addition to
   text. (#617)

   *@topaxi*
