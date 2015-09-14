Package.describe({
  name: 'jeffrey:easy-map',
  version: '0.0.3',
  // Brief, one-line summary of the package.
  summary: 'An extremely simple one-line Google Maps package.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/jwjames/easy-map',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'templating',
    'underscore',
    'tracker',
    'mongo',
    'reactive-var@1.0.5',
  ], ['client', 'server']);

  api.imply([
    'dburles:google-maps@1.1.4'
  ], ['client', 'server']);

  api.addFiles([
    'client/map.css',
    'client/map.html',
    'client/map.js'
  ], ['client']);
});
