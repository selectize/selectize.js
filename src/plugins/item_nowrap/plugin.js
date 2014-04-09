/**
 * Plugin: "inputs_nowrap" (selectize.js)
 * Copyright (c) 2014 Buildium, LLC
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
 * @author Ben Jacobs <ben.jacobs@buildium.com>
 */

/*global Selectize: true, measureString: true */

Selectize.define('item_nowrap', function () {
	var originalSetupTemplates = this.setupTemplates;
	var paddingX;

	this.setupTemplates = function () {
		// Call the original function, which sets the defaults.
		originalSetupTemplates.apply(this, arguments);

		// Modify the rendering function for items to add an inner and outer
		// wrapper element.
		this.settings.render.item = function (data, escape) {
			var field_label = this.settings.labelField;

			return '<div class="item-wrap-outer"><div class="item-wrap-inner">' + escape(data[field_label]) + '</div></div>';
		};
	};

	// When not active, the input is hidden off screen. This method adds
	// some absolute positioning so that, in the event of a very long
	// string of text, the rightmost portion of text is visible.
	this.showInput = function () {
		var $outer = this.$control.find('.item-wrap-outer'),
			$inner = $outer.find('.item-wrap-inner'),
			text = $inner.text(),
			textWidth = measureString(text, $inner),
			controlWidth = this.$control.width();

		paddingX = paddingX || (function (control) {
			var paddingLeft = control.css('padding-left');
			return parseInt(paddingLeft.match(/(\d+).*/)[1], 10);
		}(this.$control));

		if (textWidth > controlWidth) {
			$inner.addClass('long-input-value');
			this.$control_input.css({ opacity: 1, position: 'absolute', left: $outer.width() + paddingX });
		} else {
			$inner.removeClass('long-input-value');
			this.$control_input.css({ opacity: 1, position: 'absolute', left: textWidth + paddingX });
		}

		this.isInputHidden = false;
	};
});
