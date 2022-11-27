/**
 * Selectize (v0.15.2)
 * https://selectize.dev
 *
 * Copyright (c) 2013-2015 Brian Reavis & contributors
 * Copyright (c) 2020-2022 Selectize Team & contributors
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
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.Selectize = factory(root.jQuery);
  }
}(this, function ($) {
  'use strict';
/**
 * highlight v3 | MIT license | Johann Burkard <jb@eaio.com>
 * Highlights arbitrary terms in a node.
 *
 * - Modified by Marshal <beatgates@gmail.com> 2011-6-24 (added regex)
 * - Modified by Brian Reavis <brian@thirdroute.com> 2012-8-27 (cleanup)
 */

var highlight = function ($element, pattern) {
  if (typeof pattern === 'string' && !pattern.length) return;
  var regex = (typeof pattern === 'string') ? new RegExp(pattern, 'i') : pattern;

  var highlight = function (node) {
    var skip = 0;
    // Wrap matching part of text node with highlighting <span>, e.g.
    // Soccer  ->  <span class="highlight">Soc</span>cer  for regex = /soc/i
    if (node.nodeType === 3) {
      var pos = node.data.search(regex);
      if (pos >= 0 && node.data.length > 0) {
        var match = node.data.match(regex);
        var spannode = document.createElement('span');
        spannode.className = 'highlight';
        var middlebit = node.splitText(pos);
        var endbit = middlebit.splitText(match[0].length);
        var middleclone = middlebit.cloneNode(true);
        spannode.appendChild(middleclone);
        middlebit.parentNode.replaceChild(spannode, middlebit);
        skip = 1;
      }
    }
    // Recurse element node, looking for child text nodes to highlight, unless element
    // is childless, <script>, <style>, or already highlighted: <span class="highlight">
    else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && (node.className !== 'highlight' || node.tagName !== 'SPAN')) {
      for (var i = 0; i < node.childNodes.length; ++i) {
        i += highlight(node.childNodes[i]);
      }
    }
    return skip;
  };

  return $element.each(function () {
    highlight(this);
  });
};

/**
 * removeHighlight fn copied from highlight v5 and
 * edited to remove with() and pass js strict mode
 */
$.fn.removeHighlight = function () {
  return this.find("span.highlight").each(function () {
    this.parentNode.firstChild.nodeName;
    var parent = this.parentNode;
    parent.replaceChild(this.firstChild, this);
    parent.normalize();
  }).end();
};

/**
 * MicroEvent - to make any js object an event emitter
 *
 * - pure javascript - server compatible, browser compatible
 * - don't rely on the browser doms
 * - super simple - you get it immediately, no mystery, no magic involved
 *
 * @author Jerome Etienne (https://github.com/jeromeetienne)
 */

var MicroEvent = function () { };
MicroEvent.prototype = {
  on: function (event, fct) {
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(fct);
  },
  off: function (event, fct) {
    var n = arguments.length;
    if (n === 0) return delete this._events;
    if (n === 1) return delete this._events[event];

    this._events = this._events || {};
    if (event in this._events === false) return;
    this._events[event].splice(this._events[event].indexOf(fct), 1);
  },
  trigger: function (event /* , args... */) {
    const events = this._events = this._events || {};
    if (event in events === false) return;
    for (var i = 0; i < events[event].length; i++) {
      events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }
};

/**
 * Mixin will delegate all MicroEvent.js function in the destination object.
 *
 * - MicroEvent.mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {object} the object which will support MicroEvent
 */
MicroEvent.mixin = function (destObject) {
  var props = ['on', 'off', 'trigger'];
  for (var i = 0; i < props.length; i++) {
    destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
  }
};

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


/**
 * sifter.js
 * Copyright (c) 2013–2020 Brian Reavis & contributors
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
 * Sifter is a client and server-side library (via UMD) for textually searching arrays and hashes of objects by property – or multiple properties. It's designed specifically for autocomplete. The process is three-step: score, filter, sort.
 *  - **Supports díåcritîçs.** - For example, if searching for "montana" and an item in the set has a value of "montaña", it will still be matched. Sorting will also play nicely with diacritics
 *  - **Smart scoring.** - Items are scored / sorted intelligently depending on where a match is found in the string (how close to the beginning) and what percentage of the string matches.
 *  - **Multi-field sorting**. - When scores aren't enough to go by – like when getting results for an empty query – it can sort by one or more fields. For example, sort by a person's first name and last name without actually merging the properties to a single string.
 *  - **Nested properties.** - Allows to search and sort on nested properties so you can perform search on complex objects without flattening them simply by using dot-notation to reference fields (ie. nested.property).
 *
 * @class Sifter
 *
 * @constructor
 * @param {array|object} items
 * @param {object} items
 */
var Sifter = function (items, settings) {
  this.items = items;
  this.settings = settings || { diacritics: true };
};

/**
 * Splits a search string into an array of individual
 * regexps to be used to match results.
 *
 * @param {string} query
 * @returns {array}
 */
Sifter.prototype.tokenize = function (query, respect_word_boundaries) {
  query = trim(String(query || '').toLowerCase());
  if (!query || !query.length) return [];

  var i, n, regex, letter;
  var tokens = [];
  var words = query.split(/ +/);

  for (i = 0, n = words.length; i < n; i++) {
    regex = escape_regex(words[i]);
    if (this.settings.diacritics) {
      for (letter in DIACRITICS) {
        if (DIACRITICS.hasOwnProperty(letter)) {
          regex = regex.replace(new RegExp(letter, 'g'), DIACRITICS[letter]);
        }
      }
    }
    if (respect_word_boundaries) regex = "\\b" + regex
    tokens.push({
      string: words[i],
      regex: new RegExp(regex, 'i')
    });
  }

  return tokens;
};

/**
 * Iterates over arrays and hashes.
 *
 * ```
 * this.iterator(this.items, function(item, id) {
 *    // invoked for each item
 * });
 * ```
 *
 * @param {array|object} object
 */
Sifter.prototype.iterator = function (object, callback) {
  var iterator;
  if (is_array(object)) {
    iterator = Array.prototype.forEach || function (callback) {
      for (var i = 0, n = this.length; i < n; i++) {
        callback(this[i], i, this);
      }
    };
  } else {
    iterator = function (callback) {
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          callback(this[key], key, this);
        }
      }
    };
  }

  iterator.apply(object, [callback]);
};

/**
 * Returns a function to be used to score individual results.
 *
 * Good matches will have a higher score than poor matches.
 * If an item is not a match, 0 will be returned by the function.
 *
 * @param {object|string} search
 * @param {object} options (optional)
 * @returns {function}
 */
Sifter.prototype.getScoreFunction = function (search, options) {
  var self, fields, tokens, token_count, nesting;

  self = this;
  search = self.prepareSearch(search, options);
  tokens = search.tokens;
  fields = search.options.fields;
  token_count = tokens.length;
  nesting = search.options.nesting;

  /**
   * Calculates how close of a match the
   * given value is against a search token.
   *
   * @param {mixed} value
   * @param {object} token
   * @return {number}
   */
  var scoreValue = function (value, token) {
    var score, pos;

    if (!value) return 0;
    value = String(value || '');
    pos = value.search(token.regex);
    if (pos === -1) return 0;
    score = token.string.length / value.length;
    if (pos === 0) score += 0.5;
    return score;
  };

  /**
   * Calculates the score of an object
   * against the search query.
   *
   * @param {object} token
   * @param {object} data
   * @return {number}
   */
  var scoreObject = (function () {
    var field_count = fields.length;
    if (!field_count) {
      return function () { return 0; };
    }
    if (field_count === 1) {
      return function (token, data) {
        return scoreValue(getattr(data, fields[0], nesting), token);
      };
    }
    return function (token, data) {
      for (var i = 0, sum = 0; i < field_count; i++) {
        sum += scoreValue(getattr(data, fields[i], nesting), token);
      }
      return sum / field_count;
    };
  })();

  if (!token_count) {
    return function () { return 0; };
  }
  if (token_count === 1) {
    return function (data) {
      return scoreObject(tokens[0], data);
    };
  }

  if (search.options.conjunction === 'and') {
    return function (data) {
      var score;
      for (var i = 0, sum = 0; i < token_count; i++) {
        score = scoreObject(tokens[i], data);
        if (score <= 0) return 0;
        sum += score;
      }
      return sum / token_count;
    };
  } else {
    return function (data) {
      for (var i = 0, sum = 0; i < token_count; i++) {
        sum += scoreObject(tokens[i], data);
      }
      return sum / token_count;
    };
  }
};

/**
 * Returns a function that can be used to compare two
 * results, for sorting purposes. If no sorting should
 * be performed, `null` will be returned.
 *
 * @param {string|object} search
 * @param {object} options
 * @return function(a,b)
 */
Sifter.prototype.getSortFunction = function (search, options) {
  var i, n, self, field, fields, fields_count, multiplier, multipliers, get_field, implicit_score, sort;

  self = this;
  search = self.prepareSearch(search, options);
  sort = (!search.query && options.sort_empty) || options.sort;

  /**
   * Fetches the specified sort field value
   * from a search result item.
   *
   * @param  {string} name
   * @param  {object} result
   * @return {mixed}
   */
  get_field = function (name, result) {
    if (name === '$score') return result.score;
    return getattr(self.items[result.id], name, options.nesting);
  };

  // parse options
  fields = [];
  if (sort) {
    for (i = 0, n = sort.length; i < n; i++) {
      if (search.query || sort[i].field !== '$score') {
        fields.push(sort[i]);
      }
    }
  }

  // the "$score" field is implied to be the primary
  // sort field, unless it's manually specified
  if (search.query) {
    implicit_score = true;
    for (i = 0, n = fields.length; i < n; i++) {
      if (fields[i].field === '$score') {
        implicit_score = false;
        break;
      }
    }
    if (implicit_score) {
      fields.unshift({ field: '$score', direction: 'desc' });
    }
  } else {
    for (i = 0, n = fields.length; i < n; i++) {
      if (fields[i].field === '$score') {
        fields.splice(i, 1);
        break;
      }
    }
  }

  multipliers = [];
  for (i = 0, n = fields.length; i < n; i++) {
    multipliers.push(fields[i].direction === 'desc' ? -1 : 1);
  }

  // build function
  fields_count = fields.length;
  if (!fields_count) {
    return null;
  } else if (fields_count === 1) {
    field = fields[0].field;
    multiplier = multipliers[0];
    return function (a, b) {
      return multiplier * cmp(
        get_field(field, a),
        get_field(field, b)
      );
    };
  } else {
    return function (a, b) {
      var i, result, a_value, b_value, field;
      for (i = 0; i < fields_count; i++) {
        field = fields[i].field;
        result = multipliers[i] * cmp(
          get_field(field, a),
          get_field(field, b)
        );
        if (result) return result;
      }
      return 0;
    };
  }
};

/**
 * Parses a search query and returns an object
 * with tokens and fields ready to be populated
 * with results.
 *
 * @param {string} query
 * @param {object} options
 * @returns {object}
 */
Sifter.prototype.prepareSearch = function (query, options) {
  if (typeof query === 'object') return query;

  options = extend({}, options);

  var option_fields = options.fields;
  var option_sort = options.sort;
  var option_sort_empty = options.sort_empty;

  if (option_fields && !is_array(option_fields)) options.fields = [option_fields];
  if (option_sort && !is_array(option_sort)) options.sort = [option_sort];
  if (option_sort_empty && !is_array(option_sort_empty)) options.sort_empty = [option_sort_empty];

  return {
    options: options,
    query: String(query || '').toLowerCase(),
    tokens: this.tokenize(query, options.respect_word_boundaries),
    total: 0,
    items: []
  };
};

/**
 * Searches through all items and returns a sorted array of matches.
 *
 * The `options` parameter can contain:
 *
 *   - fields {string|array}
 *   - sort {array}
 *   - score {function}
 *   - filter {bool}
 *   - limit {integer}
 *
 * Returns an object containing:
 *
 *   - options {object}
 *   - query {string}
 *   - tokens {array}
 *   - total {int}
 *   - items {array}
 *
 * @param {string} query
 * @param {object} options
 * @returns {object}
 */
Sifter.prototype.search = function (query, options) {
  var self = this, value, score, search, calculateScore;
  var fn_sort;
  var fn_score;

  search = this.prepareSearch(query, options);
  options = search.options;
  query = search.query;

  // generate result scoring function
  fn_score = options.score || self.getScoreFunction(search);

  // perform search and sort
  if (query.length) {
    self.iterator(self.items, function (item, id) {
      score = fn_score(item);
      if (options.filter === false || score > 0) {
        search.items.push({ 'score': score, 'id': id });
      }
    });
  } else {
    self.iterator(self.items, function (item, id) {
      search.items.push({ 'score': 1, 'id': id });
    });
  }

  fn_sort = self.getSortFunction(search, options);
  if (fn_sort) search.items.sort(fn_sort);

  // apply limits
  search.total = search.items.length;
  if (typeof options.limit === 'number') {
    search.items = search.items.slice(0, options.limit);
  }

  return search;
};

// utilities
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var cmp = function (a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a > b ? 1 : (a < b ? -1 : 0);
  }
  a = asciifold(String(a || ''));
  b = asciifold(String(b || ''));
  if (a > b) return 1;
  if (b > a) return -1;
  return 0;
};

var extend = function (a, b) {
  var i, n, k, object;
  for (i = 1, n = arguments.length; i < n; i++) {
    object = arguments[i];
    if (!object) continue;
    for (k in object) {
      if (object.hasOwnProperty(k)) {
        a[k] = object[k];
      }
    }
  }
  return a;
};

/**
 * A property getter resolving dot-notation
 * @param  {Object}  obj     The root object to fetch property on
 * @param  {String}  name    The optionally dotted property name to fetch
 * @param  {Boolean} nesting Handle nesting or not
 * @return {Object}          The resolved property value
 */
var getattr = function (obj, name, nesting) {
  if (!obj || !name) return;
  if (!nesting) return obj[name];
  var names = name.split(".");
  while (names.length && (obj = obj[names.shift()]));
  return obj;
};

var trim = function (str) {
  return (str + '').replace(/^\s+|\s+$|/g, '');
};

var escape_regex = function (str) {
  return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
};

var is_array = Array.isArray || function (object) {
  return Object.prototype.toString.call(object) === '[object Array]';
};

