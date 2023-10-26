Selectize.define('deselect_options_via_dropdown', function () {
	var option, self = this;

	function onOptionDeselect(e) {
		option = e.currentTarget;
		option.classList.remove('selected');
		self.removeItem(option.dataset.value)
	}

	this.setup = (function () {
		var original = self.setup;
		return function () {
			this.settings.hideSelected = false;
			original.apply(this, arguments);

			self.$dropdown.off('mouseup click', '[data-selectable]');

			self.$dropdown.on('click', '[data-selectable]', function (e) {
				if (e.currentTarget.classList.contains('selected')) {
					onOptionDeselect(e);
				} else {
					self.onOptionSelect(e);
				}
			});
		};
	})();
});
