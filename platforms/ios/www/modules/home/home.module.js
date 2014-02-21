/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-18
 * Time: 1:17 PM
 *
 */
var Home = angular.module('Home', []).
  run(function ($http, $templateCache) {

    /*
     *
     * pre load the module templates
     *
     * */
    /*
     *
     * Load Home Template
     *
     * */
    $http.get('./modules/home/templates/home.template.html').
      success(function (res) {
        $templateCache.put('home.html', res);
      }
    );
    /*
     *
     * Load Home App Template
     *
     * */
    $http.get('./modules/home/templates/home.app.template.html').
      success(function (res) {
        $templateCache.put('home.app.html', res);
      }
    );
  }
);