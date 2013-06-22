/**
 * Plugin: "remove_button" (selectize.js)
 * Copyright (c) 2013 Brian Reavis & contributors
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

(function() {
    Selectize.registerPlugin('optgroup_columns', function(options) {
        var self = this;

        this.getAdjacentOption = function(option, direction) {
            var options = option.closest(".optgroup").find("[data-selectable]"),
                index = options.index(option) + (isset(direction) ? direction : 1);
            return index >= 0 && index < options.length ? options.eq(index) : $();
        };

        this.onKeyDown = (function(e) {
            var original = self.onKeyDown;
            return function(e) {
                var index, option, options, optgroup;
                if (this.isOpen && (e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT)) {

                    optgroup = this.$activeOption.closest(".optgroup");
                    index = optgroup.find("[data-selectable]").index(this.$activeOption);

                    if(e.keyCode === KEY_LEFT) {
                        optgroup = optgroup.prev(".optgroup");
                    } else {
                        optgroup = optgroup.next(".optgroup");
                    }

                    options = optgroup.find("[data-selectable]");
                    option = options.eq(Math.min(options.length-1, index));
                    if(option.length) {
                        this.setActiveOption(option);
                    }
                    return;
                }
                return original.apply(this, arguments);
            };
        })();

    });
})();
