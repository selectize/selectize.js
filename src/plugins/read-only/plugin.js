/**
 * Plugin: "read-only" (selectize.js)
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
 */

Selectize.define('read-only', function(options){
	var self = this;
	this.setup = (function() {
		var original = self.setup;
		return function() {
			original.apply(this, arguments);
			if(this.$dropdown.hasClass("read-only"))this.$control_input.attr('readonly', 'readonly');
		};
	})();
	this.readonly = (function() {
		return function(state) {
			if(state){
				this.$control_input.attr('readonly', 'readonly');
				this.$dropdown.addClass("read-only")
			}
			else{
				this.$control_input.removeAttr('readonly');
				this.$dropdown.removeClass("read-only")
			}
		};
	})();
});
