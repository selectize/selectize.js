(function() {

	// These tests are functional simulations of
	// user interaction, using syn.js. For more information:
	//
	// @see http://v3.javascriptmvc.com/docs.html#&who=Syn
	// @see http://bitovi.com/blog/2010/07/syn-a-standalone-synthetic-event-library.html

	describe('Interaction', function() {

		describe('clicking control', function() {

			it('should give it focus', function(done) {
				var test = setup_test('<select>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				Syn
					.click(test.selectize.$control)
					.delay(0, function() {
						expect(test.selectize.isFocused).to.be.equal(true);
						done();
					});
			});

			it('should open dropdown menu', function(done) {
				var test = setup_test('<select>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				Syn
					.click(test.selectize.$control)
					.delay(0, function() {
						expect(test.selectize.isOpen).to.be.equal(true);
						expect(test.selectize.$dropdown.is(':visible')).to.be.equal(true);
						done();
					});
			});

		});

		describe('clicking label', function() {

			it('should give it focus to select', function(done) {
				var inputId = "labeledSelect";
		        $('#fixture').append('<label for="'+inputId+'">select</label>');
				var label = $('label[for="'+inputId+'"]');

				var test = setup_test('<select id="'+inputId+'">' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				Syn
					.click(label)
					.delay(0, function() {
						label.remove();
						expect(test.selectize.isFocused).to.be.equal(true);
						done();
					});
			});

			it('should give it focus to input', function(done) {
				var inputId = "labeledInput";
		        $('#fixture').append('<label for="'+inputId+'">input</label>');
				var label = $('label[for="'+inputId+'"]');
				
				var test = setup_test('<input id="'+inputId+'" type="text" value="a,b,c,d">', {});

				Syn
					.click(label)
					.delay(0, function() {
						label.remove();
						expect(test.selectize.isFocused).to.be.equal(true);
						done();
					});
			});

		});

		describe('clicking option', function() {

			it('should select it', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				Syn.click(test.selectize.$control).delay(0, function() {
					Syn
						.click($('[data-value="b"]', test.selectize.$dropdown))
						.delay(0, function() {
							expect(test.selectize.$input.val()).to.be.equal('b');
							done();
						});
				});
			});

			it('should close dropdown', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				Syn.click(test.selectize.$control).delay(0, function() {
					Syn
						.click($('[data-value="b"]', test.selectize.$dropdown))
						.delay(0, function() {
							expect(test.selectize.isOpen).to.be.equal(false);
							expect(test.selectize.$dropdown.is(':visible')).to.be.equal(false);
							done();
						});
				});
			});

		});

		describe('typing in input', function() {

			it('should filter results', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				Syn
					.click(test.selectize.$control)
					.type('a', test.selectize.$control_input)
					.delay(0, function() {
						expect($('[data-value="a"]', test.selectize.$dropdown).length).to.be.equal(1);
						expect($('[data-value="b"]', test.selectize.$dropdown).length).to.be.equal(0);
						done();
					});
			});

			it('should hide dropdown if no results present', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				Syn
					.click(test.selectize.$control)
					.type('awaw', test.selectize.$control_input)
					.delay(0, function() {
						expect(test.selectize.isOpen).to.be.equal(false);
						expect(test.selectize.$dropdown.is(':visible')).to.be.equal(false);
						done();
					});
			});

			it('should not hide dropdown if "create" option enabled and no results present', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {create: true});

				Syn
					.click(test.selectize.$control)
					.type('awaw', test.selectize.$control_input)
					.delay(0, function() {
						expect(test.selectize.isOpen).to.be.equal(true);
						expect(test.selectize.$dropdown.is(':visible')).to.be.equal(true);
						done();
					});
			});

			it('should restore dropdown visibility when backing out of a query without results (backspace)', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				Syn
					.click(test.selectize.$control)
					.type('awf', test.selectize.$control_input)
					.type('\b\b\b', test.selectize.$control_input)
					.delay(0, function() {
						expect(test.selectize.isOpen).to.be.equal(true);
						expect(test.selectize.$dropdown.is(':visible')).to.be.equal(true);
						done();
					});
			});

			it('should move caret when [left] or [right] pressed', function(done) {
				var test = setup_test('<input type="text" value="a,b,c,d">', {create: true});

				Syn
					.click(test.selectize.$control)
					.type('[left][left]whatt', test.selectize.$control_input)
					.delay(0, function() {
						expect(test.selectize.caretPos).to.be.equal(2);
						done();
					});
			});

		});

		describe('blurring the input', function() {
			it('should close dropdown when createOnBlur is true', function(done) {
				var test = setup_test('<select multiple="multiple">' +
					'<option></option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {
					createOnBlur: true,
					create: function(value){
						return {
							value: value,
							text: value
						};
					}
				});

				Syn
					.click(test.selectize.$control)
					.type('fooo', test.selectize.$control_input)
					.delay(0, function() {
						expect(test.selectize.isOpen).to.be.equal(true);
						expect(test.selectize.$dropdown.is(':visible')).to.be.equal(true);

						Syn
							.click($("#mocha")[0])
							.delay(0, function() {
								expect(test.selectize.isOpen).to.be.equal(false);
								expect(test.selectize.$dropdown.is(':visible')).to.be.equal(false);
								done();
							});
					});

			});
		});

		describe('filtering created items', function() {
			function createFilterTest(createFilter) {
				return setup_test('<select multiple="multiple"></select>', {create: true, createFilter: createFilter});
			}

			var text = 'abc';

			function execFilterTest(test, done, expectation) {
				var selectize = test.selectize;
				Syn.click(selectize.$control).type(text, selectize.$control_input).type(selectize.settings.delimiter, selectize.$control_input).delay(0, function() {
					expectation(selectize);
					done();
				});
			}

			function execFilterTests(heading, filters, expectation) {
				for (var i = 0; i < filters.length; i++) {
					(function(filter) {
						it(heading, function(done) {
							execFilterTest(createFilterTest(filter), done, expectation);
						});
					})(filters[i]);
				}
			}

			execFilterTests('should add an item  normally if there is no createFilter', [undefined, null, ''], function(selectize) {
				expect(selectize.getItem(text).length).to.be.equal(1);
			});

			execFilterTests('should add an item if the input matches the createFilter', ['a', /a/, function() { return true; }], function(selectize) {
				expect(selectize.getItem(text).length).to.be.equal(1);
			});

			execFilterTests('should not add an item or display the create label if the input does not match the createFilter', ['foo', /foo/, function() { return false; }], function(selectize) {
				expect(selectize.getItem(text).length).to.be.equal(0);
				expect($(selectize.$dropdown_content).filter('.create').length).to.be.equal(0);
			});
 		});

	});

})();