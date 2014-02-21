/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-11
 * Time: 7:33 AM
 *
 */
/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-08
 * Time: 4:03 PM
 *
 */

var Location = angular.module('Location', []).
  run(function ($http, $templateCache) {
    /*
     *
     * pre load the module templates
     *
     * */
    /*
     *
     * Load Location Main Template
     *
     * */
    $http.get('./modules/location/templates/location.directive.template.html').
      success(function (res) {
        $templateCache.put('location.main.html', res);
      }
    );
    $http.get('./modules/location/templates/address.lookup.html').
      success(function (res) {
        $templateCache.put('address.lookup.html', res);
      }
    );
    $http.get('./modules/location/templates/find.me.html').
      success(function (res) {
        $templateCache.put('find.me.html', res);
      }
    );
    $http.get('./modules/location/templates/current.location.html').
      success(function (res) {
        $templateCache.put('current.location.html', res);
      }
    );
    $http.get('./modules/location/templates/location.history.html').
      success(function (res) {
        $templateCache.put('location.history.html', res);
      }
    );
    $http.get('./modules/location/templates/map.view.html').
      success(function (res) {
        $templateCache.put('map.view.html', res);
      }
    );

  }
);