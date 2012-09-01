var isset = function(object) {
	return typeof object !== 'undefined';
};

var htmlEntities = function(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

var quoteRegExp = function(str) {
	return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
};

var once = function(fn) {
	var called = false;
	return function() {
		if (called) return;
		called = true;
		fn.apply(this, arguments);
	};
};

var getCaretPosition = function(input) {
	if ('selectionStart' in input) {
		return input.selectionStart;
	} else if (document.selection) {
		input.focus();
		var sel = document.selection.createRange();
		var selLen = document.selection.createRange().text.length;
		sel.moveStart('character', -input.value.length);
		return sel.text.length - selLen;
	}
};