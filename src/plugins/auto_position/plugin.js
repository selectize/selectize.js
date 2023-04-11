Selectize.define("auto_position", function () {
  const self = this;

  const POSITION = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
  };

  self.positionDropdown = (function () {
    return function () {
      const $control = this.$control;
      const offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position();
      offset.top += $control.outerHeight(true);

      const dropdownHeight = this.$dropdown.prop('scrollHeight') + 5; // 5 - padding value;
      const controlPosTop = this.$control.get(0).getBoundingClientRect().top;
      const wrapperHeight = this.$wrapper.height();
      const controlPosBottom = self.$control.get(0).getBoundingClientRect().bottom
      const position =
        controlPosTop + dropdownHeight + wrapperHeight > window.innerHeight &&
          controlPosBottom - dropdownHeight - wrapperHeight >= 0 ?
          POSITION.top :
          POSITION.bottom;
      let w = 'max-content';
      if (this.$wrapper[0].style.width !== 'fit-content') {
          w = this.settings.dropdownParent === 'body' ? w : '100%';
      }
      const styles = {
        width: w,
        minWidth : $control.outerWidth(true),
        left: offset.left
      };

      // TODO : Manage left/right position
      if (position === POSITION.top) {
        const styleToAdd = { bottom: offset.top, top: 'unset' };

        if (this.settings.dropdownParent === 'body') {
          styleToAdd.top = offset.top - this.$dropdown.outerHeight(true) - $control.outerHeight(true);
          styleToAdd.bottom = 'unset';
        }
        Object.assign(styles, styleToAdd);
        this.$dropdown.addClass('selectize-position-top');
        this.$control.addClass('selectize-position-top');
      } else {
        Object.assign(styles, { top: offset.top, bottom: 'unset' });
        this.$dropdown.removeClass('selectize-position-top');
        this.$control.removeClass('selectize-position-top');
      }

      if (this.settings.dropdownParent !== 'body' && w === 'max-content' && $control.outerWidth(true) >= this.$dropdown.outerWidth(true)) {
        w = '100%';
      }

      this.$dropdown.css(styles);
    };
  }());
});
