(function() {

	describe('API', function() {

		describe('disable()', function() {
			before(function() {
				test = setup_test('<select>', {});
				test.selectize.disable();
			});
			after(function() {
				test.teardown();
			});
			it('should set "disabled" class', function() {
				expect(test.selectize.$control.hasClass('disabled')).to.be.equal(true);
			});
			it('should set isDisabled property to true', function() {
				expect(test.selectize.isDisabled).to.be.equal(true);
			});
		});

		describe('enable()', function() {
			before(function() {
				test = setup_test('<select disabled>', {});
				test.selectize.enable();
			});
			after(function() {
				test.teardown();
			});
			it('should remove "disabled" class', function() {
				expect(test.selectize.$control.hasClass('disabled')).to.be.equal(false);
			});
			it('should set isDisabled property to false', function() {
				expect(test.selectize.isDisabled).to.be.equal(false);
			});
		});

		describe('focus()', function() {
			before(function(done) {
				test = setup_test('<select>', {});
				test.selectize.focus();
				window.setTimeout(done, 5);
			});
			after(function() {
				test.teardown();
			});
			it('should set isFocused property to true', function() {
				expect(test.selectize.isFocused).to.be.equal(true);
			});
			it('should give the control focus', function() {
				expect(has_focus(test.selectize.$control_input[0])).to.be.equal(true);
			});
		});

		describe('blur()', function() {
			before(function(done) {
				test = setup_test('<select>', {});
				test.selectize.focus();
				window.setTimeout(function() {
					test.selectize.blur();
					window.setTimeout(done, 5);
				}, 5);
			});
			after(function() {
				test.teardown();
			});
			it('should set isFocused property to false', function() {
				expect(test.selectize.isFocused).to.be.equal(false);
			});
			it('should remove focus from the control', function() {
				expect(has_focus(test.selectize.$control_input[0])).to.be.equal(false);
			});
		});

	});

})();