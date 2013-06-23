/**
 * Plugin: "optgroup_columns" (selectize.js)
 * Copyright (c) 2013 Simon Hewitt & contributors
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
 * @author Simon Hewitt <si@sjhewitt.co.uk>
 */

(function() {
	Selectize.registerPlugin('optgroup_columns', function(options) {
		var self = this;

		options = $.extend({
			equalizeWidth  : true,
			equalizeHeight : true
		}, options);

		this.getAdjacentOption = function($option, direction) {
			var $options = $option.closest('.optgroup').find('[data-selectable]');
			var index    = $options.index($option) + direction;

			return index >= 0 && index < $options.length ? $options.eq(index) : $();
		};

		if (options.equalizeHeight || options.equalizeWidth) {
			this.refreshOptions = (function() {
				var original = self.refreshOptions;
				return function() {
					var i, n, h = 0, css = {}, $optgroups;
					original.apply(self, arguments);

					$optgroups = $('.optgroup', self.$dropdown);
					if (!$optgroups.length) return;

					if (options.equalizeHeight) {
						for (i = 0, n = $optgroups.length; i < n; i++) {
							h = Math.max(h, $optgroups.eq(i).height());
						}
						css.height = h;
					}

					if (options.equalizeWidth) {
						css.width = (100 / $optgroups.length) + '%';
					}

					$optgroups.css(css);
				};
			})();
		}

		this.onKeyDown = (function() {
			var original = self.onKeyDown;
			return function(e) {
				var index, $option, $options, $optgroup;

				if (this.isOpen && (e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT)) {
					$optgroup = this.$activeOption.closest('.optgroup');
					index = $optgroup.find('[data-selectable]').index(this.$activeOption);

					if(e.keyCode === KEY_LEFT) {
						$optgroup = $optgroup.prev('.optgroup');
					} else {
						$optgroup = $optgroup.next('.optgroup');
					}

					$options = $optgroup.find('[data-selectable]');
					$option  = $options.eq(Math.min($options.length - 1, index));
					if ($option.length) {
						this.setActiveOption($option);
					}
					return;
				}

				return original.apply(this, arguments);
			};
		})();

	});
})();
