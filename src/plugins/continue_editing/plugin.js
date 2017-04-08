/**
 * Plugin: "continue_editing" (selectize.js)
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
 * @author Bradley Priest <bradley@tradegecko.com>
 * @author Brian Reavis <brian@thirdroute.com>
 */

 Selectize.define('continue_editing', function(options) {
	var self = this;

	options.text = options.text || function(option) {
		return option[this.settings.labelField];
	};

	this.onKeyDown = (function(e) {
		var original = self.onKeyDown;
		return function(e) {
			var index, option, currentValue;
			if (this.$control_input.val() === '' && !this.$activeItems.length) {
				if(!(e.keyCode === KEY_TAB || e.keyCode === KEY_ESC || e.keyCode === KEY_SHIFT || e.keyCode === KEY_CTRL || e.keyCode === KEY_CMD)) {
					index = this.caretPos - 1;
					if (index >= 0 && index < this.items.length) {
						option = this.options[this.items[index]];
						if (this.deleteSelection({keyCode: KEY_BACKSPACE})) {
							currentValue = options.text.apply(this, [option]);
							if(!(e.keyCode === KEY_BACKSPACE)) {
								this.removeItem(currentValue);
							}
							this.setTextboxValue(currentValue);
						}
					}
				}
			}
			return original.apply(this, arguments);
		};
	})();
});