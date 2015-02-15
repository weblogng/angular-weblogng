[![Build Status](https://travis-ci.org/weblogng/angular-weblogng.svg?branch=master)](https://travis-ci.org/weblogng/angular-weblogng)

# angular-weblogng

AngularJS module for the WeblogNG client library.

## About

See the [project homepage](http://weblogng.github.io/angular-weblogng).

## Installation

Using Bower:

    bower install angular-weblogng

Or grab the [source](https://github.com/weblogng/angular-weblogng/blob/master/dist/angular-weblogng.js) ([minified](https://github.com/weblogng/angular-weblogng/blob/master/dist/angular-weblogng.min.js)).

## Usage

The WeblogNG module can be integrated into an application by:

1. include the angular-weblogng.js script in your application, e.g. bower_components/angular-weblogng/dist/angular-weblogng.js 
2. define the 'weblogng' module as one of the application's dependencies
3. declare the 'weblogngConfig' constant

Example app configuration with the WeblogNG module:

    angular.module('yourAppModule', [
        'weblogng'
      ])
      .constant('weblogngConfig', {
        apiKey: 'your api key',
        options: {
          publishNavigationTimingMetrics: true,
          publishUserActive: true,
          application: 'your application name'
        }
      })

## Contributing

We'll check out your contribution if you:

* Provide a comprehensive suite of tests for your fork.
* Have a clear and documented rationale for your changes.
* Package these up in a pull request.

We'll do our best to help you out with any contribution issues you may have.

## License

MIT. See `LICENSE.txt` in this directory.
