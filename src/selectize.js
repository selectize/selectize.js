var Selectize = function($input, settings) {
	var key, i, n, dir, input, self = this;
	input = $input[0];
	input.selectize = self;

	// detect rtl environment
	dir = window.getComputedStyle ? window.getComputedStyle(input, null).getPropertyValue('direction') : input.currentStyle && input.currentStyle.direction;
	dir = dir || $input.parents('[dir]:first').attr('dir') || '';

	// setup default state
	$.extend(self, {
		settings         : settings,
		$input           : $input,
		tagType          : input.tagName.toLowerCase() === 'select' ? TAG_SELECT : TAG_INPUT,
		rtl              : /rtl/i.test(dir),

		eventNS          : '.selectize' + (++Selectize.count),
		highlightedValue : null,
		isOpen           : false,
		isDisabled       : false,
		isRequired       : $input.is('[required]'),
		isInvalid        : false,
		isLocked         : false,
		isFocused        : false,
		isInputHidden    : false,
		isSetup          : false,
		isShiftDown      : false,
		isCmdDown        : false,
		isCtrlDown       : false,
		ignoreFocus      : false,
		ignoreBlur       : false,
		ignoreHover      : false,
		hasOptions       : false,
		currentResults   : null,
		lastValue        : '',
		caretPos         : 0,
		loading          : 0,
		loadedSearches   : {},

		$activeOption    : null,
		$activeItems     : [],

		optgroups        : {},
		options          : {},
		userOptions      : {},
		items            : [],
		renderCache      : {},
		onSearchChange   : settings.loadThrottle === null ? self.onSearchChange : debounce(self.onSearchChange, settings.loadThrottle)
	});

	// search system
	self.sifter = new Sifter(this.options, {diacritics: settings.diacritics});

	// build options table
	$.extend(self.options, build_hash_table(settings.valueField, settings.options));
	delete self.settings.options;

	// build optgroup table
	$.extend(self.optgroups, build_hash_table(settings.optgroupValueField, settings.optgroups));
	delete self.settings.optgroups;

	// option-dependent defaults
	self.settings.mode = self.settings.mode || (self.settings.maxItems === 1 ? 'single' : 'multi');
	if (typeof self.settings.hideSelected !== 'boolean') {
		self.settings.hideSelected = self.settings.mode === 'multi';
	}

	if (self.settings.create) {
		self.canCreate = function(input) {
			var filter = self.settings.createFilter;
			return input.length
				&& (typeof filter !== 'function' || filter.apply(self, [input]))
				&& (typeof filter !== 'string' || new RegExp(filter).test(input))
				&& (!(filter instanceof RegExp) || filter.test(input));
		};
	}

	self.initializePlugins(self.settings.plugins);
	self.setupCallbacks();
	self.setupTemplates();
	self.setup();
};

// mixins
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

MicroEvent.mixin(Selectize);
MicroPlugin.mixin(Selectize);

// methods
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

