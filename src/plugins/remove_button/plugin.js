/**
 * Plugin: "remove_button" (selectize.js)
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
 */

(function() {
	Selectize.registerPlugin('remove_button', function(options) {
		var self = this;

		// override the item rendering method to add a "x" to each
		this.settings.render.item = function(data) {
			var label = data[self.settings.labelField];
			return '<div class="item">' + label + ' <a href="javascript:void(0)" class="remove" tabindex="-1" title="Remove">&times;</a></div>';
		};

		// override the setup method to add an extra "click" handler
		// that listens for mousedown events on the "x"
		this.setup = (function() {
			var original = self.setup;
			return function() {
				original.apply(this, arguments);
				this.$control.on('click', '.remove', function(e) {
					e.preventDefault();
					var $item = $(e.target).parent();
					self.setActiveItem($item);
					if (self.deleteSelection()) {
						self.setCaret(self.items.length);
					}
				});
			};
		})();

	});
})();