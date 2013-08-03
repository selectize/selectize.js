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

		describe('addOption()', function() {
			before(function() {
				test = setup_test('<select>', {valueField: 'value', labelField: 'value'});
			});
			after(function() {
				test.teardown();
			});
			it('should not allow null / undefined values', function() {
				test.selectize.addOption(undefined, {value: undefined});
				test.selectize.addOption(null, {value: null});
				expect(test.selectize.options).to.not.have.property('undefined');
				expect(test.selectize.options).to.not.have.property('null');
			});
			it('should allow integer values', function() {
				test.selectize.addOption(0, {value: 0});
				test.selectize.addOption(1, {value: 1});
				expect(test.selectize.options).to.have.property('0');
				expect(test.selectize.options).to.have.property('1');
			});
			it('should allow arrays of options', function() {
				test.selectize.addOption([{value: 'a'}, {value: 'b'}]);
				expect(test.selectize.options).to.have.property('a');
				expect(test.selectize.options).to.have.property('b');
			});
		});

		describe('addItem()', function() {
			before(function() {
				test = setup_test('<select multiple>', {
					valueField: 'value',
					labelField: 'value',
					options: [
						{value: 0},
						{value: 1},
						{value: 'undefined'},
						{value: 'null'},
						{value: 'a'},
						{value: 'b'},
						{value: '\''},
						{value: '"'},
						{value: '\\\''},
						{value: '\\"'},
					]
				});
			});
			after(function() {
				test.teardown();
			});
			it('should update "items" array', function() {
				test.selectize.addItem('b');
				expect(test.selectize.items.indexOf('b')).to.be.equal(0);
			});
			it('should not allow duplicate entries', function() {
				test.selectize.addItem('a');
				test.selectize.addItem('a');
				expect(test.selectize.items.indexOf('a')).to.be.equal(test.selectize.items.lastIndexOf('a'));
			});
			it('should not allow undefined / null values', function() {
				test.selectize.addItem(undefined);
				test.selectize.addItem(null);
				expect(test.selectize.items.indexOf('undefined')).to.be.equal(-1);
				expect(test.selectize.items.indexOf('null')).to.be.equal(-1);
			});
			it('should allow integer values', function() {
				test.selectize.addItem(0);
				expect(test.selectize.items.indexOf('0')).to.not.be.equal(-1);
			});
		});

		describe('updateOption()', function() {
			before(function() {
				test = setup_test('<select>', {
					valueField: 'value',
					labelField: 'value',
					options: [
						{value: 0},
						{value: 1},
						{value: 'a'},
						{value: 'b'},
						{value: 'c'},
						{value: 'd'},
						{value: 'e'},
						{value: 'null'},
						{value: 'undefined'},
						{value: '\''},
						{value: '"'},
						{value: '\\\''},
						{value: '\\"'},
					],
					items: ['e']
				});
			});
			after(function() {
				test.teardown();
			});
			it('should update option data', function() {
				test.selectize.updateOption('a', {value: 'a', test: 'test'});
				expect(test.selectize.options).to.have.property('a');
				expect(test.selectize.options['a'].test).to.equal('test');
			});
			it('should update indexes', function() {
				test.selectize.updateOption('e', {value: 'e_updated'});
				expect(test.selectize.options).to.not.have.property('e');
				expect(test.selectize.options).to.have.property('e_updated');
				expect(test.selectize.items.indexOf('e')).to.be.equal(-1);
				expect(test.selectize.items.indexOf('e_updated')).to.be.equal(0);
			});
			it('should allow integer values', function() {
				test.selectize.updateOption(0, {value: '0_updated'});
				test.selectize.updateOption(1, {value: '1_updated'});
				expect(test.selectize.options).to.not.have.property('0');
				expect(test.selectize.options).to.not.have.property('1');
				expect(test.selectize.options).to.have.property('0_updated');
				expect(test.selectize.options).to.have.property('1_updated');
			});
			it('should throw error if value not set in data', function() {
				expect(function() {
					test.selectize.updateOption('c', {value: undefined, test: 'test'});
					test.selectize.updateOption('d', {value: null, test: 'test'});
				}).to.throw(Error);
			});
			it('should ignore undefined / null value references', function() {
				test.selectize.updateOption(undefined, {value: 'undefined', test: 'test'});
				test.selectize.updateOption(null, {value: 'null', test: 'test'});
				expect(test.selectize.options['undefined']).to.not.have.property('test');
				expect(test.selectize.options['null']).to.not.have.property('test');
			});
		});

		describe('getOption()', function() {
			before(function() {
				test = setup_test('<select>', {
					valueField: 'value',
					labelField: 'value',
					options: [
						{value: 0},
						{value: 1},
						{value: 'a'},
						{value: 'b'},
						{value: '\''},
						{value: '"'},
						{value: '\\\''},
						{value: '\\"'},
					]
				});
				test.selectize.refreshOptions(true);
			});
			after(function() {
				test.teardown();
			});
			it('should allow string values', function() {
				expect(test.selectize.getOption('a')).to.be.ok;
				expect(test.selectize.getOption('a').length).to.be.equal(1);
				expect(test.selectize.getOption('b')).to.be.ok;
				expect(test.selectize.getOption('b').length).to.be.equal(1);
			});
			it('should allow integer values', function() {
				expect(test.selectize.getOption(0)).to.be.ok;
				expect(test.selectize.getOption(0).length).to.be.equal(1);
				expect(test.selectize.getOption(1)).to.be.ok;
				expect(test.selectize.getOption(1).length).to.be.equal(1);
			});
			it('should allow values with quotation marks', function() {
				expect(test.selectize.getOption('\'')).to.be.ok;
				expect(test.selectize.getOption('\'').length).to.be.equal(1);
				expect(test.selectize.getOption('"')).to.be.ok;
				expect(test.selectize.getOption('"').length).to.be.equal(1);
			});
			it('should allow values with backslashes', function() {
				expect(test.selectize.getOption('\\\'')).to.be.ok;
				expect(test.selectize.getOption('\\\'').length).to.be.equal(1);
				expect(test.selectize.getOption('\\"')).to.be.ok;
				expect(test.selectize.getOption('\\"').length).to.be.equal(1);
			});
			it('should not allow undefined / null values', function() {
				expect(test.selectize.getOption(null)).to.be.ok;
				expect(test.selectize.getOption(null).length).to.be.equal(0);
				expect(test.selectize.getOption(undefined)).to.be.ok;
				expect(test.selectize.getOption(undefined).length).to.be.equal(0);
			});
		});
	});

})();