/*! selectize.js | https://github.com/brianreavis/selectize.js | Apache License (v2) */

(function (factory) {
	if (typeof exports === 'object') {
		factory(require('jquery'));
	} else if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {
	"use strict";	
	
	// --- src/contrib/highlight.js ---
	
	/**
	* highlight v3 | MIT license | Johann Burkard <jb@eaio.com>
	* Highlights arbitrary terms in a node.
	*
	* - Modified by Marshal <beatgates@gmail.com> 2011-6-24 (added regex)
	* - Modified by Brian Reavis <brian@thirdroute.com> 2012-8-27 (cleanup)
	*/
	
	var highlight = function($element, pattern) {
		if (typeof pattern === 'string' && !pattern.length) return;
		var regex = (typeof pattern === 'string') ? new RegExp(pattern, 'i') : pattern;
	
		var highlight = function(node) {
			var skip = 0;
			if (node.nodeType === 3) {
				var pos = node.data.search(regex);
				if (pos >= 0 && node.data.length > 0) {
					var match = node.data.match(regex);
					var spannode = document.createElement('span');
					spannode.className = 'highlight';
					var middlebit = node.splitText(pos);
					var endbit = middlebit.splitText(match[0].length);
					var middleclone = middlebit.cloneNode(true);
					spannode.appendChild(middleclone);
					middlebit.parentNode.replaceChild(spannode, middlebit);
					skip = 1;
				}
			} else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
				for (var i = 0; i < node.childNodes.length; ++i) {
					i += highlight(node.childNodes[i]);
				}
			}
			return skip;
		};
	
		return $element.each(function() {
			highlight(this);
		});
	};
	
	var unhighlight = function($element) {
		return $element.find('span.highlight').each(function() {
			var parent = this.parentNode;
			parent.replaceChild(parent.firstChild, parent);
			parent.normalize();
		}).end();
	};
	
	// --- src/constants.js ---
	
	/**
	* selectize - A highly customizable select control with autocomplete.
	* Copyright (c) 2013 Brian Reavis & contributors
	*
	* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	* file except in compliance with the License. You may obtain a copy of the License at:
	* http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software distributed under
	* the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	* ANY KIND, either express or implied. See the License for the specific language
	* governing permissions and limitations under the License.
	*
	* @author Brian Reavis <brian@thirdroute.com>
	*/
	
	var IS_MAC        = /Mac/.test(navigator.userAgent);
	
	var KEY_COMMA     = 188;
	var KEY_RETURN    = 13;
	var KEY_ESC       = 27;
	var KEY_LEFT      = 37;
	var KEY_UP        = 38;
	var KEY_RIGHT     = 39;
	var KEY_DOWN      = 40;
	var KEY_BACKSPACE = 8;
	var KEY_DELETE    = 46;
	var KEY_SHIFT     = 16;
	var KEY_CTRL      = IS_MAC ? 18 : 17;
	var KEY_TAB       = 9;
	
	var TAG_SELECT    = 1;
	var TAG_INPUT     = 2;
	
	var DIACRITICS = {
		'a': '[aÀÁÂÃÄÅàáâãäå]',
		'c': '[cÇç]',
		'e': '[eÈÉÊËèéêë]',
		'i': '[iÌÍÎÏìíîï]',
		'n': '[nÑñ]',
		'o': '[oÒÓÔÕÕÖØòóôõöø]',
		's': '[sŠš]',
		'u': '[uÙÚÛÜùúûü]',
		'y': '[yŸÿý]',
		'z': '[zŽž]'
	};
	
	// --- src/selectize.jquery.js ---
	
	var defaults = {
		delimiter: ',',
		persist: true,
		diacritics: true,
		create: false,
		highlight: true,
		openOnFocus: true,
		maxOptions: 1000,
		maxItems: null,
		hideSelected: null,
	
		scrollDuration: 60,
		loadThrottle: 300,
	
		dataAttr: 'data-data',
		sortField: null,
		sortDirection: 'asc',
		valueField: 'value',
		labelField: 'text',
		searchField: ['text'],
	
		mode: null,
		theme: 'default',
		wrapperClass: 'selectize-control',
		inputClass: 'selectize-input',
		dropdownClass: 'selectize-dropdown',
	
		load            : null, // function(query, callback)
		score           : null, // function(search)
		onChange        : null, // function(value)
		onItemAdd       : null, // function(value, $item) { ... }
		onItemRemove    : null, // function(value) { ... }
		onClear         : null, // function() { ... }
		onOptionAdd     : null, // function(value, data) { ... }
		onOptionRemove  : null, // function(value) { ... }
		onDropdownOpen  : null, // function($dropdown) { ... }
		onDropdownClose : null, // function($dropdown) { ... }
		onType          : null, // function(str) { ... }
	
		render: {
			item: null,
			option: null,
			option_create: null
		}
	};
	
	$.fn.selectize = function (settings) {
		var defaults = $.fn.selectize.defaults;
		settings = settings || {};
	
		return this.each(function() {
			var instance, value, values, i, n, data, dataAttr, settings_element, tagName;
			var $options, $option, $input = $(this);
	
			tagName = $input[0].tagName.toLowerCase();
	
			if (typeof settings === 'string') {
				instance = $input.data('selectize');
				instance[settings].apply(instance, Array.prototype.splice.apply(arguments, 1));
			} else {
				dataAttr = settings.dataAttr || defaults.dataAttr;
				settings_element = {};
				settings_element.placeholder = $input.attr('placeholder');
				settings_element.options = {};
				settings_element.items = [];
	
				if (tagName === 'select') {
					settings_element.maxItems = !!$input.attr('multiple') ? null : 1;
					$options = $input.children();
					for (i = 0, n = $options.length; i < n; i++) {
						$option = $($options[i]);
						value = $option.attr('value') || '';
						if (!value.length) continue;
						data = (dataAttr && $option.attr(dataAttr)) || {
							'text'  : $option.html(),
							'value' : value
						};
	
						if (typeof data === 'string') data = JSON.parse(data);
						settings_element.options[value] = data;
						if ($option.is(':selected')) {
							settings_element.items.push(value);
						}
					}
				} else {
					value = $.trim($input.val() || '');
					if (value.length) {
						values = value.split(settings.delimiter || defaults.delimiter);
						for (i = 0, n = values.length; i < n; i++) {
							settings_element.options[values[i]] = {
								'text'  : values[i],
								'value' : values[i]
							};
						}
						settings_element.items = values;
					}
				}
	
				instance = new Selectize($input, $.extend(true, {}, defaults, settings_element, settings));
				$input.data('selectize', instance);
				$input.addClass('selectized');
			}
		});
	};
	
	$.fn.selectize.defaults = defaults;
	
	// --- src/utils.js ---
	
	var isset = function(object) {
		return typeof object !== 'undefined';
	};
	
	var htmlEntities = function(str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	};
	
	var quoteRegExp = function(str) {
		return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
	};
	
	var once = function(fn) {
		var called = false;
		return function() {
			if (called) return;
			called = true;
			fn.apply(this, arguments);
		};
	};
	
	var debounce = function(fn, delay) {
		var timeout;
		return function() {
			var self = this;
			var args = arguments;
			window.clearTimeout(timeout);
			timeout = window.setTimeout(function() {
				fn.apply(self, args);
			}, delay);
		};
	};
	
	/**
	* A workaround for http://bugs.jquery.com/ticket/6696
	*
	* @param {object} $parent - Parent element to listen on.
	* @param {string} event - Event name.
	* @param {string} selector - Descendant selector to filter by.
	* @param {function} fn - Event handler.
	*/
	var watchChildEvent = function($parent, event, selector, fn) {
		$parent.on(event, selector, function(e) {
			var child = e.target;
			while (child && child.parentNode !== $parent[0]) {
				child = child.parentNode;
			}
			e.currentTarget = child;
			return fn.apply(this, [e]);
		});
	};
	
	var getSelection = function(input) {
		var result = {};
		if ('selectionStart' in input) {
			result.start = input.selectionStart;
			result.length = input.selectionEnd - result.start;
		} else if (document.selection) {
			input.focus();
			var sel = document.selection.createRange();
			var selLen = document.selection.createRange().text.length;
			sel.moveStart('character', -input.value.length);
			result.start = sel.text.length - selLen;
			result.length = selLen;
		}
		return result;
	};
	
	var transferStyles = function($from, $to, properties) {
		var styles = {};
		if (properties) {
			for (var i = 0; i < properties.length; i++) {
				styles[properties[i]] = $from.css(properties[i]);
			}
		} else {
			styles = $from.css();
		}
		$to.css(styles);
		return $to;
	};
	
	var measureString = function(str, $parent) {
		var $test = $('<test>').css({
			position: 'absolute',
			top: -99999,
			left: -99999,
			width: 'auto',
			padding: 0,
			whiteSpace: 'nowrap'
		}).text(str).appendTo('body');
	
		transferStyles($parent, $test, [
			'letterSpacing',
			'fontSize',
			'fontFamily',
			'fontWeight',
			'textTransform'
		]);
	
		var width = $test.width();
		$test.remove();
	
		return width;
	};
	
	var autoGrow = function($input) {
		var update = function(e) {
			var value, keyCode, printable, placeholder, width;
			var shift, character;
	
			e = e || window.event;
			value = $input.val();
			if (e.type && e.type.toLowerCase() === 'keydown') {
				keyCode = e.keyCode;
				printable = (
					(keyCode >= 97 && keyCode <= 122) || // a-z
					(keyCode >= 65 && keyCode <= 90)  || // A-Z
					(keyCode >= 48 && keyCode <= 57)  || // 0-9
					keyCode == 32 // space
				);
	
				if (printable) {
					shift = e.shiftKey;
					character = String.fromCharCode(e.keyCode);
					if (shift) character = character.toUpperCase();
					else character = character.toLowerCase();
					value += character;
				}
			}
	
			placeholder = $input.attr('placeholder') || '';
			if (!value.length && placeholder.length) {
				value = placeholder;
			}
	
			width = measureString(value, $input) + 4;
			if (width !== $input.width()) {
				$input.width(width);
				$input.triggerHandler('resize');
			}
		};
		$input.on('keydown keyup update blur', update);
		update({});
	};
	
	// --- src/selectize.js ---
	
	/**
	* selectize.js
	* Copyright (c) 2013 Brian Reavis & contributors
	*
	* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	* file except in compliance with the License. You may obtain a copy of the License at:
	* http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software distributed under
	* the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	* ANY KIND, either express or implied. See the License for the specific language
	* governing permissions and limitations under the License.
	*
	* @author Brian Reavis <brian@thirdroute.com>
	*/
	
	var Selectize = function($input, settings) {
		$input[0].selectize   = this;
	
		this.$input           = $input;
		this.tagType          = $input[0].tagName.toLowerCase() === 'select' ? TAG_SELECT : TAG_INPUT;
		this.settings         = settings;
	
		this.highlightedValue = null;
		this.isOpen           = false;
		this.isLocked         = false;
		this.isFocused        = false;
		this.isInputFocused   = false;
		this.isSetup          = false;
		this.isShiftDown      = false;
		this.isCtrlDown       = false;
		this.ignoreFocus      = false;
		this.hasOptions       = false;
		this.currentResults   = null;
		this.lastValue        = '';
		this.caretPos         = 0;
		this.loading          = 0;
		this.loadedSearches   = {};
	
		this.$activeOption    = null;
		this.$activeItems     = [];
	
		this.options          = {};
		this.userOptions      = {};
		this.items            = [];
		this.renderCache      = {};
		this.onSearchChange   = debounce(this.onSearchChange, this.settings.loadThrottle);
	
		if ($.isArray(settings.options)) {
			var key = settings.valueField;
			for (var i = 0; i < settings.options.length; i++) {
				if (settings.options[i].hasOwnProperty(key)) {
					this.options[settings.options[i][key]] = settings.options[i];
				}
			}
		} else if (typeof settings.options === 'object') {
			$.extend(this.options, settings.options);
			delete this.settings.options;
		}
	
		// option-dependent defaults
		this.settings.mode = this.settings.mode || (this.settings.maxItems === 1 ? 'single' : 'multi');
		if (typeof this.settings.hideSelected !== 'boolean') {
			this.settings.hideSelected = this.settings.mode === 'multi';
		}
	
		this.setup();
	};
	
	/**
	* Creates all elements and sets up event bindings.
	*/
	Selectize.prototype.setup = function() {
		var self = this;
		var $wrapper;
		var $control;
		var $control_input;
		var $dropdown;
		var inputMode;
		var displayMode;
		var timeout_blur;
		var timeout_focus;
	
		$wrapper       = $('<div>').addClass(this.settings.theme).addClass(this.settings.wrapperClass);
		$control       = $('<div>').addClass(this.settings.inputClass).addClass('items').toggleClass('has-options', !$.isEmptyObject(this.options)).appendTo($wrapper);
		$control_input = $('<input type="text">').appendTo($control);
		$dropdown      = $('<div>').addClass(this.settings.dropdownClass).hide().appendTo($wrapper);
	
		displayMode = this.$input.css('display');
		$wrapper.css({
			width: this.$input[0].style.width,
			display: displayMode
		});
	
		inputMode = this.settings.mode;
		$wrapper.toggleClass('single', inputMode === 'single');
		$wrapper.toggleClass('multi', inputMode === 'multi');
	
		if ((this.settings.maxItems === null || this.settings.maxItems > 1) && this.tagType === TAG_SELECT) {
			this.$input.attr('multiple', 'multiple');
		}
	
		if (this.settings.placeholder) {
			$control_input.attr('placeholder', this.settings.placeholder);
		}
	
		this.$wrapper       = $wrapper;
		this.$control       = $control;
		this.$control_input = $control_input;
		this.$dropdown      = $dropdown;
	
		$control.on('mousedown', function(e) {
			if (e.currentTarget === self.$control[0]) {
				$control_input.trigger('focus');
			} else {
				self.focus(true);
			}
			e.preventDefault();
		});
	
		watchChildEvent($dropdown, 'mouseenter', '*', function() { return self.onOptionHover.apply(self, arguments); });
		watchChildEvent($dropdown, 'mousedown', '*', function() { return self.onOptionSelect.apply(self, arguments); });
		watchChildEvent($control, 'mousedown', '*:not(input)', function() { return self.onItemSelect.apply(self, arguments); });
	
		autoGrow($control_input);
	
		$control_input.on({
			mousedown : function(e) { e.stopPropagation(); },
			keydown   : function() { return self.onKeyDown.apply(self, arguments); },
			keyup     : function() { return self.onKeyUp.apply(self, arguments); },
			keypress  : function() { return self.onKeyPress.apply(self, arguments); },
			resize    : function() { self.positionDropdown.apply(self, []); },
			blur      : function() { return self.onBlur.apply(self, arguments); },
			focus     : function() { return self.onFocus.apply(self, arguments); }
		});
	
		$(document).on({
			keydown: function(e) {
				self.isCtrlDown = e[IS_MAC ? 'altKey' : 'ctrlKey'];
				self.isShiftDown = e.shiftKey;
				if (self.isFocused && !self.isLocked) {
					var tagName = (e.target.tagName || '').toLowerCase();
					if (tagName === 'input' || tagName === 'textarea') return;
					if ([KEY_SHIFT, KEY_BACKSPACE, KEY_DELETE, KEY_ESC, KEY_LEFT, KEY_RIGHT, KEY_TAB].indexOf(e.keyCode) !== -1) {
						return self.onKeyDown.apply(self, arguments);
					}
				}
			},
			keyup: function(e) {
				if (e.keyCode === KEY_CTRL) self.isCtrlDown = false;
				else if (e.keyCode === KEY_SHIFT) self.isShiftDown = false;
			},
			mousedown: function(e) {
				if (self.isFocused  && !self.isLocked && !self.$control.has(e.target).length && e.target !== self.$control[0]) {
					self.blur();
				}
			}
		});
	
		$(window).on({
			resize: function() {
				if (self.isOpen) {
					self.positionDropdown.apply(self, arguments);
				}
			}
		});
	
		this.$input.hide().after(this.$wrapper);
	
		if ($.isArray(this.settings.items)) {
			this.setValue(this.settings.items);
			delete this.settings.items;
		}
	
		this.updateOriginalInput();
		this.refreshItems();
		this.updatePlaceholder();
		this.isSetup = true;
	};
	
	/**
	* Triggers a callback defined in the user-provided settings.
	* Events: onItemAdd, onOptionAdd, etc
	*
	* @param {string} event
	*/
	Selectize.prototype.trigger = function(event) {
		var args;
		if (typeof this.settings[event] === 'function') {
			args = Array.prototype.slice.apply(arguments, [1]);
			this.settings.event.apply(this, args);
		}
	};
	
	/**
	* Triggered on <input> keypress.
	*
	* @param {object} e
	* @returns {boolean}
	*/
	Selectize.prototype.onKeyPress = function(e) {
		if (this.isLocked) return;
		var character = String.fromCharCode(e.keyCode || e.which);
		if (this.settings.create && character === this.settings.delimiter) {
			this.createItem();
			e.preventDefault();
			return false;
		}
	};
	
	/**
	* Triggered on <input> keydown.
	*
	* @param {object} e
	* @returns {boolean}
	*/
	Selectize.prototype.onKeyDown = function(e) {
		if (this.isLocked) return;
		var isInput = e.target === this.$control_input[0];
	
		switch (e.keyCode || e.which) {
			case KEY_ESC:
				this.blur();
				return;
			case KEY_DOWN:
				if (!this.isOpen && this.hasOptions && this.isInputFocused) {
					this.open();
				} else if (this.$activeOption) {
					var $next = this.$activeOption.next();
					if ($next.length) this.setActiveOption($next, true, true);
				}
				e.preventDefault();
				break;
			case KEY_UP:
				if (this.$activeOption) {
					var $prev = this.$activeOption.prev();
					if ($prev.length) this.setActiveOption($prev, true, true);
				}
				e.preventDefault();
				break;
			case KEY_RETURN:
				if (this.$activeOption) {
					this.onOptionSelect({currentTarget: this.$activeOption});
				}
				e.preventDefault();
				break;
			case KEY_LEFT:
				this.advanceSelection(-1, e);
				break;
			case KEY_RIGHT:
				this.advanceSelection(1, e);
				break;
			case KEY_TAB:
				if (this.settings.create && $.trim(this.$control_input.val()).length) {
					this.createItem();
					e.preventDefault();
				}
				break;
			case KEY_BACKSPACE:
			case KEY_DELETE:
				this.deleteSelection(e);
				break;
			default:
				if (this.isFull()) {
					e.preventDefault();
					return;
				}
		}
		if (!this.isFull()) {
			this.focus(true);
		}
	};
	
	/**
	* Triggered on <input> keyup.
	*
	* @param {object} e
	* @returns {boolean}
	*/
	Selectize.prototype.onKeyUp = function(e) {
		if (this.isLocked) return;
		var value = this.$control_input.val() || '';
		if (this.lastValue !== value) {
			this.lastValue = value;
			this.onSearchChange(value);
			this.refreshOptions();
			this.trigger('onType', value);
		}
	};
	
	/**
	* Invokes the user-provide option provider / loader.
	*
	* Note: this function is debounced in the Selectize
	* constructor (by `settings.loadDelay` milliseconds)
	*
	* @param {string} value
	*/
	Selectize.prototype.onSearchChange = function(value) {
		if (!this.settings.load) return;
		if (this.loadedSearches.hasOwnProperty(value)) return;
		var self = this;
		var $wrapper = this.$wrapper.addClass('loading');
	
		this.loading++;
		this.loadedSearches[value] = true;
		this.settings.load.apply(this, [value, function(results) {
			self.loading = Math.max(self.loading - 1, 0);
			if (results && results.length) {
				self.addOption(results);
				self.refreshOptions(false);
				if (self.isInputFocused) self.open();
			}
			if (!self.loading) {
				$wrapper.removeClass('loading');
			}
		}]);
	};
	
	/**
	* Triggered on <input> focus.
	*
	* @param {object} e
	* @returns {boolean}
	*/
	Selectize.prototype.onFocus = function(e) {
		this.showInput();
		this.isInputFocused = true;
		if (this.ignoreFocus) return;
	
		this.setActiveItem(null);
		this.$control.addClass('focus');
		this.refreshOptions(!!this.settings.openOnFocus);
	};
	
	/**
	* Triggered on <input> blur.
	*
	* @param {object} e
	* @returns {boolean}
	*/
	Selectize.prototype.onBlur = function(e) {
		this.isInputFocused = false;
		if (this.ignoreFocus) return;
	
		this.close();
		this.$control_input.val('');
		this.setActiveOption(null);
		this.setCaret(this.items.length, false);
		if (!this.$activeItems.length) {
			this.$control.removeClass('focus');
			this.isFocused = false;
		}
	};
	
	/**
	* Triggered when the user rolls over
	* an option in the autocomplete dropdown menu.
	*
	* @param {object} e
	* @returns {boolean}
	*/
	Selectize.prototype.onOptionHover = function(e) {
		this.setActiveOption(e.currentTarget, false);
	};
	
	/**
	* Triggered when the user clicks on an option
	* in the autocomplete dropdown menu.
	*
	* @param {object} e
	* @returns {boolean}
	*/
	Selectize.prototype.onOptionSelect = function(e) {
		var $target = $(e.currentTarget);
		if ($target.hasClass('create')) {
			this.createItem();
		} else {
			var value = $target.attr('data-value');
			if (value) {
				this.addItem(value);
				this.$control_input.val('');
	
				// restore focus to input
				var self = this;
				window.setTimeout(function() {
					if (self.settings.mode === 'single') {
						self.blur();
						self.focus(false);
						self.hideInput();
					} else {
						self.focus(false);
					}
				}, 0);
			}
		}
	};
	
	/**
	* Triggered when the user clicks on an item
	* that has been selected.
	*
	* @param {object} e
	* @returns {boolean}
	*/
	Selectize.prototype.onItemSelect = function(e) {
		if (this.settings.mode === 'multi') {
			this.$control_input.trigger('blur');
			this.setActiveItem(e.currentTarget, e);
			e.stopPropagation();
		}
	};
	
	/**
	* Returns the value of the control. If multiple items
	* can be selected (e.g. <select multiple>), this returns
	* an array. If only one item can be selected, this
	* returns a string.
	*
	* @returns {mixed}
	*/
	Selectize.prototype.getValue = function() {
		if (this.tagType === TAG_SELECT && this.$input.attr('multiple')) {
			return this.items;
		} else {
			return this.items.join(this.settings.delimiter);
		}
	};
	
	/**
	* Resets the selected items to the given value.
	*
	* @param {mixed} value
	*/
	Selectize.prototype.setValue = function(value) {
		this.clear();
		var items = $.isArray(value) ? value : [value];
		for (var i = 0, n = items.length; i < n; i++) {
			this.addItem(items[i]);
		}
	};
	
	/**
	* Sets the selected item.
	*
	* @param {object} $item
	* @param {object} e (optional)
	*/
	Selectize.prototype.setActiveItem = function($item, e) {
		var eventName;
		var i, idx, begin, end, item, swap;
		var $last;
	
		$item = $($item);
	
		// clear the active selection
		if (!$item.length) {
			$(this.$activeItems).removeClass('active');
			this.$activeItems = [];
			this.isFocused = false;
			return;
		}
	
		// modify selection
		eventName = e && e.type.toLowerCase();
	
		if (eventName === 'mousedown' && this.isShiftDown && this.$activeItems.length) {
			$last = this.$control.children('.active:last');
			begin = Array.prototype.indexOf.apply(this.$control[0].childNodes, [$last[0]]);
			end   = Array.prototype.indexOf.apply(this.$control[0].childNodes, [$item[0]]);
			if (begin > end) {
				swap  = begin;
				begin = end;
				end   = swap;
			}
			for (i = begin; i <= end; i++) {
				item = this.$control[0].childNodes[i];
				if (this.$activeItems.indexOf(item) === -1) {
					$(item).addClass('active');
					this.$activeItems.push(item);
				}
			}
			e.preventDefault();
		} else if ((eventName === 'mousedown' && this.isCtrlDown) || (eventName === 'keydown' && this.isShiftDown)) {
			if ($item.hasClass('active')) {
				idx = this.$activeItems.indexOf($item[0]);
				this.$activeItems.splice(idx, 1);
				$item.removeClass('active');
			} else {
				this.$activeItems.push($item.addClass('active')[0]);
			}
		} else {
			$(this.$activeItems).removeClass('active');
			this.$activeItems = [$item.addClass('active')[0]];
		}
	
		this.isFocused = !!this.$activeItems.length;
	};
	
	/**
	* Sets the selected item in the dropdown menu
	* of available options.
	*
	* @param {object} $object
	* @param {boolean} scroll
	* @param {boolean} animate
	*/
	Selectize.prototype.setActiveOption = function($option, scroll, animate) {
		var height_menu, height_item, y;
		var scroll_top, scroll_bottom;
	
		if (this.$activeOption) this.$activeOption.removeClass('active');
		this.$activeOption = null;
	
		$option = $($option);
		if (!$option.length) return;
	
		this.$activeOption = $option.addClass('active');
	
		if (scroll || !isset(scroll)) {
	
			height_menu   = this.$dropdown.height();
			height_item   = this.$activeOption.outerHeight(true);
			scroll        = this.$dropdown.scrollTop() || 0;
			y             = this.$activeOption.offset().top - this.$dropdown.offset().top + scroll;
			scroll_top    = y;
			scroll_bottom = y - height_menu + height_item;
	
			if (y + height_item > height_menu - scroll) {
				this.$dropdown.stop().animate({scrollTop: scroll_bottom}, animate ? this.settings.scrollDuration : 0);
			} else if (y < scroll) {
				this.$dropdown.stop().animate({scrollTop: scroll_top}, animate ? this.settings.scrollDuration : 0);
			}
	
		}
	};
	
	/**
	* Hides the input element out of view, while
	* retaining its focus.
	*/
	Selectize.prototype.hideInput = function() {
		this.$control_input.css({opacity: 0});
		this.isInputFocused = false;
	};
	
	/**
	* Restores input visibility.
	*/
	Selectize.prototype.showInput = function() {
		this.$control_input.css({opacity: 1});
	};
	
	/**
	* Gives the control focus. If "trigger" is falsy,
	* focus handlers won't be fired--causing the focus
	* to happen silently in the background.
	*
	* @param {boolean} trigger
	*/
	Selectize.prototype.focus = function(trigger) {
		var ignoreFocus = this.ignoreFocus;
		this.ignoreFocus = !trigger;
		this.$control_input[0].focus();
		this.ignoreFocus = ignoreFocus;
	};
	
	/**
	* Forces the control out of focus.
	*/
	Selectize.prototype.blur = function() {
		this.$control_input.trigger('blur');
		this.setActiveItem(null);
	};
	
	/**
	* Splits a search string into an array of
	* individual regexps to be used to match results.
	*
	* @param {string} query
	* @returns {array}
	*/
	Selectize.prototype.parseSearchTokens = function(query) {
		query = $.trim(String(query || '').toLowerCase());
		if (!query || !query.length) return [];
	
		var i, n, regex, letter;
		var tokens = [];
		var words = query.split(/ +/);
	
		for (i = 0, n = words.length; i < n; i++) {
			regex = quoteRegExp(words[i]);
			if (this.settings.diacritics) {
				for (letter in DIACRITICS) {
					if (DIACRITICS.hasOwnProperty(letter)) {
						regex = regex.replace(new RegExp(letter, 'g'), DIACRITICS[letter]);
					}
				}
			}
			tokens.push({
				string : words[i],
				regex  : new RegExp(regex, 'i')
			});
		}
	
		return tokens;
	};
	
	/**
	* Returns a function to be used to score individual results.
	* Results will be sorted by the score (descending). Scores less
	* than or equal to zero (no match) will not be included in the results.
	*
	* @param {object} data
	* @param {object} search
	* @returns {function}
	*/
	Selectize.prototype.getScoreFunction = function(search) {
		var self = this;
		var tokens = search.tokens;
	
		var calculateFieldScore = (function() {
			if (!tokens.length) {
				return function() { return 0; };
			} else if (tokens.length === 1) {
				return function(value) {
					var score, pos;
	
					value = String(value || '').toLowerCase();
					pos = value.search(tokens[0].regex);
					if (pos === -1) return 0;
					score = tokens[0].string.length / value.length;
					if (pos === 0) score += 0.5;
					return score;
				};
			} else {
				return function(value) {
					var score, pos, i, j;
	
					value = String(value || '').toLowerCase();
					score = 0;
					for (i = 0, j = tokens.length; i < j; i++) {
						pos = value.search(tokens[i].regex);
						if (pos === -1) return 0;
						if (pos === 0) score += 0.5;
						score += tokens[i].string.length / value.length;
					}
					return score / tokens.length;
				};
			}
		})();
	
		var calculateScore = (function() {
			var fields = self.settings.searchField;
			if (typeof fields === 'string') {
				fields = [fields];
			}
			if (!fields || !fields.length) {
				return function() { return 0; };
			} else if (fields.length === 1) {
				var field = fields[0];
				return function(data) {
					if (!data.hasOwnProperty(field)) return 0;
					return calculateFieldScore(data[field]);
				};
			} else {
				return function(data) {
					var n = 0;
					var score = 0;
					for (var i = 0, j = fields.length; i < j; i++) {
						if (data.hasOwnProperty(fields[i])) {
							score += calculateFieldScore(data[fields[i]]);
							n++;
						}
					}
					return score / n;
				};
			}
		})();
	
		return calculateScore;
	};
	
	/**
	* Searches through available options and returns
	* a sorted array of matches. Includes options that
	* have already been selected.
	*
	* The `settings` parameter can contain:
	*
	*   - searchField
	*   - sortField
	*   - sortDirection
	*
	* Returns an object containing:
	*
	*   - query {string}
	*   - tokens {array}
	*   - total {int}
	*   - items {array}
	*
	* @param {string} query
	* @param {object} settings
	* @returns {object}
	*/
	Selectize.prototype.search = function(query, settings) {
		var self = this;
		var value, score, search, calculateScore;
	
		settings = settings || {};
		query = $.trim(String(query || '').toLowerCase());
	
		if (query !== this.lastQuery) {
			this.lastQuery = query;
	
			search = {
				query  : query,
				tokens : this.parseSearchTokens(query),
				total  : 0,
				items  : []
			};
	
			// generate result scoring function
			if (this.settings.score) {
				calculateScore = this.settings.score.apply(this, [search]);
				if (typeof calculateScore !== 'function') {
					throw new Error('Selectize "score" setting must be a function that returns a function');
				}
			} else {
				calculateScore = this.getScoreFunction(search);
			}
	
			// perform search and sort
			if (query.length) {
				for (value in this.options) {
					if (this.options.hasOwnProperty(value)) {
						score = calculateScore(this.options[value]);
						if (score > 0) {
							search.items.push({
								score: score,
								value: value
							});
						}
					}
				}
				search.items.sort(function(a, b) {
					return b.score - a.score;
				});
			} else {
				for (value in this.options) {
					if (this.options.hasOwnProperty(value)) {
						search.items.push({
							score: 1,
							value: value
						});
					}
				}
				if (this.settings.sortField) {
					search.items.sort((function() {
						var field = self.settings.sortField;
						var multiplier = self.settings.sortDirection === 'desc' ? -1 : 1;
						return function(a, b) {
							a = a && String(self.options[a.value][field] || '').toLowerCase();
							b = b && String(self.options[b.value][field] || '').toLowerCase();
							if (a > b) return 1 * multiplier;
							if (b > a) return -1 * multiplier;
							return 0;
						};
					})());
				}
			}
			this.currentResults = search;
		} else {
			search = $.extend(true, {}, this.currentResults);
		}
	
		// apply limits and return
		return this.prepareResults(search, settings);
	};
	
	/**
	* Filters out any items that have already been selected
	* and applies search limits.
	*
	* @param {object} results
	* @param {object} settings
	* @returns {object}
	*/
	Selectize.prototype.prepareResults = function(search, settings) {
		if (this.settings.hideSelected) {
			for (var i = search.items.length - 1; i >= 0; i--) {
				if (this.items.indexOf(String(search.items[i].value)) !== -1) {
					search.items.splice(i, 1);
				}
			}
		}
	
		search.total = search.items.length;
		if (typeof settings.limit === 'number') {
			search.items = search.items.slice(0, settings.limit);
		}
	
		return search;
	};
	
	/**
	* Refreshes the list of available options shown
	* in the autocomplete dropdown menu.
	*
	* @param {boolean} triggerDropdown
	*/
	Selectize.prototype.refreshOptions = function(triggerDropdown) {
		if (typeof triggerDropdown === 'undefined') {
			triggerDropdown = true;
		}
	
		var i, n;
		var hasCreateOption;
		var query = this.$control_input.val();
		var results = this.search(query, {});
		var html = [];
	
		// build markup
		n = results.items.length;
		if (typeof this.settings.maxOptions === 'number') {
			n = Math.min(n, this.settings.maxOptions);
		}
		for (i = 0; i < n; i++) {
			html.push(this.render('option', this.options[results.items[i].value]));
		}
	
		this.$dropdown.html(html.join(''));
	
		// highlight matching terms inline
		if (this.settings.highlight && results.query.length && results.tokens.length) {
			for (i = 0, n = results.tokens.length; i < n; i++) {
				highlight(this.$dropdown, results.tokens[i].regex);
			}
		}
	
		// add "selected" class to selected options
		if (!this.settings.hideSelected) {
			for (i = 0, n = this.items.length; i < n; i++) {
				this.getOption(this.items[i]).addClass('selected');
			}
		}
	
		// add create option
		hasCreateOption = this.settings.create && results.query.length;
		if (hasCreateOption) {
			this.$dropdown.prepend(this.render('option_create', {input: query}));
		}
	
		// activate
		this.hasOptions = results.items.length > 0 || hasCreateOption;
		if (this.hasOptions) {
			this.setActiveOption(this.$dropdown[0].childNodes[hasCreateOption && results.items.length > 0 ? 1 : 0]);
			if (triggerDropdown && !this.isOpen) { this.open(); }
		} else {
			this.setActiveOption(null);
			if (triggerDropdown && this.isOpen) { this.close(); }
		}
	};
	
	/**
	* Adds an available option. If it already exists,
	* nothing will happen. Note: this does not refresh
	* the options list dropdown (use `refreshOptions`
	* for that).
	*
	* @param {string} value
	* @param {object} data
	*/
	Selectize.prototype.addOption = function(value, data) {
		if ($.isArray(value)) {
			for (var i = 0, n = value.length; i < n; i++) {
				this.addOption(value[i][this.settings.valueField], value[i]);
			}
			return;
		}
	
		if (this.options.hasOwnProperty(value)) return;
		value = String(value);
		this.userOptions[value] = true;
		this.options[value] = data;
		this.lastQuery = null;
		this.trigger('onOptionAdd', value, data);
	};
	
	/**
	* Updates an option available for selection. If
	* it is visible in the selected items or options
	* dropdown, it will be re-rendered automatically.
	*
	* @param {string} value
	* @param {object} data
	*/
	Selectize.prototype.updateOption = function(value, data) {
		value = String(value);
		this.options[value] = data;
		if (isset(this.renderCache['item'])) delete this.renderCache['item'][value];
		if (isset(this.renderCache['option'])) delete this.renderCache['option'][value];
	
		if (this.items.indexOf(value) !== -1) {
			var $item = this.getItem(value);
			var $item_new = $(this.render('item', data));
			if ($item.hasClass('active')) $item_new.addClass('active');
			$item.replaceWith($item_new);
		}
	
		if (this.isOpen) {
			this.refreshOptions(false);
		}
	};
	
	/**
	* Removes an option.
	*
	* @param {string} value
	*/
	Selectize.prototype.removeOption = function(value) {
		value = String(value);
		delete this.userOptions[value];
		delete this.options[value];
		this.lastQuery = null;
		this.trigger('onOptionRemove', value);
	};
	
	/**
	* Returns the jQuery element of the option
	* matching the given value.
	*
	* @param {string} value
	* @returns {object}
	*/
	Selectize.prototype.getOption = function(value) {
		return this.$dropdown.children('[data-value="' + value.replace(/(['"])/g, '\\$1') + '"]:first');
	};
	
	/**
	* Returns the jQuery element of the item
	* matching the given value.
	*
	* @param {string} value
	* @returns {object}
	*/
	Selectize.prototype.getItem = function(value) {
		var i = this.items.indexOf(value);
		if (i !== -1) {
			if (i >= this.caretPos) i++;
			var $el = $(this.$control[0].childNodes[i]);
			if ($el.attr('data-value') === value) {
				return $el;
			}
		}
		return $();
	};
	
	/**
	* "Selects" an item. Adds it to the list
	* at the current caret position.
	*
	* @param {string} value
	*/
	Selectize.prototype.addItem = function(value) {
		var $item;
		var inputMode = this.settings.mode;
		var isFull = this.isFull();
		value = String(value);
	
		if (inputMode === 'single') this.clear();
		if (inputMode === 'multi' && isFull) return;
		if (this.items.indexOf(value) !== -1) return;
		if (!this.options.hasOwnProperty(value)) return;
	
		$item = $(this.render('item', this.options[value]));
		this.items.splice(this.caretPos, 0, value);
		this.insertAtCaret($item);
	
		isFull = this.isFull();
		this.$control.toggleClass('has-items', true);
		this.$control.toggleClass('full', isFull).toggleClass('not-full', !isFull);
	
		if (this.isSetup) {
			// remove the option from the menu
			var options = this.$dropdown[0].childNodes;
			for (var i = 0; i < options.length; i++) {
				var $option = $(options[i]);
				if ($option.attr('data-value') === value) {
					$option.remove();
					if ($option[0] === this.$activeOption[0]) {
						this.setActiveOption(options.length ? $(options[0]).addClass('active') : null);
					}
					break;
				}
			}
	
			// hide the menu if the maximum number of items have been selected or no options are left
			if (!options.length || (this.settings.maxItems !== null && this.items.length >= this.settings.maxItems)) {
				this.close();
			} else {
				this.positionDropdown();
			}
	
			this.updatePlaceholder();
			this.updateOriginalInput();
			this.trigger('onItemAdd', value, $item);
		}
	};
	
	/**
	* Removes the selected item matching
	* the provided value.
	*
	* @param {string} value
	*/
	Selectize.prototype.removeItem = function(value) {
		var $item, i, idx;
	
		$item = (typeof value === 'object') ? value : this.getItem(value);
		value = String($item.attr('data-value'));
		i = this.items.indexOf(value);
	
		if (i !== -1) {
			$item.remove();
			if ($item.hasClass('active')) {
				idx = this.$activeItems.indexOf($item[0]);
				this.$activeItems.splice(idx, 1);
			}
	
			this.items.splice(i, 1);
			this.$control.toggleClass('has-items', this.items.length > 0);
			this.$control.removeClass('full').addClass('not-full');
			this.lastQuery = null;
			if (!this.settings.persist && this.userOptions.hasOwnProperty(value)) {
				this.removeOption(value);
			}
			this.setCaret(i);
			this.positionDropdown();
			this.refreshOptions(false);
	
			if (!this.hasOptions) { this.close(); }
			else if (this.isInputFocused) { this.open(); }
	
			this.updatePlaceholder();
			this.updateOriginalInput();
			this.trigger('onItemRemove', value);
		}
	};
	
	/**
	* Invokes the `create` method provided in the
	* selectize options that should provide the data
	* for the new item, given the user input.
	*
	* Once this completes, it will be added
	* to the item list.
	*/
	Selectize.prototype.createItem = function() {
		var self = this;
		var input = $.trim(this.$control_input.val() || '');
		var caret = this.caretPos;
		if (!input.length) return;
		this.lock();
		this.$control_input[0].blur();
	
		var setup = (typeof this.settings.create === 'function') ? this.settings.create : function(input) {
			var data = {};
			data[self.settings.labelField] = input;
			data[self.settings.valueField] = input;
			return data;
		};
	
		var create = once(function(data) {
			self.unlock();
			self.$control_input[0].focus();
	
			var value = data && data[self.settings.valueField];
			if (!value) return;
	
			self.addOption(value, data);
			self.setCaret(caret, false);
			self.addItem(value);
			self.refreshOptions(false);
			self.$control_input.val('');
		});
	
		var output = setup(input, create);
		if (typeof output === 'object') {
			create(output);
		}
	};
	
	/**
	* Re-renders the selected item lists.
	*/
	Selectize.prototype.refreshItems = function() {
		var isFull = this.isFull();
		this.lastQuery = null;
		this.$control.toggleClass('full', isFull).toggleClass('not-full', !isFull);
		this.$control.toggleClass('has-items', this.items.length > 0);
	
		if (this.isSetup) {
			for (var i = 0; i < this.items.length; i++) {
				this.addItem(this.items);
			}
		}
	
		this.updateOriginalInput();
	};
	
	/**
	* Determines whether or not more items can be added
	* to the control without exceeding the user-defined maximum.
	*
	* @returns {boolean}
	*/
	Selectize.prototype.isFull = function() {
		return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
	};
	
	/**
	* Refreshes the original <select> or <input>
	* element to reflect the current state.
	*/
	Selectize.prototype.updateOriginalInput = function() {
		var i, n, options;
	
		if (this.$input[0].tagName.toLowerCase() === 'select') {
			options = [];
			for (i = 0, n = this.items.length; i < n; i++) {
				options.push('<option value="' + htmlEntities(this.items[i]) + '" selected="selected"></option>');
			}
			if (!options.length && !this.$input.attr('multiple')) {
				options.push('<option value="" selected="selected"></option>');
			}
			this.$input.html(options.join(''));
		} else {
			this.$input.val(this.getValue());
		}
	
		this.$input.trigger('change');
		if (this.isSetup) {
			this.trigger('onChange', this.$input.val());
		}
	};
	
	/**
	* Shows/hide the input placeholder depending
	* on if there items in the list already.
	*/
	Selectize.prototype.updatePlaceholder = function() {
		if (!this.settings.placeholder) return;
		var $input = this.$control_input;
	
		if (this.items.length) {
			$input.removeAttr('placeholder');
		} else {
			$input.attr('placeholder', this.settings.placeholder);
		}
		$input.triggerHandler('update');
	};
	
	/**
	* Shows the autocomplete dropdown containing
	* the available options.
	*/
	Selectize.prototype.open = function() {
		if (this.isOpen || (this.settings.mode === 'multi' && this.isFull())) return;
		this.isOpen = true;
		this.positionDropdown();
		this.$control.addClass('dropdown-active');
		this.$dropdown.show();
		this.trigger('onDropdownOpen', this.$dropdown);
	};
	
	/**
	* Closes the autocomplete dropdown menu.
	*/
	Selectize.prototype.close = function() {
		if (!this.isOpen) return;
		this.$dropdown.hide();
		this.$control.removeClass('dropdown-active');
		this.isOpen = false;
		this.trigger('onDropdownClose', this.$dropdown);
	};
	
	/**
	* Calculates and applies the appropriate
	* position of the dropdown.
	*/
	Selectize.prototype.positionDropdown = function() {
		var $control = this.$control;
		var offset = $control.position();
		offset.top += $control.outerHeight(true);
	
		this.$dropdown.css({
			width : $control.outerWidth(),
			top   : offset.top,
			left  : offset.left
		});
	};
	
	/**
	* Resets / clears all selected items
	* from the control.
	*/
	Selectize.prototype.clear = function() {
		if (!this.items.length) return;
		this.$control.removeClass('has-items');
		this.$control.children(':not(input)').remove();
		this.items = [];
		this.setCaret(0);
		this.updatePlaceholder();
		this.updateOriginalInput();
		this.trigger('onClear');
	};
	
	/**
	* A helper method for inserting an element
	* at the current caret position.
	*
	* @param {object} $el
	*/
	Selectize.prototype.insertAtCaret = function($el) {
		var caret = Math.min(this.caretPos, this.items.length);
		if (caret === 0) {
			this.$control.prepend($el);
		} else {
			$(this.$control[0].childNodes[caret]).before($el);
		}
		this.setCaret(caret + 1);
	};
	
	/**
	* Removes the current selected item(s).
	*
	* @param {object} e (optional)
	*/
	Selectize.prototype.deleteSelection = function(e) {
		var i, n, direction, selection, values, caret, $tail;
	
		direction = (e.keyCode === KEY_BACKSPACE) ? -1 : 1;
		selection = getSelection(this.$control_input[0]);
		if (this.$activeItems.length) {
			$tail = this.$control.children('.active:' + (direction > 0 ? 'last' : 'first'));
			caret = Array.prototype.indexOf.apply(this.$control[0].childNodes, [$tail[0]]);
			if (this.$activeItems.length > 1 && direction > 0) { caret--; }
	
			values = [];
			for (i = 0, n = this.$activeItems.length; i < n; i++) {
				values.push($(this.$activeItems[i]).attr('data-value'));
			}
			while (values.length) {
				this.removeItem(values.pop());
			}
	
			this.setCaret(caret);
			e.preventDefault();
			e.stopPropagation();
		} else if ((this.isInputFocused || this.settings.mode === 'single') && this.items.length) {
			if (direction < 0 && selection.start === 0 && selection.length === 0) {
				this.removeItem(this.items[this.caretPos - 1]);
			} else if (direction > 0 && selection.start === this.$control_input.val().length) {
				this.removeItem(this.items[this.caretPos]);
			}
		}
	};
	
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
	Selectize.prototype.advanceSelection = function(direction, e) {
		if (direction === 0) return;
		var tail = direction > 0 ? 'last' : 'first';
		var selection = getSelection(this.$control_input[0]);
	
		if (this.isInputFocused) {
			var valueLength = this.$control_input.val().length;
			var cursorAtEdge = direction < 0
				? selection.start === 0 && selection.length === 0
				: selection.start === valueLength;
	
			if (cursorAtEdge && !valueLength) {
				this.advanceCaret(direction, e);
			}
		} else {
			var $tail = this.$control.children('.active:' + tail);
			if ($tail.length) {
				var idx = Array.prototype.indexOf.apply(this.$control[0].childNodes, [$tail[0]]);
				this.setCaret(direction > 0 ? idx + 1 : idx);
			}
		}
	};
	
	/**
	* Moves the caret left / right.
	*
	* @param {int} direction
	* @param {object} e (optional)
	*/
	Selectize.prototype.advanceCaret = function(direction, e) {
		if (direction === 0) return;
		var fn = direction > 0 ? 'next' : 'prev';
		if (this.isShiftDown) {
			var $adj = this.$control_input[fn]();
			if ($adj.length) {
				this.blur();
				this.setActiveItem($adj);
				e && e.preventDefault();
			}
		} else {
			this.setCaret(this.caretPos + direction);
		}
	};
	
	/**
	* Moves the caret to the specified index.
	*
	* @param {int} i
	* @param {boolean} focus
	*/
	Selectize.prototype.setCaret = function(i, focus) {
		if (this.settings.mode === 'single' || this.isFull()) {
			i = this.items.length;
		} else {
			i = Math.max(0, Math.min(this.items.length, i));
		}
	
		this.ignoreFocus = true;
		this.$control_input.detach();
		if (i === this.items.length) {
			this.$control.append(this.$control_input);
		} else {
			this.$control_input.insertBefore(this.$control.children(':not(input)')[i]);
		}
		this.ignoreFocus = false;
		if (focus && this.isSetup) {
			this.focus(true);
		}
	
		this.caretPos = i;
	};
	
	/**
	* Disables user input on the control. Used while
	* items are being asynchronously created.
	*/
	Selectize.prototype.lock = function() {
		this.isLocked = true;
		this.$control.addClass('locked');
	};
	
	/**
	* Re-enables user input on the control.
	*/
	Selectize.prototype.unlock = function() {
		this.isLocked = false;
		this.$control.removeClass('locked');
	};
	
	/**
	* A helper method for rendering "item" and
	* "option" templates, given the data.
	*
	* @param {string} templateName
	* @param {object} data
	* @returns {string}
	*/
	Selectize.prototype.render = function(templateName, data) {
		cache = isset(cache) ? cache : true;
	
		var value, label;
		var html = '';
		var cache = false;
	
		if (['option', 'item'].indexOf(templateName) !== -1) {
			value = data[this.settings.valueField];
			cache = isset(value);
		}
	
		if (cache) {
			if (!isset(this.renderCache[templateName])) {
				this.renderCache[templateName] = {};
			}
			if (this.renderCache[templateName].hasOwnProperty(value)) {
				return this.renderCache[templateName][value];
			}
		}
	
		if (this.settings.render && typeof this.settings.render[templateName] === 'function') {
			html = this.settings.render[templateName].apply(this, [data]);
		} else {
			label = data[this.settings.labelField];
			switch (templateName) {
				case 'option':
					html = '<div class="option">' + label + '</div>';
					break;
				case 'item':
					html = '<div class="item">' + label + '</div>';
					break;
				case 'option_create':
					html = '<div class="create">Create <strong>' + htmlEntities(data.input) + '</strong>&hellip;</div>';
					break;
			}
		}
	
		if (isset(value)) {
			html = html.replace(/^[\	 ]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i, '<$1 data-value="' + value + '"');
		}
		if (cache) {
			this.renderCache[templateName][value] = html;
		}
	
		return html;
	};

	return Selectize;

}));
