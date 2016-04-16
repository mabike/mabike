Package.describe({
  name: 'mabike:leaflet-usermarker',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'heyman/leaflet-usermarker packaged for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('bevanhunt:leaflet@1.3.1');
  api.addFiles('leaflet.usermarker.css', 'client');
  api.addFiles('leaflet.usermarker.js', 'client');
  var images = ['img/bluedot.png'];
  if (api.addAssets) {
    api.addAssets(images, 'client');
  } else {
    api.addFiles(images, 'client', {
      isAsset: true
    });
  }
});
