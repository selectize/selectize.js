var load_element_settings = function(input, settings){
	var attr_data            = settings.dataAttr;
	var field_label          = settings.labelField;
	var field_value          = settings.valueField;
	var field_optgroup       = settings.optgroupField;
	var field_optgroup_label = settings.optgroupLabelField;
	var field_optgroup_value = settings.optgroupValueField;
	var $input = $(input);

	var placeholder = $input.attr('placeholder') || $input.attr('data-placeholder');
	if (!placeholder && !settings.allowEmptyOption) {
		placeholder = $input.children('option[value=""]').text();
	}

	var settings_element = {
		placeholder: placeholder,
		options: [],
		optgroups: [],
		items: []
	}
	var optionsMap = {};

	/**
	 * Initializes selectize from a <input type="text"> element.
	 *
	 * @param {object} $input
	 * @param {object} settings_element
	 */
	var init_textbox = function($input) {
		var i, n, values, option;

		var data_raw = $input.attr(attr_data);

		if (!data_raw) {
			var value = $.trim($input.val() || '');
			if (!settings.allowEmptyOption && !value.length) return;
			values = value.split(settings.delimiter);
			for (i = 0, n = values.length; i < n; i++) {
				option = {};
				option[field_label] = values[i];
				option[field_value] = values[i];
				settings_element.options.push(option);
			}
			settings_element.items = values;
		} else {
			settings_element.options = JSON.parse(data_raw);
			for (i = 0, n = settings_element.options.length; i < n; i++) {
				settings_element.items.push(settings_element.options[i][field_value]);
			}
		}
	};
	/**
	 * Initializes selectize from a <select> element.
	 *
	 * @param {object} $input
	 * @param {object} settings_element
	 */
	var init_select = function($input) {
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
			$option = $($option);

			var value = hash_key($option.attr('value'));
			if (!value && !settings.allowEmptyOption) return;

			// if the option already exists, it's probably been
			// duplicated in another optgroup. in this case, push
			// the current group to the "optgroup" property on the
			// existing option so that it's rendered in both places.
			if (optionsMap.hasOwnProperty(value)) {
				if (group) {
					var arr = optionsMap[value][field_optgroup];
					if (!arr) {
						optionsMap[value][field_optgroup] = group;
					} else if (!$.isArray(arr)) {
						optionsMap[value][field_optgroup] = [arr, group];
					} else {
						arr.push(group);
					}
				}
				return;
			}

			var option             = readData($option) || {};
			option[field_label]    = option[field_label] || $option.text();
			option[field_value]    = option[field_value] || value;
			option[field_optgroup] = option[field_optgroup] || group;

			optionsMap[value] = option;
			options.push(option);

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
				settings_element.optgroups.push(optgroup);
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

	if (input.tagName.toLowerCase() === 'select') {
		init_select($input, settings_element);
	} else {
		init_textbox($input, settings_element);
	}
	return settings_element;
}

$.fn.selectize = function(settings_user) {
	return this.each(function() {
		if (this.selectize) return;

		var settings_element = load_element_settings(this, $.extend({}, Selectize.defaults, settings_user))
		new Selectize($(this), $.extend(true, {}, Selectize.defaults, settings_element, settings_user));
	});
};

$.fn.selectize.defaults = Selectize.defaults;
$.fn.selectize.support = {
	validity: SUPPORTS_VALIDITY_API
};
