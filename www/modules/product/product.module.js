/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-08
 * Time: 4:03 PM
 *
 */

var Product = angular.module('Product', []).
  run(function ($http, $templateCache) {

    /*
     *
     * pre load the module templates
     *
     * */
    /*
     *
     * Load Product Main Template
     *
     * */
    $http.get('./modules/product/templates/product.main.html').
      success(function (res) {
        $templateCache.put('product.main.html', res);
      }
    );
    /*
     *
     * Load Product Detail Template
     *
     * */
    $http.get('./modules/product/templates/product.detail.html').
      success(function (res) {
        $templateCache.put('product.detail.html', res);
      }
    );
    /*
     *
     * Load Product List Template
     *
     * - this component/file is not designed to be part of the user facing app at this time
     *
     * */
    $http.get('./modules/product/templates/product.list.html').
      success(function (res) {
        $templateCache.put('./modules/product/templates/product.list.html', res);
      }
    );
  }
);