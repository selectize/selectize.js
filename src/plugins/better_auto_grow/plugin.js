/**
 * Plugin: "better_auto_grow" (selectize.js)
 *
 * @author Marco Tisi <marco DOT tisi AT gmail DOT com>
 */

Selectize.define('better_auto_grow', function (options) {
  var self = this;

  // create test input if doesn't exists
  if (!Selectize.$test_input) {
    Selectize.$test_input = $('<test>').css({
      position: 'absolute',
      top: -99999,
      left: -99999,
      width: 'auto',
      padding: 0,
      whiteSpace: 'pre'
    }).appendTo('body');
  }

  // override the setup method
  this.setup = (function () {
    var original = self.setup;
    var KEY_BACKSPACE = 8;
    var KEY_DELETE = 46;

    // use same function as selectize.js
    var transferStyles = function ($from, $to, properties) {
      var i, n, styles = {};
      if (properties) {
        for (i = 0, n = properties.length; i < n; i++) {
          styles[properties[i]] = $from.css(properties[i]);
        }
      } else {
        styles = $from.css();
      }
      $to.css(styles);
    };

    // use same function as selectize.js
    var getSelection = function (input) {
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

    return function () {
      original.apply(this, arguments);

      var currentWidth = null;
      var autoGrow = function (e, options) {
        var value, keyCode, printable, placeholder, width;
        var shift, character, selection;
        e = e || window.event || {};
        options = options || {};

        if (e.metaKey || e.altKey) return;
        if (!options.force && self.$control_input.data('grow') === false) return;

        value = self.$control_input.val();
        if (e.type && e.type.toLowerCase() === 'keydown') {
          keyCode = e.keyCode;
          printable = (
            (keyCode >= 97 && keyCode <= 122) || // a-z
            (keyCode >= 65 && keyCode <= 90) || // A-Z
            (keyCode >= 48 && keyCode <= 57) || // 0-9
            keyCode === 32 // space
          );

          if (keyCode === KEY_DELETE || keyCode === KEY_BACKSPACE) {
            selection = getSelection(self.$control_input[0]);
            if (selection.length) {
              value = value.substring(0, selection.start) + value.substring(selection.start + selection.length);
            } else if (keyCode === KEY_BACKSPACE && selection.start) {
              value = value.substring(0, selection.start - 1) + value.substring(selection.start + 1);
            } else if (keyCode === KEY_DELETE && typeof selection.start !== 'undefined') {
              value = value.substring(0, selection.start) + value.substring(selection.start + 1);
            }
          } else if (printable) {
            shift = e.shiftKey;
            character = String.fromCharCode(e.keyCode);
            if (shift) character = character.toUpperCase();
            else character = character.toLowerCase();
            value += character;
          }
        }

        placeholder = self.$control_input.attr('placeholder');
        if (!value && placeholder) {
          value = placeholder;
        }

        if (!value) {
          width = 0;
        } else {
          transferStyles(self.$control_input, Selectize.$test_input, [
            'letterSpacing',
            'fontSize',
            'fontFamily',
            'fontWeight',
            'textTransform'
          ]);
          Selectize.$test_input.text(value);
          width = Selectize.$test_input.width() + 4;
        }
        width += 4;
        if (width !== currentWidth) {
          currentWidth = width;
          self.$control_input.width(width);
          self.$control_input.triggerHandler('resize');
        }
      };

      self.$control_input
        .off('keydown keyup update blur')
        .on({
          keydown: function () {
            return self.onKeyDown.apply(self, arguments);
          },
          keyup: function () {
            return self.onKeyUp.apply(self, arguments);
          },
          blur: function () {
            return self.onBlur.apply(self, arguments);
          }
        })
        .on('keydown keyup update blur', autoGrow);
      autoGrow();
    }
  })();
});
