Selectize.define('select_on_focus', function(options) {
	var self = this;

	self.on('focus', function() {
		var originalFocus = self.onFocus;
		return function(e) {
			var value = self.getItem(self.getValue()).text();
			self.clear();
			self.setTextboxValue(value);
			self.$control_input.select();
			setTimeout( function () {
				if (self.settings.selectOnTab) {
					self.setActiveOption(self.getFirstItemMatchedByTextContent(value));
				}
				self.settings.score = null;
			},0);
			return originalFocus.apply(this, arguments);
		};
	}());

	self.onBlur = (function() {
		var originalBlur = self.onBlur;
		return function(e) {
			if (self.getValue() === "" && self.lastValidValue !== self.getValue()) {
				self.setValue(self.lastValidValue);
			}
			setTimeout( function () {
				self.settings.score = function() {
					return function() {
						return 1;
					};
				};
			}, 0 );
			return originalBlur.apply(this, arguments);
		}
	}());
	self.settings.score = function() {
		return function() { return 1; };
	};

});
