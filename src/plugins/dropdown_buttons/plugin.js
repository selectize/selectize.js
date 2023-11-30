Selectize.define('dropdown_buttons', function (options) {
	var noneOption, dropdownButtons, allButton, noneButton, value, self = this;

	function selectNoneOptions() {
		$.each(self.items.slice(), function (i, item) {
			self.removeItem(item);
		});
		self.refreshOptions(true);

		noneOption = '<option value="" selected="selected"></option>'
		self.$input[0].replaceChildren(...$(noneOption));
	}

	function selectAllOptions() {
		$.each(self.options, function (i, option) {
			if (option.disabled) return;

			value = option.value.toString();
			if (!self.items.includes(value)) self.addItem(value);
		});

		self.lastQuery = null;
		self.setTextboxValue('');
	}

	options = $.extend({
		allButton  : true,
		noneButton : true
	}, options);

	if (options.allButton) {
		allButton =
			`<button type="button" class="${options.buttonsClass}" id="select-all">All</button>`
	}

	if (options.noneButton) {
		noneButton =
			`<button type="button" class="${options.buttonsClass}" id="select-none">None</button>`
	}

	if (!allButton && !noneButton) return;

  dropdownButtons =
		'<div class="d-flex justify-content-center">' +
			`<div class="control-buttons btn-group ${options.buttonGroupSize} w-100 my-2 mx-3">` +
				 (allButton || '') +
				 (noneButton || '') +
			'</div>' +
		'</div>'

	self.refreshOptions = (function () {
		var original = self.refreshOptions;
		return function () {
			original.apply(this, arguments);

			if (self.isLocked) return;

			self.isOpen = true;
			self.refreshState();
			self.$dropdown.css({display: 'block'});

			if (!self.$activeOption) {
				self.$dropdown_content.css({display: 'none'});
				self.$dropdown_buttons.removeClass('border-bottom');
			} else {
				self.$dropdown_content.css({display: 'block'});
				self.$dropdown_buttons.addClass('border-bottom');
			}
		};
	})();

	self.setup = (function() {
		var original = self.setup;
		return function() {
			original.apply(self, arguments);
			self.$dropdown_buttons = $(dropdownButtons);
			self.$dropdown.prepend(self.$dropdown_buttons);

			self.$dropdown_buttons.find('#select-all').on('click', selectAllOptions);
			self.$dropdown_buttons.find('#select-none').on('click', selectNoneOptions);
		};
	})();
});
