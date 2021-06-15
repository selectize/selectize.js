Selectize.define("auto_position", function () {
  var self = this;

  const POSITION = {
    top: 'top',
    bottom: 'bottom',
  };

  self.positionDropdown = (function() {
    return function() {
      const $control = this.$control;
      const offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position();
      offset.top += $control.outerHeight(true);

      const dropdownHeight = this.$dropdown.prop('scrollHeight') + 5; // 5 - padding value;
      const controlPosTop = this.$control.get(0).getBoundingClientRect().top;
      const wrapperHeight = this.$wrapper.height();
      const position = controlPosTop + dropdownHeight + wrapperHeight  > window.innerHeight ? POSITION.top : POSITION.bottom;
      const styles = {
        width: $control.outerWidth(),
        left: offset.left
      };

      if (position === POSITION.top) {
        Object.assign(styles, {bottom: offset.top, top: 'unset', margin: '0 0 5px 0'});
        this.$dropdown.addClass('selectize-position-top');
      } else {
        Object.assign(styles, {top: offset.top, bottom: 'unset', margin: '5px 0 0 0'});
        this.$dropdown.removeClass('selectize-position-top');
      }

      this.$dropdown.css(styles);
    }
  }());
});