var DIACRITICS = {
  'a': '[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]',
  'b': '[b␢βΒB฿𐌁ᛒ]',
  'c': '[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]',
  'd': '[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]',
  'e': '[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]',
  'f': '[fƑƒḞḟ]',
  'g': '[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]',
  'h': '[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]',
  'i': '[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]',
  'j': '[jȷĴĵɈɉʝɟʲ]',
  'k': '[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]',
  'l': '[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]',
  'n': '[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]',
  'o': '[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]',
  'p': '[pṔṕṖṗⱣᵽƤƥᵱ]',
  'q': '[qꝖꝗʠɊɋꝘꝙq̃]',
  'r': '[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]',
  's': '[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]',
  't': '[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]',
  'u': '[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]',
  'v': '[vṼṽṾṿƲʋꝞꝟⱱʋ]',
  'w': '[wẂẃẀẁŴŵẄẅẆẇẈẉ]',
  'x': '[xẌẍẊẋχ]',
  'y': '[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]',
  'z': '[zŹźẐẑŽžŻżẒẓẔẕƵƶ]'
};

var asciifold = (function () {
  var i, n, k, chunk;
  var i18nChars = '';
  var lookup = {};
  for (k in DIACRITICS) {
    if (DIACRITICS.hasOwnProperty(k)) {
      chunk = DIACRITICS[k].substring(2, DIACRITICS[k].length - 1);
      i18nChars += chunk;
      for (i = 0, n = chunk.length; i < n; i++) {
        lookup[chunk.charAt(i)] = k;
      }
    }
  }
  var regexp = new RegExp('[' + i18nChars + ']', 'g');
  return function (str) {
    return str.replace(regexp, function (i18nChar) {
      return lookup[i18nChar];
    }).toLowerCase();
  };
})();

/**
 * @var {boolean} IS_MAC Check if device is a Mac
 */
var IS_MAC = uaDetect("macOS", /Mac/);
/**
 * @var {number} KEY_A
 */
var KEY_A = 65;
/**
 * @var {number} KEY_COMMA
 */
var KEY_COMMA = 188;
/**
 * @var {number} KEY_RETURN
 */
var KEY_RETURN = 13;
/**
 * @var {number} KEY_ESC
 */
var KEY_ESC = 27;
/**
 * @var {number} KEY_LEFT
 */
var KEY_LEFT = 37;
/**
 * @var {number} KEY_UP
 */
var KEY_UP = 38;
/**
 * @var {number} KEY_P
 */
var KEY_P = 80;
/**
 * @var {number} KEY_RIGHT
 */
var KEY_RIGHT = 39;
/**
 * @var {number} KEY_DOWN
 */
var KEY_DOWN = 40;
/**
 * @var {number} KEY_N
 */
var KEY_N = 78;
/**
 * @var {number} KEY_BACKSPACE
 */
var KEY_BACKSPACE = 8;
/**
 * @var {number} KEY_DELETE
 */
var KEY_DELETE = 46;
/**
 * @var {number} KEY_SHIFT
 */
var KEY_SHIFT = 16;
/**
 * @var {number} KEY_CMD
 */
var KEY_CMD = IS_MAC ? 91 : 17;
/**
 * @var {number} KEY_CTRL
 */
var KEY_CTRL = IS_MAC ? 18 : 17;
/**
 * @var {number} KEY_TAB
 */
var KEY_TAB = 9;
/**
 * @var {number} TAG_SELECT
 */
var TAG_SELECT = 1;
/**
 * @var {number} TAG_INPUT
 */
var TAG_INPUT = 2;

/**
 * @var {number} SUPPORTS_VALIDITY_API Check if device support validity api, for now, android support in general is too spotty to support validity
 */
var SUPPORTS_VALIDITY_API = !uaDetect("Android", /android/i) && !!document.createElement('input').validity;

/**
 * Determines if the provided value has been defined.
 *
 * @param {mixed} object
 * @returns {boolean}
 */
var isset = function (object) {
  return typeof object !== 'undefined';
};

/**
 * This is a polyfill for the Array.isArray function.
 * Determines whether the passed obect is an Array.
 *
 * @param {object} vArg
 * @returns {Boolean} returns true if the passed object is an Array.
 *
 */
var isArray = Array.isArray || function (vArg) {
  return Object.prototype.toString.call(vArg) === '[object Array]';
}

/**
 * Converts a scalar to its best string representation
 * for hash keys and HTML attribute values.
 *
 * Transformations:
 *   'str'     -> 'str'
 *   null      -> ''
 *   undefined -> ''
 *   true      -> '1'
 *   false     -> '0'
 *   0         -> '0'
 *   1         -> '1'
 *
 * @param {string} value
 * @returns {string|null}
 */
var hash_key = function (value) {
  if (typeof value === 'undefined' || value === null) return null;
  if (typeof value === 'boolean') return value ? '1' : '0';
  return value + '';
};

/**
 * Escapes a string for use within HTML.
 *
 * @param {string} str
 * @returns {string}
 */
var escape_html = function (str) {
  return (str + '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Escapes "$" characters in replacement strings.
 *
 * @param {string} str
 * @returns {string}
 */
var escape_replace = function (str) {
  return (str + '').replace(/\$/g, '$$$$');
};

var hook = {};

/**
 * Wraps `method` on `self` so that `fn`
 * is invoked before the original method.
 *
 * @param {object} self
 * @param {string} method
 * @param {function} fn
 */
hook.before = function (self, method, fn) {
  var original = self[method];
  self[method] = function () {
    fn.apply(self, arguments);
    return original.apply(self, arguments);
  };
};

/**
 * Wraps `method` on `self` so that `fn`
 * is invoked after the original method.
 *
 * @param {object} self
 * @param {string} method
 * @param {function} fn
 */
hook.after = function (self, method, fn) {
  var original = self[method];
  self[method] = function () {
    var result = original.apply(self, arguments);
    fn.apply(self, arguments);
    return result;
  };
};

/**
 * Wraps `fn` so that it can only be invoked once.
 *
 * @param {function} fn
 * @returns {function}
 */
var once = function (fn) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    fn.apply(this, arguments);
  };
};

/**
 * Wraps `fn` so that it can only be called once
 * every `delay` milliseconds (invoked on the falling edge).
 *
 * @param {function} fn
 * @param {number} delay
 * @returns {function}
 */
var debounce = function (fn, delay) {
  var timeout;
  return function () {
    var self = this;
    var args = arguments;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(function () {
      fn.apply(self, args);
    }, delay);
  };
};

/**
 * Debounce all fired events types listed in `types`
 * while executing the provided `fn`.
 *
 * @param {object} self
 * @param {array} types
 * @param {function} fn
 */
var debounce_events = function (self, types, fn) {
  var type;
  var trigger = self.trigger;
  var event_args = {};

  // override trigger method
  self.trigger = function () {
    var type = arguments[0];
    if (types.indexOf(type) !== -1) {
      event_args[type] = arguments;
    } else {
      return trigger.apply(self, arguments);
    }
  };

  // invoke provided function
  fn.apply(self, []);
  self.trigger = trigger;

  // trigger queued events
  for (type in event_args) {
    if (event_args.hasOwnProperty(type)) {
      trigger.apply(self, event_args[type]);
    }
  }
};

/**
 * A workaround for http://bugs.jquery.com/ticket/6696
 *
 * @param {object} $parent - Parent element to listen on.
 * @param {string} event - Event name.
 * @param {string} selector - Descendant selector to filter by.
 * @param {function} fn - Event handler.
 */
var watchChildEvent = function ($parent, event, selector, fn) {
  $parent.on(event, selector, function (e) {
    var child = e.target;
    while (child && child.parentNode !== $parent[0]) {
      child = child.parentNode;
    }
    e.currentTarget = child;
    return fn.apply(this, [e]);
  });
};

/**
 * Determines the current selection within a text input control.
 * Returns an object containing:
 *   - start
 *   - length
 *
 * @param {object} input
 * @returns {object}
 */
