/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2013-12-31
 * Time: 7:06 AM
 *
 */
/**
 *
 * Location Directive
 *
 * */
Location.directive('lbLocationDirective', [
  '$templateCache',
  'UIService',
  function ($templateCache, UIService) {

    return {
      templateUrl: 'location.main.html',
      controller: function ($scope) {

        $scope.viewTitle = 'Location ';
        $scope.themeName = UIService.getPrimaryThemeName();
        /*
         *
         * Find Cars
         *
         * TODO move this to controller
         *
         * */
        $scope.findCars = function () {
          $scope.$parent.controllers[0].$parent.tabsController.select(0);
        };
      }
    };
  }
]);

/**
 *
 *
 * Location History Directive
 *
 * */
Location.directive('lbLocationHistory', [
  '$templateCache',
  'UIService',
  function ($templateCache, UIService) {

    return {
      templateUrl: 'location.history.html',
      controller: function ($scope, LocationService) {


        $scope.themeName = UIService.getPrimaryThemeName();
        /*
         *
         * Location History
         *
         * */
        $scope.locationHistoryList = [];
        if (window.localStorage) {
          $scope.locationHistoryList = JSON.parse(window.localStorage.getItem('locationHistory'));
        }
        /*
         *
         * Location History Display
         *
         * */
        $scope.locationHistoryDisplay = function () {
          if (window.localStorage) {
            var historyList = JSON.parse(window.localStorage.getItem('locationHistory'));
            if (!historyList) {
              return false;
            }
            if (historyList.length > 1) {
              return true;
            }
            return false;
          }
          else {
            return false;
          }

        };

        /*
         *
         *   item Buttons
         *
         *
         * */
        $scope.itemButtons = [
          {
            text: 'Find Cars',
            type: 'button-' + UIService.getPrimaryThemeName(),
            onTap: function (item) {
              var iItem = item;
              var latVal, lngVal;
              if (item.location) {
                latVal = item.location.ob;
                lngVal = item.location.pb;
              }
              else if (item.lat) {
                latVal = item.lat;
                lngVal = item.lng;
              }

              var locationObj = {
                lat: latVal,
                lng: lngVal,
                name: item.name
              };
              // $scope.currentLocationName = locationObj.name;
              // if (sl.hasStorage) {


              var locationHistory = window.localStorage.getItem('locationHistory');

              if (locationHistory) {

                locationHistory = JSON.parse(locationHistory);


                var i = locationHistory.length;
                while (i--) {
                  var iLocationHistory = locationHistory[i];
                  if (iLocationHistory.name === locationObj.name) {
                    locationHistory.splice(i, 1);
                  }
                }
                locationHistory.unshift(locationObj);

              }
              else {
                locationHistory = [locationObj];
              }
              window.localStorage.setItem('locationHistory', JSON.stringify(locationHistory));

              $scope.$parent.controllers[0].$parent.tabsController.select(0);
            }
          },
          {
            text: 'Map It',
            type: 'button-balanced',
            onTap: function (item) {
              alert('Map it: ' + item.name);
            }
          }
        ];


      }
    };
  }
]);

/**
 *
 * Currnent Locaation Directive
 *
 * */
Location.directive('lbCurrentLocation', [
  '$templateCache',
  'UIService',
  function ($templateCache, UIService) {

    return {
      templateUrl: 'current.location.html',
      controller: function ($scope, LocationService) {
        var currentLocation;
        if (LocationService.getCurrentLocation()) {
          currentLocation = LocationService.getCurrentLocation();
        }
        $scope.currentLocation = currentLocation;
        $scope.themeName = UIService.getPrimaryThemeName();

        $scope.currentLocationDisplay = function () {
          if (window.localStorage.getItem('locationHistory')) {
            return true;
          }
          return false;

        };
      }
    };
  }
]);
/**
 *
 * Address Lookup Directive
 *
 * */
