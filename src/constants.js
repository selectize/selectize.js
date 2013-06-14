/**
 * selectize - A highly customizable select control with autocomplete.
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

var IS_MAC        = /Mac/.test(navigator.userAgent);

var KEY_A         = 65;
var KEY_COMMA     = 188;
var KEY_RETURN    = 13;
var KEY_ESC       = 27;
var KEY_LEFT      = 37;
var KEY_UP        = 38;
var KEY_RIGHT     = 39;
var KEY_DOWN      = 40;
var KEY_BACKSPACE = 8;
var KEY_DELETE    = 46;
var KEY_SHIFT     = 16;
var KEY_CMD       = IS_MAC ? 91 : 17;
var KEY_CTRL      = IS_MAC ? 18 : 17;
var KEY_TAB       = 9;

var TAG_SELECT    = 1;
var TAG_INPUT     = 2;

var DIACRITICS = {
	'a': '[aÀÁÂÃÄÅàáâãäå]',
	'c': '[cÇç]',
	'e': '[eÈÉÊËèéêë]',
	'i': '[iÌÍÎÏìíîï]',
	'n': '[nÑñ]',
	'o': '[oÒÓÔÕÕÖØòóôõöø]',
	's': '[sŠš]',
	'u': '[uÙÚÛÜùúûü]',
	'y': '[yŸÿý]',
	'z': '[zŽž]'
};