/**
 * Plugin: "remove_option_button" (selectize.js)
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
 * @author Victor Qi <mai_seven@sina.com>
 */

//plugin for remove option. it will be useful if user input something but still want change it.
//so delete it first.
Selectize.define('remove_option_button', function(options) {
		if (this.settings.mode === 'single') return;
	
		options = $.extend({
			label     : '&times;',
			title     : 'Remove',
			className : 'remove',
			append    : true,
		}, options);
	
		var self = this;
		var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + '</a>';
	
		/**
		 * Appends an element as a child (with raw HTML).
		 *
		 * @param {string} html_container
		 * @param {string} html_element
		 * @return {string}
		 */
		var append = function(html_container, html_element) {
			var pos = html_container.search(/(<\/[^>]+>\s*)$/);
			return html_container.substring(0, pos) + html_element + html_container.substring(pos);
		};
	
		this.setup = (function() {
			var original = self.setup;
			return function() {
				// override the item rendering method to add the button to each
				if (options.append) {
					var render_option = self.settings.render.option;
					self.settings.render.option = function(data) {
						return append(render_option.apply(this, arguments), html);
					};
				}
	
				original.apply(this, arguments);
		
				// add event listener
				this.$dropdown_content.on('mousedown', '.' + options.className, function(e) {

					e.preventDefault();
					//FIXME not use this find the div.
					var $item = $(e.target).parentsUntil("[data-selectable]").parent();
					if ($item.size() === 0)
						$item = $(e.target).parent();
						
					self.removeOption($item.data("value"));
					self.refreshOptions(true);
					return false;
					
				});
	
			};
		})();
	
});
