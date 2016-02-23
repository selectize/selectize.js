/**
 * Plugin: "click_edit" (selectize.js)
 * Copyright (c) 2013 Kris Salvador & contributors
 *
 * -- Description
 * - Given an input selectize, users now have the ability to
 * - click on a given item and edit them within the input.
 *
 * example gif: http://g.recordit.co/q391ZyVBVS.gif
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
 * @author Kris Salvador <krissalvador27@gmail.com>
 */

Selectize.define('click_to_edit', function( options ) {
  var self = this;

  options.text = options.text || function(option) {
    return option[this.settings.labelField];
  };

  this.onClick = (function(e) {
    var original     = self.onClick,
        maxItemIsOne = self.settings.maxItems === 1,
        activeClass  = maxItemIsOne ? 'item active' : 'input active';
   
    return function(e) {
      var index, option, key;

      if (e.target.className.indexOf(activeClass)) {
        index = this.caretPos - 1;
        if (index >= 0 && index < this.items.length) {
          key = maxItemIsOne ? $(e.target).children().first().data('value') : $(e.target).data('value');
          option = this.options[key];

          if (this.deleteSelection(e)) {
            // Remove item manually if maxItemIsOne since
            // `e` is not on the item itself but the input
            if (maxItemIsOne)
              this.removeItem(key);

            this.setTextboxValue(options.text.apply(this, [option]));
            this.refreshOptions(true);
          }
         
          e.preventDefault();
          return;
        }
      }
    };
  })();

});