var getInputSelection = function (input) {
  var result = {};
  if (input === undefined) {
    console.warn('WARN getInputSelection cannot locate input control');
    return result;
  }
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

/**
 * Copies CSS properties from one element to another.
 *
 * @param {object} $from
 * @param {object} $to
 * @param {array} properties
 */
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

/**
 * Measures the width of a string within a
 * parent element (in pixels).
 *
 * @param {string} str
 * @param {object} $parent
 * @returns {number}
 */
var measureString = function (str, $parent) {
  if (!str) {
    return 0;
  }

  if (!Selectize.$testInput) {
    Selectize.$testInput = $('<span />').css({
      position: 'absolute',
      width: 'auto',
      padding: 0,
      whiteSpace: 'pre'
    });

    $('<div />').css({
      position: 'absolute',
      width: 0,
      height: 0,
      overflow: 'hidden'
    }).append(Selectize.$testInput).appendTo('body');
  }

  Selectize.$testInput.text(str);

  transferStyles($parent, Selectize.$testInput, [
    'letterSpacing',
    'fontSize',
    'fontFamily',
    'fontWeight',
    'textTransform'
  ]);

  return Selectize.$testInput.width();
};

/**
 * Sets up an input to grow horizontally as the user
 * types. If the value is changed manually, you can
 * trigger the "update" handler to resize:
 *
 * $input.trigger('update');
 *
 * @param {object} $input
 */
var autoGrow = function ($input) {
  var currentWidth = null;

  var update = function (e, options) {
    var value, keyCode, printable, width;
    var placeholder, placeholderWidth;
    var shift, character, selection;
    e = e || window.event || {};
    options = options || {};

    if (e.metaKey || e.altKey) return;
    if (!options.force && $input.data('grow') === false) return;

    value = $input.val();
    if (e.type && e.type.toLowerCase() === 'keydown') {
      keyCode = e.keyCode;
      printable = (
        (keyCode >= 48 && keyCode <= 57) || // 0-9
        (keyCode >= 65 && keyCode <= 90) || // a-z
        (keyCode >= 96 && keyCode <= 111) || // numpad 0-9, numeric operators
        (keyCode >= 186 && keyCode <= 222) || // semicolon, equal, comma, dash, etc.
        keyCode === 32 // space
      );

      if (keyCode === KEY_DELETE || keyCode === KEY_BACKSPACE) {
        selection = getInputSelection($input[0]);
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

    placeholder = $input.attr('placeholder');
    if (placeholder) {
      placeholderWidth = measureString(placeholder, $input) + 4;
    } else {
      placeholderWidth = 0;
    }

    width = Math.max(measureString(value, $input), placeholderWidth) + 4;
    if (width !== currentWidth) {
      currentWidth = width;
      $input.width(width);
      $input.triggerHandler('resize');
    }
  };

  $input.on('keydown keyup update blur', update);
  update();
};

var domToString = function (d) {
  var tmp = document.createElement('div');

  tmp.appendChild(d.cloneNode(true));

  return tmp.innerHTML;
};

var logError = function (message, options) {
  if (!options) options = {};
  var component = "Selectize";

  console.error(component + ": " + message)

  if (options.explanation) {
    // console.group is undefined in <IE11
    if (console.group) console.group();
    console.error(options.explanation);
    if (console.group) console.groupEnd();
  }
};

/**
 * Determines whether or not the `data` argument is a valid JSON string.
 *
 * @param {String} data Data to test
 * @returns {Boolean} true if is an JSON object
 */
var isJSON = function (data) {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * If the browser supports the User-Agent Client Hint, then return the platform name, otherwise return
 * the result of a regular expression test on the user agent string
 *
 * @param platform - The platform you want to detect.
 * @param re - A regular expression that matches the user agent string.
 * @returns {Boolean} A boolean value.
 */
function uaDetect(platform, re) {
  if (navigator.userAgentData) {
    return platform === navigator.userAgentData.platform;
  }

  return re.test(navigator.userAgent);
}

/**
 * 
 * Selectize instance
 * @param {JQuery} $input Jquery object of target element to Selectized
 * @param {Object} settings Options to apply for selectized element
 * 
 */
var Selectize = function($input, settings) {
	var key, i, n, dir, input, self = this;
	input = $input[0];
	input.selectize = self;

	// detect rtl environment
	var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
	dir = computedStyle ? computedStyle.getPropertyValue('direction') : input.currentStyle && input.currentStyle.direction;
  dir = dir || $input.parents('[dir]:first').attr('dir') || '';
  
  self.settings = {};

	// setup default state
	$.extend(self, {
		order            : 0,
		settings         : settings,
		$input           : $input,
		tabIndex         : $input.attr('tabindex') || '',
		tagType          : input.tagName.toLowerCase() === 'select' ? TAG_SELECT : TAG_INPUT,
		rtl              : /rtl/i.test(dir),

		eventNS          : '.selectize' + (++Selectize.count),
		highlightedValue : null,
		isBlurring       : false,
		isOpen           : false,
		isDisabled       : false,
		isRequired       : $input.is('[required]'),
		isInvalid        : false,
		isLocked         : false,
		isFocused        : false,
		isInputHidden    : false,
		isSetup          : false,
		isShiftDown      : false,
		isCmdDown        : false,
		isCtrlDown       : false,
		ignoreFocus      : false,
		ignoreBlur       : false,
		ignoreHover      : false,
		hasOptions       : false,
		currentResults   : null,
		lastValue        : '',
		lastValidValue   : '',
		lastOpenTarget   : false,
		caretPos         : 0,
		loading          : 0,
		loadedSearches   : {},
    isDropdownClosing: false,

		$activeOption    : null,
		$activeItems     : [],

		optgroups        : {},
		options          : {},
		userOptions      : {},
		items            : [],
		renderCache      : {},
		onSearchChange   : settings.loadThrottle === null ? self.onSearchChange : debounce(self.onSearchChange, settings.loadThrottle)
	});

	// search system
	self.sifter = new Sifter(this.options, {diacritics: settings.diacritics});

	// build options table
	if (self.settings.options) {
		for (i = 0, n = self.settings.options.length; i < n; i++) {
			self.registerOption(self.settings.options[i]);
		}
		delete self.settings.options;
  }

	// build optgroup table
	if (self.settings.optgroups) {
		for (i = 0, n = self.settings.optgroups.length; i < n; i++) {
			self.registerOptionGroup(self.settings.optgroups[i]);
		}
		delete self.settings.optgroups;
	}

	// option-dependent defaults
	self.settings.mode = self.settings.mode || (self.settings.maxItems === 1 ? 'single' : 'multi');
	if (typeof self.settings.hideSelected !== 'boolean') {
		self.settings.hideSelected = self.settings.mode === 'multi';
	}

	self.initializePlugins(self.settings.plugins);
	self.setupCallbacks();
	self.setupTemplates();
	self.setup();
};

// mixins
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

MicroEvent.mixin(Selectize);
MicroPlugin.mixin(Selectize);

// methods
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

$.extend(Selectize.prototype, {

	/**
	 * Creates all elements and sets up event bindings.
	 */
	setup: function() {
		var self      = this;
		var settings  = self.settings;
		var eventNS   = self.eventNS;
		var $window   = $(window);
		var $document = $(document);
		var $input    = self.$input;

		var $wrapper;
		var $control;
		var $control_input;
		var $dropdown;
		var $dropdown_content;
		var $dropdown_parent;
		var inputMode;
		var timeout_blur;
		var timeout_focus;
		var classes;
		var classes_plugins;
		var inputId;

		inputMode         = self.settings.mode;
		classes           = $input.attr('class') || '';

    $wrapper          = $('<div>').addClass(settings.wrapperClass).addClass(classes + ' selectize-control').addClass(inputMode);
		$control          = $('<div>').addClass(settings.inputClass + ' selectize-input items').appendTo($wrapper);
		$control_input    = $('<input type="select-one" autocomplete="new-password" autofill="no" />').appendTo($control).attr('tabindex', $input.is(':disabled') ? '-1' : self.tabIndex);
		$dropdown_parent  = $(settings.dropdownParent || $wrapper);
		$dropdown         = $('<div>').addClass(settings.dropdownClass).addClass(inputMode + ' selectize-dropdown').hide().appendTo($dropdown_parent);
		$dropdown_content = $('<div>').addClass(settings.dropdownContentClass + ' selectize-dropdown-content').attr('tabindex', '-1').appendTo($dropdown);

		if(inputId = $input.attr('id')) {
			$control_input.attr('id', inputId + '-selectized');
			$("label[for='"+inputId+"']").attr('for', inputId + '-selectized');
		}

		if(self.settings.copyClassesToDropdown) {
			$dropdown.addClass(classes);
		}

		$wrapper.css({
			width: $input[0].style.width
		});

		if (self.plugins.names.length) {
			classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
			$wrapper.addClass(classes_plugins);
			$dropdown.addClass(classes_plugins);
		}

		if ((settings.maxItems === null || settings.maxItems > 1) && self.tagType === TAG_SELECT) {
			$input.attr('multiple', 'multiple');
		}

		if (self.settings.placeholder) {
			$control_input.attr('placeholder', settings.placeholder);
		}

    // to have an identical rendering to a simple select (usefull for mobile device and do not open keyboard)
    if (!self.settings.search) {
      $control_input.attr('readonly', true);
	  $control_input.attr('inputmode', 'none');
      $control.css('cursor', 'pointer');
    }

		// if splitOn was not passed in, construct it from the delimiter to allow pasting universally
		if (!self.settings.splitOn && self.settings.delimiter) {
			var delimiterEscaped = self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
			self.settings.splitOn = new RegExp('\\s*' + delimiterEscaped + '+\\s*');
		}

		if ($input.attr('autocorrect')) {
			$control_input.attr('autocorrect', $input.attr('autocorrect'));
		}

		if ($input.attr('autocapitalize')) {
			$control_input.attr('autocapitalize', $input.attr('autocapitalize'));
		}
		if ($input.is('input')) {
			$control_input[0].type = $input[0].type;
		}

		self.$wrapper          = $wrapper;
		self.$control          = $control;
		self.$control_input    = $control_input;
		self.$dropdown         = $dropdown;
		self.$dropdown_content = $dropdown_content;

		$dropdown.on('mouseenter mousedown mouseup click', '[data-disabled]>[data-selectable]', function(e) { e.stopImmediatePropagation(); });
		$dropdown.on('mouseenter', '[data-selectable]', function() { return self.onOptionHover.apply(self, arguments); });
		$dropdown.on('mouseup click', '[data-selectable]', function() { return self.onOptionSelect.apply(self, arguments); });
		watchChildEvent($control, 'mouseup', '*:not(input)', function() { return self.onItemSelect.apply(self, arguments); });
		autoGrow($control_input);

		$control.on({
			mousedown : function() { return self.onMouseDown.apply(self, arguments); },
			click     : function() { return self.onClick.apply(self, arguments); }
		});

		$control_input.on({
			mousedown : function(e) {
				if (self.$control_input.val() !== '' || self.settings.openOnFocus) {
					e.stopPropagation();
				}
			},
			keydown   : function() { return self.onKeyDown.apply(self, arguments); },
			keypress  : function() { return self.onKeyPress.apply(self, arguments); },
			input     : function() { return self.onInput.apply(self, arguments); },
			resize    : function() { self.positionDropdown.apply(self, []); },
			// blur      : function() { return self.onBlur.apply(self, arguments); },
			focus     : function() { self.ignoreBlur = false; return self.onFocus.apply(self, arguments); },
			paste     : function() { return self.onPaste.apply(self, arguments); }
		});

		$document.on('keydown' + eventNS, function(e) {
			self.isCmdDown = e[IS_MAC ? 'metaKey' : 'ctrlKey'];
			self.isCtrlDown = e[IS_MAC ? 'altKey' : 'ctrlKey'];
			self.isShiftDown = e.shiftKey;
		});

		$document.on('keyup' + eventNS, function(e) {
			if (e.keyCode === KEY_CTRL) self.isCtrlDown = false;
			if (e.keyCode === KEY_SHIFT) self.isShiftDown = false;
			if (e.keyCode === KEY_CMD) self.isCmdDown = false;
		});

		$document.on('mousedown' + eventNS, function(e) {
			if (self.isFocused) {
				// prevent events on the dropdown scrollbar from causing the control to blur
				if (e.target === self.$dropdown[0] || e.target.parentNode === self.$dropdown[0]) {
					return false;
				}
				// blur on click outside
				// do not blur if the dropdown is clicked
				if (!self.$dropdown.has(e.target).length && e.target !== self.$control[0]) {
					self.blur(e.target);
				}
			}
		});

		$window.on(['scroll' + eventNS, 'resize' + eventNS].join(' '), function() {
			if (self.isOpen) {
				self.positionDropdown.apply(self, arguments);
			}
		});
		$window.on('mousemove' + eventNS, function() {
      self.ignoreHover = self.settings.ignoreHover;
		});

		// store original children and tab index so that they can be
		// restored when the destroy() method is called.
		// Detach children outside of DOM to prevent slowdown on large selects
    var inputPlaceholder = $('<div></div>');
		var inputChildren = $input.children().detach();

    $input.replaceWith(inputPlaceholder);
    inputPlaceholder.replaceWith($input);

    this.revertSettings = {
			$children : inputChildren,
			tabindex  : $input.attr('tabindex')
		};

		$input.attr('tabindex', -1).hide().after(self.$wrapper);

		if (Array.isArray(settings.items)) {
			self.lastValidValue = settings.items;
			self.setValue(settings.items);
			delete settings.items;
		}

		// feature detect for the validation API
		if (SUPPORTS_VALIDITY_API) {
			$input.on('invalid' + eventNS, function(e) {
				e.preventDefault();
				self.isInvalid = true;
				self.refreshState();
			});
		}

		self.updateOriginalInput();
		self.refreshItems();
		self.refreshState();
		self.updatePlaceholder();
		self.isSetup = true;

		if ($input.is(':disabled')) {
			self.disable();
		}

		self.on('change', this.onChange);

		$input.data('selectize', self);
		$input.addClass('selectized');
		self.trigger('initialize');

		// preload options
		if (settings.preload === true) {
			self.onSearchChange('');
		}

	},

	/**
	 * Sets up default rendering functions.
	 */
	setupTemplates: function() {
		var self = this;
		var field_label = self.settings.labelField;
		var field_value = self.settings.valueField;
		var field_optgroup = self.settings.optgroupLabelField;

		var templates = {
			'optgroup': function(data) {
				return '<div class="optgroup">' + data.html + '</div>';
			},
			'optgroup_header': function(data, escape) {
				return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
			},
			'option': function(data, escape) {
        var classes = data.classes ? ' ' + data.classes : '';
        classes += data[field_value] === '' ? ' selectize-dropdown-emptyoptionlabel' : '';

        var styles = data.styles ? ' style="' + data.styles +  '"': '';
				return '<div' + styles + ' class="option' + classes + '">' + escape(data[field_label]) + '</div>';
			},
			'item': function(data, escape) {
				return '<div class="item">' + escape(data[field_label]) + '</div>';
			},
			'option_create': function(data, escape) {
				return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&#x2026;</div>';
			}
		};

		self.settings.render = $.extend({}, templates, self.settings.render);
	},

	/**
	 * Maps fired events to callbacks provided
	 * in the settings used when creating the control.
	 */
	setupCallbacks: function() {
		var key, fn, callbacks = {
			'initialize'      : 'onInitialize',
			'change'          : 'onChange',
			'item_add'        : 'onItemAdd',
			'item_remove'     : 'onItemRemove',
			'clear'           : 'onClear',
			'option_add'      : 'onOptionAdd',
			'option_remove'   : 'onOptionRemove',
			'option_clear'    : 'onOptionClear',
			'optgroup_add'    : 'onOptionGroupAdd',
			'optgroup_remove' : 'onOptionGroupRemove',
			'optgroup_clear'  : 'onOptionGroupClear',
			'dropdown_open'   : 'onDropdownOpen',
			'dropdown_close'  : 'onDropdownClose',
			'type'            : 'onType',
			'load'            : 'onLoad',
			'focus'           : 'onFocus',
			'blur'            : 'onBlur',
			'dropdown_item_activate'        : 'onDropdownItemActivate',
			'dropdown_item_deactivate'      : 'onDropdownItemDeactivate'
		};

		for (key in callbacks) {
			if (callbacks.hasOwnProperty(key)) {
				fn = this.settings[callbacks[key]];
				if (fn) this.on(key, fn);
			}
		}
	},

	/**
	 * Triggered when the main control element
	 * has a click event.
	 *
	 * @param {PointerEvent} e
	 * @return {boolean}
	 */
	onClick: function(e) {
		var self = this;

    // if the dropdown is closing due to a mousedown, we don't want to
    // refocus the element.
    if (self.isDropdownClosing) {
      return;
    }

		// necessary for mobile webkit devices (manual focus triggering
		// is ignored unless invoked within a click event)
    // also necessary to reopen a dropdown that has been closed by
    // closeAfterSelect
		if (!self.isFocused || !self.isOpen) {
			self.focus();
			e.preventDefault();
		}
	},

	/**
	 * Triggered when the main control element
	 * has a mouse down event.
	 *
	 * @param {object} e
	 * @return {boolean}
	 */
	onMouseDown: function(e) {
		var self = this;
		var defaultPrevented = e.isDefaultPrevented();
		var $target = $(e.target);

		if (!self.isFocused) {
			// give control focus
			if (!defaultPrevented) {
				window.setTimeout(function() {
					self.focus();
				}, 0);
			}
		}
		// retain focus by preventing native handling. if the
		// event target is the input it should not be modified.
		// otherwise, text selection within the input won't work.
		if (e.target !== self.$control_input[0] || self.$control_input.val() === '') {
			if (self.settings.mode === 'single') {
				// toggle dropdown
				self.isOpen ? self.close() : self.open();
			} else {
				if (!defaultPrevented) {
						self.setActiveItem(null);
				}
				if (!self.settings.openOnFocus) {
					if (self.isOpen && e.target === self.lastOpenTarget) {
						self.close();
						self.lastOpenTarget = false;
					} else if (!self.isOpen) {
						self.refreshOptions();
						self.open();
						self.lastOpenTarget = e.target;
					} else {
						self.lastOpenTarget = e.target;
					}
				}
			}
			return false;
		}
	},

	/**
	 * Triggered when the value of the control has been changed.
	 * This should propagate the event to the original DOM
	 * input / select element.
	 */
	onChange: function() {
		var self = this;
		if (self.getValue() !== "") {
			self.lastValidValue = self.getValue();
		}
		this.$input.trigger('input');
		this.$input.trigger('change');
	},

	/**
	 * Triggered on `<input>` paste.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onPaste: function(e) {
		var self = this;

		if (self.isFull() || self.isInputHidden || self.isLocked) {
			e.preventDefault();
			return;
		}

		// If a regex or string is included, this will split the pasted
		// input and create Items for each separate value
		if (self.settings.splitOn) {

			// Wait for pasted text to be recognized in value
			setTimeout(function() {
				var pastedText = self.$control_input.val();
				if(!pastedText.match(self.settings.splitOn)){ return }

				var splitInput = pastedText
					.trim()
					.split(self.settings.splitOn);
				for (var i = 0, n = splitInput.length; i < n; i++) {
					self.createItem(splitInput[i]);
				}
			}, 0);
		}
	},

	/**
	 * Triggered on `<input>` keypress.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onKeyPress: function(e) {
		if (this.isLocked) return e && e.preventDefault();
		var character = String.fromCharCode(e.keyCode || e.which);
		if (this.settings.create && this.settings.mode === 'multi' && character === this.settings.delimiter) {
			this.createItem();
			e.preventDefault();
			return false;
		}
	},

	/**
	 * Triggered on `<input>` keydown.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onKeyDown: function(e) {
		var isInput = e.target === this.$control_input[0];
		var self = this;

		if (self.isLocked) {
			if (e.keyCode !== KEY_TAB) {
				e.preventDefault();
			}
			return;
		}

		switch (e.keyCode) {
			case KEY_A:
				if (self.isCmdDown) {
					self.selectAll();
					return;
				}
				break;
			case KEY_ESC:
				if (self.isOpen) {
					e.preventDefault();
					e.stopPropagation();
					self.close();
				}
				return;
			case KEY_N:
				if (!e.ctrlKey || e.altKey) break;
			case KEY_DOWN:
				if (!self.isOpen && self.hasOptions) {
					self.open();
				} else if (self.$activeOption) {
					self.ignoreHover = true;
					var $next = self.getAdjacentOption(self.$activeOption, 1);
					if ($next.length) self.setActiveOption($next, true, true);
				}
				e.preventDefault();
				return;
			case KEY_P:
				if (!e.ctrlKey || e.altKey) break;
			case KEY_UP:
				if (self.$activeOption) {
					self.ignoreHover = true;
					var $prev = self.getAdjacentOption(self.$activeOption, -1);
					if ($prev.length) self.setActiveOption($prev, true, true);
				}
				e.preventDefault();
				return;
			case KEY_RETURN:
				if (self.isOpen && self.$activeOption) {
					self.onOptionSelect({currentTarget: self.$activeOption});
					e.preventDefault();
				}
				return;
			case KEY_LEFT:
				self.advanceSelection(-1, e);
				return;
			case KEY_RIGHT:
				self.advanceSelection(1, e);
				return;
			case KEY_TAB:
				if (self.settings.selectOnTab && self.isOpen && self.$activeOption) {
					self.onOptionSelect({currentTarget: self.$activeOption});

					// Default behaviour is to jump to the next field, we only want this
					// if the current field doesn't accept any more entries
					if (!self.isFull()) {
						e.preventDefault();
					}
				}
				if (self.settings.create && self.createItem() && self.settings.showAddOptionOnCreate) {
					e.preventDefault();
				}
				return;
			case KEY_BACKSPACE:
			case KEY_DELETE:
				self.deleteSelection(e);
				return;
		}

		if ((self.isFull() || self.isInputHidden) && !(IS_MAC ? e.metaKey : e.ctrlKey)) {
			e.preventDefault();
			return;
		}
	},

	/**
	 * Triggered on `<input>` input.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onInput: function(e) {
		var self = this;

		var value = self.$control_input.val() || '';
		if (self.lastValue !== value) {
			self.lastValue = value;
			self.onSearchChange(value);
			self.refreshOptions();
			self.trigger('type', value);
		}
	},

	/**
	 * Invokes the user-provide option provider / loader.
	 *
	 * Note: this function is debounced in the Selectize
	 * constructor (by `settings.loadThrottle` milliseconds)
	 *
	 * @param {string} value
	 */
	onSearchChange: function(value) {
		var self = this;
		var fn = self.settings.load;
		if (!fn) return;
		if (self.loadedSearches.hasOwnProperty(value)) return;
		self.loadedSearches[value] = true;
		self.load(function(callback) {
			fn.apply(self, [value, callback]);
		});
	},

	/**
	 * Triggered on `<input>` focus.
	 *
	 * @param {FocusEvent} e (optional)
	 * @returns {boolean}
	 */
	onFocus: function(e) {
		var self = this;
		var wasFocused = self.isFocused;

		if (self.isDisabled) {
			self.blur();
			e && e.preventDefault();
			return false;
		}

		if (self.ignoreFocus) return;
		self.isFocused = true;
		if (self.settings.preload === 'focus') self.onSearchChange('');

		if (!wasFocused) self.trigger('focus');

		if (!self.$activeItems.length) {
			self.showInput();
			self.setActiveItem(null);
			self.refreshOptions(!!self.settings.openOnFocus);
		}

		self.refreshState();
	},

	/**
	 * Triggered on `<input>` blur.
	 *
	 * @param {object} e
	 * @param {Element} dest
	 */
	onBlur: function(e, dest) {
		var self = this;
		if (!self.isFocused) return;
		self.isFocused = false;

		if (self.ignoreFocus) {
			return;
		}
		// Bug fix do not blur dropdown here
		// else if (!self.ignoreBlur && document.activeElement === self.$dropdown_content[0]) {
		// 	// necessary to prevent IE closing the dropdown when the scrollbar is clicked
		// 	self.ignoreBlur = true;
		// 	self.onFocus(e);
		// 	return;
		// }

		var deactivate = function() {
			self.close();
			self.setTextboxValue('');
			self.setActiveItem(null);
			self.setActiveOption(null);
			self.setCaret(self.items.length);
			self.refreshState();

			// IE11 bug: element still marked as active
			dest && dest.focus && dest.focus();

			self.isBlurring = false;
			self.ignoreFocus = false;
			self.trigger('blur');
		};

		self.isBlurring = true;
		self.ignoreFocus = true;
		if (self.settings.create && self.settings.createOnBlur) {
			self.createItem(null, false, deactivate);
		} else {
			deactivate();
		}
	},

	/**
	 * Triggered when the user rolls over
	 * an option in the autocomplete dropdown menu.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onOptionHover: function(e) {
		if (this.ignoreHover) return;
		this.setActiveOption(e.currentTarget, false);
	},

	/**
	 * Triggered when the user clicks on an option
	 * in the autocomplete dropdown menu.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onOptionSelect: function(e) {
		var value, $target, $option, self = this;

		if (e.preventDefault) {
			e.preventDefault();
			e.stopPropagation();
		}

		$target = $(e.currentTarget);
		if ($target.hasClass('create')) {
			self.createItem(null, function() {
				if (self.settings.closeAfterSelect) {
					self.close();
				}
			});
		} else {
			value = $target.attr('data-value');
			if (typeof value !== 'undefined') {
				self.lastQuery = null;
				self.setTextboxValue('');
				self.addItem(value);
				if (self.settings.closeAfterSelect) {
					self.close();
				} else if (!self.settings.hideSelected && e.type && /mouse/.test(e.type)) {
					self.setActiveOption(self.getOption(value));
				}
			}
		}
	},

	/**
	 * Triggered when the user clicks on an item
	 * that has been selected.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onItemSelect: function(e) {
		var self = this;

		if (self.isLocked) return;
		if (self.settings.mode === 'multi') {
			e.preventDefault();
			self.setActiveItem(e.currentTarget, e);
		}
	},

	/**
	 * Invokes the provided method that provides
	 * results to a callback---which are then added
	 * as options to the control.
	 *
	 * @param {function} fn
	 */
	load: function(fn) {
		var self = this;
		var $wrapper = self.$wrapper.addClass(self.settings.loadingClass);

		self.loading++;
		fn.apply(self, [function(results) {
			self.loading = Math.max(self.loading - 1, 0);
			if (results && results.length) {
				self.addOption(results);
				self.refreshOptions(self.isFocused && !self.isInputHidden);
			}
			if (!self.loading) {
				$wrapper.removeClass(self.settings.loadingClass);
			}
			self.trigger('load', results);
		}]);
	},

	/**
	 * Gets the value of input field of the control.
	 *
	 * @returns {string} value
	 */
	getTextboxValue: function() {
		var $input = this.$control_input;
		return $input.val();
	},

	/**
	 * Sets the input field of the control to the specified value.
	 *
	 * @param {string} value
	 */
	setTextboxValue: function(value) {
		var $input = this.$control_input;
		var changed = $input.val() !== value;
		if (changed) {
			$input.val(value).triggerHandler('update');
			this.lastValue = value;
		}
	},

	/**
	 * Returns the value of the control. If multiple items
	 * can be selected `(e.g. <select multiple>)`, this returns
	 * an array. If only one item can be selected, this
	 * returns a string.
	 *
	 * @returns {mixed}
	 */
	getValue: function() {
		if (this.tagType === TAG_SELECT && this.$input.attr('multiple')) {
			return this.items;
		} else {
			return this.items.join(this.settings.delimiter);
		}
	},

	/**
	 * Resets the selected items to the given value.
	 *
	 * @param {Array<String|Number>} value
	 */
	setValue: function(value, silent) {
		const items = Array.isArray(value) ? value : [value];
		if (items.join('') === this.items.join('')) {
			return;
		}

		var events = silent ? [] : ['change'];

		debounce_events(this, events, function() {
			this.clear(silent);
			this.addItems(value, silent);
		});
	},

	/**
	 * Resets the number of max items to the given value
	 *
	 * @param {number} value
	 */
	setMaxItems: function(value){
		if(value === 0) value = null; //reset to unlimited items.
		this.settings.maxItems = value;
		this.settings.mode = this.settings.mode || (this.settings.maxItems === 1 ? 'single' : 'multi');
		this.refreshState();
	},

	/**
	 * Sets the selected item.
	 *
	 * @param {object} $item
	 * @param {object} e (optional)
	 */
	setActiveItem: function($item, e) {
		var self = this;
		var eventName;
		var i, idx, begin, end, item, swap;
		var $last;

		if (self.settings.mode === 'single') return;
		$item = $($item);

		// clear the active selection
		if (!$item.length) {
			$(self.$activeItems).removeClass('active');
			self.$activeItems = [];
			if (self.isFocused) {
				self.showInput();
			}
			return;
		}

		// modify selection
		eventName = e && e.type.toLowerCase();

		if (eventName === 'mousedown' && self.isShiftDown && self.$activeItems.length) {
			$last = self.$control.children('.active:last');
			begin = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$last[0]]);
			end   = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$item[0]]);
			if (begin > end) {
				swap  = begin;
				begin = end;
				end   = swap;
			}
			for (i = begin; i <= end; i++) {
				item = self.$control[0].childNodes[i];
				if (self.$activeItems.indexOf(item) === -1) {
					$(item).addClass('active');
					self.$activeItems.push(item);
				}
			}
			e.preventDefault();
		} else if ((eventName === 'mousedown' && self.isCtrlDown) || (eventName === 'keydown' && this.isShiftDown)) {
			if ($item.hasClass('active')) {
				idx = self.$activeItems.indexOf($item[0]);
				self.$activeItems.splice(idx, 1);
				$item.removeClass('active');
			} else {
				self.$activeItems.push($item.addClass('active')[0]);
			}
		} else {
			$(self.$activeItems).removeClass('active');
			self.$activeItems = [$item.addClass('active')[0]];
		}

		// ensure control has focus
		self.hideInput();
		if (!this.isFocused) {
			self.focus();
		}
	},

	/**
	 * Sets the selected item in the dropdown menu
	 * of available options.
	 *
	 * @param {object} $object
	 * @param {boolean} scroll
	 * @param {boolean} animate
	 */
	setActiveOption: function($option, scroll, animate) {
		var height_menu, height_item, y;
		var scroll_top, scroll_bottom;
		var self = this;

		if (self.$activeOption) {
			self.$activeOption.removeClass('active');
			self.trigger('dropdown_item_deactivate', self.$activeOption.attr('data-value'));
		}
		self.$activeOption = null;

		$option = $($option);
		if (!$option.length) return;

		self.$activeOption = $option.addClass('active');
		if (self.isOpen) self.trigger('dropdown_item_activate', self.$activeOption.attr('data-value'));

		if (scroll || !isset(scroll)) {

			height_menu   = self.$dropdown_content.height();
			height_item   = self.$activeOption.outerHeight(true);
			scroll        = self.$dropdown_content.scrollTop() || 0;
			y             = self.$activeOption.offset().top - self.$dropdown_content.offset().top + scroll;
			scroll_top    = y;
			scroll_bottom = y - height_menu + height_item;

			if (y + height_item > height_menu + scroll) {
				self.$dropdown_content.stop().animate({scrollTop: scroll_bottom}, animate ? self.settings.scrollDuration : 0);
			} else if (y < scroll) {
				self.$dropdown_content.stop().animate({scrollTop: scroll_top}, animate ? self.settings.scrollDuration : 0);
			}

		}
	},

	/**
	 * Selects all items (CTRL + A).
	 */
	selectAll: function() {
		var self = this;
		if (self.settings.mode === 'single') return;

		self.$activeItems = Array.prototype.slice.apply(self.$control.children(':not(input)').addClass('active'));
		if (self.$activeItems.length) {
			self.hideInput();
			self.close();
		}
		self.focus();
	},

	/**
	 * Hides the input element out of view, while
	 * retaining its focus.
	 */
	hideInput: function() {
		var self = this;

		self.setTextboxValue('');
		self.$control_input.css({opacity: 0, position: 'absolute', left: self.rtl ? 10000 : 0});
		self.isInputHidden = true;
	},

	/**
	 * Restores input visibility.
	 */
	showInput: function() {
		this.$control_input.css({opacity: 1, position: 'relative', left: 0});
		this.isInputHidden = false;
	},

	/**
	 * Gives the control focus.
	 */
	focus: function() {
		var self = this;
		if (self.isDisabled) return self;

		self.ignoreFocus = true;
		self.$control_input[0].focus();
		window.setTimeout(function() {
			self.ignoreFocus = false;
			self.onFocus();
		}, 0);
		return self;
	},

	/**
	 * Forces the control out of focus.
	 *
	 * @param {Element} dest
	 */
	blur: function(dest) {
		this.$control_input[0].blur();
		this.onBlur(null, dest);
		return this;
	},

	/**
	 * Returns a function that scores an object
	 * to show how good of a match it is to the
	 * provided query.
	 *
	 * @param {string} query
	 * @param {object} options
	 * @return {function}
	 */
	getScoreFunction: function(query) {
		return this.sifter.getScoreFunction(query, this.getSearchOptions());
	},

	/**
	 * Returns search options for sifter (the system
	 * for scoring and sorting results).
	 *
	 * @see https://github.com/brianreavis/sifter.js
	 * @return {object}
	 */
	getSearchOptions: function() {
		var settings = this.settings;
		var sort = settings.sortField;
		if (typeof sort === 'string') {
			sort = [{field: sort}];
		}

		return {
			fields      : settings.searchField,
			conjunction : settings.searchConjunction,
			sort        : sort,
			nesting     : settings.nesting,
      filter      : settings.filter,
      respect_word_boundaries : settings.respect_word_boundaries
		};
	},

	/**
	 * Searches through available options and returns
	 * a sorted array of matches.
	 *
	 * Returns an object containing:
	 *
	 *   - query {string}
	 *   - tokens {array}
	 *   - total {int}
	 *   - items {array}
	 *
	 * @param {string} query
	 * @returns {object}
	 */
	search: function(query) {
		var i, value, score, result, calculateScore;
		var self     = this;
		var settings = self.settings;
		var options  = this.getSearchOptions();

		// validate user-provided result scoring function
		if (settings.score) {
			calculateScore = self.settings.score.apply(this, [query]);
			if (typeof calculateScore !== 'function') {
				throw new Error('Selectize "score" setting must be a function that returns a function');
			}
		}

		// perform search
    if (query !== self.lastQuery) {
      if (settings.normalize) query = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			self.lastQuery = query;
			result = self.sifter.search(query, $.extend(options, {score: calculateScore}));
			self.currentResults = result;
		} else {
			result = $.extend(true, {}, self.currentResults);
		}

		// filter out selected items
		if (settings.hideSelected) {
			for (i = result.items.length - 1; i >= 0; i--) {
				if (self.items.indexOf(hash_key(result.items[i].id)) !== -1) {
					result.items.splice(i, 1);
				}
			}
		}

		return result;
	},

	/**
	 * Refreshes the list of available options shown
	 * in the autocomplete dropdown menu.
	 *
	 * @param {boolean} triggerDropdown
	 */
	refreshOptions: function(triggerDropdown) {
		var i, j, k, n, groups, groups_order, option, option_html, optgroup, optgroups, html, html_children, has_create_option;
		var $active, $active_before, $create;

		if (typeof triggerDropdown === 'undefined') {
			triggerDropdown = true;
		}

		var self              = this;
		var query             = (self.$control_input.val()).trim();
		var results           = self.search(query);
		var $dropdown_content = self.$dropdown_content;
		var active_before     = self.$activeOption && hash_key(self.$activeOption.attr('data-value'));

		// build markup
		n = results.items.length;
		if (typeof self.settings.maxOptions === 'number') {
			n = Math.min(n, self.settings.maxOptions);
		}

		// render and group available options individually
		groups = {};
		groups_order = [];

		for (i = 0; i < n; i++) {
			option      = self.options[results.items[i].id];
			option_html = self.render('option', option);
			optgroup    = option[self.settings.optgroupField] || '';
			optgroups   = Array.isArray(optgroup) ? optgroup : [optgroup];

			for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
				optgroup = optgroups[j];
				if (!self.optgroups.hasOwnProperty(optgroup) && typeof self.settings.optionGroupRegister === 'function') {
					var regGroup;
					if (regGroup = self.settings.optionGroupRegister.apply(self, [optgroup])) {
						self.registerOptionGroup(regGroup);
					}
				}
        if (!self.optgroups.hasOwnProperty(optgroup)) {
					optgroup = '';
				}
				if (!groups.hasOwnProperty(optgroup)) {
					groups[optgroup] = document.createDocumentFragment();
					groups_order.push(optgroup);
				}
				groups[optgroup].appendChild(option_html);
			}
		}

		// sort optgroups
		if (this.settings.lockOptgroupOrder) {
			groups_order.sort(function(a, b) {
				var a_order = self.optgroups[a] && self.optgroups[a].$order || 0;
				var b_order = self.optgroups[b] && self.optgroups[b].$order || 0;
				return a_order - b_order;
			});
		}

		// render optgroup headers & join groups
		html = document.createDocumentFragment();
		for (i = 0, n = groups_order.length; i < n; i++) {
			optgroup = groups_order[i];
			if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].childNodes.length) {
				// render the optgroup header and options within it,
				// then pass it to the wrapper template
				html_children = document.createDocumentFragment();
				html_children.appendChild(self.render('optgroup_header', self.optgroups[optgroup]));
				html_children.appendChild(groups[optgroup]);

				html.appendChild(self.render('optgroup', $.extend({}, self.optgroups[optgroup], {
					html: domToString(html_children),
					dom:  html_children
				})));
			} else {
				html.appendChild(groups[optgroup]);
			}
		}

		$dropdown_content.html(html);

		// highlight matching terms inline
		if (self.settings.highlight) {
			$dropdown_content.removeHighlight();
			if (results.query.length && results.tokens.length) {
				for (i = 0, n = results.tokens.length; i < n; i++) {
					highlight($dropdown_content, results.tokens[i].regex);
				}
			}
		}

		// add "selected" class to selected options
		if (!self.settings.hideSelected) {
			// clear selection on all previously selected elements first
			self.$dropdown.find('.selected').removeClass('selected');

			for (i = 0, n = self.items.length; i < n; i++) {
				self.getOption(self.items[i]).addClass('selected');
			}
		}

		if (self.settings.dropdownSize.sizeType !== 'auto' && self.isOpen) {
			self.setupDropdownHeight();
		}

		self.positionDropdown();

		// add create option
		has_create_option = self.canCreate(query);
		if (has_create_option) {
			if(self.settings.showAddOptionOnCreate) {
				$dropdown_content.prepend(self.render('option_create', {input: query}));
				$create = $($dropdown_content[0].childNodes[0]);
			}
		}

		// activate
		self.hasOptions = results.items.length > 0 || ( has_create_option && self.settings.showAddOptionOnCreate ) || self.settings.setFirstOptionActive;

		if (self.hasOptions) {
      		if (results.items.length > 0) {
			$active_before = active_before && self.getOption(active_before);
			if (results.query !== "" && self.settings.setFirstOptionActive) {
			$active = $dropdown_content.find('[data-selectable]:first')
			} else if (results.query !== "" && $active_before && $active_before.length) {
			$active = $active_before;
			} else if (self.settings.mode === 'single' && self.items.length) {
			$active = self.getOption(self.items[0]);
			}
			if (!$active || !$active.length) {
			if ($create && !self.settings.addPrecedence) {
				$active = self.getAdjacentOption($create, 1);
			} else {
				$active = $dropdown_content.find('[data-selectable]:first');
			}
			}
			} else {
				$active = $create;
			}
			self.setActiveOption($active);
			if (triggerDropdown && !self.isOpen) { self.open(); }
		} else {
			self.setActiveOption(null);
			if (triggerDropdown && self.isOpen) { self.close(); }
		}
	},

	/**
	 * Adds an available option. If it already exists,
	 * nothing will happen. Note: this does not refresh
	 * the options list dropdown (use `refreshOptions`
	 * for that).
	 *
	 * Usage:
	 *
	 *   this.addOption(data)
	 *
	 * @param {object|array} data
	 */
	addOption: function(data) {
		var i, n, value, self = this;

		if (Array.isArray(data)) {
			for (i = 0, n = data.length; i < n; i++) {
				self.addOption(data[i]);
			}
			return;
		}

		if (value = self.registerOption(data)) {
			self.userOptions[value] = true;
			self.lastQuery = null;
			self.trigger('option_add', value, data);
		}
	},

	/**
	 * Registers an option to the pool of options.
	 *
	 * @param {object} data
	 * @return {boolean|string}
	 */
	registerOption: function(data) {
		var key = hash_key(data[this.settings.valueField]);
		if (typeof key === 'undefined' || key === null || this.options.hasOwnProperty(key)) return false;
		data.$order = data.$order || ++this.order;
		this.options[key] = data;
		return key;
	},

	/**
	 * Registers an option group to the pool of option groups.
	 *
	 * @param {object} data
	 * @return {boolean|string}
	 */
	registerOptionGroup: function(data) {
		var key = hash_key(data[this.settings.optgroupValueField]);
		if (!key) return false;

		data.$order = data.$order || ++this.order;
		this.optgroups[key] = data;
		return key;
	},

	/**
	 * Registers a new optgroup for options
	 * to be bucketed into.
	 *
	 * @param {string} id
	 * @param {object} data
	 */
	addOptionGroup: function(id, data) {
		data[this.settings.optgroupValueField] = id;
		if (id = this.registerOptionGroup(data)) {
			this.trigger('optgroup_add', id, data);
		}
	},

	/**
	 * Removes an existing option group.
	 *
	 * @param {string} id
	 */
	removeOptionGroup: function(id) {
		if (this.optgroups.hasOwnProperty(id)) {
			delete this.optgroups[id];
			this.renderCache = {};
			this.trigger('optgroup_remove', id);
		}
	},

	/**
	 * Clears all existing option groups.
	 */
	clearOptionGroups: function() {
		this.optgroups = {};
		this.renderCache = {};
		this.trigger('optgroup_clear');
	},

	/**
	 * Updates an option available for selection. If
	 * it is visible in the selected items or options
	 * dropdown, it will be re-rendered automatically.
	 *
	 * @param {string} value
	 * @param {object} data
	 */
	updateOption: function(value, data) {
		var self = this;
		var $item, $item_new;
		var value_new, index_item, cache_items, cache_options, order_old;

		value     = hash_key(value);
		value_new = hash_key(data[self.settings.valueField]);

		// sanity checks
		if (value === null) return;
		if (!self.options.hasOwnProperty(value)) return;
		if (typeof value_new !== 'string') throw new Error('Value must be set in option data');

		order_old = self.options[value].$order;

		// update references
		if (value_new !== value) {
			delete self.options[value];
			index_item = self.items.indexOf(value);
			if (index_item !== -1) {
				self.items.splice(index_item, 1, value_new);
			}
		}
		data.$order = data.$order || order_old;
		self.options[value_new] = data;

		// invalidate render cache
		cache_items = self.renderCache['item'];
		cache_options = self.renderCache['option'];

		if (cache_items) {
			delete cache_items[value];
			delete cache_items[value_new];
		}
		if (cache_options) {
			delete cache_options[value];
			delete cache_options[value_new];
		}

		// update the item if it's selected
		if (self.items.indexOf(value_new) !== -1) {
			$item = self.getItem(value);
			$item_new = $(self.render('item', data));
			if ($item.hasClass('active')) $item_new.addClass('active');
			$item.replaceWith($item_new);
		}

		// invalidate last query because we might have updated the sortField
		self.lastQuery = null;

		// update dropdown contents
		if (self.isOpen) {
			self.refreshOptions(false);
		}
	},

	/**
	 * Removes a single option.
	 *
	 * @param {string} value
	 * @param {boolean} silent
	 */
	removeOption: function(value, silent) {
		var self = this;
		value = hash_key(value);

		var cache_items = self.renderCache['item'];
		var cache_options = self.renderCache['option'];
		if (cache_items) delete cache_items[value];
		if (cache_options) delete cache_options[value];

		delete self.userOptions[value];
		delete self.options[value];
		self.lastQuery = null;
		self.trigger('option_remove', value);
		self.removeItem(value, silent);
	},

	/**
	 * Clears all options, including all selected items
	 *
	 * @param {boolean} silent
	 */
	clearOptions: function(silent) {
		var self = this;

		self.loadedSearches = {};
		self.userOptions = {};
		self.renderCache = {};
		var options = self.options;
		$.each(self.options, function(key, value) {
			if(self.items.indexOf(key) == -1) {
				delete options[key];
			}
		});
		self.options = self.sifter.items = options;
		self.lastQuery = null;
		self.trigger('option_clear');
		self.clear(silent);
	},

	/**
	 * Returns the jQuery element of the option
	 * matching the given value.
	 *
	 * @param {string} value
	 * @returns {object}
	 */
	getOption: function(value) {
		return this.getElementWithValue(value, this.$dropdown_content.find('[data-selectable]'));
	},

	/**
	 * Returns the jQuery element of the first
	 * selectable option.
	 *
	 * @return {object}
	 */
	getFirstOption: function() {
		var $options = this.$dropdown.find('[data-selectable]');
		return $options.length > 0 ? $options.eq(0) : $();
	},

	/**
	 * Returns the jQuery element of the next or
	 * previous selectable option.
	 *
	 * @param {object} $option
	 * @param {int} direction  can be 1 for next or -1 for previous
	 * @return {object}
	 */
	getAdjacentOption: function($option, direction) {
		var $options = this.$dropdown.find('[data-selectable]');
		var index    = $options.index($option) + direction;

		return index >= 0 && index < $options.length ? $options.eq(index) : $();
	},

	/**
	 * Finds the first element with a "data-value" attribute
	 * that matches the given value.
	 *
	 * @param {mixed} value
	 * @param {object} $els
	 * @return {object}
	 */
	getElementWithValue: function(value, $els) {
		value = hash_key(value);

		if (typeof value !== 'undefined' && value !== null) {
			for (var i = 0, n = $els.length; i < n; i++) {
				if ($els[i].getAttribute('data-value') === value) {
					return $($els[i]);
				}
			}
		}

		return $();
	},

	/**
	 * Finds the first element with a "textContent" property
	 * that matches the given textContent value.
	 *
	 * @param {mixed} textContent
	 * @param {boolean} ignoreCase
	 * @param {object} $els
	 * @return {object}
	 */
	getElementWithTextContent: function(textContent, ignoreCase ,$els) {
		textContent = hash_key(textContent);

		if (typeof textContent !== 'undefined' && textContent !== null) {
			for (var i = 0, n = $els.length; i < n; i++) {
				var eleTextContent = $els[i].textContent
				if (ignoreCase == true) {
					eleTextContent = (eleTextContent !== null) ? eleTextContent.toLowerCase() : null;
					textContent = textContent.toLowerCase();
				}
				if (eleTextContent === textContent) {
					return $($els[i]);
				}
			}
		}

		return $();
	},

	/**
	 * Returns the jQuery element of the item
	 * matching the given value.
	 *
	 * @param {string} value
	 * @returns {object}
	 */
	getItem: function(value) {
		return this.getElementWithValue(value, this.$control.children());
	},

	/**
	 * Returns the jQuery element of the item
	 * matching the given textContent.
	 *
	 * @param {string} value
	 * @param {boolean} ignoreCase
	 * @returns {object}
	 */
	getFirstItemMatchedByTextContent: function(textContent, ignoreCase) {
		ignoreCase = (ignoreCase !== null && ignoreCase === true) ? true : false;
		return this.getElementWithTextContent(textContent, ignoreCase, this.$dropdown_content.find('[data-selectable]'));
	},

	/**
	 * "Selects" multiple items at once. Adds them to the list
	 * at the current caret position.
	 *
	 * @param {string} values
	 * @param {boolean} silent
	 */
	addItems: function(values, silent) {
		this.buffer = document.createDocumentFragment();

		var childNodes = this.$control[0].childNodes;
		for (var i = 0; i < childNodes.length; i++) {
			this.buffer.appendChild(childNodes[i]);
		}

		var items = Array.isArray(values) ? values : [values];
		for (var i = 0, n = items.length; i < n; i++) {
			this.isPending = (i < n - 1);
			this.addItem(items[i], silent);
		}

		var control = this.$control[0];
		control.insertBefore(this.buffer, control.firstChild);

		this.buffer = null;
	},

	/**
	 * "Selects" an item. Adds it to the list
	 * at the current caret position.
	 *
	 * @param {string} value
	 * @param {boolean} silent
	 */
	addItem: function(value, silent) {
		var events = silent ? [] : ['change'];

		debounce_events(this, events, function() {
			var $item, $option, $options;
			var self = this;
			var inputMode = self.settings.mode;
			var i, active, value_next, wasFull;
			value = hash_key(value);

			if (self.items.indexOf(value) !== -1) {
				if (inputMode === 'single') self.close();
				return;
			}

			if (!self.options.hasOwnProperty(value)) return;
			if (inputMode === 'single') self.clear(silent);
			if (inputMode === 'multi' && self.isFull()) return;

      $item = $(self.render('item', self.options[value]));
			wasFull = self.isFull();
			self.items.splice(self.caretPos, 0, value);
      self.insertAtCaret($item);
			if (!self.isPending || (!wasFull && self.isFull())) {
				self.refreshState();
			}

			if (self.isSetup) {
				$options = self.$dropdown_content.find('[data-selectable]');

				// update menu / remove the option (if this is not one item being added as part of series)
				if (!self.isPending) {
					$option = self.getOption(value);
					value_next = self.getAdjacentOption($option, 1).attr('data-value');
					self.refreshOptions(self.isFocused && inputMode !== 'single');
					if (value_next) {
						self.setActiveOption(self.getOption(value_next));
					}
				}

				// hide the menu if the maximum number of items have been selected or no options are left
				if (!$options.length || self.isFull()) {
					self.close();
				} else if (!self.isPending) {
					self.positionDropdown();
				}

				self.updatePlaceholder();
				self.trigger('item_add', value, $item);

				if (!self.isPending) {
					self.updateOriginalInput({silent: silent});
				}
			}
		});
	},

	/**
	 * Removes the selected item matching
	 * the provided value.
	 *
	 * @param {string} value
	 */
	removeItem: function(value, silent) {
		var self = this;
		var $item, i, idx;

		$item = (value instanceof $) ? value : self.getItem(value);
		value = hash_key($item.attr('data-value'));
		i = self.items.indexOf(value);

		if (i !== -1) {
			self.trigger('item_before_remove', value, $item);
			$item.remove();
      if ($item.hasClass('active')) {
        $item.removeClass('active');
				idx = self.$activeItems.indexOf($item[0]);
				self.$activeItems.splice(idx, 1);
				$item.removeClass('active');
			}

			self.items.splice(i, 1);
			self.lastQuery = null;
			if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
				self.removeOption(value, silent);
			}

			if (i < self.caretPos) {
				self.setCaret(self.caretPos - 1);
			}

			self.refreshState();
			self.updatePlaceholder();
			self.updateOriginalInput({silent: silent});
			self.positionDropdown();
			self.trigger('item_remove', value, $item);
		}
	},

	/**
	 * Invokes the `create` method provided in the
	 * selectize options that should provide the data
	 * for the new item, given the user input.
	 *
	 * Once this completes, it will be added
	 * to the item list.
	 *
	 * @param {string} value
	 * @param {boolean} [triggerDropdown]
	 * @param {function} [callback]
	 * @return {boolean}
	 */
	createItem: function(input, triggerDropdown) {
		var self  = this;
		var caret = self.caretPos;
		input = input || (self.$control_input.val() || '').trim();

		var callback = arguments[arguments.length - 1];
		if (typeof callback !== 'function') callback = function() {};

		if (typeof triggerDropdown !== 'boolean') {
			triggerDropdown = true;
		}

		if (!self.canCreate(input)) {
			callback();
			return false;
		}

		self.lock();

		var setup = (typeof self.settings.create === 'function') ? this.settings.create : function(input) {
			var data = {};
			data[self.settings.labelField] = input;
			var key = input;
			if ( self.settings.formatValueToKey && typeof self.settings.formatValueToKey === 'function' ) {
				key = self.settings.formatValueToKey.apply(this, [key]);
				if (key === null || typeof key === 'undefined' || typeof key === 'object' || typeof key === 'function') {
					throw new Error('Selectize "formatValueToKey" setting must be a function that returns a value other than object or function.');
				}
			}
			data[self.settings.valueField] = key;
			return data;
		};

		var create = once(function(data) {
			self.unlock();

			if (!data || typeof data !== 'object') return callback();
			var value = hash_key(data[self.settings.valueField]);
			if (typeof value !== 'string') return callback();

			self.setTextboxValue('');
			self.addOption(data);
			self.setCaret(caret);
			self.addItem(value);
			self.refreshOptions(triggerDropdown && self.settings.mode !== 'single');
			callback(data);
		});

		var output = setup.apply(this, [input, create]);
		if (typeof output !== 'undefined') {
			create(output);
		}

		return true;
	},

	/**
	 * Re-renders the selected item lists.
	 */
	refreshItems: function(silent) {
		this.lastQuery = null;

		if (this.isSetup) {
			this.addItem(this.items, silent);
		}

		this.refreshState();
		this.updateOriginalInput({silent: silent});
	},

	/**
	 * Updates all state-dependent attributes
	 * and CSS classes.
	 */
	refreshState: function() {
		this.refreshValidityState();
		this.refreshClasses();
	},

	/**
	 * Update the `required` attribute of both input and control input.
	 *
	 * The `required` property needs to be activated on the control input
	 * for the error to be displayed at the right place. `required` also
	 * needs to be temporarily deactivated on the input since the input is
	 * hidden and can't show errors.
	 */
	refreshValidityState: function() {
		if (!this.isRequired) return false;

		var invalid = !this.items.length;

		this.isInvalid = invalid;
		this.$control_input.prop('required', invalid);
		this.$input.prop('required', !invalid);
	},

	/**
	 * Updates all state-dependent CSS classes.
	 */
	refreshClasses: function() {
		var self     = this;
		var isFull   = self.isFull();
		var isLocked = self.isLocked;

		self.$wrapper
			.toggleClass('rtl', self.rtl);

		self.$control
			.toggleClass('focus', self.isFocused)
			.toggleClass('disabled', self.isDisabled)
			.toggleClass('required', self.isRequired)
			.toggleClass('invalid', self.isInvalid)
			.toggleClass('locked', isLocked)
			.toggleClass('full', isFull).toggleClass('not-full', !isFull)
			.toggleClass('input-active', self.isFocused && !self.isInputHidden)
			.toggleClass('dropdown-active', self.isOpen)
			.toggleClass('has-options', !$.isEmptyObject(self.options))
			.toggleClass('has-items', self.items.length > 0);

		self.$control_input.data('grow', !isFull && !isLocked);
	},

	/**
	 * Determines whether or not more items can be added
	 * to the control without exceeding the user-defined maximum.
	 *
	 * @returns {boolean}
	 */
	isFull: function() {
		return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
	},

	/**
	 * Refreshes the original `<select>` or `<input>`
	 * element to reflect the current state.
	 */
	updateOriginalInput: function(opts) {
		var i, n, existing, fresh, old, $options, label, value, values, self = this;
		opts = opts || {};

		if (self.tagType === TAG_SELECT) {
			$options  = self.$input.find('option');
			existing  = [];
			fresh     = [];
			old       = [];
			values    = [];

			$options.get().forEach(function(option) {
				existing.push(option.value);
			});

			self.items.forEach(function(item) {
				label = self.options[item][self.settings.labelField] || '';

				values.push(item);

				if (existing.indexOf(item) != -1) {
					return;
				}

				fresh.push('<option value="' + escape_html(item) + '" selected="selected">' + escape_html(label) + '</option>');
			});

			old = existing.filter(function(value) {
				return values.indexOf(value) < 0;
			}).map(function(value) {
				return 'option[value="' + value + '"]';
			});

			if (existing.length - old.length + fresh.length === 0 && !self.$input.attr('multiple')) {
				fresh.push('<option value="" selected="selected"></option>');
			}

			self.$input.find(old.join(', ')).remove();
			self.$input.append(fresh.join(''));
		} else {
			self.$input.val(self.getValue());
			self.$input.attr('value',self.$input.val());
		}

		if (self.isSetup) {
			if (!opts.silent) {
				self.trigger('change', self.$input.val());
			}
		}
	},

	/**
	 * Shows/hide the input placeholder depending
	 * on if there items in the list already.
	 */
	updatePlaceholder: function() {
		if (!this.settings.placeholder) return;
		var $input = this.$control_input;

		if (this.items.length) {
			$input.removeAttr('placeholder');
		} else {
			$input.attr('placeholder', this.settings.placeholder);
		}
		$input.triggerHandler('update', {force: true});
	},

	/**
	 * Shows the autocomplete dropdown containing
	 * the available options.
	 */
	open: function() {
		var self = this;

		if (
      self.isLocked ||
      self.isOpen ||
      (self.settings.mode === "multi" && self.isFull())
    )
      return;
		self.focus();
		self.isOpen = true;
		self.refreshState();
		self.$dropdown.css({ visibility: 'hidden', display: 'block' });
		self.setupDropdownHeight();
		self.$dropdown.css({visibility: 'visible'});
		self.trigger('dropdown_open', self.$dropdown);
	},

	/**
	 * Closes the autocomplete dropdown menu.
	 */
	close: function() {
		var self = this;
		var trigger = self.isOpen;

		if (self.settings.mode === 'single' && self.items.length) {
			self.hideInput();

			// Do not trigger blur while inside a blur event,
			// this fixes some weird tabbing behavior in FF and IE.
			// See #1164
			if (self.isBlurring) {
				self.$control_input[0].blur(); // close keyboard on iOS
			}
		}

		self.isOpen = false;
		self.$dropdown.hide();
		self.setActiveOption(null);
		self.refreshState();

		if (trigger) self.trigger('dropdown_close', self.$dropdown);
	},

	/**
	 * Calculates and applies the appropriate
	 * position of the dropdown.
	 */
	positionDropdown: function() {
		var $control = this.$control;
		var offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position();
		offset.top += $control.outerHeight(true);
		var w = $control[0].getBoundingClientRect().width;
		if (this.settings.minWidth && this.settings.minWidth > w)
		{
			w = this.settings.minWidth;
		}
		this.$dropdown.css({
			width : w,
			top   : offset.top,
			left  : offset.left
		});
	},

  setupDropdownHeight: function () {
    if (typeof this.settings.dropdownSize === 'object' && this.settings.dropdownSize.sizeType !== 'auto') {
      var height = this.settings.dropdownSize.sizeValue;

      if (this.settings.dropdownSize.sizeType === 'numberItems') {
        // retrieve all items (included optgroup but exept the container .optgroup)
        var $items = this.$dropdown_content.find('*').not('.optgroup, .highlight').not(this.settings.ignoreOnDropwdownHeight);
        var totalHeight = 0;
        var marginTop = 0;
        var marginBottom = 0;
        var separatorHeight = 0;


        for (var i = 0; i < height; i++) {
          var $item = $($items[i]);

          if ($item.length === 0) {
            break;
          }

          totalHeight += $item.outerHeight(true);
          // If not selectable, it's an optgroup so we "ignore" for count items
          if (typeof $item.data('selectable') == 'undefined') {
            if ($item.hasClass('optgroup-header')) {
              var styles = window.getComputedStyle($item.parent()[0], ':before');

              if (styles) {
                marginTop = styles.marginTop ? Number(styles.marginTop.replace(/\W*(\w)\w*/g, '$1')) : 0;
                marginBottom = styles.marginBottom ? Number(styles.marginBottom.replace(/\W*(\w)\w*/g, '$1')) : 0;
                separatorHeight = styles.borderTopWidth ? Number(styles.borderTopWidth.replace(/\W*(\w)\w*/g, '$1')) : 0;
              }
            }
            height++;
          }

        }

        // Get padding top for add to global height
        var paddingTop = this.$dropdown_content.css('padding-top') ? Number(this.$dropdown_content.css('padding-top').replace(/\W*(\w)\w*/g, '$1')) : 0;
        var paddingBottom = this.$dropdown_content.css('padding-bottom') ? Number(this.$dropdown_content.css('padding-bottom').replace(/\W*(\w)\w*/g, '$1')) : 0;

        height = (totalHeight + paddingTop + paddingBottom + marginTop + marginBottom + separatorHeight) + 'px';
      } else if (this.settings.dropdownSize.sizeType !== 'fixedHeight') {
        console.warn('Selectize.js - Value of "sizeType" must be "fixedHeight" or "numberItems');
        return;
      }

      this.$dropdown_content.css({ height: height, maxHeight: 'none' });
    }
  },

	/**
	 * Resets / clears all selected items
	 * from the control.
	 *
	 * @param {boolean} silent
	 */
	clear: function(silent) {
		var self = this;

		if (!self.items.length) return;
		self.$control.children(':not(input)').remove();
		self.items = [];
		self.lastQuery = null;
		self.setCaret(0);
		self.setActiveItem(null);
		self.updatePlaceholder();
		self.updateOriginalInput({silent: silent});
		self.refreshState();
		self.showInput();
		self.trigger('clear');
	},

	/**
	 * A helper method for inserting an element
	 * at the current caret position.
	 *
	 * @param {object} $el
	 */
	insertAtCaret: function($el) {
		var caret = Math.min(this.caretPos, this.items.length);
    var el = $el[0];
    /**
     * @type {HTMLElement}
     **/
		var target = this.buffer || this.$control[0];

		if (caret === 0) {
			target.insertBefore(el, target.firstChild);
		} else {
			target.insertBefore(el, target.childNodes[caret]);
		}

		this.setCaret(caret + 1);
	},

	/**
	 * Removes the current selected item(s).
	 *
	 * @param {object} e (optional)
	 * @returns {boolean}
	 */
	deleteSelection: function(e) {
		var i, n, direction, selection, values, caret, option_select, $option_select, $tail;
		var self = this;

		direction = (e && e.keyCode === KEY_BACKSPACE) ? -1 : 1;
		selection = getInputSelection(self.$control_input[0]);

		if (self.$activeOption && !self.settings.hideSelected) {
			if (typeof self.settings.deselectBehavior === 'string' && self.settings.deselectBehavior === 'top') {
				option_select = self.getFirstOption().attr('data-value');
			} else {
				option_select = self.getAdjacentOption(self.$activeOption, -1).attr('data-value');
			}
		}

		// determine items that will be removed
		values = [];

		if (self.$activeItems.length) {
			$tail = self.$control.children('.active:' + (direction > 0 ? 'last' : 'first'));
			caret = self.$control.children(':not(input)').index($tail);
			if (direction > 0) { caret++; }

			for (i = 0, n = self.$activeItems.length; i < n; i++) {
				values.push($(self.$activeItems[i]).attr('data-value'));
			}
			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
		} else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
			if (direction < 0 && selection.start === 0 && selection.length === 0) {
				values.push(self.items[self.caretPos - 1]);
			} else if (direction > 0 && selection.start === self.$control_input.val().length) {
				values.push(self.items[self.caretPos]);
			}
		}

		// allow the callback to abort
		if (!values.length || (typeof self.settings.onDelete === 'function' && self.settings.onDelete.apply(self, [values]) === false)) {
			return false;
		}

		// perform removal
		if (typeof caret !== 'undefined') {
			self.setCaret(caret);
		}
		while (values.length) {
			self.removeItem(values.pop());
		}

		self.showInput();
		self.positionDropdown();
		self.refreshOptions(true);

		// select previous option
		if (option_select) {
			$option_select = self.getOption(option_select);
			if ($option_select.length) {
				self.setActiveOption($option_select);
			}
		}

		return true;
	},

	/**
	 * Selects the previous / next item (depending
	 * on the `direction` argument).
	 *
	 * > 0 - right
	 * < 0 - left
	 *
	 * @param {int} direction
	 * @param {object} e (optional)
	 */
	advanceSelection: function(direction, e) {
		var tail, selection, idx, valueLength, cursorAtEdge, $tail;
		var self = this;

		if (direction === 0) return;
		if (self.rtl) direction *= -1;

		tail = direction > 0 ? 'last' : 'first';
		selection = getInputSelection(self.$control_input[0]);

		if (self.isFocused && !self.isInputHidden) {
			valueLength = self.$control_input.val().length;
			cursorAtEdge = direction < 0
				? selection.start === 0 && selection.length === 0
				: selection.start === valueLength;

			if (cursorAtEdge && !valueLength) {
				self.advanceCaret(direction, e);
			}
		} else {
			$tail = self.$control.children('.active:' + tail);
			if ($tail.length) {
				idx = self.$control.children(':not(input)').index($tail);
				self.setActiveItem(null);
				self.setCaret(direction > 0 ? idx + 1 : idx);
			}
		}
	},

	/**
	 * Moves the caret left / right.
	 *
	 * @param {int} direction
	 * @param {object} e (optional)
	 */
	advanceCaret: function(direction, e) {
		var self = this, fn, $adj;

		if (direction === 0) return;

		fn = direction > 0 ? 'next' : 'prev';
		if (self.isShiftDown) {
			$adj = self.$control_input[fn]();
			if ($adj.length) {
				self.hideInput();
				self.setActiveItem($adj);
				e && e.preventDefault();
			}
		} else {
			self.setCaret(self.caretPos + direction);
		}
	},

	/**
	 * Moves the caret to the specified index.
	 *
	 * @param {int} i
	 */
	setCaret: function(i) {
		var self = this;

		if (self.settings.mode === 'single') {
			i = self.items.length;
		} else {
			i = Math.max(0, Math.min(self.items.length, i));
		}

		if(!self.isPending) {
			// the input must be moved by leaving it in place and moving the
			// siblings, due to the fact that focus cannot be restored once lost
			// on mobile webkit devices
			var j, n, fn, $children, $child;
			$children = self.$control.children(':not(input)');
			for (j = 0, n = $children.length; j < n; j++) {
				$child = $($children[j]).detach();
				if (j <  i) {
					self.$control_input.before($child);
				} else {
					self.$control.append($child);
				}
			}
		}

		self.caretPos = i;
	},

	/**
	 * Disables user input on the control. Used while
	 * items are being asynchronously created.
	 */
	lock: function() {
		this.close();
		this.isLocked = true;
		this.refreshState();
	},

	/**
	 * Re-enables user input on the control.
	 */
	unlock: function() {
		this.isLocked = false;
		this.refreshState();
	},

	/**
	 * Disables user input on the control completely.
	 * While disabled, it cannot receive focus.
	 */
	disable: function() {
		var self = this;
		self.$input.prop('disabled', true);
		self.$control_input.prop('disabled', true).prop('tabindex', -1);
		self.isDisabled = true;
		self.lock();
	},

	/**
	 * Enables the control so that it can respond
	 * to focus and user input.
	 */
	enable: function() {
		var self = this;
		self.$input.prop('disabled', false);
		self.$control_input.prop('disabled', false).prop('tabindex', self.tabIndex);
		self.isDisabled = false;
		self.unlock();
	},

	/**
	 * Completely destroys the control and
	 * unbinds all event listeners so that it can
	 * be garbage collected.
	 */
	destroy: function() {
		var self = this;
		var eventNS = self.eventNS;
		var revertSettings = self.revertSettings;

		self.trigger('destroy');
		self.off();
		self.$wrapper.remove();
		self.$dropdown.remove();

		self.$input
			.html('')
			.append(revertSettings.$children)
			.removeAttr('tabindex')
			.removeClass('selectized')
			.attr({tabindex: revertSettings.tabindex})
			.show();

		self.$control_input.removeData('grow');
		self.$input.removeData('selectize');

		if (--Selectize.count == 0 && Selectize.$testInput) {
			Selectize.$testInput.remove();
			Selectize.$testInput = undefined;
		}

		$(window).off(eventNS);
		$(document).off(eventNS);
		$(document.body).off(eventNS);

		delete self.$input[0].selectize;
	},

	/**
	 * A helper method for rendering "item" and
	 * "option" templates, given the data.
	 *
	 * @param {string} templateName
	 * @param {object} data
	 * @returns {string}
	 */
	render: function(templateName, data) {
		var value, id, label;
		var html = '';
		var cache = false;
		var self = this;
		var regex_tag = /^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;

		if (templateName === 'option' || templateName === 'item') {
			value = hash_key(data[self.settings.valueField]);
			cache = !!value;
		}

		// pull markup from cache if it exists
		if (cache) {
			if (!isset(self.renderCache[templateName])) {
				self.renderCache[templateName] = {};
			}
			if (self.renderCache[templateName].hasOwnProperty(value)) {
				return self.renderCache[templateName][value];
			}
		}

		// render markup
		html = $(self.settings.render[templateName].apply(this, [data, escape_html]));

		// add mandatory attributes
		if (templateName === 'option' || templateName === 'option_create') {
			if (!data[self.settings.disabledField]) {
				html.attr('data-selectable', '');
			}
		}
		else if (templateName === 'optgroup') {
			id = data[self.settings.optgroupValueField] || '';
			html.attr('data-group', id);
			if(data[self.settings.disabledField]) {
				html.attr('data-disabled', '');
			}
		}
		if (templateName === 'option' || templateName === 'item') {
			html.attr('data-value', value || '');
		}

		// update cache
		if (cache) {
			self.renderCache[templateName][value] = html[0];
		}

		return html[0];
	},

	/**
	 * Clears the render cache for a template. If
	 * no template is given, clears all render
	 * caches.
	 *
	 * @param {string} templateName
	 */
	clearCache: function(templateName) {
		var self = this;
		if (typeof templateName === 'undefined') {
			self.renderCache = {};
		} else {
			delete self.renderCache[templateName];
		}
	},

	/**
	 * Determines whether or not to display the
	 * create item prompt, given a user input.
	 *
	 * @param {string} input
	 * @return {boolean}
	 */
	canCreate: function(input) {
		var self = this;
		if (!self.settings.create) return false;
		var filter = self.settings.createFilter;
		return input.length
			&& (typeof filter !== 'function' || filter.apply(self, [input]))
			&& (typeof filter !== 'string' || new RegExp(filter).test(input))
			&& (!(filter instanceof RegExp) || filter.test(input));
	}
});

