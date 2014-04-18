/**
 *
 * Copyright StrongLoop 2013
 *
 * User: seanbrookes
 * Date: 2013-12-04
 * Time: 10:01 AM
 *
 *
 *
 *ionic.Platform.ready(function() {
    // this runs when the device is ready
});
 *
 *
 */
var app = angular.module('app', [
  'ui.router',
  'Product',
  'Home',
  'ngResource',
  'ionic'
]);

app.run([
  '$http',
  '$templateCache',
  'ProductService',
  'UIService',
  function ($http, $templateCache, ProductService, UIService) {


    UIService.setDebugMode(false);

    console.log('Debug Mode: ' + UIService.debugMode());

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
     * Load Dealer Detail Template
     *
     * */
    $http.get('./modules/product/templates/product.detail.html').
      success(function (res) {
        $templateCache.put('product.detail.html', res);
      }
    );
  }
]);

app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.
      state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: './modules/home/templates/home.template.html'
      }).
      state('homeapp', {
        url: '/homeapp',
        controller: 'HomeAppController',
        templateUrl: './modules/home/templates/home.app.template.html'
      }).
      state('products', {
        url: '/products',
        controller: 'ProductController',
        templateUrl: 'product.main.html'
      }).
      state('p', {
        url: '',
        abstract: true,
        templateUrl: './modules/product/templates/product.detail.html'
      }).
      state('p.detail', {
        url: '/p/:id',
        controller: 'ProductDetailController',
        templateUrl: './modules/product/templates/product.detail.html'
      });
  }
]);

app.controller('AppCtrl', [
  '$scope',
  function ($scope) {
    $scope.rightButtons = [
      {
        type: 'button-positive',
        content: '<i class="icon ion-navicon"></i>',
        tap: function (e) {
        }
      }
    ];

  }
]);

