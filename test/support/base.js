window.expect = chai.expect;
window.assert = chai.assert;
window.has_focus = function(elem) {
	return !!(elem === document.activeElement);
};

var sandbox = document.createElement('form');
document.body.appendChild(sandbox);

window.setup_test = function(html, options, callback) {
	if (window.test_last) window.test_last.teardown();

	var $select = $(html).appendTo(sandbox).selectize(options);
	var instance = $select[0].selectize;
	var test = window.test_last = {
		$select: $select,
		callback: callback,
		selectize: instance,
		teardown: function() {
			instance.destroy();
			$select.remove();
			window.test_last = null;
		}
	};

	return test;
};

after(function() {
	if (window.test_last) {
		window.test_last.teardown();
	}
});

$(sandbox).on('submit', function(e) { e.preventDefault(); });