Selectize.count = 0;
Selectize.defaults = {
  options: [],
  optgroups: [],

  plugins: [],
  delimiter: ',',
  splitOn: null, // regexp or string for splitting up values from a paste command
  persist: true,
  diacritics: true,
  create: false,
  showAddOptionOnCreate: true,
  createOnBlur: false,
  createFilter: null,
  highlight: true,
  openOnFocus: true,
  maxOptions: 1000,
  maxItems: null,
  hideSelected: null,
  addPrecedence: false,
  selectOnTab: true,
  preload: false,
  allowEmptyOption: false,
  showEmptyOptionInDropdown: false,
  emptyOptionLabel: '--',
  setFirstOptionActive: false,
  closeAfterSelect: false,
  closeDropdownThreshold: 250, // number of ms to prevent reopening of dropdown after mousedown

  scrollDuration: 60,
  deselectBehavior: 'previous', //top, previous
  loadThrottle: 300,
  loadingClass: 'loading',

  dataAttr: 'data-data',
  optgroupField: 'optgroup',
  valueField: 'value',
  labelField: 'text',
  disabledField: 'disabled',
  optgroupLabelField: 'label',
  optgroupValueField: 'value',
  lockOptgroupOrder: false,

  sortField: '$order',
  searchField: ['text'],
  searchConjunction: 'and',
  respect_word_boundaries: false, // Originally defaulted to true, but breaks unicode support. See #1916 & https://stackoverflow.com/questions/10590098/javascript-regexp-word-boundaries-unicode-characters
  normalize: true,

  mode: null,
  wrapperClass: '',
  inputClass: '',
  dropdownClass: '',
  dropdownContentClass: '',

  dropdownParent: null,

  copyClassesToDropdown: true,
  dropdownSize: {
    sizeType: 'auto',
    sizeValue: 'auto',
  },

  ignoreOnDropwdownHeight: 'img, i',
  search: true,

  /*
  load                 : null, // function(query, callback) { ... }
  score                : null, // function(search) { ... }
  formatValueToKey     : null, // function(key) { ... }
  optionGroupRegister  : null, // function(optgroup) to register dynamically created option groups
  onInitialize         : null, // function() { ... }
  onChange             : null, // function(value) { ... }
  onItemAdd            : null, // function(value, $item) { ... }
  onItemRemove         : null, // function(value, $item) { ... }
  onClear              : null, // function() { ... }
  onOptionAdd          : null, // function(value, data) { ... }
  onOptionRemove       : null, // function(value) { ... }
  onOptionClear        : null, // function() { ... }
  onOptionGroupAdd     : null, // function(id, data) { ... }
  onOptionGroupRemove  : null, // function(id) { ... }
  onOptionGroupClear   : null, // function() { ... }
  onDropdownOpen       : null, // function($dropdown) { ... }
  onDropdownClose      : null, // function($dropdown) { ... }
  onType               : null, // function(str) { ... }
  onDelete             : null, // function(values) { ... }
  */

  render: {
    /*
    item: null,
    optgroup: null,
    optgroup_header: null,
    option: null,
    option_create: null
    */
  }
};

