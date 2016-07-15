/**
 * Plugin: "select_on_focus" (selectize.js)
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
 * @author Christopher Rued <christor@gmail.com>
 */
Selectize.define('select_on_focus', function(options) {
  var self = this;

  options.text = options.text || function(option) {
      return option[this.settings.labelField];
    };

  self.on('focus', function(e) {
    var index = self.caretPos - 1;
    if (index >= 0 && index < self.items.length) {
      var option = self.options[self.items[index]];
      if (self.deleteSelection(e)) {
        self.clear();
        self.setTextboxValue(options.text.apply(self, [option]));
        self.refreshOptions(true);
        self.$control_input.select();
        self.refreshState();
      }
      return;
    }
  });
});

