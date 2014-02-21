/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-12
 * Time: 1:38 PM
 *
 */
var Search = angular.module('Search', []).
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
    $http.get('./modules/search/templates/search.directive.template.html').
      success(function (res) {
        $templateCache.put('search.directive.html', res);
      }
    );
  }
);