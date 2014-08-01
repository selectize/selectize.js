Selectize.count = 0;
Selectize.defaults = {
	plugins: [],
	delimiter: ',',
	persist: true,
	diacritics: true,
	create: false,
	createOnBlur: false,
	createFilter: null,
	highlight: true,
	openOnFocus: true,
	maxOptions: 1000,
	maxItems: null,
	hideSelected: null,
	addPrecedence: false,
	selectOnTab: false,
	preload: false,
	allowEmptyOption: false,

	scrollDuration: 60,
	loadThrottle: 300,

	dataAttr: 'data-data',
	optgroupField: 'optgroup',
	valueField: 'value',
	labelField: 'text',
	optgroupLabelField: 'label',
	optgroupValueField: 'value',
	optgroupOrder: null,

	sortField: '$order',
	searchField: ['text'],
	searchConjunction: 'and',

	mode: null,
	wrapperClass: 'selectize-control',
	inputClass: 'selectize-input',
	dropdownClass: 'selectize-dropdown',
	dropdownContentClass: 'selectize-dropdown-content',

	dropdownParent: null,

	/*
	load            : null, // function(query, callback) { ... }
	score           : null, // function(search) { ... }
	onInitialize    : null, // function() { ... }
	onChange        : null, // function(value) { ... }
	onItemAdd       : null, // function(value, $item) { ... }
	onItemRemove    : null, // function(value) { ... }
	onClear         : null, // function() { ... }
	onOptionAdd     : null, // function(value, data) { ... }
	onOptionRemove  : null, // function(value) { ... }
	onOptionClear   : null, // function() { ... }
	onDropdownOpen  : null, // function($dropdown) { ... }
	onDropdownClose : null, // function($dropdown) { ... }
	onType          : null, // function(str) { ... }
	onDelete        : null, // function(values) { ... }
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