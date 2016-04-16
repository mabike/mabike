/*global Tracker, numeral*/
Tracker.autorun(function() {
  var locale = TAPi18n.getLanguage();
  numeral.language(locale);
});