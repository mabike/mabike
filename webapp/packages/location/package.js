Package.describe({
  name: 'mabike:location',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Location-Based Services',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

var languages = ['en', 'de'];
var assets = [
  'images/primary-marker.png',
  'images/primary-marker@2x.png',
  'images/primary-marker-shadow.png',
  'images/secondary-marker.png',
  'images/secondary-marker-shadow.png',
  'images/secondary-marker@2x.png'
];

Cordova.depends({
  "cordova-plugin-geolocation": "https://github.com/apache/cordova-plugin-geolocation/tarball/e529db6abd497dde3ac03fc225d42d3ebaa09601"
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['templating', 'reactive-var', 'underscore']);
  api.use(['kadira:flow-router@2.6.0', 'kadira:blaze-layout@2.1.0']);
  api.use('useraccounts:flow-routing@1.12.3');
  api.use('tap:i18n@1.5.1');
  api.use('grigio:babel@0.1.7');
  //api.use('alon:ol3@3.10.0'); // OpenLayers mapping engine
  api.use('bevanhunt:leaflet@1.3.1'); // Leaflet mapping engine
  api.imply('bevanhunt:leaflet');
  api.use('mabike:leaflet-control-geocoder');
  api.use('mabike:leaflet-usermarker');
  api.use('prunecluster:prunecluster@0.10.1');
  api.use('fourseven:scss@3.2.0');
  api.use('mabike:numeral'); // number formatting
  addLanguages(api);
  if (api.addAssets) {
    api.addAssets(assets, 'client');
  } else {
    api.addFiles(assets, 'client', {
      isAsset: true
    });
  }
  api.addFiles('leaflet-config.js', 'client');
  api.addFiles('publications/bikes-in-bounding-box.js', 'server');
  api.addFiles('templates/location-picker.html', 'client');
  api.addFiles('templates/location-picker.js', 'client');
  api.addFiles('templates/location-picker.scss', 'client');
  api.addFiles('routes/location.js');
  api.export('LeafletConfig', 'client');
});

function addLanguages(api) {
  for (var i = 0; i < languages.length; i++) {
    api.addFiles('i18n/' + languages[i] + '.i18n.json');
  }
}
