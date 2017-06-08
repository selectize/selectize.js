/**
 * Plugin: "drip_custom_width" (selectize.js)
 *
 * Allows explicit width of a select to be passed
 * in during initialization
 *
 * ex. $(el).selectize({ width: 275 });
 */

Selectize.define('drip_custom_width', function(options) {
  var self = this;
  var original = self.setup;

  this.setup = (function() {
    if (self.settings.width) {
      self.$input[0].style.width = self.settings.width + 'px';
    }

    original.apply(self, arguments);
  });
});
