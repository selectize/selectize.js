describe('DOM Events', function() {
	describe('"change"', function() {
		it('should be triggered once by addItem()', function(done) {
			var test = setup_test('<select>', {
				valueField: 'value',
				labelField: 'value',
				options: [
					{value: 'a'},
					{value: 'b'},
				],
				items: ['a']
			});

			var counter = 0;
			test.$select.on('change', function() { counter++; });
			test.selectize.addItem('b');

			window.setTimeout(function() {
				expect(counter).to.be.equal(1);
				done();
			}, 0);
		});
		it('should be triggered once by removeItem()', function(done) {
			var test = setup_test('<select multiple>', {
				valueField: 'value',
				labelField: 'value',
				options: [
					{value: 'a'},
					{value: 'b'},
				],
				items: ['a','b']
			});

			var counter = 0;
			test.$select.on('change', function() { counter++; });
			test.selectize.removeItem('b');

			window.setTimeout(function() {
				expect(counter).to.be.equal(1);
				done();
			}, 0);
		});
		it('should be triggered once by clear()', function(done) {
			var test = setup_test('<select multiple>', {
				valueField: 'value',
				labelField: 'value',
				options: [
					{value: 'a'},
					{value: 'b'},
				],
				items: ['a','b']
			});

			var counter = 0;
			test.$select.on('change', function() { counter++; });
			test.selectize.clear();

			window.setTimeout(function() {
				expect(counter).to.be.equal(1);
				done();
			}, 0);
		});
	});
});