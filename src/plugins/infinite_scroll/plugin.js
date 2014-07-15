/**
 * Plugin: "optgroup_columns" (selectize.js)
 * Copyright (c) 2013 Simon Hewitt & contributors
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
 * @author Galkin Rostislav <galkinrost@gmail.com>
 */

Selectize.define('infinite_scroll', function (options) {
    var self = this;

    options = $.extend({
        loadingOffset: 50
    }, options);

    $.extend(self, {
        loadedPages: {},
        onPageChange: options.loadThrottle === null ? self.onPageChange : debounce(self.onPageChange, options.loadThrottle)
    });

    this.loadedPages = {};

    this.onPageChange = function () {
        var fn = self.settings.load;
        var query = self.lastQuery;
        if (!fn || self.loadedPages[query] === false) return;
        var page = self.loadedPages[query] = self.loadedPages[query] + 1;
        self.load(function (callback) {
            function middleware(res) {
                if (!res || res.length === 0) {
                    (function (query) {
                        self.loadedPages[query] = false;
                    })(query);
                }
                callback.apply(self, arguments);
            }

            fn.apply(self, [query, page, middleware]);
        });
    };

    this.onSearchChange = function (value) {
        var fn = self.settings.load;
        if (!fn) return;
        if (self.loadedPages.hasOwnProperty(value)) return;
        self.loadedSearches[value] = true;
        self.loadedPages[value] = 1;
        self.load(function (callback) {
            fn.apply(self, [value, 1, callback]);
        });
    };

    hook.after(this, 'setup', function () {
        self.$dropdown_content.scroll(function () {
            if (!self.isOpen)return;
            if ($(this)[0].scrollHeight - ($(this).scrollTop() + $(this).height()) < options.loadingOffset) {
                self.onPageChange();
            }
        });
    });
});