
/**
 * Plugin: "drop_up" (selectize.js)
 * Copyright (c) 2017 David Hequet & contributors
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
 * @author David Hequet
 */

/**
* Allow selectize to drop up
*/
Selectize.define('drop_up', function (options) {
    var self = this;
    this.positionDropdown = function () {
        var $control = this.$control;
        var offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position();
        offset.top -= this.$dropdown.outerHeight(true);
        this.$dropdown.css({
            width: $control.outerWidth(),
            top: offset.top,
            left: offset.left
        });
    }
});
