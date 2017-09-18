// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCDQlr-6mi_7IXlS0kSQO0zCg9xihv9MOQ',
    authDomain: 'excel-quote-manager.firebaseapp.com',
    databaseURL: 'https://excel-quote-manager.firebaseio.com',
    projectId: 'excel-quote-manager',
    storageBucket: 'excel-quote-manager.appspot.com',
    messagingSenderId: '311951705357'
  }
};
