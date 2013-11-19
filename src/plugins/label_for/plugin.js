/**
 * Plugin: "label_for" (selectize.js)
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
 * @author Brian Reavis <brian@thirdroute.com>
 */

Selectize.define('label_for', function(options) {

	var self = this;

	self.setup = (function() {

		var original = self.setup;

		return function() {

			original.apply(self, arguments);

			self.$control_input.closest('form').find('label[for="'+self.$input.attr('id')+'"]').on("click",function(e){

				var $target = $(e.currentTarget), $tmpinput = $('#'+$target.attr('for'));

				if ( $tmpinput.length > 0 && $tmpinput.prop('disabled') !== true ) {

					$tmpinput[0].selectize.$control_input.focus();

				}

			});
		};
		
	})();

});