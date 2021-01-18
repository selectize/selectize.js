Selectize.define('selecttext_on_focus', function(options) {
	var self = this;
	
	var currValue;
	self.on('focus', function() {
		var originalFocus = self.onFocus;
		return function(e) {
			currValue = self.getValue();
			var value = self.getItem(self.getValue()).text();
			self.clear();
			self.setTextboxValue(value);
			self.$control_input.select();
			setTimeout( function () {
				self.setActiveOption(self.getFirstItemMatchedByTextContent(value));
				self.settings.score = null;
			},0);

			return originalFocus.apply(this, arguments);
		};
	}());

	self.onChange = (function() {
		var originalChange = self.onChange;
		return function(e) {
			if (self.getValue() != "") {
				currValue = self.getValue();
			}
			return originalChange.apply(this, arguments);
		};
	}());
	
	self.onBlur = (function() {
		var originalBlur = self.onBlur;
		return function(e) {
			var returnValue = originalBlur.apply(this, arguments);
			if (self.getValue() == "" || currValue != self.getValue()) {
				self.setValue(currValue);
			}
			setTimeout( function () { 
				self.settings.score = function() { 
					return function() { 
						return 1; 
					};
				}; 
			},0);
			
			return returnValue;
		}
	}());

	self.settings.score = function() {
		return function() { return 1; };
	};
});
