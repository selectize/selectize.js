$.fn.selectize = function (settings_user) {
  var defaults = $.fn.selectize.defaults;
  var settings = $.extend({}, defaults, settings_user);
  var attr_data = settings.dataAttr;
  var field_label = settings.labelField;
  var field_value = settings.valueField;
  var field_disabled = settings.disabledField;
  var field_optgroup = settings.optgroupField;
  var field_optgroup_label = settings.optgroupLabelField;
  var field_optgroup_value = settings.optgroupValueField;

  /**
   * Initializes selectize from a <input type="text"> element.
   *
   * @param {JQuery} $input
   * @param {Object} settings_element
   */
  var init_textbox = function ($input, settings_element) {
    var i, n, values, option;

    var data_raw = $input.attr(attr_data);

    if (!data_raw) {
      var value = ($input.val() || '').trim();
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
  var init_select = function ($input, settings_element) {
    var i, n, tagName, $children, order = 0;
    var options = settings_element.options;
    var optionsMap = {};

    var readData = function ($el) {
      var data = attr_data && $el.attr(attr_data);
      var allData = $el.data();
      var obj = {};

      if (typeof data === 'string' && data.length) {
        if (isJSON(data)) {
          Object.assign(obj, JSON.parse(data))
        } else {
          obj[data] = data;
        }
      }


      Object.assign(obj, allData);

      return obj || null;
    };

    var addOption = function ($option, group) {
      $option = $($option);

      var value = hash_key($option.val());
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
          } else if (!Array.isArray(arr)) {
            optionsMap[value][field_optgroup] = [arr, group];
          } else {
            arr.push(group);
          }
        }
        return;
      }

      var option = readData($option) || {};
      option[field_label] = option[field_label] || $option.text();
      option[field_value] = option[field_value] || value;
      option[field_disabled] = option[field_disabled] || $option.prop('disabled');
      option[field_optgroup] = option[field_optgroup] || group;
      option.styles = $option.attr('style') || '';
      option.classes = $option.attr('class') || '';

      optionsMap[value] = option;
      options.push(option);

      if ($option.is(':selected')) {
        settings_element.items.push(value);
      }
    };

    var addGroup = function ($optgroup) {
      var i, n, id, optgroup, $options;

      $optgroup = $($optgroup);
      id = $optgroup.attr('label');

      if (id) {
        optgroup = readData($optgroup) || {};
        optgroup[field_optgroup_label] = id;
        optgroup[field_optgroup_value] = id;
        optgroup[field_disabled] = $optgroup.prop('disabled');
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

  return this.each(function () {
    if (this.selectize) return;

    var instance;
    var $input = $(this);
    var tag_name = this.tagName.toLowerCase();
    var placeholder = $input.attr('placeholder') || $input.attr('data-placeholder');
    if (!placeholder && !settings.allowEmptyOption) {
      placeholder = $input.children('option[value=""]').text();
    }
    if (settings.allowEmptyOption && settings.showEmptyOptionInDropdown && !$input.children('option[value=""]').length) {
      var input_html = $input.html();
      var label = escape_html(settings.emptyOptionLabel || '--');
      $input.html('<option value="">' + label + '</option>' + input_html);
    }

    var settings_element = {
      'placeholder': placeholder,
      'options': [],
      'optgroups': [],
      'items': []
    };

    if (tag_name === 'select') {
      init_select($input, settings_element);
    } else {
      init_textbox($input, settings_element);
    }

    instance = new Selectize($input, $.extend(true, {}, defaults, settings_element, settings_user));
    instance.settings_user = settings_user;
  });
};

$.fn.selectize.defaults = Selectize.defaults;
$.fn.selectize.support = {
  validity: SUPPORTS_VALIDITY_API
};
