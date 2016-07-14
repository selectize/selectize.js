Selectize.define('select_on_focus', function(options) {
  var self = this;

  options.text = options.text || function(option) {
    return option[this.settings.labelField];
  };

  self.on('focus', function(e) {
    var index = self.caretPos - 1;
    if (index >= 0 && index < self.items.length) {
      var option = self.options[self.items[index]];
      if (self.deleteSelection(e)) {
        self.clear();
        self.setTextboxValue(options.text.apply(self, [option]));
        self.refreshOptions(true);
        self.$control_input.select();
        self.refreshState();
      }
      return;
    }
  });
});

