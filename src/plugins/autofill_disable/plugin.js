/**
 * Plugin: "autofill_disable" (selectize.js)
 * Copyright (c) 2020-2023 Selectize Team & contributors
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

/**
 * By default, Selectize allows the browser to autofill the control input provided by the user.
 * This plugin disables that behavior by generating a random name and autocomplete attribute.
 * This is a workaround for the fact that browsers do not allow disabling autofill.
 *
 * There are several ways to disable autofill, but they all have drawbacks
 * and are not handled the same way across all browsers:
 *
 * - Set the attribute `autocomplete="off"`: This is the most common way to disable autofill, but it is not supported by all browsers.
 * - Set the attribute `autocomplete="new-password"`: This is the most common way to disable autofill in modern browsers, but it is not supported by all browsers.
 * - Add a `readonly` attribute to the input and remove the property after the user has interacted with the control.
 * - Set the input type to `search` or `tel`: in conjuntion with `autocomplete="off"`.
 * - Wrap the input in a div, and add a hidden input with a tabindex of -1, and styled with 'display: none;'.
 * - Add a duplicate hidden input with the same name, but a different id.
 * - Use a randomizes name and autocomplete attribute.
 *
 * @author [Ris Adams](https://github.com/risadams)
 * @typedef {object} options Object of options available for "autofill_disable" plugin
 *
 *
 * @example
 * ```js
 * $('select').selectize({
 *  plugins: ['autofill_disable']
 * });
 * ```
 */
Selectize.define("autofill_disable", function (options) {
  var self = this;

  self.setup = (function () {
    var original = self.setup;
    return function () {
      original.apply(self, arguments);

      // https://stackoverflow.com/questions/30053167/autocomplete-off-vs-false
      self.$control_input.attr({ name: nanoid(21), autocomplete: nanoid(21) });
    };
  })();
});
