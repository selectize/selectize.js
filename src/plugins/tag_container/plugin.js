/**
 * Plugin: "tag_container" (selectize.js)
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
 * @author Simon Hewitt <si@sjhewitt.co.uk>
 */

Selectize.define('tag_container', function(options) {
	var self = this;

	options = $.extend({
		position: 'before',
		className: 'selectize-tag-container',
		removeClassName : 'remove',
	}, options);

	this.setup = (function(){
		var original = self.setup;
		return function(){
			this.$item_container = $("<div>").addClass(options.className);
			original.apply(this, arguments);

			// add the item_container to the dom.
			this.$item_container['insert' + options.position.substring(0, 1).toUpperCase() + options.position.substring(1)](this.$wrapper);

			// add event listener for remove_button plugin
			this.$item_container.on('click', '.' + options.removeClassName, function(e) {
				e.preventDefault();
				if (self.isLocked) return;

				var $item = $(e.currentTarget).parent();
				if ((typeof self.settings.onDelete === 'function' && self.settings.onDelete.apply(self, [[$item.attr('data-value')]]) === false)) {
					return;
				}
				self.removeItem($item);
			});
		};
	})();

	this.destroy = (function(){
		var original = self.destroy;
		return function(){
			original.apply(this, arguments);
			this.$item_container.remove();
		};
	});

	// getItem retrieves items from the $item_container
	this.getItem = (function(){
		var original = self.getItem;
		return function(value){
			return this.getElementWithValue(value, this.$item_container.children());
		};
	})();

	// insertAtCaret now just appends to the item_container
	this.insertAtCaret = (function(){
		var original = self.insertAtCaret;
		return function($el) {
			this.$item_container.append($el);
		};
	})();

	// caret/selection functionality is disabled
	this.advanceSelection = $.noop;
	this.deleteSelection = $.noop;
	this.advanceCaret = $.noop;
	this.setCaret = $.noop;
});