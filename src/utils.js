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

var getSelection = function(input) {
	var result = {};
	if ('selectionStart' in input) {
		result.start = input.selectionStart;
		result.length = input.selectionEnd - result.start;
	} else if (document.selection) {
		input.focus();
		var sel = document.selection.createRange();
		var selLen = document.selection.createRange().text.length;
		sel.moveStart('character', -input.value.length);
		result.start = sel.text.length - selLen;
		result.length = selLen;
	}
	return result;
};

var transferStyles = function($from, $to, properties) {
	var styles = {};
	if (properties) {
		for (var i = 0; i < properties.length; i++) {
			styles[properties[i]] = $from.css(properties[i]);
		}
	} else {
		styles = $from.css();
	}
	$to.css(styles);
	return $to;
};

var measureString = function(str, $parent) {
	var $test = $('<test>').css({
		width: 'auto',
		padding: 0,
		whiteSpace: 'nowrap'
	}).text(str).appendTo('body');

	transferStyles($parent, $test, [
		'letterSpacing',
		'fontSize',
		'fontFamily',
		'fontWeight'
	]);

	var width = $test.width();
	$test.remove();

	return width;
};

var autoGrow = function($input) {
	var update = function(e) {
		e = e || window.event;
		var value = $input.val();
		if (e.type && e.type.toLowerCase() === 'keydown') {
			var keyCode = e.keyCode;
			var printable = (
				(keyCode >= 97 && keyCode <= 122) || // a-z
				(keyCode >= 65 && keyCode <= 90)  || // A-Z
				(keyCode >= 48 && keyCode <= 57)  || // 0-9
				keyCode == 32 // space
			);

			if (printable) {
				var shift = e.shiftKey;
				var character = String.fromCharCode(e.keyCode);
				if (shift) character = character.toUpperCase();
				else character = character.toLowerCase();
				value += character;
			}
		}
		var placeholder = $input.attr('placeholder') || '';
		if (!value.length && placeholder.length) {
			value = placeholder;
		}
		var width = measureString(value, $input) + 4;
		if (width !== $input.width()) {
			$input.width(width);
			$input.triggerHandler('resize');
		}
	};
	$input.on('keydown keyup update blur', update);
	update({});
};