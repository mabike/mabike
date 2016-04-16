Package.describe({
  name: 'mabike:material-design-icons',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Material Design Icons',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('mquandalle:bower@1.5.2');
  api.use('fourseven:scss@3.4.1');
  api.addFiles('bower.json');
  if (api.addAssets) {
    api.addAssets('.bowerrc', ['server']);
  } else {
    api.addFiles('.bowerrc', ['server'], {
      isAsset: true
    });
  }

  api.addFiles([
    'mdi/scss/_core.scss',
    'mdi/scss/_extras.scss',
    'mdi/scss/_icons.scss',
    'mdi/scss/_path.scss',
    'mdi/scss/_variables.scss',
    'mdi/scss/materialdesignicons.scss'
  ], 'client');

});
