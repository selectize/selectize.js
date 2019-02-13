Selectize.define('typing_mode', function (options) {
  var self = this;

  this.setup = (function () {
    var original = self.setup;

    return function () {
      original.apply(this, arguments);

      this.on('dropdown_open', function () {
        self.typingValue = self.typingValue || self.getValue();
        var option = self.getOption(self.typingValue);

        self.$control_input.attr('placeholder', option.text().trim());
        self.$control_input.css({
          opacity: '1',
          width: '100%',
          position: 'relative'
        });
        self.$control.find('.item').hide();

        self.items = [];
        self.setCaret(0);
      });

      this.on('change', function () {
        self.typingValue = self.getValue();
      });

      this.$control_input.on('blur', function () {
        self.setValue(self.typingValue);
      });
    };
  })();
});