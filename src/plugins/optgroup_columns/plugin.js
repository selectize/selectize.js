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

Selectize.define('optgroup_columns', function(options) {
	var self = this;

	options = $.extend({
		equalizeWidth  : true,
		equalizeHeight : true
	}, options);

	this.getAdjacentOption = function($option, direction) {
		var $options = $option.closest('[data-group]').find('[data-selectable]');
		var index    = $options.index($option) + direction;

		return index >= 0 && index < $options.length ? $options.eq(index) : $();
	};

	this.onKeyDown = (function() {
		var original = self.onKeyDown;
		return function(e) {
			var index, $option, $options, $optgroup;

			if (this.isOpen && (e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT)) {
				self.ignoreHover = true;
				$optgroup = this.$activeOption.closest('[data-group]');
				index = $optgroup.find('[data-selectable]').index(this.$activeOption);

				if(e.keyCode === KEY_LEFT) {
					$optgroup = $optgroup.prev('[data-group]');
				} else {
					$optgroup = $optgroup.next('[data-group]');
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

	var getScrollbarWidth = function() {
		var div;
		var width = getScrollbarWidth.width;
		var doc = document;

		if (typeof width === 'undefined') {
			div = doc.createElement('div');
			div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
			div = div.firstChild;
			doc.body.appendChild(div);
			width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
			doc.body.removeChild(div);
		}
		return width;
	};

	var equalizeSizes = function() {
		var i, n, height_max, width, width_last, width_parent, $optgroups;

		$optgroups = $('[data-group]', self.$dropdown_content);
		n = $optgroups.length;
		if (!n || !self.$dropdown_content.width()) return;

		if (options.equalizeHeight) {
			height_max = 0;
			for (i = 0; i < n; i++) {
				height_max = Math.max(height_max, $optgroups.eq(i).height());
			}
			$optgroups.css({height: height_max});
		}

		if (options.equalizeWidth) {
			width_parent = self.$dropdown_content.innerWidth() - getScrollbarWidth();
			width = Math.round(width_parent / n);
			$optgroups.css({width: width});
			if (n > 1) {
				width_last = width_parent - width * (n - 1);
				$optgroups.eq(n - 1).css({width: width_last});
			}
		}
	};

	if (options.equalizeHeight || options.equalizeWidth) {
		hook.after(this, 'positionDropdown', equalizeSizes);
		hook.after(this, 'refreshOptions', equalizeSizes);
	}


});