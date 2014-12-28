(function() {

	describe('Setup', function() {

		it('should not allow duplicate initialization', function() {
			var instance_before, instance_after, test;

			test = setup_test('<input type="text">', {});
			instance_before = test.$select[0].selectize;
			test.$select.selectize();
			instance_after = test.$select[0].selectize;

			expect(instance_before).to.be.equal(instance_after);
		});

		describe('<input type="text">', function() {
			it('should complete without exceptions', function() {
				var test = setup_test('<input type="text">', {});
			});
			describe('getValue()', function() {
				it('should return value as a string', function() {
					var test = setup_test('<input type="text" value="a,b">', {delimiter: ','});
					expect(test.selectize.getValue()).to.be.a('string');
				});
				it('should return "" when empty', function() {
					var test = setup_test('<input type="text" value="">', {delimiter: ','});
					expect(test.selectize.getValue()).to.be.equal('');
				});
				it('should return proper value when not empty', function() {
					var test = setup_test('<input type="text" value="a,b">', {delimiter: ','});
					expect(test.selectize.getValue()).to.be.equal('a,b');
				});
			});
			describe('<input type="text" attributes>', function() {
				it('should propagate original input attributes to the generated input', function() {
					var test = setup_test('<input type="text" autocorrect="off" autocapitalize="none">', {});
					expect(test.selectize.$control_input.attr('autocorrect')).to.be.equal('off');
					expect(test.selectize.$control_input.attr('autocapitalize')).to.be.equal('none');
				});
				it('should not add attributes if not present in the original', function() {
					var test = setup_test('<input type="text">', {});
					expect(test.selectize.$control_input.attr('autocorrect')).to.be.equal(undefined);
					expect(test.selectize.$control_input.attr('autocapitalize')).to.be.equal(undefined);
				});
			});
		});

		describe('<select>', function() {
			it('should complete without exceptions', function() {
				var test = setup_test('<select>', {});
			});
			it('should add options in text form (no html entities)', function() {
				var test = setup_test('<select><option selected value="a">&lt;hi&gt;</option></select>', {});
				expect(test.selectize.options['a'].text).to.be.equal('<hi>');
			});
			it('should keep options in original order if no sort given', function(done) {
				var test = setup_test([
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
					done();
				}, 0);
			});
			describe('getValue()', function() {
				it('should return "" when empty', function() {
					var test = setup_test('<select>', {});
					expect(test.selectize.getValue()).to.be.equal('');
				});
				it('should return proper value when not empty', function() {
					var test = setup_test('<select><option selected value="a">A</option></select>', {});
					expect(test.selectize.getValue()).to.be.equal('a');
				});
			});
		});

		describe('<select multiple>', function() {
			it('should complete without exceptions', function() {
				var test = setup_test('<select>', {});
			});
			describe('getValue()', function() {
				it('should return [] when empty', function() {
					var test = setup_test('<select multiple>', {});
					expect(test.selectize.getValue()).to.deep.equal([]);
				});
				it('should return proper value as array when not empty', function() {
					var test = setup_test('<select multiple><option selected value="a">A</option></select>', {});
					expect(test.selectize.getValue()).to.deep.equal(['a']);
				});
			});
		});

		describe('<select disabled>', function() {
			var test;

			before(function() {
				test = setup_test('<select disabled>', {});
			});
			it('should have "disabled" class', function() {
				expect(test.selectize.$control.hasClass('disabled')).to.be.equal(true);
			});
			it('should have isDisabled property set to true', function() {
				expect(test.selectize.isDisabled).to.be.equal(true);
			});
		});

		describe('<select required>', function(){
			var $form, $button, test;

			beforeEach(function() {
				test = setup_test('<select required>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
				'</select>', {});
				$form = test.$select.parents('form');
				$button = $('<button type="submit">').appendTo($form);
			});
			afterEach(function() {
				$form.off('.test_required');
				$button.remove();
			});

			it('should have isRequired property set to true', function() {
				expect(test.selectize.isRequired).to.be.equal(true);
			});
			it('should have the required class', function() {
				expect(test.selectize.$control.hasClass('required')).to.be.equal(true);
			});

			if ($('<select>')[0].validity) {
				it('should have "invalid" class when validation fails', function(done) {
					test.$select[0].checkValidity();
					window.setTimeout(function() {
						expect(test.selectize.$control.hasClass('invalid')).to.be.equal(true);
						expect(test.selectize.isFocused).to.be.equal(false);
						done();
					}, 0);
				});
				it('should clear the invalid class after an item is selected', function(done) {
					Syn.click($button).delay(0, function() {
						test.selectize.addItem('a');
						expect(test.selectize.$control.hasClass('invalid')).to.be.equal(false);
						done();
					});
				});
				it('should pass validation if an element is selected', function(done) {
					test.selectize.addItem('a');
					$form.one('submit.test_required', function(e) {
						done();
					});

					Syn.click($button);
				});
			}
		});

		describe('<select> (not required)', function(){
			var $form, $button, test;

			beforeEach(function() {
				test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
				'</select>', {});
				$form = test.$select.parents('form');
				$button = $('<button type="submit">').appendTo($form);
			});
			afterEach(function() {
				$form.off('.test_required');
				$button.remove();
			});

			it('should have isRequired property set to false', function() {
				expect(test.selectize.isRequired).to.be.equal(false);
			});
			it('should not have the required class', function() {
				expect(test.selectize.$control.hasClass('required')).to.be.equal(false);
			});
		});

	});

})();
