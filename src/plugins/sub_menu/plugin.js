/**
 * Plugin: "sub_menu" (selectize.js)
 * Copyright (c) 2013 Marius Edelsbrunner & contributors
 *
 * @author Marius Edelsbrunner <marius@solcomputadores.com.br>
*/

Selectize.define('sub_menu', function(options) {
	if (this.settings.mode === 'single') return;

	options = $.extend({
		className : 'dropdown-hover',
		append    : true
	}, options);

	var self = this;
	/**
	 * Overwrite render method to change optgroup structure, adding items inside of <nav>
	 *
	 * @param {string} templateName
	 * @param {object} data
	 * @return {string}
	*/

  this.render = (function(templateName, data) {
    var value, id, label;
    var html = '';
    var cache = false;
    var self = this;
    var regex_tag = /^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
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

    if (templateName == "optgroup"){
      data.html = data.html.replace('</li></ul></li></ul></nav></div>', '');
      data.html = data.html + "</li></ul></li></ul></nav></div>";
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
  });


  /**
   * Add categories with sub-menu element to the header
   *
  */
	this.setup = (function() {
		var original = self.setup;
		return function() {
			// override the optgroup rendering method to add the button to each
			if (options.append) {
				var render_item = self.settings.render.optgroup_header;
				self.settings.render.optgroup_header = function(data) {
					return '<div class="optgroup-header"><nav><ul><li class="' + options.className + '"><a href="#">' + escape(data.label) + '</a><ul class="sub-menu"><li class="dropdown" style="width:200px;"></li></ul></li></ul></nav></div>'
				};
			}

			original.apply(this, arguments);

    /**
     * Mouse hover events to show/hide submenus
     *
    */
      self.$dropdown.on('hover', '.' + 'optgroup-header', function(e) {
        $(this).children('nav').children('ul').children('.dropdown-hover').children('.sub-menu').show();
      })
      self.$dropdown.on('mouseleave', '.' + 'optgroup-header', function(e) {
        $(this).children('nav').children('ul').children('.dropdown-hover').children('.sub-menu').hide();
      })
  }})()

});
