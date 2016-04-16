Package.describe({
  name: 'mabike:feed',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Stolen bike feed',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

var languages = ['en'];

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['templating', 'reactive-var', 'underscore', 'ecmascript']);
  api.use(['kadira:flow-router@2.6.0', 'kadira:blaze-layout@2.1.0']);
  api.use('useraccounts:flow-routing@1.12.3');
  api.use('tap:i18n@1.5.1');
  api.use('fourseven:scss@3.2.0');
  api.use('mabike:app-main');
  api.use('mabike:incidents');
  addLanguages(api);
  addTemplates(api, [
    'feed'
  ]);
  api.addFiles('routes/feed.js');
});

function addLanguages(api) {
  for (var i = 0; i < languages.length; i++) {
    api.addFiles('i18n/' + languages[i] + '.i18n.json');
  }
}

function addTemplates(api, templates) {
  for (var t in templates) {
    var path = 'templates/' + templates[t];
    var files = [path + '.html', path + '.js', path + '.scss'];
    api.addFiles(files, 'client');
  }
}
