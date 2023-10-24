Selectize.define('dropdown_buttons', function () {
	var none_option, dropdown_buttons, self = this;

	function selectNoneOptions() {
		$.each(self.items.slice(), function (i, item) {
			self.removeItem(item);
		});
		self.refreshOptions(true);

		none_option = '<option value="" selected="selected"></option>'
		self.$input[0].replaceChildren(...$(none_option));
	}

	function selectAllOptions() {
		$.each(self.options, function (i, option) {
			if (self.items.indexOf(option.value) === -1) self.addItem(option.value);
		});
	}

  dropdown_buttons =
		'<div class="d-flex justify-content-center border-bottom">' +
			'<div class="control-buttons btn-group w-100 my-2 mx-3">' +
				'<button type="button" class="btn btn-outline-primary" id="select-all">All</button>' +
				'<button type="button" class="btn btn-outline-primary" id="select-none">None</button>' +
			'</div>' +
		'</div>'

	self.setup = (function() {
		var original = self.setup;
		return function() {
			original.apply(self, arguments);
			self.$dropdown_buttons = $(dropdown_buttons);
			self.$dropdown.prepend(self.$dropdown_buttons);

			self.$dropdown_buttons.find('#select-all').on('click', selectAllOptions);
			self.$dropdown_buttons.find('#select-none').on('click', selectNoneOptions);
		};
	})();
});
