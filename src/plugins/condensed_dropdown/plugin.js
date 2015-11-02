/**
 * Plugin: "condensed_dropdown" (selectize.js)
 * Copyright (c) 2015 Ran Tavory
 *
 *
 * Creates a condensed list of dropdown options so instead of having a single
 * option in each line you'd have multiple options each line.
 * Adds keys right/left arrow navigation b/w these options when the dropdown is
 * visible.
 *
 * Screenshot: http://jmp.sh/oeV2Six
 *
 * Turns this:
 * ===========
 *
 * |__He____________| <- you typed 'He'
 * | [Hell         ]| <- option 1
 * | [Hello        ]| <- option 2
 * | [Hello world  ]| <- option 3
 * ------------------
 *
 * Into this:
 * ===========
 *
 * |__He____________|
 * | [Hell] [Hello] | <- Note multiple options on the same line
 * | [Hello world]  |
 * ------------------
 *
 *
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
 * @author Ran Tavory <rantav@gmail.com>
 */

Selectize.define('condensed_dropdown', function(options) {
  var self = this;
  this.onKeyDown = (function() {
    var original = self.onKeyDown;
    return function(e) {
      if ((e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT) &&
          self.$activeOption) {
        self.ignoreHover = true;
        var direction = 0;
        if (e.keyCode === KEY_LEFT) {
          direction = -1;
        }
        if (e.keyCode === KEY_RIGHT) {
          direction = 1;
        }
        var $next = self.getAdjacentOption(self.$activeOption, direction);
        if ($next.length) {
          self.setActiveOption($next, true, true);
        }
        e.preventDefault();
        return;
      }
      return original.apply(this, arguments);
    };
  })();
});
