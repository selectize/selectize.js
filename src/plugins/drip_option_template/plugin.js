/**
 * Plugin: "drip_option_template" (selectize.js)
 *
 * Handles Drip's previous <select> markup where
 * <option>s that had a secondary line in their
 * UI would be rendered with `data-description`
 * attributes.
 *
 * This plugin checks for `data-description` on
 * <option>s and replaces the default 'option'
 * template with one that shows the description text
 *
 */

Selectize.define('drip_option_template', function(options) {
  var self = this;
  var original = self.setupTemplates;

  // if source <select>'s <option>s have `data-description`
  // attrs, extract and append to Selectize's `options`
  var selectOptions = self.$input[0].options;

  for (var i = 0; i < selectOptions.length; i++) {
    if (selectOptions[i].dataset.hasOwnProperty('description')) {
      this.options[selectOptions[i].value]['description'] = selectOptions[i].dataset.description;
    }
    // for combo-selects
    // if original <option> has `data-combotrigger` attribute,
    // this adds it to the option data, which will pass it
    // to the rendered option
		if (selectOptions[i].dataset.hasOwnProperty('combotrigger')) {
      this.options[selectOptions[i].value]['combotrigger'] = selectOptions[i].dataset.combotrigger;
    }

    // passes along data-type atrributes
    if (selectOptions[i].dataset.hasOwnProperty('type')) {
      this.options[selectOptions[i].value]['type'] = selectOptions[i].dataset.type;
    }
  }

  // add custom template to available option templates
  this.setupTemplates = (function() {
    var templates = {
      'option': function(data, escape) {
        return ('<div class="option">' +
          escape(data[self.settings.labelField]) +
          (data.description ? '<div class="desc">' + data.description + '</div>' : '') +
          '</div>');
      }
    };

    self.settings.render = $.extend({}, templates, self.settings.render);
    original.apply(self, arguments);
  });

});

