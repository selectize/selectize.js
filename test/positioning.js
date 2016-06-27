(function() {

	var click = function(el, cb) {
		syn.click(el).delay(350, cb);
	};

	var testPositioning = function (options, callback) {
		var test = setup_test('<select multiple>' +
			'<option value="a">A</option>' +
			'<option value="b">B</option>' +
		'</select>', options);

		click(test.selectize.$control, function () {
			callback(test);
		});
	};

	var getCoordinates = function(test) {
		var controlCoordinates = getElCoordinates(test.selectize.$control);
		var dropdownCoordinates = getElCoordinates(test.selectize.$dropdown);

		return { control: controlCoordinates, dropdown: dropdownCoordinates };
	};

	var getElCoordinates = function ($el) {
		var offset = $el.offset();

		return {
			top: offset.top,
			left: offset.left,
			bottom: offset.top + $el.outerHeight(),
			right: offset.left + $el.outerWidth()
		};
	};

	describe('Positioning', function() {

		it('should place dropdown below control when using default dropdownDirection', function(done) {
			testPositioning({}, function (test) {
				var coordinates = getCoordinates(test);

				// the dropdown by default has a margin-top of -1
				expect(coordinates.control.bottom).to.equal(coordinates.dropdown.top + 1);
				expect(coordinates.control.left).to.equal(coordinates.dropdown.left);
				expect(coordinates.control.right).to.equal(coordinates.dropdown.right);
				done();
			});
		});

		it('should place dropdown above control when using dropdownDirection: up', function(done) {
			testPositioning({
				dropdownDirection: 'up'
			}, function (test) {
				var coordinates = getCoordinates(test);

				// the dropdown by default has a margin-bottom of -1
				expect(coordinates.control.top).to.equal(coordinates.dropdown.bottom - 1);
				expect(coordinates.control.left).to.equal(coordinates.dropdown.left);
				expect(coordinates.control.right).to.equal(coordinates.dropdown.right);
				done();
			});
		});

		it('should keep dropdown locked above control when using dropdownDirection: up', function(done) {
			testPositioning({
				dropdownDirection: 'up'
			}, function (test) {
				syn.type('a', test.selectize.$control_input).delay(0, function() {
					var coordinates = getCoordinates(test);

					// the dropdown by default has a margin-bottom of -1
					expect(coordinates.control.top).to.equal(coordinates.dropdown.bottom - 1);
					expect(coordinates.control.left).to.equal(coordinates.dropdown.left);
					expect(coordinates.control.right).to.equal(coordinates.dropdown.right);
					done();
				});
			});
		});

	});

})();
