Package.describe({
  name: 'mabike:leaflet-control-geocoder',
  version: '1.3.2',
  // Brief, one-line summary of the package.
  summary: 'perliedman/leaflet-control-geocoder packaged for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('bevanhunt:leaflet@1.3.1');
  api.addFiles('Control.Geocoder.css', 'client');
  api.addFiles('Control.Geocoder.js', 'client');
  var images = ['images/geocoder.png', 'images/throbber.gif'];
  if (api.addAssets) {
    api.addAssets(images, 'client');
  } else {
    api.addFiles(images, 'client', {
      isAsset: true
    });
  }
});
