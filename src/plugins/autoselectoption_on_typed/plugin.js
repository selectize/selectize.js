Selectize.define('autoselectoption_on_typed', function(options) {
	var self = this;
	
	self.onBlur = (function() {
		var originalBlur = self.onBlur;
		return function(e) {
			var $matchedItem = self.getFirstItemMatchedByTextContent(self.lastValue, true);
			if (typeof $matchedItem.attr('data-value') !== 'undefined' && self.getValue() !== $matchedItem.attr('data-value'))
			{
				self.setValue($matchedItem.attr('data-value'));
			}
			return originalBlur.apply(this, arguments);
		}
	}());
});
