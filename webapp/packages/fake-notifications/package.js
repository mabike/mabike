Package.describe({
  name: 'mabike:fake-notifications',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Faking a push notification',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

var languages = ['en'];

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['ecmascript', 'templating', 'random']);
  api.use('lepozepo:streams@0.2.0');
  api.use('fourseven:scss@3.2.0');
  api.use('tap:i18n@1.5.1');
  api.use('mabike:app-main');

  api.addFiles('notification.js');
  api.addFiles('notification.client.js', 'client');
  api.addFiles('notification.server.js', 'server');

  addLanguages(api);

  addTemplates(api, [
    'dialog-bike-found'
  ]);

});

function addTemplates(api, templates) {
  for (var t in templates) {
    var path = 'templates/' + templates[t];
    var files = [path + '.html', path + '.js', path + '.scss'];
    api.addFiles(files, 'client');
  }
}

function addLanguages(api) {
  for (var i = 0; i < languages.length; i++) {
    api.addFiles('i18n/' + languages[i] + '.i18n.json');
  }
}
