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
			it('should complete without exceptions', function() {
				test = setup_test('<select>', {});
				test.teardown();
			});
			it('should add options in text form (no html entities)', function() {
				test = setup_test('<select><option selected value="a">&lt;hi&gt;</option></select>', {});
				expect(test.selectize.options['a'].text).to.be.equal('<hi>');
				test.teardown();
			});
			it('should keep options in original order if no sort given', function(done) {
				test = setup_test([
					'<select multiple>',
						'<option value="">Select a state...</option>',
						'<option value="AL">Alabama</option>',
						'<option value="AK">Alaska</option>',
						'<option value="AZ">Arizona</option>',
						'<option value="AR">Arkansas</option>',
						'<option value="CA" selected>California</option>',
						'<option value="CO">Colorado</option>',
						'<option value="CT">Connecticut</option>',
						'<option value="DE">Delaware</option>',
						'<option value="DC">District of Columbia</option>',
						'<option value="FL">Florida</option>',
						'<option value="GA">Georgia</option>',
						'<option value="HI">Hawaii</option>',
						'<option value="ID">Idaho</option>',
						'<option value="IL">Illinois</option>',
						'<option value="IN">Indiana</option>',
						'<option value="IA">Iowa</option>',
						'<option value="KS">Kansas</option>',
						'<option value="KY">Kentucky</option>',
						'<option value="LA">Louisiana</option>',
						'<option value="ME">Maine</option>',
						'<option value="MD">Maryland</option>',
						'<option value="MA">Massachusetts</option>',
						'<option value="MI">Michigan</option>',
						'<option value="MN">Minnesota</option>',
						'<option value="MS">Mississippi</option>',
						'<option value="MO">Missouri</option>',
						'<option value="MT">Montana</option>',
						'<option value="NE">Nebraska</option>',
						'<option value="NV">Nevada</option>',
						'<option value="NH">New Hampshire</option>',
						'<option value="NJ">New Jersey</option>',
						'<option value="NM">New Mexico</option>',
						'<option value="NY">New York</option>',
						'<option value="NC">North Carolina</option>',
						'<option value="ND">North Dakota</option>',
						'<option value="OH">Ohio</option>',
						'<option value="OK">Oklahoma</option>',
						'<option value="OR">Oregon</option>',
						'<option value="PA">Pennsylvania</option>',
						'<option value="RI">Rhode Island</option>',
						'<option value="SC">South Carolina</option>',
						'<option value="SD">South Dakota</option>',
						'<option value="TN">Tennessee</option>',
						'<option value="TX">Texas</option>',
						'<option value="UT">Utah</option>',
						'<option value="VT">Vermont</option>',
						'<option value="VA">Virginia</option>',
						'<option value="WA">Washington</option>',
						'<option value="WV">West Virginia</option>',
						'<option value="WI">Wisconsin</option>',
						'<option value="01">01</option>',
						'<option value="10">10</option>',
						'<option value="WY" selected>Wyoming</option>',
					'</select>'
				].join(), {});

				var order_expected = ['AL','AK','AZ','AR','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','01','10'];
				var order_actual = [];

				test.selectize.refreshOptions(true);
				window.setTimeout(function() {
					test.selectize.$dropdown.find('[data-value]').each(function(i, el) {
						order_actual.push($(el).attr('data-value'));
					});

					expect(order_actual).to.eql(order_expected);
					test.teardown();
					done();
				}, 0);
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
			it('should complete without exceptions', function() {
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