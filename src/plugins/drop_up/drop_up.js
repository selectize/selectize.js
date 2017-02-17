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
