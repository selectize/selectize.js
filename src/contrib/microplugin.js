/**
 * microplugin.js
 * Copyright (c) 2013 Brian Reavis & contributors
 * Copyright (c) 2022 Selectize Team & contributors
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
 * @author Ris Adams <selectize@risadams.com>
 */

/**
 * Keep code modularized & extensible.
 * MicroPlugin is a lightweight drop-in plugin architecture for your JavaScript library.
 *  Plugins can declare dependencies to other plugins and can be initialized with options (in a variety of formats).
 *
 * @class MicroPlugin
 * @constructor
 * @param {array|object} items
 * @param {object} items
 */
var MicroPlugin = {};
MicroPlugin.mixin = function (Interface) {

  /**
   * @memberof MicroPlugin
   */
  Interface.plugins = {};

  /**
   * Initializes the listed plugins (with options).
   * Acceptable formats:
   *
   * - List (without options): - `['a', 'b', 'c']`
   * - List (with options): - `[{'name': 'a', options: {}}, {'name': 'b', options: {}}]`
   * - Hash (with options): - `{'a': { ... }, 'b': { ... }, 'c': { ... }}`
   *
   * @param {mixed} plugins
   * @memberof MicroPlugin
   */
  Interface.prototype.initializePlugins = function (plugins) {
    var i, n, key;
    var self = this;
    var queue = [];

    self.plugins = {
      names: [],
      settings: {},
      requested: {},
      loaded: {}
    };

    if (isArray(plugins)) {
      for (i = 0, n = plugins.length; i < n; i++) {
        if (typeof plugins[i] === 'string') {
          queue.push(plugins[i]);
        } else {
          self.plugins.settings[plugins[i].name] = plugins[i].options;
          queue.push(plugins[i].name);
        }
      }
    } else if (plugins) {
      for (key in plugins) {
        if (plugins.hasOwnProperty(key)) {
          self.plugins.settings[key] = plugins[key];
          queue.push(key);
        }
      }
    }

    while (queue.length) {
      self.require(queue.shift());
    }
  };


  /** Loads a plugin.
   * @param {string} name - The name of the plugin to load.
   *
   * @memberof MicroPlugin
   */
  Interface.prototype.loadPlugin = function (name) {
    var self = this;
    var plugins = self.plugins;
    var plugin = Interface.plugins[name];

    if (!Interface.plugins.hasOwnProperty(name)) {
      throw new Error('Unable to find "' + name + '" plugin');
    }

    plugins.requested[name] = true;
    plugins.loaded[name] = plugin.fn.apply(self, [self.plugins.settings[name] || {}]);
    plugins.names.push(name);
  };

  /**
   * Initializes a plugin.
   *
   * @param {string} name
   * @memberof MicroPlugin
   */
  Interface.prototype.require = function (name) {
    var self = this;
    var plugins = self.plugins;

    if (!self.plugins.loaded.hasOwnProperty(name)) {
      if (plugins.requested[name]) {
        throw new Error('Plugin has circular dependency ("' + name + '")');
      }
      self.loadPlugin(name);
    }

    return plugins.loaded[name];
  };

  /**
   * Registers a plugin.
   *
   * @param {string} name
   * @param {function} fn
   *
   * @memberof MicroPlugin
   */
  Interface.define = function (name, fn) {
    Interface.plugins[name] = {
      'name': name,
      'fn': fn
    };
  };
};
