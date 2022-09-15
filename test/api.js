(function() {

	describe('API', function() {

		describe('disable()', function() {
			var test;

			before(function() {
				test = setup_test('<select tabindex="4">', {});
				expect(String(test.selectize.$control_input.attr('tabindex'))).to.be.equal('4');
				test.selectize.disable();
			});
			it('should set "tabindex" prop to -1', function() {
				expect(String(test.selectize.$control_input.attr('tabindex'))).to.be.equal('-1');
			});
			it('should set "disabled" class', function() {
				expect(test.selectize.$control.hasClass('disabled')).to.be.equal(true);
			});
			it('should set isDisabled property to true', function() {
				expect(test.selectize.isDisabled).to.be.equal(true);
			});
			it('should add "disabled" attribute on inputs', function() {
				expect(test.selectize.$input.is(':disabled')).to.be.equal(true);
				expect(test.selectize.$control_input.is(':disabled')).to.be.equal(true);
			});
		});

		describe('setMaxItems(2)', function(){
			var test;
			before(function(done) {
				test = setup_test('<select>', {});
				test.selectize.setMaxItems(2);
				window.setTimeout(function() { done(); }, 5);
			});
			it('should set maxItems setting to 2', function() {
				expect(test.selectize.settings.maxItems).to.be.equal(2);
			});
		});

		describe('setMaxItems(0)', function(){
			var test;
			before(function(done) {
				test = setup_test('<select>', {});
				test.selectize.setMaxItems(0);
				window.setTimeout(function() { done(); }, 5);
			});
			it('should set maxItems setting to null', function() {
				expect(test.selectize.settings.maxItems).to.be.equal(null);
			});
		});

		describe('enable()', function() {
			var test;

			before(function() {
				test = setup_test('<select disabled tabindex="2">', {});
				expect(String(test.selectize.$control_input.attr('tabindex'))).to.be.equal('-1');
				test.selectize.enable();
			});
			it('should restore original "tabindex" prop', function() {
				expect(String(test.selectize.$control_input.attr('tabindex'))).to.be.equal('2');
			});
			it('should remove "disabled" class', function() {
				expect(test.selectize.$control.hasClass('disabled')).to.be.equal(false);
			});
			it('should set isDisabled property to false', function() {
				expect(test.selectize.isDisabled).to.be.equal(false);
			});
			it('should remove "disabled" attribute on inputs', function() {
				expect(test.selectize.$input.is(':disabled')).to.be.equal(false);
				expect(test.selectize.$control_input.is(':disabled')).to.be.equal(false);
			});
		});

		describe('focus()', function() {
			var test, self;

			before(function(done) {
				test = setup_test('<select>', {});
				self = test.selectize.focus();
				window.setTimeout(function() { done(); }, 5);
			});

			it('should set isFocused property to true', function() {
				expect(test.selectize.isFocused).to.be.equal(true);
			});
			it('should give the control focus', function() {
				expect(has_focus(test.selectize.$control_input[0])).to.be.equal(true);
			});
			it('should return self to support chaining', function() {
				expect(self.getValue()).to.be.equal('');
			});
		});

		describe('blur()', function() {
			var test, self;

			before(function(done) {
				test = setup_test('<select>', {});
				test.selectize.focus();
				window.setTimeout(function() {
					self = test.selectize.blur();
					window.setTimeout(done, 100);
				}, 50);
			});
			it('should set isFocused property to false', function() {
				expect(test.selectize.isFocused).to.be.equal(false);
			});
			it('should remove focus from the control', function() {
				expect(has_focus(test.selectize.$control_input[0])).to.be.equal(false);
			});
			it('should return self to support chaining', function() {
				expect(self.getValue()).to.be.equal('');
			});
		});

		describe('createItem()', function() {
			it('should fail if non-object returned by "create" callback', function() {
				var test = setup_test('<select>', {
					valueField: 'value',
					labelField: 'value',
					create: function(input) {
						return false;
					}
				});

				test.selectize.$control_input.val('test');
				test.selectize.createItem();
				expect(test.selectize.items.length).to.be.equal(0);

				test = setup_test('<select>', {
					valueField: 'value',
					labelField: 'value',
					create: function(input) {
						return 'hello';
					}
				});

				test.selectize.$control_input.val('test');
				test.selectize.createItem();
				expect(test.selectize.items.length).to.be.equal(0);
			});
			it('should add option upon completion (synchronous)', function() {
				var test = setup_test('<select>', {
					valueField: 'value',
					labelField: 'value',
					create: function(input) {
						return {value: input};
					}
				});

				test.selectize.$control_input.val('test');
				test.selectize.createItem();
				expect(test.selectize.options).to.have.property('test');
			});
			it('should add option upon completion (asynchronous)', function(done) {
				var test = setup_test('<select>', {
					valueField: 'value',
					labelField: 'value',
					create: function(input, callback) {
						window.setTimeout(function() {
							callback({value: input});
							expect(test.selectize.options).to.have.property('test');
							done();
						}, 0);
					}
				});

				test.selectize.$control_input.val('test');
				test.selectize.createItem();
			});
		});

		describe('addOptionGroup()', function() {
			var test;

			before(function() {
				test = setup_test('<select>', {valueField: 'value', labelField: 'value', optgroupValueField: 'grpval'});
			});
			it('should register group', function() {
				var data = {label: 'Group Label'};
				test.selectize.addOptionGroup('group_id', data);
				expect(test.selectize.optgroups).to.have.property('group_id');
			});
			it('should add implicit $order property', function() {
				test.selectize.addOptionGroup('group1', {});
				test.selectize.addOptionGroup('group2', {});
				assert.equal(test.selectize.optgroups['group1'].$order, 2);
				assert.equal(test.selectize.optgroups['group2'].$order, 3);
			});
		});

		describe('removeOptionGroup()', function() {
			var test;

			before(function() {
				test = setup_test('<select>', {valueField: 'value', labelField: 'value'});
			});
			it('should remove group', function() {
				var data = {label: 'Group Label'};
				test.selectize.addOptionGroup('group_id', data);
				test.selectize.removeOptionGroup('group_id');
				expect(test.selectize.optgroups).to.not.have.property('group_id');
			});
		});

		describe('clearOptionGroups()', function() {
			var test;

			before(function() {
				test = setup_test('<select>', {valueField: 'value', labelField: 'value'});
			});
			it('should clear all groups', function() {
				var data = {label: 'Group Label'};
				test.selectize.addOptionGroup('group_id', data);
				test.selectize.addOptionGroup('group_id2', data);
				test.selectize.clearOptionGroups();
				expect(test.selectize.optgroups).to.deep.equal({});
			});
		});

		describe('addOption()', function() {
			var test;
			before(function() {
				test = setup_test('<select>', {valueField: 'value', labelField: 'value'});
			});

			it('should add implicit $order property', function() {
				var opt1 = {value: 'hello'};
				var opt2 = {value: 'world'};
				test.selectize.addOption(opt1);
				test.selectize.addOption(opt2);
				assert.deepEqual(test.selectize.options, {
					'hello': {value: 'hello', $order: 1},
					'world': {value: 'world', $order: 2}
				});
			});
			it('should allow string values', function() {
				test.selectize.addOption({value: 'stringtest'});
				expect(test.selectize.options).to.have.property('stringtest');
			});
			it('should not allow null / undefined values', function() {
				test.selectize.addOption({value: undefined});
				test.selectize.addOption({value: null});
				expect(test.selectize.options).to.not.have.property('undefined');
				expect(test.selectize.options).to.not.have.property('null');
				expect(test.selectize.options).to.not.have.property('');
			});
			it('should allow integer values', function() {
				test.selectize.addOption({value: 0});
				test.selectize.addOption({value: 1});
				expect(test.selectize.options).to.have.property('0');
				expect(test.selectize.options).to.have.property('1');
			});
			it('should allow arrays of options', function() {
				test.selectize.addOption([{value: 'a'}, {value: 'b'}]);
				expect(test.selectize.options).to.have.property('a');
				expect(test.selectize.options).to.have.property('b');
			});
			it('should not override existing options', function() {
				test.selectize.addOption([{value: 'a'}, {value: 'b'}]);
				test.selectize.addOption({value: 'a', test: 'hello'});
				expect(test.selectize.options.a).to.not.have.property('test');
			});
		});

		describe('addItem()', function() {
			var test;

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
						{value: 'c'},
						{value: 'x'},
						{value: '$1'},
						{value: '\''},
						{value: '"'},
						{value: '\\\''},
						{value: '\\"'},
					]
				});
			});
			it('should update "items" array', function() {
				test.selectize.addItem('b');
				expect(test.selectize.items.indexOf('b')).to.be.equal(0);
			});
			it('should not give control focus', function(done) {
				test.selectize.addItem(0);
				window.setTimeout(function() {
					expect(test.selectize.isFocused).to.be.equal(false);
					done();
				}, 0);
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
			it('should not fire "change" if silent is truthy', function(done) {
				var watcher = function(e) { throw new Error('Change fired'); };
				test.$select.on('change', watcher);
				test.selectize.addItem('x', true);
				expect(test.selectize.items.indexOf('x')).to.not.be.equal(-1);
				window.setTimeout(function() {
					test.$select.off('change', watcher);
					done();
				}, 0);
			});
			it('should update DOM', function() {
				test.selectize.addItem('c');
				expect(test.selectize.$control.find('[data-value=c]').length).to.be.equal(1);

				test.selectize.addItem('$1');
				var found = false;
				test.selectize.$control.children().each(function() {
					if (this.getAttribute('data-value') === '$1') {
						found = true;
						return false;
					}
				});
				expect(found).to.be.equal(true);
			});
		});

		describe('updateOption()', function() {
			var test;

			before(function() {
				test = setup_test('<select multiple>', {
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
						{value: 'f'},
						{value: 'x'},
						{value: 'null'},
						{value: 'undefined'},
						{value: '\''},
						{value: '"'},
						{value: '\\\''},
						{value: '\\"'},
					],
					items: ['e','f']
				});
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
			it('should maintain implicit $order property', function() {
				var order_orig = test.selectize.options['x'].$order;
				assert.isNumber(order_orig);
				test.selectize.updateOption('x', {value: 'x', something: 'x'});
				assert.equal(test.selectize.options['x'].$order, order_orig);
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
			it('should update DOM', function() {
				test.selectize.updateOption('f', {value: 'f_updated'});
				expect(test.selectize.$control.find('[data-value=f]').length).to.be.equal(0);
				expect(test.selectize.$control.find('[data-value=f_updated]').length).to.be.equal(1);
			});
		});

		describe('getOption()', function() {
			var test;

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
						{value: '\\'},
						{value: '"'},
						{value: '\\\''},
						{value: '\\"'},
					]
				});
				test.selectize.refreshOptions(true);
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
				expect(test.selectize.getOption('\\')).to.be.ok;
				expect(test.selectize.getOption('\\').length).to.be.equal(1);
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

		describe('getItem()', function() {
			var test;

			before(function() {
				test = setup_test('<select multiple>', {
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
						{value: '\\"'}
					],
					items: ['0','1','a','b','\'','"','\\\'','\\"']
				});
			});
			it('should allow string values', function() {
				expect(test.selectize.getItem('a')).to.be.ok;
				expect(test.selectize.getItem('a').length).to.be.equal(1);
				expect(test.selectize.getItem('b')).to.be.ok;
				expect(test.selectize.getItem('b').length).to.be.equal(1);
			});
			it('should allow integer values', function() {
				expect(test.selectize.getItem(0)).to.be.ok;
				expect(test.selectize.getItem(0).length).to.be.equal(1);
				expect(test.selectize.getItem(1)).to.be.ok;
				expect(test.selectize.getItem(1).length).to.be.equal(1);
			});
			it('should allow values with quotation marks', function() {
				expect(test.selectize.getItem('\'')).to.be.ok;
				expect(test.selectize.getItem('\'').length).to.be.equal(1);
				expect(test.selectize.getItem('"')).to.be.ok;
				expect(test.selectize.getItem('"').length).to.be.equal(1);
			});
			it('should allow values with backslashes', function() {
				expect(test.selectize.getItem('\\\'')).to.be.ok;
				expect(test.selectize.getItem('\\\'').length).to.be.equal(1);
				expect(test.selectize.getItem('\\"')).to.be.ok;
				expect(test.selectize.getItem('\\"').length).to.be.equal(1);
			});
			it('should not allow undefined / null values', function() {
				expect(test.selectize.getItem(null)).to.be.ok;
				expect(test.selectize.getItem(null).length).to.be.equal(0);
				expect(test.selectize.getItem(undefined)).to.be.ok;
				expect(test.selectize.getItem(undefined).length).to.be.equal(0);
			});
		});

		describe('clear()', function() {
			var test;

			beforeEach(function() {
				test = setup_test('<select multiple>', {
					valueField: 'value',
					labelField: 'value',
					options: [
						{value: 0},
						{value: 1},
						{value: 2},
						{value: 3},
					],
					items: ['1','2','3']
				});
			});
			it('should empty "$activeItems" array', function() {
				test.selectize.setActiveItem(test.selectize.getItem('1'));
				expect(test.selectize.$activeItems.length).to.be.equal(1);
				test.selectize.clear();
				expect(test.selectize.$activeItems.length).to.be.equal(0);
			});
			it('should refresh option list (dropdown)', function(done) {
				// test = setup_test('<select multiple>', {
				// 	valueField: 'value',
				// 	labelField: 'value',
				// 	options: [
				// 		{value: 0},
				// 		{value: 1},
				// 		{value: 2},
				// 		{value: 3},
				// 	],
				// 	items: ['1','2','3']
				// });

				test.selectize.focus();
				window.setTimeout(function() {
					test.selectize.clear();
					test.selectize.focus();
					window.setTimeout(function() {
						expect(test.selectize.$dropdown_content.find('[data-value=1]').length).to.be.equal(1);
						expect(test.selectize.$dropdown_content.find('[data-value=2]').length).to.be.equal(1);
						expect(test.selectize.$dropdown_content.find('[data-value=3]').length).to.be.equal(1);
						done();
					}, 0);
				}, 0);
			});
			it('should empty "items" array', function() {
				test.selectize.clear();
				expect(test.selectize.items.length).to.be.equal(0);
			});
			it('should update DOM', function() {
				test.selectize.clear();
				expect(test.selectize.$control.find('[data-value=1]').length).to.be.equal(0);
				expect(test.selectize.$control.find('[data-value=2]').length).to.be.equal(0);
				expect(test.selectize.$control.find('[data-value=3]').length).to.be.equal(0);
			});
			it('should not fire "change" if silent is truthy', function(done) {
				var watcher = function(e) { throw new Error('Change fired'); };
				test.$select.on('change', watcher);
				test.selectize.clear(true);
				window.setTimeout(function() {
					test.$select.off('change', watcher);
					done();
				}, 0);
			});
			it('should not give control focus', function(done) {
				test.selectize.clear();
				window.setTimeout(function() {
					expect(test.selectize.isFocused).to.be.equal(false);
					done();
				}, 0);
			});
			it('should empty "items" array', function() {
				test.selectize.clear();
				expect(test.selectize.items.length).to.be.equal(0);
			});
		});

		describe('search()', function() {
			it('should throw error if "score" setting does not return a function', function() {
				var test;

				expect(function() {
					test = setup_test('<select multiple>', {
						valueField: 'value',
						labelField: 'value',
						options: [
							{value: 0},
							{value: 1}
						],
						score: function() { }
					});
					test.selectize.search('hello');
				}).to.throw(Error);
			});
			it('should not throw error if "score" setting does return a function', function() {
				var test;

				expect(function() {
					test = setup_test('<select multiple>', {
						valueField: 'value',
						labelField: 'value',
						options: [
							{value: 0},
							{value: 1}
						],
						score: function(query) {
							return function(item) { return 0; };
						}
					});
					test.selectize.search('hello');
				}).to.not.throw(Error);
			});
		});

		describe('getScoreFunction()', function() {
			it('should return an function that returns a number', function() {
				var test = setup_test('<select multiple>', {
					valueField: 'value',
					labelField: 'value',
					searchField: 'value',
					options: []
				});
				var fn = test.selectize.getScoreFunction('test');
				expect(typeof fn).to.be.equal('function');
				expect(typeof fn({value: 'test'})).to.be.equal('number');
				expect(fn({value: 'test'})).to.be.above(0);
			});
		});

		describe('destroy()', function() {
			var has_namespaced_event = function($el, ns) {
				var i, n, key;
				var data = ($._data || $.data).apply($, [$(window)[0], 'events']);
				ns = ns.replace(/^./, '');
				for (key in data) {
					if (data.hasOwnProperty(key)) {
						for (i = 0, n = data[key].length; i < n; i++) {
							if (data[key][i].namespace.indexOf(ns) !== -1) {
								return true;
							}
						}
					}
				}

				return false;
			};
			it('should remove control from DOM', function() {
				var test = setup_test('<select>', {});
				test.selectize.destroy();
				expect($.contains(document.documentElement, test.selectize.$wrapper[0])).to.be.equal(false);
			});
			it('should delete "selectize" reference on original input element', function() {
				var test = setup_test('<select>', {});
				test.selectize.destroy();
				expect(test.selectize.$input[0].selectize).to.be.equal(undefined);
			});
			it('should unbind events on window', function() {
				var test = setup_test('<select>', {});
				test.selectize.destroy();
				expect(has_namespaced_event($(window), test.selectize.eventNS)).to.be.equal(false);
			});
			it('should unbind events on document', function() {
				var test = setup_test('<select>', {});
				test.selectize.destroy();
				expect(has_namespaced_event($(document), test.selectize.eventNS)).to.be.equal(false);
			});
			it('should unbind events on <body>', function() {
				var test = setup_test('<select>', {});
				test.selectize.destroy();
				expect(has_namespaced_event($('body'), test.selectize.eventNS)).to.be.equal(false);
			});
			it('should restore original options and tabindex', function() {
				var children = '<optgroup label="Swedish Cars">' +
					'<option value="volvo">Volvo</option>' +
					'<option value="saab">Saab</option>' +
				'</optgroup>' +
				'<optgroup label="German Cars">' +
					'<option value="mercedes">Mercedes</option>' +
					'<option value="audi">Audi</option>' +
				'</optgroup>';
				var test = setup_test('<select tabindex="9999">' + children + '</select>', {});
				test.selectize.destroy();
				expect(test.$select.html()).to.be.equal(children);
				expect(test.$select.attr('tabindex')).to.be.equal('9999');
			});
			it('should remove tabindex if it was originally undefined', function() {
				var test = setup_test('<select>', {});
				test.selectize.destroy();
				expect(test.$select.attr('tabindex')).to.be.equal(undefined);
			});
		});

		describe('clearCache()', function() {
			var test;

			before(function() {
				test = setup_test('<select multiple>', {
					valueField: 'value',
					labelField: 'value',
					options: [
						{value: 0},
						{value: 1},
						{value: 2},
						{value: 3},
					],
					items: ['1','2','3']
				});
				test.selectize.advanceSelection(1);
				test.selectize.refreshOptions(true);
				test.selectize.refreshItems();
			});
			it('should clear the whole renderCache', function () {
				expect($.isEmptyObject(test.selectize.renderCache)).to.be.equal(false);
				test.selectize.clearCache();
				expect($.isEmptyObject(test.selectize.renderCache)).to.be.equal(true);
			});
			it('should allow clearing just one template type from the renderCache', function () {
				test.selectize.render('item', test.selectize.options[0]);
				test.selectize.refreshOptions();
				expect($.isEmptyObject(test.selectize.renderCache['option'])).to.be.equal(false);
				expect($.isEmptyObject(test.selectize.renderCache['item'])).to.be.equal(false);
				test.selectize.clearCache('option');
				expect($.isEmptyObject(test.selectize.renderCache['option'])).to.be.equal(true);
				expect($.isEmptyObject(test.selectize.renderCache['item'])).to.be.equal(false);
			});
		});

	});

})();