$.fn.selectize = function (settings_user) {
  var defaults = $.fn.selectize.defaults;
  var settings = $.extend({}, defaults, settings_user);
  var attr_data = settings.dataAttr;
  var field_label = settings.labelField;
  var field_value = settings.valueField;
  var field_disabled = settings.disabledField;
  var field_optgroup = settings.optgroupField;
  var field_optgroup_label = settings.optgroupLabelField;
  var field_optgroup_value = settings.optgroupValueField;

  /**
   * Initializes selectize from a <input type="text"> element.
   *
   * @param {JQuery} $input
   * @param {Object} settings_element
   */
  var init_textbox = function ($input, settings_element) {
    var i, n, values, option;

    var data_raw = $input.attr(attr_data);

    if (!data_raw) {
      var value = ($input.val() || '').trim();
      if (!settings.allowEmptyOption && !value.length) return;
      values = value.split(settings.delimiter);
      for (i = 0, n = values.length; i < n; i++) {
        option = {};
        option[field_label] = values[i];
        option[field_value] = values[i];
        settings_element.options.push(option);
      }
      settings_element.items = values;
    } else {
      settings_element.options = JSON.parse(data_raw);
      for (i = 0, n = settings_element.options.length; i < n; i++) {
        settings_element.items.push(settings_element.options[i][field_value]);
      }
    }
  };

  /**
   * Initializes selectize from a <select> element.
   *
   * @param {object} $input
   * @param {object} settings_element
   */
  var init_select = function ($input, settings_element) {
    var i, n, tagName, $children, order = 0;
    var options = settings_element.options;
    var optionsMap = {};

    var readData = function ($el) {
      var data = attr_data && $el.attr(attr_data);
      var allData = $el.data();
      var obj = {};

      if (typeof data === 'string' && data.length) {
        if (isJSON(data)) {
          Object.assign(obj, JSON.parse(data))
        } else {
          obj[data] = data;
        }
      }


      Object.assign(obj, allData);

      return obj || null;
    };

    var addOption = function ($option, group) {
      $option = $($option);

      var value = hash_key($option.val());
      if (!value && !settings.allowEmptyOption) return;

      // if the option already exists, it's probably been
      // duplicated in another optgroup. in this case, push
      // the current group to the "optgroup" property on the
      // existing option so that it's rendered in both places.
      if (optionsMap.hasOwnProperty(value)) {
        if (group) {
          var arr = optionsMap[value][field_optgroup];
          if (!arr) {
            optionsMap[value][field_optgroup] = group;
          } else if (!Array.isArray(arr)) {
            optionsMap[value][field_optgroup] = [arr, group];
          } else {
            arr.push(group);
          }
        }
        return;
      }

      var option = readData($option) || {};
      option[field_label] = option[field_label] || $option.text();
      option[field_value] = option[field_value] || value;
      option[field_disabled] = option[field_disabled] || $option.prop('disabled');
      option[field_optgroup] = option[field_optgroup] || group;
      option.styles = $option.attr('style') || '';
      option.classes = $option.attr('class') || '';

      optionsMap[value] = option;
      options.push(option);

      if ($option.is(':selected')) {
        settings_element.items.push(value);
      }
    };

    var addGroup = function ($optgroup) {
      var i, n, id, optgroup, $options;

      $optgroup = $($optgroup);
      id = $optgroup.attr('label');

      if (id) {
        optgroup = readData($optgroup) || {};
        optgroup[field_optgroup_label] = id;
        optgroup[field_optgroup_value] = id;
        optgroup[field_disabled] = $optgroup.prop('disabled');
        settings_element.optgroups.push(optgroup);
      }

      $options = $('option', $optgroup);
      for (i = 0, n = $options.length; i < n; i++) {
        addOption($options[i], id);
      }
    };

    settings_element.maxItems = $input.attr('multiple') ? null : 1;

    $children = $input.children();
    for (i = 0, n = $children.length; i < n; i++) {
      tagName = $children[i].tagName.toLowerCase();
      if (tagName === 'optgroup') {
        addGroup($children[i]);
      } else if (tagName === 'option') {
        addOption($children[i]);
      }
    }
  };

  return this.each(function () {
    if (this.selectize) return;

    var instance;
    var $input = $(this);
    var tag_name = this.tagName.toLowerCase();
    var placeholder = $input.attr('placeholder') || $input.attr('data-placeholder');
    if (!placeholder && !settings.allowEmptyOption) {
      placeholder = $input.children('option[value=""]').text();
    }
    if (settings.allowEmptyOption && settings.showEmptyOptionInDropdown && !$input.children('option[value=""]').length) {
      var input_html = $input.html();
      var label = escape_html(settings.emptyOptionLabel || '--');
      $input.html('<option value="">' + label + '</option>' + input_html);
    }

    var settings_element = {
      'placeholder': placeholder,
      'options': [],
      'optgroups': [],
      'items': []
    };

    if (tag_name === 'select') {
      init_select($input, settings_element);
    } else {
      init_textbox($input, settings_element);
    }

    instance = new Selectize($input, $.extend(true, {}, defaults, settings_element, settings_user));
    instance.settings_user = settings_user;
  });
};