$.extend(Selectize.prototype, {

	/**
	 * Creates all elements and sets up event bindings.
	 */
	setup: function() {
		var self      = this;
		var settings  = self.settings;
		var eventNS   = self.eventNS;
		var $window   = $(window);
		var $document = $(document);
		var $input    = self.$input;

		var $wrapper;
		var $control;
		var $control_input;
		var $dropdown;
		var $dropdown_content;
		var $dropdown_parent;
		var inputMode;
		var timeout_blur;
		var timeout_focus;
		var tab_index;
		var classes;
		var classes_plugins;

		inputMode         = self.settings.mode;
		tab_index         = $input.attr('tabindex') || '';
		classes           = $input.attr('class') || '';

		$wrapper          = $('<div>').addClass(settings.wrapperClass).addClass(classes).addClass(inputMode);
		$control          = $('<div>').addClass(settings.inputClass).addClass('items').appendTo($wrapper);
		$control_input    = $('<input type="text" autocomplete="off" />').appendTo($control).attr('tabindex', tab_index);
		$dropdown_parent  = $(settings.dropdownParent || $wrapper);
		$dropdown         = $('<div>').addClass(settings.dropdownClass).addClass(classes).addClass(inputMode).hide().appendTo($dropdown_parent);
		$dropdown_content = $('<div>').addClass(settings.dropdownContentClass).appendTo($dropdown);

		$wrapper.css({
			width: $input[0].style.width
		});

		if (self.plugins.names.length) {
			classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
			$wrapper.addClass(classes_plugins);
			$dropdown.addClass(classes_plugins);
		}

		if ((settings.maxItems === null || settings.maxItems > 1) && self.tagType === TAG_SELECT) {
			$input.attr('multiple', 'multiple');
		}

		if (self.settings.placeholder) {
			$control_input.attr('placeholder', settings.placeholder);
		}

		if ($input.attr('autocorrect')) {
			$control_input.attr('autocorrect', $input.attr('autocorrect'));
		}

		if ($input.attr('autocapitalize')) {
			$control_input.attr('autocapitalize', $input.attr('autocapitalize'));
		}

		self.$wrapper          = $wrapper;
		self.$control          = $control;
		self.$control_input    = $control_input;
		self.$dropdown         = $dropdown;
		self.$dropdown_content = $dropdown_content;

		$dropdown.on('mouseenter', '[data-selectable]', function() { return self.onOptionHover.apply(self, arguments); });
		$dropdown.on('mousedown', '[data-selectable]', function() { return self.onOptionSelect.apply(self, arguments); });
		watchChildEvent($control, 'mousedown', '*:not(input)', function() { return self.onItemSelect.apply(self, arguments); });
		autoGrow($control_input);

		$control.on({
			mousedown : function() { return self.onMouseDown.apply(self, arguments); },
			click     : function() { return self.onClick.apply(self, arguments); }
		});

		$control_input.on({
			mousedown : function(e) { e.stopPropagation(); },
			keydown   : function() { return self.onKeyDown.apply(self, arguments); },
			keyup     : function() { return self.onKeyUp.apply(self, arguments); },
			keypress  : function() { return self.onKeyPress.apply(self, arguments); },
			resize    : function() { self.positionDropdown.apply(self, []); },
			blur      : function() { return self.onBlur.apply(self, arguments); },
			focus     : function() { self.ignoreBlur = false; return self.onFocus.apply(self, arguments); },
			paste     : function() { return self.onPaste.apply(self, arguments); }
		});

		$document.on('keydown' + eventNS, function(e) {
			self.isCmdDown = e[IS_MAC ? 'metaKey' : 'ctrlKey'];
			self.isCtrlDown = e[IS_MAC ? 'altKey' : 'ctrlKey'];
			self.isShiftDown = e.shiftKey;
		});

		$document.on('keyup' + eventNS, function(e) {
			if (e.keyCode === KEY_CTRL) self.isCtrlDown = false;
			if (e.keyCode === KEY_SHIFT) self.isShiftDown = false;
			if (e.keyCode === KEY_CMD) self.isCmdDown = false;
		});

		$document.on('mousedown' + eventNS, function(e) {
			if (self.isFocused) {
				// prevent events on the dropdown scrollbar from causing the control to blur
				if (e.target === self.$dropdown[0] || e.target.parentNode === self.$dropdown[0]) {
					return false;
				}
				// blur on click outside
				if (!self.$control.has(e.target).length && e.target !== self.$control[0]) {
					self.blur();
				}
			}
		});

		$window.on(['scroll' + eventNS, 'resize' + eventNS].join(' '), function() {
			if (self.isOpen) {
				self.positionDropdown.apply(self, arguments);
			}
		});
		$window.on('mousemove' + eventNS, function() {
			self.ignoreHover = false;
		});

		// store original children and tab index so that they can be
		// restored when the destroy() method is called.
		this.revertSettings = {
			$children : $input.children().detach(),
			tabindex  : $input.attr('tabindex')
		};

		$input.attr('tabindex', -1).hide().after(self.$wrapper);

		if ($.isArray(settings.items)) {
			self.setValue(settings.items);
			delete settings.items;
		}

		// feature detect for the validation API
		if ($input[0].validity) {
			$input.on('invalid' + eventNS, function(e) {
				e.preventDefault();
				self.isInvalid = true;
				self.refreshState();
			});
		}

		self.updateOriginalInput();
		self.refreshItems();
		self.refreshState();
		self.updatePlaceholder();
		self.isSetup = true;

		if ($input.is(':disabled')) {
			self.disable();
		}

		self.on('change', this.onChange);

		$input.data('selectize', self);
		$input.addClass('selectized');
		self.trigger('initialize');

		// preload options
		if (settings.preload === true) {
			self.onSearchChange('');
		}

	},

	/**
	 * Sets up default rendering functions.
	 */
	setupTemplates: function() {
		var self = this;
		var field_label = self.settings.labelField;
		var field_optgroup = self.settings.optgroupLabelField;

		var templates = {
			'optgroup': function(data) {
				return '<div class="optgroup">' + data.html + '</div>';
			},
			'optgroup_header': function(data, escape) {
				return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
			},
			'option': function(data, escape) {
				return '<div class="option">' + escape(data[field_label]) + '</div>';
			},
			'item': function(data, escape) {
				return '<div class="item">' + escape(data[field_label]) + '</div>';
			},
			'option_create': function(data, escape) {
				return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
			}
		};

		self.settings.render = $.extend({}, templates, self.settings.render);
	},

	/**
	 * Maps fired events to callbacks provided
	 * in the settings used when creating the control.
	 */
	setupCallbacks: function() {
		var key, fn, callbacks = {
			'initialize'     : 'onInitialize',
			'change'         : 'onChange',
			'item_add'       : 'onItemAdd',
			'item_remove'    : 'onItemRemove',
			'clear'          : 'onClear',
			'option_add'     : 'onOptionAdd',
			'option_remove'  : 'onOptionRemove',
			'option_clear'   : 'onOptionClear',
			'dropdown_open'  : 'onDropdownOpen',
			'dropdown_close' : 'onDropdownClose',
			'type'           : 'onType'
		};

		for (key in callbacks) {
			if (callbacks.hasOwnProperty(key)) {
				fn = this.settings[callbacks[key]];
				if (fn) this.on(key, fn);
			}
		}
	},

	/**
	 * Triggered when the main control element
	 * has a click event.
	 *
	 * @param {object} e
	 * @return {boolean}
	 */
	onClick: function(e) {
		var self = this;

		// necessary for mobile webkit devices (manual focus triggering
		// is ignored unless invoked within a click event)
		if (!self.isFocused) {
			self.focus();
			e.preventDefault();
		}
	},

	/**
	 * Triggered when the main control element
	 * has a mouse down event.
	 *
	 * @param {object} e
	 * @return {boolean}
	 */
	onMouseDown: function(e) {
		var self = this;
		var defaultPrevented = e.isDefaultPrevented();
		var $target = $(e.target);

		if (self.isFocused) {
			// retain focus by preventing native handling. if the
			// event target is the input it should not be modified.
			// otherwise, text selection within the input won't work.
			if (e.target !== self.$control_input[0]) {
				if (self.settings.mode === 'single') {
					// toggle dropdown
					self.isOpen ? self.close() : self.open();
				} else if (!defaultPrevented) {
					self.setActiveItem(null);
				}
				return false;
			}
		} else {
			// give control focus
			if (!defaultPrevented) {
				window.setTimeout(function() {
					self.focus();
				}, 0);
			}
		}
	},

	/**
	 * Triggered when the value of the control has been changed.
	 * This should propagate the event to the original DOM
	 * input / select element.
	 */
	onChange: function() {
		this.$input.trigger('change');
	},


	/**
	 * Triggered on <input> paste.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onPaste: function(e) {
		var self = this;
		if (self.isFull() || self.isInputHidden || self.isLocked) {
			e.preventDefault();
		}
	},

	/**
	 * Triggered on <input> keypress.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onKeyPress: function(e) {
		if (this.isLocked) return e && e.preventDefault();
		var character = String.fromCharCode(e.keyCode || e.which);
		if (this.settings.create && character === this.settings.delimiter) {
			this.createItem();
			e.preventDefault();
			return false;
		}
	},

	/**
	 * Triggered on <input> keydown.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onKeyDown: function(e) {
		var isInput = e.target === this.$control_input[0];
		var self = this;

		if (self.isLocked) {
			if (e.keyCode !== KEY_TAB) {
				e.preventDefault();
			}
			return;
		}

		switch (e.keyCode) {
			case KEY_A:
				if (self.isCmdDown) {
					self.selectAll();
					return;
				}
				break;
			case KEY_ESC:
				self.close();
				return;
			case KEY_N:
				if (!e.ctrlKey || e.altKey) break;
			case KEY_DOWN:
				if (!self.isOpen && self.hasOptions) {
					self.open();
				} else if (self.$activeOption) {
					self.ignoreHover = true;
					var $next = self.getAdjacentOption(self.$activeOption, 1);
					if ($next.length) self.setActiveOption($next, true, true);
				}
				e.preventDefault();
				return;
			case KEY_P:
				if (!e.ctrlKey || e.altKey) break;
			case KEY_UP:
				if (self.$activeOption) {
					self.ignoreHover = true;
					var $prev = self.getAdjacentOption(self.$activeOption, -1);
					if ($prev.length) self.setActiveOption($prev, true, true);
				}
				e.preventDefault();
				return;
			case KEY_RETURN:
				if (self.isOpen && self.$activeOption) {
					self.onOptionSelect({currentTarget: self.$activeOption});
				}
				e.preventDefault();
				return;
			case KEY_LEFT:
				self.advanceSelection(-1, e);
				return;
			case KEY_RIGHT:
				self.advanceSelection(1, e);
				return;
			case KEY_TAB:
				if (self.settings.selectOnTab && self.isOpen && self.$activeOption) {
					self.onOptionSelect({currentTarget: self.$activeOption});
					e.preventDefault();
				}
				if (self.settings.create && self.createItem()) {
					e.preventDefault();
				}
				return;
			case KEY_BACKSPACE:
			case KEY_DELETE:
				self.deleteSelection(e);
				return;
		}

		if ((self.isFull() || self.isInputHidden) && !(IS_MAC ? e.metaKey : e.ctrlKey)) {
			e.preventDefault();
			return;
		}
	},

	/**
	 * Triggered on <input> keyup.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onKeyUp: function(e) {
		var self = this;

		if (self.isLocked) return e && e.preventDefault();
		var value = self.$control_input.val() || '';
		if (self.lastValue !== value) {
			self.lastValue = value;
			self.onSearchChange(value);
			self.refreshOptions();
			self.trigger('type', value);
		}
	},

	/**
	 * Invokes the user-provide option provider / loader.
	 *
	 * Note: this function is debounced in the Selectize
	 * constructor (by `settings.loadDelay` milliseconds)
	 *
	 * @param {string} value
	 */
	onSearchChange: function(value) {
		var self = this;
		var fn = self.settings.load;
		if (!fn) return;
		if (self.loadedSearches.hasOwnProperty(value)) return;
		self.loadedSearches[value] = true;
		self.load(function(callback) {
			fn.apply(self, [value, callback]);
		});
	},

	/**
	 * Triggered on <input> focus.
	 *
	 * @param {object} e (optional)
	 * @returns {boolean}
	 */
	onFocus: function(e) {
		var self = this;

		self.isFocused = true;
		if (self.isDisabled) {
			self.blur();
			e && e.preventDefault();
			return false;
		}

		if (self.ignoreFocus) return;
		if (self.settings.preload === 'focus') self.onSearchChange('');

		if (!self.$activeItems.length) {
			self.showInput();
			self.setActiveItem(null);
			self.refreshOptions(!!self.settings.openOnFocus);
		}

		self.refreshState();
	},

	/**
	 * Triggered on <input> blur.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onBlur: function(e) {
		var self = this;
		self.isFocused = false;
		if (self.ignoreFocus) return;

		// necessary to prevent IE closing the dropdown when the scrollbar is clicked
		if (!self.ignoreBlur && document.activeElement === self.$dropdown_content[0]) {
			self.ignoreBlur = true;
			self.onFocus(e);

			return;
		}

		if (self.settings.create && self.settings.createOnBlur) {
			self.createItem(false);
		}

		self.close();
		self.setTextboxValue('');
		self.setActiveItem(null);
		self.setActiveOption(null);
		self.setCaret(self.items.length);
		self.refreshState();
	},

	/**
	 * Triggered when the user rolls over
	 * an option in the autocomplete dropdown menu.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onOptionHover: function(e) {
		if (this.ignoreHover) return;
		this.setActiveOption(e.currentTarget, false);
	},

	/**
	 * Triggered when the user clicks on an option
	 * in the autocomplete dropdown menu.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onOptionSelect: function(e) {
		var value, $target, $option, self = this;

		if (e.preventDefault) {
			e.preventDefault();
			e.stopPropagation();
		}

		$target = $(e.currentTarget);
		if ($target.hasClass('create')) {
			self.createItem();
		} else {
			value = $target.attr('data-value');
			if (typeof value !== 'undefined') {
				self.lastQuery = null;
				self.setTextboxValue('');
				self.addItem(value);
				if (!self.settings.hideSelected && e.type && /mouse/.test(e.type)) {
					self.setActiveOption(self.getOption(value));
				}
			}
		}
	},

	/**
	 * Triggered when the user clicks on an item
	 * that has been selected.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onItemSelect: function(e) {
		var self = this;

		if (self.isLocked) return;
		if (self.settings.mode === 'multi') {
			e.preventDefault();
			self.setActiveItem(e.currentTarget, e);
		}
	},

	/**
	 * Invokes the provided method that provides
	 * results to a callback---which are then added
	 * as options to the control.
	 *
	 * @param {function} fn
	 */
	load: function(fn) {
		var self = this;
		var $wrapper = self.$wrapper.addClass('loading');

		self.loading++;
		fn.apply(self, [function(results) {
			self.loading = Math.max(self.loading - 1, 0);
			if (results && results.length) {
				self.addOption(results);
				self.refreshOptions(self.isFocused && !self.isInputHidden);
			}
			if (!self.loading) {
				$wrapper.removeClass('loading');
			}
			self.trigger('load', results);
		}]);
	},

	/**
	 * Sets the input field of the control to the specified value.
	 *
	 * @param {string} value
	 */
	setTextboxValue: function(value) {
		var $input = this.$control_input;
		var changed = $input.val() !== value;
		if (changed) {
			$input.val(value).triggerHandler('update');
			this.lastValue = value;
		}
	},

	/**
	 * Returns the value of the control. If multiple items
	 * can be selected (e.g. <select multiple>), this returns
	 * an array. If only one item can be selected, this
	 * returns a string.
	 *
	 * @returns {mixed}
	 */
	getValue: function() {
		if (this.tagType === TAG_SELECT && this.$input.attr('multiple')) {
			return this.items;
		} else {
			return this.items.join(this.settings.delimiter);
		}
	},

	/**
	 * Resets the selected items to the given value.
	 *
	 * @param {mixed} value
	 */
	setValue: function(value) {
		debounce_events(this, ['change'], function() {
			this.clear();
			this.addItems(value);
		});
	},

	/**
	 * Sets the selected item.
	 *
	 * @param {object} $item
	 * @param {object} e (optional)
	 */
	setActiveItem: function($item, e) {
		var self = this;
		var eventName;
		var i, idx, begin, end, item, swap;
		var $last;

		if (self.settings.mode === 'single') return;
		$item = $($item);

		// clear the active selection
		if (!$item.length) {
			$(self.$activeItems).removeClass('active');
			self.$activeItems = [];
			if (self.isFocused) {
				self.showInput();
			}
			return;
		}

		// modify selection
		eventName = e && e.type.toLowerCase();

		if (eventName === 'mousedown' && self.isShiftDown && self.$activeItems.length) {
			$last = self.$control.children('.active:last');
			begin = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$last[0]]);
			end   = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$item[0]]);
			if (begin > end) {
				swap  = begin;
				begin = end;
				end   = swap;
			}
			for (i = begin; i <= end; i++) {
				item = self.$control[0].childNodes[i];
				if (self.$activeItems.indexOf(item) === -1) {
					$(item).addClass('active');
					self.$activeItems.push(item);
				}
			}
			e.preventDefault();
		} else if ((eventName === 'mousedown' && self.isCtrlDown) || (eventName === 'keydown' && this.isShiftDown)) {
			if ($item.hasClass('active')) {
				idx = self.$activeItems.indexOf($item[0]);
				self.$activeItems.splice(idx, 1);
				$item.removeClass('active');
			} else {
				self.$activeItems.push($item.addClass('active')[0]);
			}
		} else {
			$(self.$activeItems).removeClass('active');
			self.$activeItems = [$item.addClass('active')[0]];
		}

		// ensure control has focus
		self.hideInput();
		if (!this.isFocused) {
			self.focus();
		}
	},

	/**
	 * Sets the selected item in the dropdown menu
	 * of available options.
	 *
	 * @param {object} $object
	 * @param {boolean} scroll
	 * @param {boolean} animate
	 */
	setActiveOption: function($option, scroll, animate) {
		var height_menu, height_item, y;
		var scroll_top, scroll_bottom;
		var self = this;

		if (self.$activeOption) self.$activeOption.removeClass('active');
		self.$activeOption = null;

		$option = $($option);
		if (!$option.length) return;

		self.$activeOption = $option.addClass('active');

		if (scroll || !isset(scroll)) {

			height_menu   = self.$dropdown_content.height();
			height_item   = self.$activeOption.outerHeight(true);
			scroll        = self.$dropdown_content.scrollTop() || 0;
			y             = self.$activeOption.offset().top - self.$dropdown_content.offset().top + scroll;
			scroll_top    = y;
			scroll_bottom = y - height_menu + height_item;

			if (y + height_item > height_menu + scroll) {
				self.$dropdown_content.stop().animate({scrollTop: scroll_bottom}, animate ? self.settings.scrollDuration : 0);
			} else if (y < scroll) {
				self.$dropdown_content.stop().animate({scrollTop: scroll_top}, animate ? self.settings.scrollDuration : 0);
			}

		}
	},

	/**
	 * Selects all items (CTRL + A).
	 */
	selectAll: function() {
		var self = this;
		if (self.settings.mode === 'single') return;

		self.$activeItems = Array.prototype.slice.apply(self.$control.children(':not(input)').addClass('active'));
		if (self.$activeItems.length) {
			self.hideInput();
			self.close();
		}
		self.focus();
	},

	/**
	 * Hides the input element out of view, while
	 * retaining its focus.
	 */
	hideInput: function() {
		var self = this;

		self.setTextboxValue('');
		self.$control_input.css({opacity: 0, position: 'absolute', left: self.rtl ? 10000 : -10000});
		self.isInputHidden = true;
	},

	/**
	 * Restores input visibility.
	 */
	showInput: function() {
		this.$control_input.css({opacity: 1, position: 'relative', left: 0});
		this.isInputHidden = false;
	},

	/**
	 * Gives the control focus. If "trigger" is falsy,
	 * focus handlers won't be fired--causing the focus
	 * to happen silently in the background.
	 *
	 * @param {boolean} trigger
	 */
	focus: function() {
		var self = this;
		if (self.isDisabled) return;

		self.ignoreFocus = true;
		self.$control_input[0].focus();
		window.setTimeout(function() {
			self.ignoreFocus = false;
			self.onFocus();
		}, 0);
	},

	/**
	 * Forces the control out of focus.
	 */
	blur: function() {
		this.$control_input.trigger('blur');
	},

	/**
	 * Returns a function that scores an object
	 * to show how good of a match it is to the
	 * provided query.
	 *
	 * @param {string} query
	 * @param {object} options
	 * @return {function}
	 */
	getScoreFunction: function(query) {
		return this.sifter.getScoreFunction(query, this.getSearchOptions());
	},

	/**
	 * Returns search options for sifter (the system
	 * for scoring and sorting results).
	 *
	 * @see https://github.com/brianreavis/sifter.js
	 * @return {object}
	 */
	getSearchOptions: function() {
		var settings = this.settings;
		var sort = settings.sortField;
		if (typeof sort === 'string') {
			sort = {field: sort};
		}

		return {
			fields      : settings.searchField,
			conjunction : settings.searchConjunction,
			sort        : sort
		};
	},

	/**
	 * Searches through available options and returns
	 * a sorted array of matches.
	 *
	 * Returns an object containing:
	 *
	 *   - query {string}
	 *   - tokens {array}
	 *   - total {int}
	 *   - items {array}
	 *
	 * @param {string} query
	 * @returns {object}
	 */
	search: function(query) {
		var i, value, score, result, calculateScore;
		var self     = this;
		var settings = self.settings;
		var options  = this.getSearchOptions();

		// validate user-provided result scoring function
		if (settings.score) {
			calculateScore = self.settings.score.apply(this, [query]);
			if (typeof calculateScore !== 'function') {
				throw new Error('Selectize "score" setting must be a function that returns a function');
			}
		}

		// perform search
		if (query !== self.lastQuery) {
			self.lastQuery = query;
			result = self.sifter.search(query, $.extend(options, {score: calculateScore}));
			self.currentResults = result;
		} else {
			result = $.extend(true, {}, self.currentResults);
		}

		// filter out selected items
		if (settings.hideSelected) {
			for (i = result.items.length - 1; i >= 0; i--) {
				if (self.items.indexOf(hash_key(result.items[i].id)) !== -1) {
					result.items.splice(i, 1);
				}
			}
		}

		return result;
	},

	/**
	 * Refreshes the list of available options shown
	 * in the autocomplete dropdown menu.
	 *
	 * @param {boolean} triggerDropdown
	 */
	refreshOptions: function(triggerDropdown) {
		var i, j, k, n, groups, groups_order, option, option_html, optgroup, optgroups, html, html_children, has_create_option;
		var $active, $active_before, $create;

		if (typeof triggerDropdown === 'undefined') {
			triggerDropdown = true;
		}

		var self              = this;
		var query             = self.$control_input.val();
		var results           = self.search(query);
		var $dropdown_content = self.$dropdown_content;
		var active_before     = self.$activeOption && hash_key(self.$activeOption.attr('data-value'));

		// build markup
		n = results.items.length;
		if (typeof self.settings.maxOptions === 'number') {
			n = Math.min(n, self.settings.maxOptions);
		}

		// render and group available options individually
		groups = {};

		if (self.settings.optgroupOrder) {
			groups_order = self.settings.optgroupOrder;
			for (i = 0; i < groups_order.length; i++) {
				groups[groups_order[i]] = [];
			}
		} else {
			groups_order = [];
		}

		for (i = 0; i < n; i++) {
			option      = self.options[results.items[i].id];
			option_html = self.render('option', option);
			optgroup    = option[self.settings.optgroupField] || '';
			optgroups   = $.isArray(optgroup) ? optgroup : [optgroup];

			for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
				optgroup = optgroups[j];
				if (!self.optgroups.hasOwnProperty(optgroup)) {
					optgroup = '';
				}
				if (!groups.hasOwnProperty(optgroup)) {
					groups[optgroup] = [];
					groups_order.push(optgroup);
				}
				groups[optgroup].push(option_html);
			}
		}

		// render optgroup headers & join groups
		html = [];
		for (i = 0, n = groups_order.length; i < n; i++) {
			optgroup = groups_order[i];
			if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].length) {
				// render the optgroup header and options within it,
				// then pass it to the wrapper template
				html_children = self.render('optgroup_header', self.optgroups[optgroup]) || '';
				html_children += groups[optgroup].join('');
				html.push(self.render('optgroup', $.extend({}, self.optgroups[optgroup], {
					html: html_children
				})));
			} else {
				html.push(groups[optgroup].join(''));
			}
		}

		$dropdown_content.html(html.join(''));

		// highlight matching terms inline
		if (self.settings.highlight && results.query.length && results.tokens.length) {
			for (i = 0, n = results.tokens.length; i < n; i++) {
				highlight($dropdown_content, results.tokens[i].regex);
			}
		}

		// add "selected" class to selected options
		if (!self.settings.hideSelected) {
			for (i = 0, n = self.items.length; i < n; i++) {
				self.getOption(self.items[i]).addClass('selected');
			}
		}

		// add create option
		has_create_option = self.settings.create && self.canCreate(results.query);
		if (has_create_option) {
			$dropdown_content.prepend(self.render('option_create', {input: query}));
			$create = $($dropdown_content[0].childNodes[0]);
		}

		// activate
		self.hasOptions = results.items.length > 0 || has_create_option;
		if (self.hasOptions) {
			if (results.items.length > 0) {
				$active_before = active_before && self.getOption(active_before);
				if ($active_before && $active_before.length) {
					$active = $active_before;
				} else if (self.settings.mode === 'single' && self.items.length) {
					$active = self.getOption(self.items[0]);
				}
				if (!$active || !$active.length) {
					if ($create && !self.settings.addPrecedence) {
						$active = self.getAdjacentOption($create, 1);
					} else {
						$active = $dropdown_content.find('[data-selectable]:first');
					}
				}
			} else {
				$active = $create;
			}
			self.setActiveOption($active);
			if (triggerDropdown && !self.isOpen) { self.open(); }
		} else {
			self.setActiveOption(null);
			if (triggerDropdown && self.isOpen) { self.close(); }
		}
	},

	/**
	 * Adds an available option. If it already exists,
	 * nothing will happen. Note: this does not refresh
	 * the options list dropdown (use `refreshOptions`
	 * for that).
	 *
	 * Usage:
	 *
	 *   this.addOption(data)
	 *
	 * @param {object} data
	 */
	addOption: function(data) {
		var i, n, optgroup, value, self = this;

		if ($.isArray(data)) {
			for (i = 0, n = data.length; i < n; i++) {
				self.addOption(data[i]);
			}
			return;
		}

		value = hash_key(data[self.settings.valueField]);
		if (typeof value !== 'string' || self.options.hasOwnProperty(value)) return;

		self.userOptions[value] = true;
		self.options[value] = data;
		self.lastQuery = null;
		self.trigger('option_add', value, data);
	},

	/**
	 * Registers a new optgroup for options
	 * to be bucketed into.
	 *
	 * @param {string} id
	 * @param {object} data
	 */
	addOptionGroup: function(id, data) {
		this.optgroups[id] = data;
		this.trigger('optgroup_add', id, data);
	},

	/**
	 * Updates an option available for selection. If
	 * it is visible in the selected items or options
	 * dropdown, it will be re-rendered automatically.
	 *
	 * @param {string} value
	 * @param {object} data
	 */
	updateOption: function(value, data) {
		var self = this;
		var $item, $item_new;
		var value_new, index_item, cache_items, cache_options;

		value     = hash_key(value);
		value_new = hash_key(data[self.settings.valueField]);

		// sanity checks
		if (value === null) return;
		if (!self.options.hasOwnProperty(value)) return;
		if (typeof value_new !== 'string') throw new Error('Value must be set in option data');

		// update references
		if (value_new !== value) {
			delete self.options[value];
			index_item = self.items.indexOf(value);
			if (index_item !== -1) {
				self.items.splice(index_item, 1, value_new);
			}
		}
		self.options[value_new] = data;

		// invalidate render cache
		cache_items = self.renderCache['item'];
		cache_options = self.renderCache['option'];

		if (cache_items) {
			delete cache_items[value];
			delete cache_items[value_new];
		}
		if (cache_options) {
			delete cache_options[value];
			delete cache_options[value_new];
		}

		// update the item if it's selected
		if (self.items.indexOf(value_new) !== -1) {
			$item = self.getItem(value);
			$item_new = $(self.render('item', data));
			if ($item.hasClass('active')) $item_new.addClass('active');
			$item.replaceWith($item_new);
		}

		// update dropdown contents
		if (self.isOpen) {
			self.refreshOptions(false);
		}
	},

	/**
	 * Removes a single option.
	 *
	 * @param {string} value
	 */
	removeOption: function(value) {
		var self = this;
		value = hash_key(value);

		var cache_items = self.renderCache['item'];
		var cache_options = self.renderCache['option'];
		if (cache_items) delete cache_items[value];
		if (cache_options) delete cache_options[value];

		delete self.userOptions[value];
		delete self.options[value];
		self.lastQuery = null;
		self.trigger('option_remove', value);
		self.removeItem(value);
	},

	/**
	 * Clears all options.
	 */
	clearOptions: function() {
		var self = this;

		self.loadedSearches = {};
		self.userOptions = {};
		self.renderCache = {};
		self.options = self.sifter.items = {};
		self.lastQuery = null;
		self.trigger('option_clear');
		self.clear();
	},

	/**
	 * Returns the jQuery element of the option
	 * matching the given value.
	 *
	 * @param {string} value
	 * @returns {object}
	 */
	getOption: function(value) {
		return this.getElementWithValue(value, this.$dropdown_content.find('[data-selectable]'));
	},

	/**
	 * Returns the jQuery element of the next or
	 * previous selectable option.
	 *
	 * @param {object} $option
	 * @param {int} direction  can be 1 for next or -1 for previous
	 * @return {object}
	 */
	getAdjacentOption: function($option, direction) {
		var $options = this.$dropdown.find('[data-selectable]');
		var index    = $options.index($option) + direction;

		return index >= 0 && index < $options.length ? $options.eq(index) : $();
	},

	/**
	 * Finds the first element with a "data-value" attribute
	 * that matches the given value.
	 *
	 * @param {mixed} value
	 * @param {object} $els
	 * @return {object}
	 */
	getElementWithValue: function(value, $els) {
		value = hash_key(value);

		if (typeof value !== 'undefined' && value !== null) {
			for (var i = 0, n = $els.length; i < n; i++) {
				if ($els[i].getAttribute('data-value') === value) {
					return $($els[i]);
				}
			}
		}

		return $();
	},

	/**
	 * Returns the jQuery element of the item
	 * matching the given value.
	 *
	 * @param {string} value
	 * @returns {object}
	 */
	getItem: function(value) {
		return this.getElementWithValue(value, this.$control.children());
	},

	/**
	 * "Selects" multiple items at once. Adds them to the list
	 * at the current caret position.
	 *
	 * @param {string} value
	 */
	addItems: function(values) {
		var items = $.isArray(values) ? values : [values];
		for (var i = 0, n = items.length; i < n; i++) {
			this.isPending = (i < n - 1);
			this.addItem(items[i]);
		}
	},

	/**
	 * "Selects" an item. Adds it to the list
	 * at the current caret position.
	 *
	 * @param {string} value
	 */
	addItem: function(value) {
		debounce_events(this, ['change'], function() {
			var $item, $option, $options;
			var self = this;
			var inputMode = self.settings.mode;
			var i, active, value_next, wasFull;
			value = hash_key(value);

			if (self.items.indexOf(value) !== -1) {
				if (inputMode === 'single') self.close();
				return;
			}

			if (!self.options.hasOwnProperty(value)) return;
			if (inputMode === 'single') self.clear();
			if (inputMode === 'multi' && self.isFull()) return;

			$item = $(self.render('item', self.options[value]));
			wasFull = self.isFull();
			self.items.splice(self.caretPos, 0, value);
			self.insertAtCaret($item);
			if (!self.isPending || (!wasFull && self.isFull())) {
				self.refreshState();
			}

			if (self.isSetup) {
				$options = self.$dropdown_content.find('[data-selectable]');

				// update menu / remove the option (if this is not one item being added as part of series)
				if (!self.isPending) {
					$option = self.getOption(value);
					value_next = self.getAdjacentOption($option, 1).attr('data-value');
					self.refreshOptions(self.isFocused && inputMode !== 'single');
					if (value_next) {
						self.setActiveOption(self.getOption(value_next));
					}
				}

				// hide the menu if the maximum number of items have been selected or no options are left
				if (!$options.length || self.isFull()) {
					self.close();
				} else {
					self.positionDropdown();
				}

				self.updatePlaceholder();
				self.trigger('item_add', value, $item);
				self.updateOriginalInput();
			}
		});
	},

	/**
	 * Removes the selected item matching
	 * the provided value.
	 *
	 * @param {string} value
	 */
	removeItem: function(value) {
		var self = this;
		var $item, i, idx;

		$item = (typeof value === 'object') ? value : self.getItem(value);
		value = hash_key($item.attr('data-value'));
		i = self.items.indexOf(value);

		if (i !== -1) {
			$item.remove();
			if ($item.hasClass('active')) {
				idx = self.$activeItems.indexOf($item[0]);
				self.$activeItems.splice(idx, 1);
			}

			self.items.splice(i, 1);
			self.lastQuery = null;
			if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
				self.removeOption(value);
			}

			if (i < self.caretPos) {
				self.setCaret(self.caretPos - 1);
			}

			self.refreshState();
			self.updatePlaceholder();
			self.updateOriginalInput();
			self.positionDropdown();
			self.trigger('item_remove', value);
		}
	},

	/**
	 * Invokes the `create` method provided in the
	 * selectize options that should provide the data
	 * for the new item, given the user input.
	 *
	 * Once this completes, it will be added
	 * to the item list.
	 *
	 * @return {boolean}
	 */
	createItem: function(triggerDropdown) {
		var self  = this;
		var input = $.trim(self.$control_input.val() || '');
		var caret = self.caretPos;
		if (!self.canCreate(input)) return false;
		self.lock();

		if (typeof triggerDropdown === 'undefined') {
			triggerDropdown = true;
		}

		var setup = (typeof self.settings.create === 'function') ? this.settings.create : function(input) {
			var data = {};
			data[self.settings.labelField] = input;
			data[self.settings.valueField] = input;
			return data;
		};

		var create = once(function(data) {
			self.unlock();

			if (!data || typeof data !== 'object') return;
			var value = hash_key(data[self.settings.valueField]);
			if (typeof value !== 'string') return;

			self.setTextboxValue('');
			self.addOption(data);
			self.setCaret(caret);
			self.addItem(value);
			self.refreshOptions(triggerDropdown && self.settings.mode !== 'single');
		});

		var output = setup.apply(this, [input, create]);
		if (typeof output !== 'undefined') {
			create(output);
		}

		return true;
	},

	/**
	 * Re-renders the selected item lists.
	 */
	refreshItems: function() {
		this.lastQuery = null;

		if (this.isSetup) {
			for (var i = 0; i < this.items.length; i++) {
				this.addItem(this.items);
			}
		}

		this.refreshState();
		this.updateOriginalInput();
	},

	/**
	 * Updates all state-dependent attributes
	 * and CSS classes.
	 */
	refreshState: function() {
		var invalid, self = this;
		if (self.isRequired) {
			if (self.items.length) self.isInvalid = false;
			self.$control_input.prop('required', invalid);
		}
		self.refreshClasses();
	},

	/**
	 * Updates all state-dependent CSS classes.
	 */
	refreshClasses: function() {
		var self     = this;
		var isFull   = self.isFull();
		var isLocked = self.isLocked;

		self.$wrapper
			.toggleClass('rtl', self.rtl);

		self.$control
			.toggleClass('focus', self.isFocused)
			.toggleClass('disabled', self.isDisabled)
			.toggleClass('required', self.isRequired)
			.toggleClass('invalid', self.isInvalid)
			.toggleClass('locked', isLocked)
			.toggleClass('full', isFull).toggleClass('not-full', !isFull)
			.toggleClass('input-active', self.isFocused && !self.isInputHidden)
			.toggleClass('dropdown-active', self.isOpen)
			.toggleClass('has-options', !$.isEmptyObject(self.options))
			.toggleClass('has-items', self.items.length > 0);

		self.$control_input.data('grow', !isFull && !isLocked);
	},

	/**
	 * Determines whether or not more items can be added
	 * to the control without exceeding the user-defined maximum.
	 *
	 * @returns {boolean}
	 */
	isFull: function() {
		return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
	},

	/**
	 * Refreshes the original <select> or <input>
	 * element to reflect the current state.
	 */
	updateOriginalInput: function() {
		var i, n, options, self = this;

		if (self.tagType === TAG_SELECT) {
			options = [];
			for (i = 0, n = self.items.length; i < n; i++) {
				options.push('<option value="' + escape_html(self.items[i]) + '" selected="selected"></option>');
			}
			if (!options.length && !this.$input.attr('multiple')) {
				options.push('<option value="" selected="selected"></option>');
			}
			self.$input.html(options.join(''));
		} else {
			self.$input.val(self.getValue());
			self.$input.attr('value',self.$input.val());
		}

		if (self.isSetup) {
			self.trigger('change', self.$input.val());
		}
	},

	/**
	 * Shows/hide the input placeholder depending
	 * on if there items in the list already.
	 */
	updatePlaceholder: function() {
		if (!this.settings.placeholder) return;
		var $input = this.$control_input;

		if (this.items.length) {
			$input.removeAttr('placeholder');
		} else {
			$input.attr('placeholder', this.settings.placeholder);
		}
		$input.triggerHandler('update', {force: true});
	},

	/**
	 * Shows the autocomplete dropdown containing
	 * the available options.
	 */
	open: function() {
		var self = this;

		if (self.isLocked || self.isOpen || (self.settings.mode === 'multi' && self.isFull())) return;
		self.focus();
		self.isOpen = true;
		self.refreshState();
		self.$dropdown.css({visibility: 'hidden', display: 'block'});
		self.positionDropdown();
		self.$dropdown.css({visibility: 'visible'});
		self.trigger('dropdown_open', self.$dropdown);
	},

	/**
	 * Closes the autocomplete dropdown menu.
	 */
	close: function() {
		var self = this;
		var trigger = self.isOpen;

		if (self.settings.mode === 'single' && self.items.length) {
			self.hideInput();
		}

		self.isOpen = false;
		self.$dropdown.hide();
		self.setActiveOption(null);
		self.refreshState();

		if (trigger) self.trigger('dropdown_close', self.$dropdown);
	},

	/**
	 * Calculates and applies the appropriate
	 * position of the dropdown.
	 */
	positionDropdown: function() {
		var $control = this.$control;
		var offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position();
		offset.top += $control.outerHeight(true);

		this.$dropdown.css({
			width : $control.outerWidth(),
			top   : offset.top,
			left  : offset.left
		});
	},

	/**
	 * Resets / clears all selected items
	 * from the control.
	 */
	clear: function() {
		var self = this;

		if (!self.items.length) return;
		self.$control.children(':not(input)').remove();
		self.items = [];
		self.lastQuery = null;
		self.setCaret(0);
		self.setActiveItem(null);
		self.updatePlaceholder();
		self.updateOriginalInput();
		self.refreshState();
		self.showInput();
		self.trigger('clear');
	},

	/**
	 * A helper method for inserting an element
	 * at the current caret position.
	 *
	 * @param {object} $el
	 */
	insertAtCaret: function($el) {
		var caret = Math.min(this.caretPos, this.items.length);
		if (caret === 0) {
			this.$control.prepend($el);
		} else {
			$(this.$control[0].childNodes[caret]).before($el);
		}
		this.setCaret(caret + 1);
	},

	/**
	 * Removes the current selected item(s).
	 *
	 * @param {object} e (optional)
	 * @returns {boolean}
	 */
	deleteSelection: function(e) {
		var i, n, direction, selection, values, caret, option_select, $option_select, $tail;
		var self = this;

		direction = (e && e.keyCode === KEY_BACKSPACE) ? -1 : 1;
		selection = getSelection(self.$control_input[0]);

		if (self.$activeOption && !self.settings.hideSelected) {
			option_select = self.getAdjacentOption(self.$activeOption, -1).attr('data-value');
		}

		// determine items that will be removed
		values = [];

		if (self.$activeItems.length) {
			$tail = self.$control.children('.active:' + (direction > 0 ? 'last' : 'first'));
			caret = self.$control.children(':not(input)').index($tail);
			if (direction > 0) { caret++; }

			for (i = 0, n = self.$activeItems.length; i < n; i++) {
				values.push($(self.$activeItems[i]).attr('data-value'));
			}
			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
		} else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
			if (direction < 0 && selection.start === 0 && selection.length === 0) {
				values.push(self.items[self.caretPos - 1]);
			} else if (direction > 0 && selection.start === self.$control_input.val().length) {
				values.push(self.items[self.caretPos]);
			}
		}

		// allow the callback to abort
		if (!values.length || (typeof self.settings.onDelete === 'function' && self.settings.onDelete.apply(self, [values]) === false)) {
			return false;
		}

		// perform removal
		if (typeof caret !== 'undefined') {
			self.setCaret(caret);
		}
		while (values.length) {
			self.removeItem(values.pop());
		}

		self.showInput();
		self.positionDropdown();
		self.refreshOptions(true);

		// select previous option
		if (option_select) {
			$option_select = self.getOption(option_select);
			if ($option_select.length) {
				self.setActiveOption($option_select);
			}
		}

		return true;
	},

	/**
	 * Selects the previous / next item (depending
	 * on the `direction` argument).
	 *
	 * > 0 - right
	 * < 0 - left
	 *
	 * @param {int} direction
	 * @param {object} e (optional)
	 */
	advanceSelection: function(direction, e) {
		var tail, selection, idx, valueLength, cursorAtEdge, $tail;
		var self = this;

		if (direction === 0) return;
		if (self.rtl) direction *= -1;

		tail = direction > 0 ? 'last' : 'first';
		selection = getSelection(self.$control_input[0]);

		if (self.isFocused && !self.isInputHidden) {
			valueLength = self.$control_input.val().length;
			cursorAtEdge = direction < 0
				? selection.start === 0 && selection.length === 0
				: selection.start === valueLength;

			if (cursorAtEdge && !valueLength) {
				self.advanceCaret(direction, e);
			}
		} else {
			$tail = self.$control.children('.active:' + tail);
			if ($tail.length) {
				idx = self.$control.children(':not(input)').index($tail);
				self.setActiveItem(null);
				self.setCaret(direction > 0 ? idx + 1 : idx);
			}
		}
	},

	/**
	 * Moves the caret left / right.
	 *
	 * @param {int} direction
	 * @param {object} e (optional)
	 */
	advanceCaret: function(direction, e) {
		var self = this, fn, $adj;

		if (direction === 0) return;

		fn = direction > 0 ? 'next' : 'prev';
		if (self.isShiftDown) {
			$adj = self.$control_input[fn]();
			if ($adj.length) {
				self.hideInput();
				self.setActiveItem($adj);
				e && e.preventDefault();
			}
		} else {
			self.setCaret(self.caretPos + direction);
		}
	},

	/**
	 * Moves the caret to the specified index.
	 *
	 * @param {int} i
	 */
	setCaret: function(i) {
		var self = this;

		if (self.settings.mode === 'single') {
			i = self.items.length;
		} else {
			i = Math.max(0, Math.min(self.items.length, i));
		}

		if(!self.isPending) {
			// the input must be moved by leaving it in place and moving the
			// siblings, due to the fact that focus cannot be restored once lost
			// on mobile webkit devices
			var j, n, fn, $children, $child;
			$children = self.$control.children(':not(input)');
			for (j = 0, n = $children.length; j < n; j++) {
				$child = $($children[j]).detach();
				if (j <  i) {
					self.$control_input.before($child);
				} else {
					self.$control.append($child);
				}
			}
		}

		self.caretPos = i;
	},

	/**
	 * Disables user input on the control. Used while
	 * items are being asynchronously created.
	 */
	lock: function() {
		this.close();
		this.isLocked = true;
		this.refreshState();
	},

	/**
	 * Re-enables user input on the control.
	 */
	unlock: function() {
		this.isLocked = false;
		this.refreshState();
	},

	/**
	 * Disables user input on the control completely.
	 * While disabled, it cannot receive focus.
	 */
	disable: function() {
		var self = this;
		self.$input.prop('disabled', true);
		self.isDisabled = true;
		self.lock();
	},

	/**
	 * Enables the control so that it can respond
	 * to focus and user input.
	 */
	enable: function() {
		var self = this;
		self.$input.prop('disabled', false);
		self.isDisabled = false;
		self.unlock();
	},

	/**
	 * Completely destroys the control and
	 * unbinds all event listeners so that it can
	 * be garbage collected.
	 */
	destroy: function() {
		var self = this;
		var eventNS = self.eventNS;
		var revertSettings = self.revertSettings;

		self.trigger('destroy');
		self.off();
		self.$wrapper.remove();
		self.$dropdown.remove();

		self.$input
			.html('')
			.append(revertSettings.$children)
			.removeAttr('tabindex')
			.removeClass('selectized')
			.attr({tabindex: revertSettings.tabindex})
			.show();

		self.$control_input.removeData('grow');
		self.$input.removeData('selectize');

		$(window).off(eventNS);
		$(document).off(eventNS);
		$(document.body).off(eventNS);

		delete self.$input[0].selectize;
	},

	/**
	 * A helper method for rendering "item" and
	 * "option" templates, given the data.
	 *
	 * @param {string} templateName
	 * @param {object} data
	 * @returns {string}
	 */
	render: function(templateName, data) {
		var value, id, label;
		var html = '';
		var cache = false;
		var self = this;
		var regex_tag = /^[\t ]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;

		if (templateName === 'option' || templateName === 'item') {
			value = hash_key(data[self.settings.valueField]);
			cache = !!value;
		}

		// pull markup from cache if it exists
		if (cache) {
			if (!isset(self.renderCache[templateName])) {
				self.renderCache[templateName] = {};
			}
			if (self.renderCache[templateName].hasOwnProperty(value)) {
				return self.renderCache[templateName][value];
			}
		}

		// render markup
		html = self.settings.render[templateName].apply(this, [data, escape_html]);

		// add mandatory attributes
		if (templateName === 'option' || templateName === 'option_create') {
			html = html.replace(regex_tag, '<$1 data-selectable');
		}
		if (templateName === 'optgroup') {
			id = data[self.settings.optgroupValueField] || '';
			html = html.replace(regex_tag, '<$1 data-group="' + escape_replace(escape_html(id)) + '"');
		}
		if (templateName === 'option' || templateName === 'item') {
			html = html.replace(regex_tag, '<$1 data-value="' + escape_replace(escape_html(value || '')) + '"');
		}

		// update cache
		if (cache) {
			self.renderCache[templateName][value] = html;
		}

		return html;
	},

	/**
	 * Clears the render cache for a template. If
	 * no template is given, clears all render
	 * caches.
	 *
	 * @param {string} templateName
	 */
	clearCache: function(templateName) {
		var self = this;
		if (typeof templateName === 'undefined') {
			self.renderCache = {};
		} else {
			delete self.renderCache[templateName];
		}
	}


});
