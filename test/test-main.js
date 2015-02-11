/* global window, requirejs */

var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: 'base/dist',

  // ask Require.js to load these files (all our tests)
  deps: tests,

  callback: window.__karma__.start
});
