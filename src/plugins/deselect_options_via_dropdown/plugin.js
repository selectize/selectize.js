Selectize.define('deselect_options_via_dropdown', function () {
	var option, self = this;

	this.setup = (function () {
		var original = self.setup;
		return function () {
			this.settings.hideSelected = false;
			original.apply(this, arguments);

			// remove double event to keep only click event.
			self.$dropdown.off('mouseup', '[data-selectable]');
		};
	})();

	this.onOptionSelect = (function () {
		var original = self.onOptionSelect;
		return function () {
			option = arguments[0].currentTarget[0] || arguments[0].currentTarget;
			if (option.classList.contains('selected')) {
				option.classList.remove('selected');
				self.removeItem(option.dataset.value)
			} else {
				original.apply(this, arguments);
			}
		}
	})();
});