$.fn.selectize.defaults = Selectize.defaults;
$.fn.selectize.support = {
  validity: SUPPORTS_VALIDITY_API
};

Selectize.define("auto_position", function () {
  var self = this;

  const POSITION = {
    top: 'top',
    bottom: 'bottom',
  };

  self.positionDropdown = (function() {
    return function() {
      const $control = this.$control;
      const offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position();
      offset.top += $control.outerHeight(true);

      const dropdownHeight = this.$dropdown.prop('scrollHeight') + 5; // 5 - padding value;
      const controlPosTop = this.$control.get(0).getBoundingClientRect().top;
      const wrapperHeight = this.$wrapper.height();
      const position = controlPosTop + dropdownHeight + wrapperHeight  > window.innerHeight ? POSITION.top : POSITION.bottom;
      const styles = {
        width: $control.outerWidth(),
        left: offset.left
      };

      if (position === POSITION.top) {
        const styleToAdd = { bottom: offset.top, top: 'unset' };

        if (this.settings.dropdownParent === 'body') {
          styleToAdd.top = offset.top - this.$dropdown.outerHeight(true) - $control.outerHeight(true);
          styleToAdd.bottom = 'unset';
        }
        Object.assign(styles, styleToAdd);
        this.$dropdown.addClass('selectize-position-top');
        this.$control.addClass('selectize-position-top');
      } else {
        Object.assign(styles, { top: offset.top, bottom: 'unset' });
        this.$dropdown.removeClass('selectize-position-top');
        this.$control.removeClass('selectize-position-top');
      }

      this.$dropdown.css(styles);
    };
  }());
});

