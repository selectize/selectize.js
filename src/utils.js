/**
 * selectize - A highly customizable select control with autocomplete.
 * Copyright (c) 2012 Brian Reavis
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 */

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

/**
 * A workaround for http://bugs.jquery.com/ticket/6696
 *
 * @param {object} $parent - Parent element to listen on.
 * @param {string} event - Event name.
 * @param {string} selector - Descendant selector to filter by.
 * @param {function} fn - Event handler.
 */
var watchChildEvent = function($parent, event, selector, fn) {
	$parent.on(event, selector, function(e) {
		var child = e.target;
		while (child && child.parentNode !== $parent[0]) {
			child = child.parentNode;
		}
		e.currentTarget = child;
		return fn.apply(this, [e]);
	});
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
		position: 'absolute',
		top: -99999,
		left: -99999,
		width: 'auto',
		padding: 0,
		whiteSpace: 'nowrap'
	}).text(str).appendTo('body');

	transferStyles($parent, $test, [
		'letterSpacing',
		'fontSize',
		'fontFamily',
		'fontWeight',
		'textTransform'
	]);

	var width = $test.width();
	$test.remove();

	return width;
};

var autoGrow = function($input) {
	var update = function(e) {
		var value, keyCode, printable, placeholder, width;
		var shift, character;

		e = e || window.event;
		value = $input.val();
		if (e.type && e.type.toLowerCase() === 'keydown') {
			keyCode = e.keyCode;
			printable = (
				(keyCode >= 97 && keyCode <= 122) || // a-z
				(keyCode >= 65 && keyCode <= 90)  || // A-Z
				(keyCode >= 48 && keyCode <= 57)  || // 0-9
				keyCode == 32 // space
			);

			if (printable) {
				shift = e.shiftKey;
				character = String.fromCharCode(e.keyCode);
				if (shift) character = character.toUpperCase();
				else character = character.toLowerCase();
				value += character;
			}
		}

		placeholder = $input.attr('placeholder') || '';
		if (!value.length && placeholder.length) {
			value = placeholder;
		}

		width = measureString(value, $input) + 4;
		if (width !== $input.width()) {
			$input.width(width);
			$input.triggerHandler('resize');
		}
	};
	$input.on('keydown keyup update blur', update);
	update({});
};