Location.directive('lbAddressLookup', [
  '$templateCache',
  'UIService',
  function ($templateCache, UIService) {

    return {
      templateUrl: 'address.lookup.html',
      controller: function ($scope, LocationService) {
        /*
         *
         *
         * Location Lookup
         *
         * */
        $scope.lookupAddress = function () {

          var x = LocationService.lookupAddress(this.location.address);

          x.then(function (result) {
            $scope.locationResults = result;
          });

        };

        $scope.themeName = UIService.getPrimaryThemeName();
      }
    };
  }
]);
/**
 *
 * Find Me
 *
 * */
Location.directive('lbFindMe', [
  '$templateCache',
  'UIService',
  function ($templateCache, UIService) {

    return{
      templateUrl: 'find.me.html',
      controller: function ($scope, LocationService) {
        /*
         *
         * FIND ME
         *
         * */
        $scope.refreshGeoLocation = function () {
          // attempt to get user location
          // on success
          // set the location in local storage
          // fire event announcing user location refreshed
          // on error
          // fire the event


          navigator.geolocation.getCurrentPosition(
            // success
            function (response) {
              var locationObj = {
                lat: response.coords.latitude,
                lng: response.coords.longitude,
                name: 'you are here'
              };

              // do the reverse lookup

              var xCoder = new google.maps.Geocoder();
              var latlng = new google.maps.LatLng(locationObj.lat, locationObj.lng);
              // geocoder.geocode
              xCoder.geocode({'latLng': latlng}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                  // check if results is an array
                  if (results instanceof Array) {


                    locationObj.name = results[0].formatted_address;


                    // if (sl.hasStorage) {


                    var locationHistory = window.localStorage.getItem('locationHistory');

                    if (locationHistory) {

                      locationHistory = JSON.parse(locationHistory);


                      var i = locationHistory.length;
                      while (i--) {
                        var iLocationHistory = locationHistory[i];
                        if (iLocationHistory.name === locationObj.name) {
                          locationHistory.splice(i, 1);
                        }
                      }
                      locationHistory.unshift(locationObj);

                    }
                    else {
                      locationHistory = [locationObj];
                    }
                    window.localStorage.setItem('locationHistory', JSON.stringify(locationHistory));

                    $scope.$apply(function () {
                      $scope.currentLocation = locationObj;
                    });

                  }
                  else {
                    console.log('reverse geocode No results found');
                  }
                }
                else {
                  console.log('Error status getting Geocode: ' + status);
                }

              });

            },
            // fail
            function (error) {
              // Mediator.fire('mediator.requestForUserPositionFailed', {msg: 'Unable to get current user location: ' + translateError(error)});
              //sl.logger.error('Error getting current position (app.controller) ' +  translateError(error) );

              // new we need to check if there is a preset location in localStorage
              var locationHistory = localStorage.getItem('locationHistory');
              if (locationHistory) {
                // if so we're good
                //sl.EventBus.trigger('geo.latestUserLocationRefreshed');

              }
              else {
                // if not we need to fire the manual flow event
                //sl.EventBus.trigger('geo.latestUserLocationRefreshFailed');
                //Mediator.fire('mediator.triggerManualLocationFlowRequest');
              }


            },
            {
              maximumAge: 60000,
              enableHighAccuracy: true,
              timeout: 5000
            }
          );
        };
        $scope.themeName = UIService.getPrimaryThemeName();
      }
    };
  }
]);


/**
 *
 * Map View
 *
 * */
Location.directive('lbMapView', [
  '$templateCache',
  'UIService',
  function ($templateCache, UIService) {
    console.log($templateCache.get('map.view.html'));
    return{
      templateUrl: 'map.view.html',
      controller: function ($scope, LocationService) {

        google.maps.visualRefresh = true;
        /*
         *
         * Location Map Display
         *
         * */
        $scope.locationMapDisplay = function () {
          if (window.localStorage.getItem('locationHistory')) {
            return true;
          }
          return false;

        };

        /*
         *
         * Map Latest GEO
         *
         * */
        $scope.mapLatestGeo = function () {
          var locationHistory = JSON.parse(window.localStorage.getItem('locationHistory'));
          var targetLocation;
          if (locationHistory) {
            targetLocation = locationHistory[0];
          }
        };
      }
    };
  }
]);
