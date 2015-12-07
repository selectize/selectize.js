(function () {

	describe('Dropdown direction', function () {

		describe('Option', function () {

			it('exists and defaults to auto', function () {
				var test = setup_test('<input type="text">', {});
				expect(test.selectize.settings.dropdownDirection).to.be.equal('auto');
			});

			it('allows only up, down and auto values', function () {
				var test1, test2, test3, test4;
				test1 = setup_test('<input type="text">', {});
				test2 = setup_test('<input type="text">', {dropdownDirection: 'up'});
				test3 = setup_test('<input type="text">', {dropdownDirection: 'down'});
				test4 = setup_test('<input type="text">', {dropdownDirection: 'whatever'});

				expect(test1.selectize.settings.dropdownDirection).to.be.equal('auto');
				expect(test2.selectize.settings.dropdownDirection).to.be.equal('up');
				expect(test3.selectize.settings.dropdownDirection).to.be.equal('down');
				expect(test4.selectize.settings.dropdownDirection).to.be.equal('auto');
			});
		});
	})

})();
