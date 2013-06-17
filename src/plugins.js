var Plugins = {};

Plugins.mixin = function(Interface, interfaceName) {
	Interface.plugins = {};

	/**
	 * Initializes the provided functions.
	 * Acceptable formats:
	 *
	 * List (without options):
	 *   ['a', 'b', 'c']
	 *
	 * List (with options)
	 *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
	 *
	 * @param {mixed} plugins
	 */
	Interface.prototype.loadPlugins = function(plugins) {
		var i, n, key;
		this.plugins = [];
		this.pluginSettings = {};

		if ($.isArray(plugins)) {
			for (i = 0, n = plugins.length; i < n; i++) {
				this.loadPlugin(plugins[i]);
			}
		} else if (plugins) {
			this.pluginSettings = $.extend({}, plugins);
			for (key in plugins) {
				if (plugins.hasOwnProperty(key)) {
					this.loadPlugin(key);
				}
			}
		}
	};

	/**
	 * Initializes a plugin.
	 *
	 * @param {string} name
	 */
	Interface.prototype.loadPlugin = function(name) {
		var plugin, i, n;

		if (this.plugins.indexOf(name) !== -1) return;
		if (!Interface.plugins.hasOwnProperty(name)) {
			throw new Error(interfaceName + ' unable to find "' +  name + '" plugin');
		}

		plugin = Interface.plugins[name];

		// initialize plugin and dependencies
		this.plugins.push(name);
		for (i = 0, n = plugin.dependencies.length; i < n; i++) {
			this.loadPlugin(plugin.dependencies[i]);
		}
		plugin.fn.apply(this, [this.pluginSettings[name] || {}]);
	};

	/**
	 * Registers a plugin.
	 *
	 * @param {string} name
	 * @param {array} dependencies (optional)
	 * @param {function} fn
	 */
	Interface.registerPlugin = function(name) {
		var args = arguments;
		Interface.plugins[name] = {
			'name'         : name,
			'fn'           : args[args.length - 1],
			'dependencies' : args.length === 3 ? args[1] : []
		};
	};
};