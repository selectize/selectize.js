(function() {

	var click = function(el, cb) {
		syn.click(el).delay(350, cb);
	};

	var testPositioning = function (options, callback) {
		var test = setup_test('<select multiple>' +
			'<option value="a">A</option>' +
			'<option value="b">B</option>' +
		'</select>', options);

		click(test.selectize.$control, function() {
			var controlCoordinates = getCoordinates(test.selectize.$control);
			var dropdownCoordinates = getCoordinates(test.selectize.$dropdown);

			callback(controlCoordinates, dropdownCoordinates);
		});
	};

	var getCoordinates = function ($el) {
		var offset = $el.offset();

		return {
			top: offset.top,
			left: offset.left,
			bottom: offset.top + $el.outerHeight(),
			right: offset.left + $el.outerWidth()
		};
	}

	describe('Positioning', function() {

		it('should place dropdown below control when using default dropdownDirection', function(done) {
			testPositioning({}, function (controlCoordinates, dropdownCoordinates) {
				// the dropdown by default has a margin-top of -1
				expect(controlCoordinates.bottom).to.equal(dropdownCoordinates.top + 1);
				expect(controlCoordinates.left).to.equal(dropdownCoordinates.left);
				expect(controlCoordinates.right).to.equal(dropdownCoordinates.right);
				done();
			});
		});

		it('should place dropdown above control when using dropdownDirection: up', function(done) {
			testPositioning({
				dropdownDirection: 'up'
			}, function (controlCoordinates, dropdownCoordinates) {
				// the dropdown by default has a margin-bottom of -1
				expect(controlCoordinates.top).to.equal(dropdownCoordinates.bottom - 1);
				expect(controlCoordinates.left).to.equal(dropdownCoordinates.left);
				expect(controlCoordinates.right).to.equal(dropdownCoordinates.right);
				done();
			});
		});

	});

})();
