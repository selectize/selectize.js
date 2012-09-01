/** 
 * selectize - A highly customizable select control with autocomplete.
 * Copyright (c) 2012 DIY Co
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
 * @author Brian Reavis <brian@diy.org>
 */

// Features: 
// - can handle fluid layouts (the input can resize)
// - supports international characters
// - produces output identical to native controls (i.e. val())

// To-do:
// [ ] allow input inbetween tags 
// [ ] data source: ajax
// [X] data source: callback
// [X] data source: object
// [ ] auto expanding inner <input>
// [X] initialize initial values

$.fn.selectize = function (settings) {
	settings = settings || {};

	return this.each(function() {
		var $input = $(this);
		var instance;
		var tagName = $input[0].tagName.toLowerCase();

		if (typeof settings === 'string') {
			instance = $input.data('selectize');
			instance[settings].apply(instance, Array.prototype.splice.apply(arguments, 1));
		} else {
			var settings_element = {};
			settings_element.placeholder = $input.attr('placeholder');
			settings_element.options = {};
			settings_element.items = [];

			if (tagName === 'select') {
				settings_element.maxItems = !!$input.attr('multiple') ? null : 1;
				var $options = $input.children();
				for (var i = 0; i < $options.length; i++) {
					var $option = $($options[i]);
					var value = $option.attr('value') || '';
					if (!value.length) continue;
					var data = (settings.dataAttr && $option.attr(settings.dataAttr)) || {
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
				var value = $.trim($input.val() || '');
				if (value.length) {
					var values = value.split(settings.delimiter || $.fn.selectize.defaults.delimiter);
					for (var i = 0; i < values.length; i++) {		
						settings_element.options[values[i]] = {
							'text'  : values[i],
							'value' : values[i]
						};
					}
					settings_element.items = values;
				}
			}
			instance = new Selectize($input, $.extend(true, {}, $.fn.selectize.defaults, settings_element, settings));
			$input.data('selectize', instance);
			$input.addClass('selectized');
		}
	});
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

$.fn.selectize.defaults = {
	delimiter: ',',
	persist: true,
	diacritics: true,
	create: false,
	highlight: true,
	openOnFocus: true,
	maxOptions: 1000,
	maxItems: null,

	scrollDuration: 60,

	dataAttr: 'data-data',
	sortField: 'value',
	sortDirection: 'asc',
	valueField: 'value',
	labelField: 'text',
	searchField: ['text'],

	theme: 'default',
	wrapperClass: 'selectize-control',
	inputClass: 'selectize-input',
	dropdownClass: 'selectize-dropdown',

	render: {
		item: null,
		option: null,
		option_create: null
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Selectize = function($input, settings) {
	this.$input = $input;
	this.tagType = $input[0].tagName.toLowerCase() === 'select' ? TAG_SELECT : TAG_INPUT;
	this.settings = settings;

	this.highlightedValue = null;
	this.isOpen = false;
	this.isFull = false;
	this.isFocused = false;
	this.isInputFocused = false;
	this.isSetup = false;
	this.hasOptions = false;
	this.currentResults = null;
	this.lastValue = '';

	this.$activeOption = null;
	this.$activeItem = null;

	this.options = {};
	this.userOptions = {};
	this.items = [];
	this.renderCache = {};

	if ($.isArray(settings.options)) {
		var key = settings.valueField;
		for (var i = 0; i < settings.options.length; i++) {
			if (settings.options[i].hasOwnProperty(key)) {
				this.options[settings.options[i][key]] = settings.options[i]
			}
		}
	} else if (typeof settings.options === 'object') {
		$.extend(this.options, settings.options);
		delete this.settings.options;
	}

	this.setup();
};
	
Selectize.prototype.setup = function() {
	var self = this;

	if ((this.settings.maxItems === null || this.settings.maxItems > 1) && this.tagType === TAG_SELECT) {
		this.$input.attr('multiple', 'multiple');
	}

	var $wrapper = $('<div>').addClass(this.settings.wrapperClass);
	var displayMode = this.$input.css('display');
	$wrapper.css({
		width: this.$input[0].style.width,
		display: displayMode
	});

	var $control = $('<div>').addClass(this.settings.inputClass).addClass(this.settings.theme).toggleClass('has-options', !$.isEmptyObject(this.options)).appendTo($wrapper);
	var $control_items = $('<div>').addClass('items').appendTo($control);
	var $control_input = $('<input type="text">').appendTo($control);
	var $dropdown = $('<div>').addClass(this.settings.dropdownClass).addClass(this.settings.theme).hide().appendTo($wrapper);

	if (this.settings.placeholder) {
		$control_input.attr('placeholder', this.settings.placeholder);
	}

	this.$wrapper = $wrapper;
	this.$control = $control;
	this.$control_items = $control_items;
	this.$control_input = $control_input;
	this.$dropdown = $dropdown;

	$control.on('mousedown', function(e) {
		if (!self.$control_items.has(e.target).length) {
			window.setTimeout(function() {
				$control_input.trigger('focus');
			}, 10);
		}
	});

	$control_input.on('mousedown', function(e) { e.stopPropagation(); });
	$dropdown.on('mouseenter', '>*', function() { return self.onOptionHover.apply(self, arguments); });
	$dropdown.on('mousedown', '>*', function() { return self.onOptionSelect.apply(self, arguments); });
	$control_items.on('mousedown', function() { return self.onItemSelect.apply(self, arguments); });
	$control_input.on('keydown', function() { return self.onKeyDown.apply(self, arguments); });
	$control_input.on('keyup', function() { return self.onKeyUp.apply(self, arguments); });
	$control_input.on('keypress', function() { return self.onKeyPress.apply(self, arguments); });
	$control_input.on('blur', function() { return self.onBlur.apply(self, arguments); });
	$control_input.on('focus', function() { return self.onFocus.apply(self, arguments); });

	autoGrow($control_input);
	$control_input.on('resize', function() { self.positionDropdown.apply(self, []); });

	$(document).on('keydown', function(e) {
		if (self.isFocused) {
			var tagName = (e.target.tagName || '').toLowerCase();
			if (tagName === 'input' || tagName === 'textarea') return;
			if ([KEY_SHIFT, KEY_BACKSPACE, KEY_DELETE, KEY_ESC, KEY_LEFT, KEY_RIGHT, KEY_TAB].indexOf(e.keyCode) !== -1) {
				return self.onKeyDown.apply(self, arguments);
			}
		}
	});

	$(document).on('mousedown', function(e) {
		if (self.isFocused && !self.$control.has(e.target).length && e.target !== self.$control[0]) {
			self.blur();
		}
	});

	$(window).on('resize', function() {
		if (self.isOpen) {
			self.positionDropdown.apply(self, arguments);
		}
	});

	this.$input.hide().after(this.$wrapper);

	if ($.isArray(this.settings.items)) {
		for (var i = 0; i < this.settings.items.length; i++) {
			this.addItem(this.settings.items[i]);
		}
		delete this.settings.items;
	}

	this.isSetup = true;
};

Selectize.prototype.onKeyPress = function(e) {
	var character = String.fromCharCode(e.keyCode || e.which);
	if (this.settings.create && character === this.settings.delimiter) {
		this.createItem();
		e.preventDefault();
		return false;
	}
};

Selectize.prototype.onKeyDown = function(e) {
	var isInput = e.target === this.$control_input[0];

	switch (e.keyCode || e.which) {
		case KEY_ESC:
			this.blur();
			break;
		case KEY_DOWN:
			if (!this.isOpen && this.hasOptions) {
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
			if (this.$activeItem) {
				var $prevItem = this.$activeItem.prev();
				if ($prevItem.length) {
					this.setActiveItem($prevItem);
				}
			} else if (isInput && this.items.length && getCaretPosition(this.$control_input[0]) === 0) {
				this.setActiveItem(this.$control_items.children(':last-child'));
				this.$control_input.trigger('blur');
			}
			break;
		case KEY_TAB:
		case KEY_RIGHT:
			if (this.$activeItem) {
				var $nextItem = this.$activeItem.next();
				if (!$nextItem.length) {
					this.$control_input.trigger('focus');
				} else {
					this.setActiveItem($nextItem);
				}
				e.preventDefault();
				e.stopPropagation();
			} else if (e.keyCode === KEY_TAB && this.settings.create) {
				this.createItem();
			}
			break;
		case KEY_BACKSPACE:
		case KEY_DELETE:
			var direction = (e.keyCode === KEY_BACKSPACE) ? 'prev' : 'next';
			if (this.$activeItem) {
				var $adjacentItem = this.$activeItem[direction]();
				this.removeItem(this.$activeItem.attr('data-value'));
				if ($adjacentItem.length) {
					this.setActiveItem($adjacentItem);
				} else {
					this.$activeItem = null;
					this.$control_input.trigger('focus');
				}
				e.preventDefault();
				e.stopPropagation();
			} else if (isInput && direction === 'prev' && this.items.length && getCaretPosition(this.$control_input[0]) === 0) {
				this.removeItem(this.items[this.items.length - 1]);
			}
			return;
		default:
			if (this.isFull) {
				e.preventDefault();
			}
	}
};
	
Selectize.prototype.onKeyUp = function(e) {
	var value = this.$control_input.val();
	if (this.lastValue !== value) {
		this.lastValue = value;
		this.refreshOptions();
	}
};

Selectize.prototype.onFocus = function(e) {
	this.isFocused = true;
	this.isInputFocused = true;
	this.setActiveItem(null);
	this.$control.addClass('focus');
	this.refreshOptions(!!this.settings.openOnFocus);
};

Selectize.prototype.onBlur = function(e) {
	this.close();
	this.$control_input.val('');
	this.isInputFocused = false;
	if (!this.$activeItem) {
		this.$control.removeClass('focus');
		this.isFocused = false;
	}
};

Selectize.prototype.onOptionHover = function(e) {
	this.setActiveOption(e.target, false);
};

Selectize.prototype.onOptionSelect = function(e) {
	var $target = $(e.currentTarget);
	
	if ($target.hasClass('create')) {
		this.createItem();
	} else {
		var value = $target.attr('data-value');
		if (value) {
			this.addItem(value);
			this.$control_input.val('');
		}
	}
};

Selectize.prototype.onItemSelect = function(e) {
	this.$control_input.trigger('blur');
	this.setActiveItem($(e.target));
};

Selectize.prototype.setActiveItem = function($item) {
	if (this.$activeItem) this.$activeItem.removeClass('active');
	this.$activeItem = $item && $item.addClass('active');
	this.isFocused = !!$item;
};

Selectize.prototype.setActiveOption = function($option, scroll, animate) {
	if (this.$activeOption) this.$activeOption.removeClass('active');
	this.$activeOption = null;
	
	$option = $($option);
	if (!$option.length) return;
	
	this.$activeOption = $option.addClass('active');
	
	if (scroll || !isset(scroll)) {
		var height_menu = this.$dropdown.height();
		var height_item = this.$activeOption.outerHeight(true);
		
		var scroll = this.$dropdown.scrollTop() || 0;
		var y = this.$activeOption.offset().top - this.$dropdown.offset().top + scroll;
		var scroll_top = y;
		var scroll_bottom = y - height_menu + height_item;
		
		if (y + height_item > height_menu - scroll) {
			this.$dropdown.stop().animate({scrollTop: scroll_bottom}, animate ? this.settings.scrollDuration : 0);
		} else if (y < scroll) {
			this.$dropdown.stop().animate({scrollTop: scroll_top}, animate ? this.settings.scrollDuration : 0);
		}
	}
};

Selectize.prototype.blur = function() {
	if (this.isInputFocused) {
		this.$control_input.trigger('blur');
	}
	this.setActiveItem(null);
};

Selectize.prototype.parseSearchTokens = function(query) {
	query = $.trim(String(query || '').toLowerCase());
	if (!query || !query.length) return [];
	
	var tokens = [];
	var words = query.split(/ +/);
	
	for (var i = 0; i < words.length; i++) {
		var regex = quoteRegExp(words[i]);
		if (this.settings.diacritics) {
			for (var letter in DIACRITICS) {
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
 * Searches through available options and returns
 * a sorted array of matches. Includes options that
 * have already been selected.
 *
 * @param {string} query
 * @param {object} settings
 */
Selectize.prototype.search = function(query, settings) {
	settings = settings || {};
	query = $.trim(String(query || '').toLowerCase());
	
	var results;
	
	if (query !== this.lastQuery) {
		this.lastQuery = query;
	
		var self    = this;
		var tokens  = this.parseSearchTokens(query);
		
		results = {
			query  : query,
			tokens : tokens,
			total  : 0,
			items  : []
		};

		var calculateFieldScore = (function() {
			if (!tokens.length) {
				return function() { return 0; }
			} else if (tokens.length === 1) {
				return function(value) {
					value = String(value || '').toLowerCase();
					var pos = value.search(tokens[0].regex);
					if (pos === -1) return 0;
					var score = tokens[0].string.length / value.length;
					if (pos === 0) score += 0.5;
					return score;
				}
			} else {
				return function(value) {
					value = String(value || '').toLowerCase();
					var score = 0;
					for (var i = 0; i < tokens.length; i++) {
						var pos = value.search(tokens[i].regex);
						if (pos === -1) return 0;
						if (pos === 0) score += 0.5;
						score += tokens[i].string.length / value.length;
					}
					return score / tokens.length;
				}
			}
		})();

		var calculateScore = (function() {
			var fields = self.settings.searchField;
			if (typeof fields === 'string') {
				fields = [fields];
			}
			if (!fields || !fields.length) {
				return function() { return 0; }
			} else if (fields.length === 1) {
				var field = fields[0];
				return function(data) {
					if (!data.hasOwnProperty(field)) return 0;
					return calculateFieldScore(data[field]);
				}
			} else {
				return function(data) {
					var n = 0;
					var score = 0;
					for (var i = 0; i < fields.length; i++) {
						if (data.hasOwnProperty(fields[i])) {
							score += calculateFieldScore(data[fields[i]]);
							n++;
						}
					}
					return score / n;
				};
			}
		})();

		if (query.length) {
			for (var value in this.options) {
				if (this.options.hasOwnProperty(value)) {
					var score = calculateScore(this.options[value]);
					if (score > 0) {
						results.items.push({
							score: score,
							value: value
						});
					}
				}
			}
			results.items.sort(function(a, b) {
				return b.score - a.score;
			});
		} else {
			for (var value in this.options) {
				if (this.options.hasOwnProperty(value)) {
					results.items.push({
						score: 1,
						value: value
					});
				}
			}
		}
		this.currentResults = results;
	} else {
		results = $.extend(true, {}, this.currentResults);
	}

	return this.prepareResults(results, settings);
};

Selectize.prototype.prepareResults = function(results, settings) {
	for (var i = results.items.length - 1; i >= 0; i--) {
		if (this.items.indexOf(String(results.items[i].value)) !== -1) {
			results.items.splice(i, 1);
		}
	}

	results.total = results.items.length;
	if (typeof settings.limit === 'number') {
		results.items = results.items.slice(0, settings.limit);
	}

	return results;
};

Selectize.prototype.refreshOptions = function(triggerDropdown) {
	if (typeof triggerDropdown === 'undefined') triggerDropdown = true;

	var query = this.$control_input.val();
	var results = this.search(query, {});
	var html = [];

	var n = results.items.length;
	if (typeof this.settings.maxOptions === 'number') {
		n = Math.min(n, this.settings.maxOptions);
	}
	for (var i = 0; i < n; i++) {
		html.push(this.render('option', this.options[results.items[i].value]));
	}

	this.$dropdown.html(html.join(''));

	if (this.settings.highlight && results.query.length && results.tokens.length) {
		for (var i = 0; i < results.tokens.length; i++) {
			highlight(this.$dropdown, results.tokens[i].regex);
		}
	}

	var hasCreateOption = this.settings.create && results.query.length;
	if (hasCreateOption) {
		this.$dropdown.prepend(this.render('option_create', {input: query}));
	}

	this.hasOptions = results.items.length > 0 || hasCreateOption;
	if (this.hasOptions) {
		this.setActiveOption(this.$dropdown[0].childNodes[0]);
		if (triggerDropdown && !this.isOpen) { this.open(); }
	} else {
		this.setActiveOption(null);
		if (triggerDropdown && this.isOpen) { this.close(); }
	}
};

Selectize.prototype.addOption = function(value, data) {
	if (this.options.hasOwnProperty(value)) return;
	value = String(value);
	this.userOptions[value] = true;
	this.options[value] = data;
	this.lastQuery = null;
};

Selectize.prototype.removeOption = function(value) {
	value = String(value);
	delete this.userOptions[value];
	delete this.options[value];
	this.lastQuery = null;
};

Selectize.prototype.addItem = function(value) {
	value = String(value);
	if (this.settings.maxItems !== null && this.items.length >= this.settings.maxItems) return;
	if (this.items.indexOf(value) !== -1) return;

	var html = this.render('item', this.options[value])
	this.$control_items.append(html);
	this.items.push(value);
	this.isFull = this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
	this.$control.toggleClass('has-items', true);
	this.$control.toggleClass('full', this.isFull);

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
		if (!options.length) {
			this.close();
		}

		this.positionDropdown();

		// hide placeholder
		if (this.settings.placeholder) {
			this.$control_input.removeAttr('placeholder');
		}

		// hide the menu if the maximum number of items have been selected
		if (this.settings.maxItems !== null && this.items.length >= this.settings.maxItems) {
			this.close();
		}

		this.updateOriginalInput();
	}
};

Selectize.prototype.removeItem = function(value) {
	value = String(value);
	var i = this.items.indexOf(value);
	if (i !== -1) {
		this.items.splice(i, 1);
		var $item = $(this.$control_items[0].childNodes[i]);
		if ($item.attr('data-value') === value) {
			$item.remove();
		}
		this.$control.toggleClass('has-items', this.items.length > 0);
		this.$control.removeClass('full');
		this.isFull = false;
		this.lastQuery = null;
		if (!this.settings.persist) {
			this.removeOption(value);
		}
		this.positionDropdown();
		this.refreshOptions(false);

		if (!this.hasOptions) { this.close(); }
		else if (this.isInputFocused) { this.open(); }

		// restore placeholder
		if (this.settings.placeholder && !this.items.length) {
			this.$control_input.attr('placeholder', this.settings.placeholder);
		}

		this.updateOriginalInput();
	}
};

Selectize.prototype.createItem = function() {
	var self = this;
	var input = $.trim(this.$control_input.val() || '');
	if (!input.length) return;

	var setup = (typeof this.settings.create === 'function') ? this.settings.create : function(input) {
		var data = {};
		data[self.settings.labelField] = input;
		data[self.settings.valueField] = input;
		return data;
	};

	var create = once(function(data) {
		var value = data && data[self.settings.valueField];
		if (!isset(value)) return;
		
		self.addOption(value, data);
		self.addItem(value);
		self.refreshOptions();
		self.$control_input.val('');	
	});

	var output = setup(input, create);
	if (typeof output === 'object') {
		create(output);
	}
};

Selectize.prototype.updateOriginalInput = function() {
	if (this.$input[0].tagName.toLowerCase() === 'select') {
		var options = [];
		for (var i = 0; i < this.items.length; i++) {
			options.push('<option value=' + htmlEntities(this.items[i]) + ' selected="selected"></option>')
		}
		if (!options.length) {
			options.push('<option value="" selected="selected"></option>');
		}
		this.$input.html(options.join(''));
	} else {
		this.$input.val(this.serialize());
	}
	this.$input.trigger('change');
};

Selectize.prototype.open = function() {
	if (this.isOpen || (this.settings.maxItems !== null && this.items.length >= this.settings.maxItems)) return;
	this.isOpen = true;
	this.positionDropdown();
	this.$control.addClass('dropdown-active');
	this.$dropdown.show();
};

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

Selectize.prototype.close = function() {
	this.$dropdown.hide();
	this.$control.removeClass('dropdown-active');
	this.isOpen = false;
};

Selectize.prototype.render = function(templateName, data) {
	cache = isset(cache) ? cache : true;

	var value;
	var html = ''
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
		var label = data[this.settings.labelField];
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
		html = html.replace(/^[\t ]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i, '<$1 data-value="' + value + '"');
	}
	if (cache) {
		this.renderCache[templateName][value] = html;
	}
	return html;
};

Selectize.prototype.serialize = function() {
	if (this.tagType === TAG_SELECT && this.$input.attr('multiple')) {
		return this.items;
	} else {
		return this.items.join(this.settings.delimiter);
	}
};