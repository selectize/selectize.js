// This plugin keeps disabled items in the input field when you press the backspace key.
// This plugin does not have any options.

// An example of usage:
// 	$('selector').selectize({
// 		plugins: ['keep_disabled_items']
// 	});

Selectize.define('keep_disabled_items', function (options) {
  var self = this;

  self.onKeyDown = (function() {
		var original = self.onKeyDown;
		return function(e) {
			var index, option;
			if (e.keyCode === KEY_BACKSPACE) {
				index = self.caretPos - 1;
				option = this.options[this.items[index]];
				if (index >= 0 && option.disabled) {
					e.preventDefault();
					return;
				}
			}
			return original.apply(this, arguments);
		};
	})();
})
