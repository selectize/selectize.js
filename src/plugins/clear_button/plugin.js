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
 * @param {object} options Object of options
 * @param {string} options.title (default: "Clear") Title for the clear button
 * @param {string} options.className (default : "clear") Class name for the clear button
 * @param {string} options.label (default: "×") Label for the clear button
 * @param {function} options.html Method used for rendering
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
