/**
 *
 * Copyright StrongLoop 2013
 *
 * User: seanbrookes
 * Date: 2013-12-11
 * Time: 12:05 PM
 *
 */
/**
 *
 * Location Controller
 *
 * */
Location.controller('LocationController', [
  '$scope',
  '$location',
  'LocationService',
  function ($scope, $location, LocationService) {

    $scope.viewTitle = 'Location';
    /*
     *
     * Find Cars
     *
     * */
    $scope.findCars = function () {

      $scope.$parent.controllers[0].$parent.tabsController.select(0);
    };
  }
]);
/**
 *
 * Map Controller
 *
 * */
Location.controller('MapController', [
  '$scope',
  'LocationService',
  function ($scope, LocationService) {


    var locationHistory = JSON.parse(window.localStorage.getItem('locationHistory'));
    var targetLocation;
    var centerLat = 45, centerLng = -73;
    $scope.searchLocationMarker = {};

    if (locationHistory) {
      targetLocation = locationHistory[0];

      centerLat = targetLocation.lat;
      centerLng = targetLocation.lng;

      $scope.searchLocationMarker = {
        coords: {
          latitude: targetLocation.lat,
          longitude: targetLocation.lng
        },
        title: 'you are here'

      };
      $scope.searchLocationMarker.coords = {
        latitude: targetLocation.lat,
        longitude: targetLocation.lng
      };
    }

    $scope.map = {
      center: {
        latitude: centerLat,
        longitude: centerLng
      },
      zoom: 8
    };
  }
]);
