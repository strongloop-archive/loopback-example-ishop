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
  'Dealer',
  'Location',
  'Search',
  'Profile',
  'Reservation',
  'Home',
  'lbServices',
  'google-maps',
  'ngResource',
  'ionic'
]);
app.run([
  '$http',
  '$templateCache',
  'DealerService',
  'UIService',
  function ($http, $templateCache, DealerService, UIService) {

    /*
     *
     * Preload Dealer Rates
     *
     * */
    DealerService.initializeRates();

    UIService.setDebugMode(false);

    console.log('Debug Mode: ' + UIService.debugMode());

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
  }
]);
app.config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push('requestInterceptor');
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
      state('dealers', {
        url: '/dealers',
        controller: 'DealerController',
        templateUrl: 'dealer.main.html'
      }).
      state('p', {
        url: '',
        abstract: true,
        templateUrl: './modules/dealer/templates/dealerdetail.html'
      }).
      state('p.detail', {
        url: '/p/:id',
        controller: 'DealerDetailController',
        templateUrl: './modules/dealer/templates/dealerdetail.html',
        resolve: {
          inventory: ['DealerService', '$stateParams', function (DealerService, $stateParams) {
            var idVal = $stateParams.id;

            return DealerService.getDealerInventory(idVal);
          }]
        }
      }).
      state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: './modules/profile/templates/login.html'
      }).
      state('register', {
        url: '/register',
        controller: 'RegisterController',
        templateUrl: './modules/profile/templates/register.html'
      }).
//      state('filter', {
//        url: '/filter',
//        controller: 'SearchController',
//        templateUrl: './modules/dealer/dealer.template.html'
//      }).
      state('reservation', {
        url: '/reservation',
        controller: 'ReservationController',
        templateUrl: './modules/reservation/templates/reservation.templates.html'
      }).
      state('confirmation', {
        url: '/confirmation',
        controller: 'ConfirmationController',
        templateUrl: './modules/reservation/templates/confirmation.templates.html'
      }).
      state('location', {
        url: '/location',
        controller: 'LocationController',
        templateUrl: './modules/location/location.templates.html'
      }).
      state('profile', {
        url: '/profile',
        controller: 'ProfileController',
        templateUrl: './modules/profile/templates/profile.main.html'
      }).
      state('myreservations', {
        url: '/myreservations',
        controller: 'MyReservationsController',
        templateUrl: './modules/profile/templates/my.reservations.html'
      });
  }
]);
app.factory('requestInterceptor', [
  '$q',
  '$rootScope',
  function ($q, $rootScope) {
    return {
      'request': function (config) {
        if (window.localStorage.getItem('accessToken')) {
          config.headers.authorization = window.localStorage.getItem('accessToken');
        }
        return config || $q.when(config);
      }
    };
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

