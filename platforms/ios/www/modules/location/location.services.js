/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-07
 * Time: 10:19 AM
 *
 */
Location.service('LocationService', [
  '$q',
  '$rootScope',
  function ($q, $rootScope) {
    var resolve = function (errval, retval, deferred) {
      $rootScope.$apply(function () {
        if (errval) {
          deferred.reject(errval);
        } else {

          deferred.resolve(retval);
        }
      });
    };
    return {
      /*
       *
       *  Get Current Location
       *
       * */
      getCurrentLocation: function () {

        // ensure we have a reference location
        if (window.localStorage.getItem('locationHistory')) {

          var locationHistory = JSON.parse(window.localStorage.getItem('locationHistory'));
          if (locationHistory) {
            return locationHistory[0];
          }
          return false;
        }
        return false;
      },
      /*
       *
       * Lookup Address
       *
       *
       * */
      lookupAddress: function (address) {
        var deferred = $q.defer();
        var xCoder = new google.maps.Geocoder();
        // geocoder.geocode
        xCoder.geocode({address: address}, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {

            var x = results;

            var geoCodeResultArray = [];
            var resultCount = results.length;
            for (var i = 0; i < resultCount; i++) {
              var tempResult = results[i];
              var resultLocation = {};
              resultLocation.name = tempResult.formatted_address;
              resultLocation.location = tempResult.geometry.location;
              // formatted name
              // country

              for (var j = 0; j < tempResult.address_components.length; j++) {
                var tempComp = tempResult.address_components[j];
                var targetVal = tempComp.types[0];
                if (targetVal === 'country') {
                  resultLocation.country = tempComp.long_name;
                  resultLocation.country_short = tempComp.short_name;
                  break;
                }
              }

              resultLocation.country = jsonPath(tempResult, '$.address_components..[types[0]="country"]');
              // location
              // city
              geoCodeResultArray.push(resultLocation);
            }

            resolve(null, geoCodeResultArray, deferred);
          } else {
            resolve(status, null, deferred);
          }

        });
        var promise = deferred.promise;
        return promise;
      }
    };
  }
]);



