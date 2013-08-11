(function() {

	describe('Setup', function() {

		describe('<input type="text">', function() {
			it('complete without exceptions', function() {
				test = setup_test('<input type="text">', {});
				test.teardown();
			});
			describe('getValue()', function() {
				it('should return value as a string', function() {
					test = setup_test('<input type="text" value="a,b">', {delimiter: ','});
					expect(test.selectize.getValue()).to.be.a('string');
					test.teardown();
				});
				it('should return "" when empty', function() {
					test = setup_test('<input type="text" value="">', {delimiter: ','});
					expect(test.selectize.getValue()).to.be.equal('');
					test.teardown();
				});
				it('should proper value when not empty', function() {
					test = setup_test('<input type="text" value="a,b">', {delimiter: ','});
					expect(test.selectize.getValue()).to.be.equal('a,b');
					test.teardown();
				});
			});
		});

		describe('<select>', function() {
			it('complete without exceptions', function() {
				test = setup_test('<select>', {});
				test.teardown();
			});
			describe('getValue()', function() {
				it('should return "" when empty', function() {
					test = setup_test('<select>', {});
					expect(test.selectize.getValue()).to.be.equal('');
					test.teardown();
				});
				it('should return proper value when not empty', function() {
					test = setup_test('<select><option selected value="a">A</option></select>', {});
					expect(test.selectize.getValue()).to.be.equal('a');
					test.teardown();
				});
			});
		});

		describe('<select multiple>', function() {
			it('complete without exceptions', function() {
				test = setup_test('<select>', {});
				test.teardown();
			});
			describe('getValue()', function() {
				it('should return [] when empty', function() {
					test = setup_test('<select multiple>', {});
					expect(test.selectize.getValue()).to.deep.equal([]);
					test.teardown();
				});
				it('should return proper value as array when not empty', function() {
					test = setup_test('<select multiple><option selected value="a">A</option></select>', {});
					expect(test.selectize.getValue()).to.deep.equal(['a']);
					test.teardown();
				});
			});
		});

		describe('<select disabled>', function() {
			before(function() {
				test = setup_test('<select disabled>', {});
			});
			it('should have "disabled" class', function() {
				expect(test.selectize.$control.hasClass('disabled')).to.be.equal(true);
			});
			it('should have isDisabled property set to true', function() {
				expect(test.selectize.isDisabled).to.be.equal(true);
			});
			after(function() {
				test.teardown();
			});
		});

	});

})();