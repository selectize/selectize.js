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
	closeAfterSelect: false,

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

	mode: null,
	wrapperClass: 'selectize-control',
	inputClass: 'selectize-input',
	dropdownClass: 'selectize-dropdown',
	dropdownContentClass: 'selectize-dropdown-content',

	dropdownParent: null,

	copyClassesToDropdown: true,

	/*
	load                 : null, // function(query, callback) { ... }
	score                : null, // function(search) { ... }
	formatValueToKey     : null, // function(key) { ... }
	onInitialize         : null, // function() { ... }
	onChange             : null, // function(value) { ... }
	onItemAdd            : null, // function(value, $item) { ... }
	onItemRemove         : null, // function(value) { ... }
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
