(function() {

	// These tests are functional simulations of
	// user interaction, using syn.js. For more information:
	//
	// @see http://v3.javascriptmvc.com/docs.html#&who=Syn
	// @see http://bitovi.com/blog/2010/07/syn-a-standalone-synthetic-event-library.html

	describe('Interaction', function() {

		describe('clicking control', function() {

			it('should give it focus', function(done) {
				test = setup_test('<select>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				Syn
					.click(test.selectize.$control, function() {
						expect(test.selectize.isFocused).to.be.equal(true);
						test.teardown();
						done();
					});
			});

			it('should open dropdown menu', function(done) {
				test = setup_test('<select>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				Syn
					.click(test.selectize.$control)
					.delay(0, function() {
						expect(test.selectize.isOpen).to.be.equal(true);
						expect(test.selectize.$dropdown.is(':visible')).to.be.equal(true);
						test.teardown();
						done();
					});
			});

		});

		describe('clicking option', function() {

			it('should select it', function(done) {
				test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				Syn.click(test.selectize.$control).delay(0, function() {
					Syn
						.click($('[data-value="b"]', test.selectize.$dropdown))
						.delay(0, function() {
							expect(test.selectize.$input.val()).to.be.equal('b');
							test.teardown();
							done();
						});
				});
			});

			it('should close dropdown', function(done) {
				test = setup_test('<select>' +
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
							test.teardown();
							done();
						});
				});
			});

		});

		describe('typing in input', function() {

			it('should filter results', function(done) {
				test = setup_test('<select>' +
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
						test.teardown();
						done();
					});
			});

			it('should hide dropdown if no results present', function(done) {
				test = setup_test('<select>' +
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
						test.teardown();
						done();
					});
			});

			it('should not hide dropdown if "create" option enabled and no results present', function(done) {
				test = setup_test('<select>' +
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
						test.teardown();
						done();
					});
			});

			it('should restore dropdown visibility when backing out of a query without results (backspace)', function(done) {
				test = setup_test('<select>' +
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
						test.teardown();
						done();
					});
			});

			it('should move caret when [left] or [right] pressed', function(done) {
				test = setup_test('<input type="text" value="a,b,c,d">', {create: true});

				Syn
					.click(test.selectize.$control)
					.type('[left][left]whatt', test.selectize.$control_input)
					.delay(0, function() {
						expect(test.selectize.caretPos).to.be.equal(2);
						test.teardown();
						done();
					});
			});

		});

	});

})();