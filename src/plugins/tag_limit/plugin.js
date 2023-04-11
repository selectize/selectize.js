/**
 * @typedef {Object} options Object of available options for tag_limit plugin
 * @param {number} tagLimit Number of limit tag to display
 */
Selectize.define("tag_limit", function (options) {
    const self = this;

    if (this.settings.mode === "single") {
        return;
    }

    options = $.extend(
        {
            tagLimit: 5,
            limitLabel: "{count} items selected",
            hideAllItems: true,
        },
        options
    );

    self.setup = (function () {
        const original = self.setup;

        return function () {
            original.apply(self, arguments);

            addLimit.apply(self);
        };
    })();

    function addLimit() {
        clearLimit();
        const $control = this.$control;
        const $items = $control.find(".item");
        const limit = options.tagLimit;
        if (limit === undefined || $items.length <= limit) return;

        $items.toArray().forEach(function (item, index) {
            if (!options.hideAllItems && index < limit) return;
            $(item).hide();
        });

        const label = options.limitLabel.replace("{count}", $items.length);

        $control.prepend('<span class="tag-limit-label"><b>' + label + "</b></span>");
    }

    function clearLimit() {
        const $control = self.$control;
        const $items = $control.find(".item");
        $items.show();
        $control.find("span").remove();
    }

    self.onBlur = (function (e) {
        const original = self.onBlur;

        return function (e) {
            original.apply(self, e);

            if (!e) return;

            addLimit.apply(self, original, e);
        };
    })();

    self.onFocus = (function (e) {
        const original = self.onFocus;

        return function (e) {
            original.apply(self, e);
            if (!e) return;

            if (options.clearOnFocus) {
                clearLimit();
            }
        };
    })();

    self.onOptionSelect = (function (e) {
        const original = self.onOptionSelect;

        return function (e) {
            original.call(self, e);
            if (!e) return;

            addLimit.apply(self);
        };
    })();
});
