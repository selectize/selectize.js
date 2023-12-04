// This plugin allows you to deselect selected options via the dropdown menu.
// You can use mouse click or enter key to deselect selected options.
// For the correct work we automatically disabled the `hideSelected` option.
// This plugin does not have any options.

// An example of usage:
// 	$('selector').selectize({
// 		plugins: ['deselect_options_via_dropdown']
// 	});

Selectize.define('deselect_options_via_dropdown', function () {
	var option, self = this;

	this.setup = (function () {
		var original = self.setup;
		return function () {
			this.settings.hideSelected = false;
			original.apply(this, arguments);

			// Remove the double event to keep only the click event.
			self.$dropdown.off('mouseup', '[data-selectable]');
		};
	})();

	this.onOptionSelect = (function () {
		var original = self.onOptionSelect;
		return function () {
			// The function could be called with the different types of arguments.
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