Selectize.define('auto_select_on_type', function(options) {
	var self = this;

	self.onBlur = (function() {
		var originalBlur = self.onBlur;
		return function(e) {
			var $matchedItem = self.getFirstItemMatchedByTextContent(self.lastValue, true);
			if (typeof $matchedItem.attr('data-value') !== 'undefined' && self.getValue() !== $matchedItem.attr('data-value'))
			{
				self.setValue($matchedItem.attr('data-value'));
			}
			return originalBlur.apply(this, arguments);
		}
	}());
});

/**
 * Plugin: "autofill_disable" (selectize.js)
 * Copyright (c) 2013 Brian Reavis & contributors
 * Copyright (c) 2020-2022 Selectize Team & contributors
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
 * @author Ris Adams <selectize@risadams.com>
 */

Selectize.define("autofill_disable", function (options) {
  var self = this;

  self.setup = (function () {
    var original = self.setup;
    return function () {
      original.apply(self, arguments);

      // https://stackoverflow.com/questions/30053167/autocomplete-off-vs-false
      self.$control_input.attr({ autocomplete: "new-password", autofill: "no" });
    };
  })();
});

/**
 * Plugin: "clear_button" (selectize.js)
 * Copyright (c) 2013 Brian Reavis & contributors
 * Copyright (c) 2020-2022 Selectize Team & contributors
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
 * @author Fabien Winkler <fabien.winkler@outlook.fr>
 */

