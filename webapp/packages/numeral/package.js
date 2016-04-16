Package.describe({
  name: 'mabike:numeral',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Wrapper for numeral.js with all languages.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});


Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('tracker');
  api.use('tap:i18n@1.5.1');
  api.use('numeral:languages@1.5.3');
  api.addFiles('autorun.js', 'client');
});
