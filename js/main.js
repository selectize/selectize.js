$(function() {
	$('script.show').each(function() {
		var $a, $pre;
		var self = this;
		var code, lines, indent, lineindent, i, n;

		// re-indent code and add to <pre>
		code = this.text;
		if (code && code.length) {
			lines = code.split('\n');
			indent = null;

			for (i = 0, n = lines.length; i < n; i++) {
				if (/^[\t ]*$/.test(lines[i])) continue;
				if (!indent) {
					lineindent = lines[i].match(/^([\t ]+)/);
					if (!lineindent) break;
					indent = lineindent[1];
				}
				lines[i] = lines[i].replace(new RegExp('^' + indent), '');
			}

			var code = hljs.highlight('javascript', $.trim(lines.join('\n')).replace(/	/g, '    ')).value;
			$a = $('<a href="javascript:void(0)" class="toggle-code closed">Show Code</a>');
			$pre = $('<pre>').hide().html('<code class="javascript">' + code + '</code>');

			$a.on('click', function() {
				var state = !$pre.is(':visible');
				$pre.toggle(state);
				$a.toggleClass('open', state);
				$a.toggleClass('closed', !state);
				$a.html(state ? 'Hide Code' : 'Show Code');
			});

			$pre.insertAfter(self);
			$a.insertAfter(self);

		}
	});

	// show current input values
	$('select.selectized,input.selectized').each(function() {
		var $container = $('<div>').addClass('value').html('Current Value: ');
		var $value = $('<span>').appendTo($container);
		var $input = $(this);
		var update = function(e) { $value.text(JSON.stringify($input.val())); }

		$(this).on('change', update);
		update();

		$container.insertAfter($input.next());
	});
});