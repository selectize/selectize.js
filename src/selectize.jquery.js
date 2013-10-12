$.fn.selectize = function(settings_user) {
	var defaults             = $.fn.selectize.defaults;
	var settings             = $.extend({}, defaults, settings_user);
	var attr_data            = settings.dataAttr;
	var field_label          = settings.labelField;
	var field_value          = settings.valueField;
	var field_optgroup       = settings.optgroupField;
	var field_optgroup_label = settings.optgroupLabelField;
	var field_optgroup_value = settings.optgroupValueField;

	/**
	 * Initializes selectize from a <input type="text"> element.
	 *
	 * @param {object} $input
	 * @param {object} settings_element
	 */
	var init_textbox = function($input, settings_element) {
		var i, n, values, option, value = $.trim($input.val() || '');
		if (!value.length) return;

		values = value.split(settings.delimiter);
		for (i = 0, n = values.length; i < n; i++) {
			option = {};
			option[field_label] = values[i];
			option[field_value] = values[i];

			settings_element.options[values[i]] = option;
		}

		settings_element.items = values;
	};

	/**
	 * Initializes selectize from a <select> element.
	 *
	 * @param {object} $input
	 * @param {object} settings_element
	 */
	var init_select = function($input, settings_element) {
		var i, n, tagName, $children, order = 0;
		var options = settings_element.options;

		var readData = function($el) {
			var data = attr_data && $el.attr(attr_data);
			if (typeof data === 'string' && data.length) {
				return JSON.parse(data);
			}
			return null;
		};

		var addOption = function($option, group) {
			var value, option;

			$option = $($option);

			value = $option.attr('value') || '';
			if (!value.length) return;

			// if the option already exists, it's probably been
			// duplicated in another optgroup. in this case, push
			// the current group to the "optgroup" property on the
			// existing option so that it's rendered in both places.
			if (options.hasOwnProperty(value)) {
				if (group) {
					if (!options[value].optgroup) {
						options[value].optgroup = group;
					} else if (!$.isArray(options[value].optgroup)) {
						options[value].optgroup = [options[value].optgroup, group];
					} else {
						options[value].optgroup.push(group);
					}
				}
				return;
			}

			option                 = readData($option) || {};
			option[field_label]    = option[field_label] || $option.text();
			option[field_value]    = option[field_value] || value;
			option[field_optgroup] = option[field_optgroup] || group;

			option.$order = ++order;
			options[value] = option;

			if ($option.is(':selected')) {
				settings_element.items.push(value);
			}
		};

		var addGroup = function($optgroup) {
			var i, n, id, optgroup, $options;

			$optgroup = $($optgroup);
			id = $optgroup.attr('label');

			if (id) {
				optgroup = readData($optgroup) || {};
				optgroup[field_optgroup_label] = id;
				optgroup[field_optgroup_value] = id;
				settings_element.optgroups[id] = optgroup;
			}

			$options = $('option', $optgroup);
			for (i = 0, n = $options.length; i < n; i++) {
				addOption($options[i], id);
			}
		};

		settings_element.maxItems = $input.attr('multiple') ? null : 1;

		$children = $input.children();
		for (i = 0, n = $children.length; i < n; i++) {
			tagName = $children[i].tagName.toLowerCase();
			if (tagName === 'optgroup') {
				addGroup($children[i]);
			} else if (tagName === 'option') {
				addOption($children[i]);
			}
		}
	};

	return this.each(function() {
		if (this.selectize) return;

		var instance;
		var $input = $(this);
		var tag_name = this.tagName.toLowerCase();
		var settings_element = {
			'placeholder' : $input.children('option[value=""]').text() || $input.attr('placeholder'),
			'options'     : {},
			'optgroups'   : {},
			'items'       : []
		};

		if (tag_name === 'select') {
			init_select($input, settings_element);
		} else {
			init_textbox($input, settings_element);
		}

		instance = new Selectize($input, $.extend(true, {}, defaults, settings_element, settings_user));
		$input.data('selectize', instance);
		$input.addClass('selectized');
	});
};

$.fn.selectize.defaults = Selectize.defaults;