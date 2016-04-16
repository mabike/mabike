/**
 * Global template helpers used troughout the app
 */

// Get the instance of the current template
Template.registerHelper('instance', function() {
  return Template.instance();
});
