/**
 * selectize - A highly customizable select control with autocomplete.
 * Copyright (c) 2013 Brian Reavis
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

var defaults = {
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
	sortField: null,
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

$.fn.selectize.defaults = defaults;