/**
 * @author [Fabien Winkler](https://github.com/fabienwnklr)
 * @typedef {object} options Object of options available for "clear_button" plugin
 * @param {string} [title=Clear] Title for the clear button
 * @param {string} [className=clear] Class name for the clear button
 * @param {string} [label=×] [props=data] Label for the clear button
 * @param {function} [html] Method used for rendering
 *
 * @example
 * ```js
 * $('select').selectize({
 *  plugins: [
 *    {
 *      clear_button: {
 *        title: 'Custom title',
 *        className: 'custom-class',
 *        label: 'custom label',
 *        html: (data) => {
 *          return (
 *            `<a class="${data.className}" title="${data.title}">${data.label}</a>`;
 *        }
 *     }
 *   }
 *  ]
 * });
 * ```
 */
Selectize.define("clear_button", function (options) {
  var self = this;

  options = $.extend(
    {
      title: "Clear",
      className: "clear",
      label: "×",
      html: function (data) {
        return (
          '<a class="' + data.className + '" title="' + data.title + '"> ' + data.label + '</a>'
        );
      },
    },
    options
  );

  self.setup = (function () {
    var original = self.setup;
    return function () {
      original.apply(self, arguments);
      self.$button_clear = $(options.html(options));

      if (self.settings.mode === "single") self.$wrapper.addClass("single");

      self.$wrapper.append(self.$button_clear);

      if (self.getValue() === "" || self.getValue().length === 0) {
        self.$wrapper.find("." + options.className).css("display", "none");
      }

      self.on("change", function () {
        if (self.getValue() === "" || self.getValue().length === 0) {
          self.$wrapper.find("." + options.className).css("display", "none");
        } else {
          self.$wrapper.find("." + options.className).css("display", "");
        }
      });

      self.$wrapper.on("click", "." + options.className, function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        if (self.isLocked) return;

        self.clear();
        self.$wrapper.find("." + options.className).css("display", "none");
      });
    };
  })();
});

/**
 * Plugin: "drag_drop" (selectize.js)
 * Copyright (c) 2013 Brian Reavis & contributors
 * Copyright (c) 2020-2022 Selectize Team & contributors*
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

Selectize.define('drag_drop', function(options) {
	if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
	if (this.settings.mode !== 'multi') return;
	var self = this;

	self.lock = (function() {
		var original = self.lock;
		return function() {
			var sortable = self.$control.data('sortable');
			if (sortable) sortable.disable();
			return original.apply(self, arguments);
		};
	})();

	self.unlock = (function() {
		var original = self.unlock;
		return function() {
			var sortable = self.$control.data('sortable');
			if (sortable) sortable.enable();
			return original.apply(self, arguments);
		};
	})();

	self.setup = (function() {
		var original = self.setup;
		return function() {
			original.apply(this, arguments);

			var $control = self.$control.sortable({
				items: '[data-value]',
				forcePlaceholderSize: true,
				disabled: self.isLocked,
				start: function(e, ui) {
					ui.placeholder.css('width', ui.helper.css('width'));
					// $control.css({overflow: 'visible'});
					$control.addClass('dragging');
				},
				stop: function() {
					// $control.css({overflow: 'hidden'});
					$control.removeClass('dragging');
					var active = self.$activeItems ? self.$activeItems.slice() : null;
					var values = [];
					$control.children('[data-value]').each(function() {
						values.push($(this).attr('data-value'));
					});
					self.isFocused = false;
					self.setValue(values);
					self.isFocused = true;
					self.setActiveItem(active);
					self.positionDropdown();
				}
			});
		};
	})();

});

/**
 * Plugin: "dropdown_header" (selectize.js)
 * Copyright (c) 2013 Brian Reavis & contributors
 * Copyright (c) 2020-2022 Selectize Team & contributors
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

/**
 * @author [Brian Reavis](https://github.com/brianreavis)
 * @typedef {Object} options Available options for dropdown_header plugin
 * @param {string} [title=Untitled] Title of dropdown_header
 * @param {string} [headerClass=selectize-dropdown-header] Class of dropdown_header
 * @param {string} [titleRowClass=selectize-dropdown-header-title] Class for title row
 * @param {string} [labelClass=selectize-dropdown-header-label] Class for label
 * @param {string} [closeClass=selectize-dropdown-header-close] Class for dropdown_header close button
 * @param {function} [html] Method for custom rendering of dropdown_header
 *
 * @example
 * ```js
 * $('select').selectize({
 *  plugins: [
 *    {
 *      dropdown_header: {
 *        title: 'Custom title',
 *        headerClass: 'custom-header-class',
 *        labelClass: 'custom-label-class',
 *        closeClass: 'custom-close-class',
 *        html: (data) => {
 *          // data contain all options values
 *          return (
 *            `<a class="${data.labelClass}" title="${data.title}">${data.title}</a>`;
 *        }
 *     }
 *   }
 *  ]
 * });
 * ```
 */
Selectize.define('dropdown_header', function(options) {
	var self = this;

	options = $.extend({
		title         : 'Untitled',
		headerClass   : 'selectize-dropdown-header',
		titleRowClass : 'selectize-dropdown-header-title',
		labelClass    : 'selectize-dropdown-header-label',
		closeClass    : 'selectize-dropdown-header-close',

		html: function(data) {
			return (
				'<div class="' + data.headerClass + '">' +
					'<div class="' + data.titleRowClass + '">' +
						'<span class="' + data.labelClass + '">' + data.title + '</span>' +
						'<a href="javascript:void(0)" class="' + data.closeClass + '">&#xd7;</a>' +
					'</div>' +
				'</div>'
			);
		}
	}, options);

	self.setup = (function() {
		var original = self.setup;
		return function() {
			original.apply(self, arguments);
			self.$dropdown_header = $(options.html(options));
      self.$dropdown.prepend(self.$dropdown_header);
      self.$dropdown_header.find('.' + options.closeClass).on('click', function () {
        self.close();
      });
		};
	})();

});

/**
 * Plugin: "optgroup_columns" (selectize.js)
 * Copyright (c) 2013 Simon Hewitt & contributors
 * Copyright (c) 2020-2022 Selectize Team & contributors*
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
 * @author Simon Hewitt <si@sjhewitt.co.uk>
 */

/**
 * @author [Simon Hewitt](https://github.com/sjhewitt)
 * @typedef {Object} options Available options for optgroup_columns plugin
 * @param {boolean} [equalizeWidth=true]
 * @param {boolean} [equalizeHeight=true]
 *
 * @example
 * ```js
 * $('select').selectize({
 *  plugins: [
 *    {
 *      optgroup_columns: {
 *        equalizeWidth: false,
 *        equalizeHeight: false,
 *     }
 *   }
 *  ]
 * });
 * ```
 */
Selectize.define('optgroup_columns', function(options) {
	var self = this;

	options = $.extend({
		equalizeWidth  : true,
		equalizeHeight : true
	}, options);

	this.getAdjacentOption = function($option, direction) {
		var $options = $option.closest('[data-group]').find('[data-selectable]');
		var index    = $options.index($option) + direction;

		return index >= 0 && index < $options.length ? $options.eq(index) : $();
	};

	this.onKeyDown = (function() {
		var original = self.onKeyDown;
		return function(e) {
			var index, $option, $options, $optgroup;

			if (this.isOpen && (e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT)) {
				self.ignoreHover = true;
				$optgroup = this.$activeOption.closest('[data-group]');
				index = $optgroup.find('[data-selectable]').index(this.$activeOption);

				if(e.keyCode === KEY_LEFT) {
					$optgroup = $optgroup.prev('[data-group]');
				} else {
					$optgroup = $optgroup.next('[data-group]');
				}

				$options = $optgroup.find('[data-selectable]');
				$option  = $options.eq(Math.min($options.length - 1, index));
				if ($option.length) {
					this.setActiveOption($option);
				}
				return;
			}

			return original.apply(this, arguments);
		};
	})();

	var getScrollbarWidth = function() {
		var div;
		var width = getScrollbarWidth.width;
		var doc = document;

		if (typeof width === 'undefined') {
			div = doc.createElement('div');
			div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
			div = div.firstChild;
			doc.body.appendChild(div);
			width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
			doc.body.removeChild(div);
		}
		return width;
	};

	var equalizeSizes = function() {
		var i, n, height_max, width, width_last, width_parent, $optgroups;

		$optgroups = $('[data-group]', self.$dropdown_content);
		n = $optgroups.length;
		if (!n || !self.$dropdown_content.width()) return;

		if (options.equalizeHeight) {
			height_max = 0;
			for (i = 0; i < n; i++) {
				height_max = Math.max(height_max, $optgroups.eq(i).height());
			}
			$optgroups.css({height: height_max});
		}

		if (options.equalizeWidth) {
			width_parent = self.$dropdown_content.innerWidth() - getScrollbarWidth();
			width = Math.round(width_parent / n);
			$optgroups.css({width: width});
			if (n > 1) {
				width_last = width_parent - width * (n - 1);
				$optgroups.eq(n - 1).css({width: width_last});
			}
		}
	};

	if (options.equalizeHeight || options.equalizeWidth) {
		hook.after(this, 'positionDropdown', equalizeSizes);
		hook.after(this, 'refreshOptions', equalizeSizes);
	}


});

/**
 * Plugin: "remove_button" (selectize.js)
 * Copyright (c) 2013 Brian Reavis & contributors
 * Copyright (c) 2020-2022 Selectize Team & contributors
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

/**
 * @author [Brian Reavis](https://github.com/brianreavis)
 * @typedef {Object} options Object of options available for "remove_button" plugin
 * @param {string} [label=&#xd7;] The label value for remove button
 * @param {string} [title=Remove] The Title value for remove button
 * @param {string} [className=remove] Class name for remove button
 * @param {boolean} [append=true] Append remove button to item
 */
Selectize.define('remove_button', function (options) {
  if (this.settings.mode === 'single') return;

	options = $.extend({
			label     : '&#xd7;',
			title     : 'Remove',
			className : 'remove',
			append    : true
		}, options);

		var multiClose = function(thisRef, options) {

			var self = thisRef;
			var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + '</a>';

			/**
			 * Appends an element as a child (with raw HTML).
			 *
			 * @param {string} html_container
			 * @param {string} html_element
			 * @return {string}
			 */
			var append = function(html_container, html_element) {
				var pos = html_container.search(/(<\/[^>]+>\s*)$/);
				return html_container.substring(0, pos) + html_element + html_container.substring(pos);
			};

			thisRef.setup = (function() {
				var original = self.setup;
				return function() {
					// override the item rendering method to add the button to each
					if (options.append) {
						var render_item = self.settings.render.item;
						self.settings.render.item = function(data) {
							return append(render_item.apply(thisRef, arguments), html);
						};
					}

					original.apply(thisRef, arguments);

					// add event listener
					thisRef.$control.on('click', '.' + options.className, function(e) {
						e.preventDefault();
						if (self.isLocked) return;

						var $item = $(e.currentTarget).parent();
						self.setActiveItem($item);
						if (self.deleteSelection()) {
							self.setCaret(self.items.length);
						}
						return false;
					});

				};
			})();
		};

    multiClose(this, options);
});

/**
 * Plugin: "restore_on_backspace" (selectize.js)
 * Copyright (c) 2013 Brian Reavis & contributors
 * Copyright (c) 2020-2022 Selectize Team & contributors
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

/**
 * @author [Brian Reavis](htts://github.com/brianreavis)
 * @typedef {Object} options Object of options available on restore_on_backspace plugin
 * @param {string} text Text to set on restore
 */
Selectize.define('restore_on_backspace', function(options) {
	var self = this;

	options.text = options.text || function(option) {
		return option[this.settings.labelField];
	};

	this.onKeyDown = (function() {
		var original = self.onKeyDown;
		return function(e) {
			var index, option;
			if (e.keyCode === KEY_BACKSPACE && this.$control_input.val() === '' && !this.$activeItems.length) {
				index = this.caretPos - 1;
				if (index >= 0 && index < this.items.length) {
					option = this.options[this.items[index]];
					if (this.deleteSelection(e)) {
						this.setTextboxValue(options.text.apply(this, [option]));
						this.refreshOptions(true);
					}
					e.preventDefault();
					return;
				}
			}
			return original.apply(this, arguments);
		};
	})();
});

Selectize.define('select_on_focus', function(options) {
	var self = this;

	self.on('focus', function() {
		var originalFocus = self.onFocus;
		return function(e) {
			var value = self.getItem(self.getValue()).text();
			self.clear();
			self.setTextboxValue(value);
			self.$control_input.select();
			setTimeout( function () {
				if (self.settings.selectOnTab) {
					self.setActiveOption(self.getFirstItemMatchedByTextContent(value));
				}
				self.settings.score = null;
			},0);
			return originalFocus.apply(this, arguments);
		};
	}());

	self.onBlur = (function() {
		var originalBlur = self.onBlur;
		return function(e) {
			if (self.getValue() === "" && self.lastValidValue !== self.getValue()) {
				self.setValue(self.lastValidValue);
			}
			setTimeout( function () {
				self.settings.score = function() {
					return function() {
						return 1;
					};
				};
			}, 0 );
			return originalBlur.apply(this, arguments);
		}
	}());
	self.settings.score = function() {
		return function() { return 1; };
	};

});

/**
 * @typedef {Object} options Object of available options for tag_limit plugin
 * @param {number} tagLimit Number of limit tag to display
 */
Selectize.define('tag_limit', function (options) {
    const self = this
    options.tagLimit = options.tagLimit
    this.onBlur = (function (e) {
        const original = self.onBlur

        return function (e) {
            original.apply(this, e);
            if (!e)
                return
            const $control = this.$control
            const $items = $control.find('.item')
            const limit = options.tagLimit
            if (limit === undefined || $items.length <= limit)
                return

            $items.toArray().forEach(function(item, index) {
                if (index < limit)
                    return
                $(item).hide()
            });

            $control.append('<span><b>' + ($items.length - limit) + '</b></span>')
        };
    })()

    this.onFocus = (function (e) {
        const original = self.onFocus

        return function (e) {
            original.apply(this, e);
            if (!e)
                return
            const $control = this.$control
            const $items = $control.find('.item')
            $items.show()
            $control.find('span').remove()

        };
    })()
});

  return Selectize;
}));
