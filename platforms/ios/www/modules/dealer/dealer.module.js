/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-08
 * Time: 4:03 PM
 *
 */

var Dealer = angular.module('Dealer', []).
  run(function ($http, $templateCache) {

    /*
     *
     * pre load the module templates
     *
     * */
    /*
     *
     * Load Dealer Main Template
     *
     * */
    $http.get('./modules/dealer/templates/dealer.main.html').
      success(function (res) {
        $templateCache.put('dealer.main.html', res);
      }
    );
    /*
     *
     * Load Dealer Detail Template
     *
     * */
    $http.get('./modules/dealer/templates/dealerdetail.html').
      success(function (res) {
        $templateCache.put('dealerdetail.html', res);
      }
    );
    /*
     *
     * Load Dealer List Template
     *
     * - this component/file is not designed to be part of the user facing app at this time
     *
     * */
    $http.get('./modules/dealer/templates/dealer.list.html').
      success(function (res) {
        $templateCache.put('./modules/dealer/templates/dealer.list.html', res);
      }
    );
  }
);