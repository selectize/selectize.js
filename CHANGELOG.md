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
