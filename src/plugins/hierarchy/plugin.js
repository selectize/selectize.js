/**
 * Plugin: "hierarchy" (selectize.js)
 * Copyright (c) 2017 Hendra Gunawan & contributors
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
 * @author Hendra Gunawan <the.liquid.metal@gmail.com>
 */

Selectize.define('hierarchy', function(options) {
	options = $.extend({
		mustHaveLowestChild: false,                  // BOOL (false)
		produceValue: "many",                        // ("many") | "last-child" | "lowest-child"
		itemDisplay: "many",                         // ("many") | "single-block" | "single-fit"
		labelPrefix: "",                             // ARRAY | FUNCTION
		optionGroupTemplate: "",                     // STRING
		directingPlaceholder: "please select more",  // STRING ("please select more")
		levelKey: "level",                           // STRING ("level")
		parentIdKey: "parentId",                     // STRING ("parentId")
		queryKey: "query",                           // STRING ("query")
	}, options);
	
	var self = this;
	
	var IS_MAC        = /Mac/.test(navigator.userAgent);
	var KEY_A         = 65;
	var KEY_COMMA     = 188;
	var KEY_RETURN    = 13;
	var KEY_ESC       = 27;
	var KEY_LEFT      = 37;
	var KEY_UP        = 38;
	var KEY_P         = 80;
	var KEY_RIGHT     = 39;
	var KEY_DOWN      = 40;
	var KEY_N         = 78;
	var KEY_BACKSPACE = 8;
	var KEY_DELETE    = 46;
	var KEY_SHIFT     = 16;
	var KEY_CMD       = IS_MAC ? 91 : 17;
	var KEY_CTRL      = IS_MAC ? 18 : 17;
	var KEY_TAB       = 9;
	
	var placeholderOri = this.settings.placeholder;
	var optionsOri = {};
	var inCyclicPhase = false;
	
	var arrayToObject = function (obj) {
		if (obj === undefined) {
			return;
		}
		
		$.each(obj, function (key, val) {
			var childrenIsArray = Array.isArray(val.children);
			if (childrenIsArray && val.children.length > 0) {
				obj[key].children = arrayToObject(val.children);
			} else if (childrenIsArray) {
				obj[key].children = undefined;
			}
		});

		var newObj = {};
		var valueField = self.settings.valueField;
		var id;
		$.each(obj, function (key, val) {
			id = val[valueField];
			newObj[id] = val;
		});
		return newObj;
	}
	
	var defaultLoad = function (params) {
		return function (query, callback) {
			if (!query.length) return callback();

			if (params.urlTemplate) {
				params.url = params.urlTemplate.replace('{{QUERY}}', query);
			}
			
			params.success = params.success || function (res) {callback(res);};
			params.error = params.error || function () {callback();};
			params.data = params.data || {};
			
			var values = self.getValue();
			var lastVal = values[values.length -1] || null;
			
			params.data[options.levelKey] = values.length +1;
			params.data[options.parentIdKey] = lastVal;
			params.data[options.queryKey] = query;
			
			$.ajax(params);
		}
	};
	
	if ($.inArray(options.itemDisplay, ["many", "single-block", "single-fit"]) == -1) {
		options.itemDisplay = "many";
	}
	
	if ($.inArray(options.produceValue, ["many", "last-child", "lowest-child"]) == -1) {
		options.itemDisplay = "many";
	}
	
	var $injection = $("#selectize-hierarchy-injection");
	if (!$injection.length) {
		$('<style id="selectize-hierarchy-injection"/>')
			.appendTo("body")
			.html(
				".single-block .item {display: block !important;}" +
				".single-fit   .item {display: block !important; width: fit-content !important;}" +
				".plugin-hierarchy .optgroup-header {font-size: 1em !important;}"
			);
	}
	
	var s = self.settings;
	if (typeof s.load == "string") {
		s.load = defaultLoad({url: s.load});
		
	} else if ($.isPlainObject(s.load)) {
		s.load = defaultLoad(s.load);
	}

	var modifyValue = function () {
		var values = self.getValue();
		var length = values.length;
		var lastVal = values[length -1];
		
		var lastOption = self.options[lastVal] || {};
		var children = lastOption.children;
		var hasChildren = lastOption.hasChildren;
		
		var pv = options.produceValue;
		if (pv === "last-child") {
			self.$definitive_input.val(lastVal);
			
		} else if (pv === "lowest-child") {
			if (children || hasChildren) {
				self.$definitive_input.val("");
			} else if (!children && !hasChildren) {
				self.$definitive_input.val(lastVal);
			}
		}
	};
	
	this.setup = (function () {
		var original = self.setup;
		return function() {
			original.apply(this, arguments);
			
			var pv = options.produceValue;
			if (pv === "last-child" || pv === "lowest-child") {
				self.$definitive_input = $('<input type="hidden"/>');
				self.$input.after(self.$definitive_input);
				
				var name = self.$input.attr("name");
				if (name) {
					self.$definitive_input.attr("name", name);
					self.$input.removeAttr("name");
					
				} else {
					console.warn("the original element does not have attribute 'name'");
				}
			}
			
			$.extend(true, optionsOri, this.options);
			optionsOri = arrayToObject(optionsOri);
		};
	})();
	
	this.addOptionGroup = function () {
		var values = self.getValue();
		var length = values.length;
		var lastVal = values[length -1];
		
		var lp = options.labelPrefix;
		var levelLbl = "";
		var parentLbl = length ? self.options[lastVal][self.settings.labelField] : "";

		if ($.isArray(lp)) {
			levelLbl = lp[length] || "";
		} else if ($.isFunction(lp)) {
			levelLbl = lp(length +1) || "";
		}

		var optgroupLabel = options.optionGroupTemplate
			.replace("{{LEVEL_ID}}", length)
			.replace("{{PARENT_ID}}", lastVal)
			.replace("{{LEVEL_LBL}}", levelLbl)
			.replace("{{PARENT_LBL}}", parentLbl);
			
		var $selectizeDropdown = self.$wrapper.find(".selectize-dropdown");
		var $optgroupHeader = $selectizeDropdown.find(".optgroup-header");
		
		if (length > 0) {
			if ($optgroupHeader.length === 0) {
				$optgroupHeader = $('<div class="optgroup-header"/>').prependTo($selectizeDropdown);
			}
			$optgroupHeader.html(optgroupLabel);
		} else {
			$optgroupHeader.remove();
		}
	}
	
	this.addItem = (function () {
		var original = self.addItem;
		return function() {
			original.apply(this, arguments);

			if (!inCyclicPhase) {
				inCyclicPhase = true;
				
				var values = self.getValue();
				var length = values.length;
				var lastVal = values[length -1];
				
				var $lastItem = self.getItem(lastVal);
				var prefix = "";
				var lastItemTxt = $lastItem.html();
				
				var lp = options.labelPrefix;
				var prefix = "";
				
				if ($.isArray(lp)) {
					prefix = lp[length -1] || "";
				} else if ($.isFunction(lp)) {
					prefix = lp(length) || "";
				}
				
				var separator = prefix ? ": " : "";

				$lastItem.html(prefix + separator + lastItemTxt);
				$lastItem.closest(".plugin-hierarchy").addClass(options.itemDisplay);
				
				var optionKeys = Object.keys(self.options);
				var toBeDeletedKey = optionKeys.filter(function (key) {
					return $.inArray(key, values) == -1;
				});
				
				$.each(toBeDeletedKey, function (key, val) {
					self.removeOption(val);
				});
				self.refreshOptions();
				
				var children = self.options[lastVal].children;
				if (children) {
					$.each(children, function (key, val) {
						self.addOption(val);
					});
					self.refreshOptions();
					
					if (options.mustHaveLowestChild) {
						var $input = self.$control_input;
						$input.attr("placeholder", options.directingPlaceholder);
						$input.triggerHandler('update', {force: true});
					}
				}
				
				if (options.optionGroupTemplate && options.labelPrefix) {
					self.addOptionGroup();
				}
				
				modifyValue();
				
				inCyclicPhase = false;
			}
		};
	})();
	
	this.removeItem = (function () {
		var original = self.removeItem;
		return function() {
			original.apply(this, arguments);
			
			if (!inCyclicPhase) {
				inCyclicPhase = true;
				
				var values = self.getValue();
				var length = values.length;
				var lastVal = values[length -1];
				
				var newOptions;
				
				if (length === 0) {
					self.clearOptions();
					newOptions = optionsOri;

				} else {
					var optionKeys = Object.keys(self.options);
					var toBeDeletedKey = optionKeys.filter(function (key) {
						return $.inArray(key, values) == -1;
					});
					
					$.each(toBeDeletedKey, function (key, val) {
						self.removeOption(val);
					});
				
					var lastOption = self.options[lastVal];
					
					newOptions = lastOption.children;
				}
					
				$.each(newOptions, function (key, val) {
					self.addOption(val);
				});
				self.refreshOptions();
				
				if (options.mustHaveLowestChild) {
					var $input = self.$control_input;
					var placeholder = values.length ? options.directingPlaceholder : placeholderOri
					
					$input.attr("placeholder", placeholder);
					$input.triggerHandler('update', {force: true});
				}

				if (options.optionGroupTemplate && options.labelPrefix) {
					self.addOptionGroup();
				}

				modifyValue();
				
				inCyclicPhase = false;
			}
		};
	})();
	
	this.onKeyDown = (function() {
		var original = self.onKeyDown;
		return function(e) {
			var index, option;
			if (e.keyCode === KEY_LEFT) {
				e.preventDefault();
				return;
			}
			return original.apply(this, arguments);
		};
	})();
});
