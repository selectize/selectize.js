(function() {

	window.setup_xss_test = function(html, options, done) {
		window.xss = function() {
			window.clearTimeout(timeout);
			complete(new Error('Exploit executed'));
		};

		var test = setup_test(html, options);
		var complete = function(err) {
			window.xss = function() {};
			done(err);
		};
		var timeout = window.setTimeout(complete, 75);
		return test;
	};

	describe('XSS', function() {

		describe('Raw HTML in original input value', function() {
			it('should not trigger exploit', function(done) {
				setup_xss_test('<input type="text" value="&lt;img src=&quot;x&quot; onerror=&quot;xss()&quot;&gt;">', {}, done);
			});
		});

		describe('Raw HTML in optgroup label', function() {
			it('should not trigger exploit', function(done) {
				var test = setup_xss_test('<select><optgroup label="&lt;img src=&quot;x&quot; onerror=&quot;xss()&quot;&gt;"><option>Test</option></optgroup></select>', {}, done);
				test.selectize.refreshOptions();
				test.selectize.open();
			});
		});

		describe('Raw HTML in option label should not trigger exploit', function() {
			it('should not trigger exploit', function(done) {
				setup_xss_test('<input type="text" value="">', {
					options: [
						{value: '1', label: '<img src="x" onerror="xss()">'}
					],
					items: ['1'],
					labelField: 'label',
					valueField: 'value'
				}, done);
			});
		});

		describe('Raw HTML in option value should not trigger exploit', function() {
			it('should not trigger exploit', function(done) {
				setup_xss_test('<input type="text" value="">', {
					options: [
						{value: '<img src="x" onerror="xss()">', label: '1'}
					],
					items: ['<img src="x" onerror="xss()">'],
					labelField: 'label',
					valueField: 'value'
				}, done);
			});
		});
	});

})();