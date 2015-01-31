## Selectize API – Plugins

Via the [microplugin](https://github.com/brianreavis/microplugin.js) interface,
features can be added to Selectize without modifying the main library.
This is great because it protects against code bloat, allows for lean builds,
and allows for addons to be sanely isolated. The plugin system isn't meant
to be sexy; it's lean, makes very few assumptions, and gives the developer
complete control.

[**Example Plugins**](../src/plugins)

**A few notes:**
- All plugins live in their own folders in ["src/plugins"](../src/plugins).
- Plugin names should be in follow the format: `/[a-z_]+$`
- JS source should live in a "plugin.js" file (required).
- CSS should live in a "plugin.less" file (optional). It will be bundled at build time.
- Plugins are initialized right before the control is setup.
  This means that if you want to listen for events on any of the control's
  elements, you should override the `setup()` method (see ["DOM Events"](#dom-events)).

### Boilerplate

```js
Selectize.define('plugin_name', function(options) {
	// options: plugin-specific options
	// this: selectize instance
});
```

#### Adding Dependencies

```js
Selectize.define('plugin_name', function(options) {
	this.require('another_plugin');
});
```

## Overriding Methods

Methods should be extended by [wrapping them](http://coreymaynard.com/blog/extending-a-javascript-function/):

```js
var self = this;
this.someMethod = (function() {
	var original = self.someMethod;
	return function() {
		// do your logic
		return original.apply(this, arguments);
	};
})();
```

**Important:** If the method you're overriding returns a value, make sure the
overridden function returns a value as well.

## DOM Events

Because all elements for the control are created within the `setup()` method (which is
invoked after the plugin initialized) events should be added by overriding the setup method,
like so:

```js
Selectize.define('plugin_name', function(options) {
	var self = this;

	// override the setup method to add an extra "click" handler
	this.setup = (function() {
		var original = self.setup;
		return function() {
			original.apply(this, arguments);
			this.$control.on('click', 'div', function(e) {
				alert('A div was clicked!');
			});
		};
	})();

});
```

## Plugin Usage

#### List (without options)

```js
$('select').selectize({
	plugins: ['plugin_a', 'plugin_b']
});
```

#### List (with options)

```js
$('select').selectize({
	plugins: {
		'plugin_a': { /* ... */ },
		'plugin_b': { /* ... */ }
	}
});
```

For a more detailed description of plugin option formats and how the plugin system works, check out the [microplugin](https://github.com/brianreavis/microplugin.js) documentation.
