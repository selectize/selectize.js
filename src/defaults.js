Selectize.count = 0;
Selectize.defaults = {
  options: [],
  optgroups: [],

  plugins: [],
  delimiter: ',',
  splitOn: null, // regexp or string for splitting up values from a paste command
  persist: true,
  diacritics: true,
  create: false,
  showAddOptionOnCreate: true,
  createOnBlur: false,
  createFilter: null,
  highlight: true,
  openOnFocus: true,
  maxOptions: 1000,
  maxItems: null,
  hideSelected: null,
  addPrecedence: false,
  selectOnTab: true,
  preload: false,
  allowEmptyOption: false,
  showEmptyOptionInDropdown: false,
  emptyOptionLabel: '--',
  setFirstOptionActive: false,
  closeAfterSelect: false,
  closeDropdownThreshold: 250, // number of ms to prevent reopening of dropdown after mousedown

  scrollDuration: 60,
  deselectBehavior: 'previous', //top, previous
  loadThrottle: 300,
  loadingClass: 'loading',

  dataAttr: 'data-data',
  optgroupField: 'optgroup',
  valueField: 'value',
  labelField: 'text',
  disabledField: 'disabled',
  optgroupLabelField: 'label',
  optgroupValueField: 'value',
  lockOptgroupOrder: false,

  sortField: '$order',
  searchField: ['text'],
  searchConjunction: 'and',
  respect_word_boundaries: false, // Originally defaulted to true, but breaks unicode support. See #1916 & https://stackoverflow.com/questions/10590098/javascript-regexp-word-boundaries-unicode-characters
  normalize: true,

  mode: null,
  wrapperClass: '',
  inputClass: '',
  dropdownClass: '',
  dropdownContentClass: '',

  dropdownParent: null,

  copyClassesToDropdown: true,
  dropdownSize: {
    sizeType: 'auto',
    sizeValue: 'auto',
  },

  ignoreOnDropwdownHeight: 'img, i',
  search: true,
  showArrow: true,

  /*
  load                 : null, // function(query, callback) { ... }
  score                : null, // function(search) { ... }
  formatValueToKey     : null, // function(key) { ... }
  optionGroupRegister  : null, // function(optgroup) to register dynamically created option groups
  onInitialize         : null, // function() { ... }
  onChange             : null, // function(value) { ... }
  onItemAdd            : null, // function(value, $item) { ... }
  onItemRemove         : null, // function(value, $item) { ... }
  onClear              : null, // function() { ... }
  onOptionAdd          : null, // function(value, data) { ... }
  onOptionRemove       : null, // function(value) { ... }
  onOptionClear        : null, // function() { ... }
  onOptionGroupAdd     : null, // function(id, data) { ... }
  onOptionGroupRemove  : null, // function(id) { ... }
  onOptionGroupClear   : null, // function() { ... }
  onDropdownOpen       : null, // function($dropdown) { ... }
  onDropdownClose      : null, // function($dropdown) { ... }
  onType               : null, // function(str) { ... }
  onDelete             : null, // function(values) { ... }
  */

  render: {
    /*
    item: null,
    optgroup: null,
    optgroup_header: null,
    option: null,
    option_create: null
    */
  }
};
