describe('Events', function() {

	describe('change', function() {
		beforeEach(function() {
			test = setup_test('<select><option value="a" selected></option><option value="b"></option><option value="c"></option></select>', {});
		});
		afterEach(function() {
			test.teardown();
		});
		it('should be triggered once', function(done) {
			var counter = 0;
			test.selectize.on('change', function() {
				counter++;
			});
			test.selectize.setValue('b');

			window.setTimeout(function() {
				expect(counter).to.be.equal(1);
				done();
			}, 0);
		});
		it('should contain current value', function(done) {
			test.selectize.on('change', function(value) {
				expect(value).to.be.equal('c');
				done();
			});
			test.selectize.setValue('c');
		});
	});

	describe('item_add', function() {
		beforeEach(function() {
			test = setup_test('<select><option value="a"></option><option value="b"></option><option value="c"></option></select>', {});
		});
		afterEach(function() {
			test.teardown();
		});
		it('should be triggered', function(done) {
			test.selectize.on('item_add', function() {
				done();
			});
			test.selectize.addItem('b');
		});
		it('should contain item\'s value', function(done) {
			test.selectize.on('item_add', function(value, $item) {
				expect(value).to.be.equal('b');
				done();
			});
			test.selectize.addItem('b');
		});
	});

	describe('item_remove', function() {
		beforeEach(function() {
			test = setup_test('<select><option value="a" selected></option><option value="b"></option><option value="c"></option></select>', {});
		});
		afterEach(function() {
			test.teardown();
		});
		it('should be triggered', function(done) {
			test.selectize.on('item_remove', function() {
				done();
			});
			test.selectize.removeItem('a');
		});
		it('should contain item\'s value', function(done) {
			test.selectize.on('item_remove', function(value) {
				expect(value).to.be.equal('a');
				done();
			});
			test.selectize.removeItem('a');
		});
	});

	describe('clear', function() {
		beforeEach(function() {
			test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
		});
		afterEach(function() {
			test.teardown();
		});
		it('should be triggered', function(done) {
			test.selectize.on('clear', function() {
				done();
			});
			test.selectize.clear();
		});
	});

	describe('optgroup_add', function() {
		beforeEach(function() {
			test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
		});
		afterEach(function() {
			test.teardown();
		});
		it('should be triggered', function(done) {
			test.selectize.on('optgroup_add', function() { done(); });
			test.selectize.addOptionGroup('id', {label: 'Group'});
		});
		it('should contain optgroup id', function(done) {
			test.selectize.on('optgroup_add', function(id, data) {
				expect(id).to.be.equal('id');
				done();
			});
			test.selectize.addOptionGroup('id', {label: 'Group'});
		});
		it('should contain outgroup data', function(done) {
			var optgroup = {label: 'Group'};
			test.selectize.on('optgroup_add', function(id, data) {
				expect(data).to.eql(optgroup);
				done();
			});
			test.selectize.addOptionGroup('id', optgroup);
		});
	});

	describe('option_add', function() {
		beforeEach(function() {
			test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
		});
		afterEach(function() {
			test.teardown();
		});
		it('should be triggered', function(done) {
			test.selectize.on('option_add', function() {
				done();
			});
			test.selectize.addOption({value: 'e'});
		});
		it('should contain option value', function(done) {
			test.selectize.on('option_add', function(value, data) {
				expect(value).to.be.equal('e');
				done();
			});
			test.selectize.addOption({value: 'e'});
		});
		it('should contain option data', function(done) {
			var option = {value: 'e'};
			test.selectize.on('option_add', function(value, data) {
				expect(option).to.eql(data);
				done();
			});
			test.selectize.addOption(option);
		});
	});

	describe('option_remove', function() {
		beforeEach(function() {
			test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
		});
		afterEach(function() {
			test.teardown();
		});
		it('should be triggered', function(done) {
			test.selectize.on('option_remove', function() {
				done();
			});
			test.selectize.removeOption('a');
		});
		it('should contain option value', function(done) {
			test.selectize.on('option_remove', function(value) {
				expect(value).to.be.equal('a');
				done();
			});
			test.selectize.removeOption('a');
		});
	});

	describe('option_clear', function() {
		beforeEach(function() {
			test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
		});
		afterEach(function() {
			test.teardown();
		});
		it('should be triggered', function(done) {
			test.selectize.on('option_clear', function() {
				done();
			});
			test.selectize.clearOptions();
		});
	});

	describe('dropdown_open', function() {
		beforeEach(function() {
			test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
		});
		afterEach(function() {
			test.teardown();
		});
		it('should be triggered', function(done) {
			test.selectize.on('dropdown_open', function() {
				done();
			});
			test.selectize.open();
		});
	});

	describe('dropdown_close', function() {
		beforeEach(function() {
			test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
		});
		afterEach(function() {
			test.teardown();
		});
		it('should be triggered', function(done) {
			test.selectize.on('dropdown_close', function() {
				done();
			});
			test.selectize.open();
			test.selectize.close();
		});
	});

	describe('destroy', function() {
		beforeEach(function() {
			test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
		});
		afterEach(function() {
			test.teardown();
		});
		it('should be triggered', function(done) {
			test.selectize.on('destroy', function() {
				done();
			});
			test.selectize.destroy();
		});
	});

	describe('type', function() {
		beforeEach(function() {
			test = setup_test('<select></select>', {create: true});
		});
		afterEach(function() {
			test.teardown();
		});
		it('should be triggered', function(done) {
			test.selectize.on('type', function() {
				done();
			});
			Syn.click(test.selectize.$control).type('a', test.selectize.$control_input);
		});
		it('should contain current value', function(done) {
			test.selectize.on('type', function(value) {
				expect(value).to.be.equal('a');
				done();
			});
			Syn.click(test.selectize.$control).type('a', test.selectize.$control_input);
		});
	});

});