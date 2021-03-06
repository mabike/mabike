Package.describe({
  name: 'mabike:rnv-interface',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'RNV interface',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['ecmascript', 'random', 'mongo']);
  api.use(['aldeed:simple-schema@1.3.3', 'aldeed:collection2@2.5.0']);
  api.use('mabike:app-main');

  api.addFiles('collections/stops.js');
  api.addFiles('methods/get-next-stop.js', 'server');
  api.addFiles('startup.js', 'server');
  api.addAssets('stops.json', 'server');
});
