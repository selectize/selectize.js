/**
 * Plugin: "dropdown_header" (selectize.js)
 * Copyright (c) 2013 Brian Reavis & contributors
 * Copyright (c) 2020-2023 Selectize Team & contributors
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

/**
 * @author [Brian Reavis](https://github.com/brianreavis)
 * @typedef {Object} options Available options for dropdown_header plugin
 * @param {string} [title=Untitled] Title of dropdown_header
 * @param {string} [headerClass=selectize-dropdown-header] Class of dropdown_header
 * @param {string} [titleRowClass=selectize-dropdown-header-title] Class for title row
 * @param {string} [labelClass=selectize-dropdown-header-label] Class for label
 * @param {string} [closeClass=selectize-dropdown-header-close] Class for dropdown_header close button
 * @param {function} [html] Method for custom rendering of dropdown_header
 *
 * @example
 * ```js
 * $('select').selectize({
 *  plugins: [
 *    {
 *      dropdown_header: {
 *        title: 'Custom title',
 *        headerClass: 'custom-header-class',
 *        labelClass: 'custom-label-class',
 *        closeClass: 'custom-close-class',
 *        html: (data) => {
 *          // data contain all options values
 *          return (
 *            `<a class="${data.labelClass}" title="${data.title}">${data.title}</a>`;
 *        }
 *     }
 *   }
 *  ]
 * });
 * ```
 */
Selectize.define('dropdown_header', function(options) {
	var self = this;

	options = $.extend({
		title         : 'Untitled',
		headerClass   : 'selectize-dropdown-header',
		titleRowClass : 'selectize-dropdown-header-title',
		labelClass    : 'selectize-dropdown-header-label',
		closeClass    : 'selectize-dropdown-header-close',

		html: function(data) {
			return (
				'<div class="' + data.headerClass + '">' +
					'<div class="' + data.titleRowClass + '">' +
						'<span class="' + data.labelClass + '">' + data.title + '</span>' +
						'<a href="javascript:void(0)" class="' + data.closeClass + '">&#xd7;</a>' +
					'</div>' +
				'</div>'
			);
		}
	}, options);

	self.setup = (function() {
		var original = self.setup;
		return function() {
			original.apply(self, arguments);
			self.$dropdown_header = $(options.html(options));
      self.$dropdown.prepend(self.$dropdown_header);
      self.$dropdown_header.find('.' + options.closeClass).on('click', function () {
        self.close();
      });
		};
	})();

});
