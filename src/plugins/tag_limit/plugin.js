Selectize.define('tag_limit', function (options) {
    const self = this
    options.tagLimit = options.tagLimit
    this.onBlur = (function (e) {
        const original = self.onBlur

        return function (e) {
            original.apply(this, e);
            if (!e)
                return
            const $control = this.$control
            const $items = $control.find('.item')
            const limit = options.tagLimit
            if (limit === undefined || $items.length <= limit)
                return

            $items.toArray().forEach(function(item, index) {
                if (index < limit)
                    return
                $(item).hide()
            });

            $control.append('<span><b>' + ($items.length - limit) + '</b></span>')
        };
    })()

    this.onFocus = (function (e) {
        const original = self.onFocus

        return function (e) {
            original.apply(this, e);
            if (!e)
                return
            const $control = this.$control
            const $items = $control.find('.item')
            $items.show()
            $control.find('span').remove()

        };
    })()
});
