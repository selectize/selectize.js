/**
 * selectize.js (v@@version)
 * Copyright (c) 2013–2015 Brian Reavis & contributors
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

/*jshint curly:false */
/*jshint browser:true */

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery','sifter','microplugin'], factory);
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = factory(require('jquery'), require('sifter'), require('microplugin'));
	} else {
		root.Selectize = factory(root.jQuery, root.Sifter, root.MicroPlugin);
	}
}(this, function($, Sifter, MicroPlugin) {
	'use strict';

	@@js

	return Selectize;
}));
