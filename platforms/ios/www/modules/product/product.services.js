/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-07
 * Time: 10:20 AM
 *
 *
 *
 * http://stackoverflow.com/questions/18473304/how-to-create-a-angular-js-resource-http-factory-service-to-handle-a-query-str
 */

/**
 *
 * Dealer Service
 *
 * */
Dealer.service('DealerService', [
  '$http',
  '$q',
  '$rootScope',
  'LocationService',
  'RestService',
  'Dealer',
  'Car',
  'Rate',
  function ($http, $q, $rootScope, LocationService, RestService, Dealer, Car, Rate) {

    var maxResultCount = 25;
    return {
      // temporary method to seed the rate table with an initial set of rates for each dealer

      /**
       *
       * Initialize Rates
       *
       * */
      initializeRates: function () {
        var rates = JSON.parse(window.localStorage.getItem('rates'));
        if (rates) {
          return rates;
        }
        else {
          var returnRates = Rate.query(
            {},
            function (response) {
              window.localStorage.setItem('rates', JSON.stringify(response));
            },
            function (response) {
              console.log('bad get rates: ' + response);
            }
          );
          return returnRates;
        }

      },

      getCarClassRates: function (carClass) {
        var rates = JSON.parse(window.localStorage.getItem('rates'));
        if (rates) {
          var returnArray = [];

          for (var i = 0; i < rates.length; i++) {
            var rateObj = rates[i];
            if (rateObj.carClass === carClass) {
              returnArray.push(rateObj);
            }
          }
          return returnArray;
        }
        else {
          var filter = {
            'filter[where][carClass]': carClass
          };
          return Rate.query(filter);
        }

      },
      getDealerRates: function (id) {

        var rates = JSON.parse(window.localStorage.getItem('rates'));
        if (rates) {
          var returnArray = [];

          for (var i = 0; i < rates.length; i++) {
            var rateObj = rates[i];
            if (rateObj.dealerId === id) {
              returnArray.push(rateObj);
            }
          }
          return returnArray;
        }
        else {
          var filter = {
            'filter[where][dealerId]': id
          };
          return Rate.query(filter);
        }

      },

      /**
       *
       * Get All Dealers
       *
       * */
      getAllDealers: function () {
        var filter = {
          'filter[limit]': 300
        };
        return Dealer.query(filter, function (response) {
//            console.log('success get all dealers');
          },
          function () {
            console.log('bad get all dealers ');
          });
      },
      getNearbyDealers: function () {
        /*
         *
         * Get Closest Dealers
         *
         * */
        // ensure we have a reference location
        var refLoc = LocationService.getCurrentLocation();
        if (!refLoc) {
          return false;
        }
        else {



          /*
           *
           *
           * Watch out for 500 errors if demo server is asleep
           *
           * */
          var cacheKey = RestService.restHost + 'dealers?filter[where][location][near]=' + refLoc.lng + ',' + refLoc.lat + '&filter[limit]=' + maxResultCount;
          /*
           *
           * check local storage for cached search to improve performance
           *
           * */
          var currtime = new Date().getTime().toString();
          var doQuery = true;
          var localDealers = JSON.parse(window.localStorage.getItem(cacheKey));

          if (localDealers) {
            var timeDiff = currtime - localDealers.timestamp;
            if (timeDiff < 1000000) {
              doQuery = false;
              return localDealers.data;
            }
          }


          if (doQuery) {

            var filter = {
              'filter[where][location][near]': refLoc.lng + ',' + refLoc.lat,
              'filter[limit]': 10
            };

            /*
             *
             * Dealer Proximity Query
             *
             * */
            return Dealer.query(
              filter,
              function (response) {

                var lStore = {};

                // dealers
                lStore.data = response;
                // add timestamp
                lStore.timestamp = new Date().getTime().toString();

                // save the response
                window.localStorage.setItem(cacheKey, JSON.stringify(lStore));
              },
              function () {
                console.log('bad dealer query' + arguments);

              });

          }
        }

      },
      getDealerDetail: function (id) {
        var cacheKey;
        /*
         *
         * Get  Dealer Detail
         *
         * */
        if (!id) {
          return false;
        }
        else {

          cacheKey = 'dealers/' + id;

          /*
           *
           * check local storage for cached search to improve performance
           *
           * */
          var currtime = new Date().getTime().toString();
          var doQuery = true;
          var localDealer = JSON.parse(window.localStorage.getItem(cacheKey));

          if (localDealer) {
            var timeDiff = currtime - localDealer.timestamp;
            if (timeDiff < 1000000) {
              return localDealer.detail;
            }
          }
          if (doQuery) {

            var filter = {
              'id': id
            };

            /*
             *
             * Dealer Detail Query
             *
             * */
            return Dealer.get(
              filter,
              function (response) {
                //var cacheKey = 'dealers/' + id;
                var localDealer = JSON.parse(window.localStorage.getItem(cacheKey));
                if (!localDealer) {
                  localDealer = {};
                }
                localDealer.detail = response;
                localDealer.timestamp = new Date().getTime().toString();
                window.localStorage.setItem(cacheKey, JSON.stringify(localDealer));
              },
              function (response) {
                console.log('bad dealer get' + response);

              });

          }
        }
      },
      getCar: function (id) {
        var filter = {
          'id': id
        };

        /*
         *
         * Get Car
         *
         * */
        return Car.query(
          filter,
          function (response) {

          },
          function (response) {
            console.log('bad car ' + response.status);

          });
      },
      getDealerCarsByClass: function (id, carClass) {
        var filter = {
          'filter[where][dealerId]': id,
          'filter[where][carClass]': carClass
        };
        /*
         *
         * Dealer Proximity Query
         *
         * */
        return Car.query(
          filter,
          function (response) {
            //console.log('good get dealer class cars');

          },
          function (response) {
            console.log('bad dealer car class ' + response.status);

          });
      },
      getDealerInventory: function (id) {
        /*
         *
         * Get  Dealer Detail
         *
         * */
        var cacheKey;
        if (!id) {
          return false;
        }
        else {
          cacheKey = 'dealerinventory/' + id;

          /*
           *
           * check local storage for cached search to improve performance
           *
           * */
          var currtime = new Date().getTime().toString();
          var doQuery = true;
          var localDealer = JSON.parse(window.localStorage.getItem(cacheKey));
          if (!localDealer) {
            localDealer = {};
          }
//          if (localDealer) {
//            var timeDiff = currtime - localDealer.timestamp;
//            if (timeDiff < 1000000) {
//              return localDealer.inventory;
//            }
//          }
          if (doQuery) {

            var filter = {
              'filter[where][dealerId]': id
            };

            /*
             *
             * Dealer Car Query
             *
             * */
            return Car.query(
              filter,
              function (response) {

                localDealer.inventory = response;
                localDealer.timestamp = new Date().getTime().toString();
                window.localStorage.setItem(cacheKey, JSON.stringify(localDealer));
              },
              function (response) {
                console.log('bad get dealer inventory: ' + response);
              }
            );


          }
        }
      },
      getDealerClassRates: function (id) {
        /*
         *
         * Get  Dealer Detail
         *
         * */
        var cacheKey;
        if (!id) {
          return false;
        }
        else {
          cacheKey = 'dealers/' + id;

          /*
           *
           * check local storage for cached search to improve performance
           *
           * */
          var currtime = new Date().getTime().toString();
          var doQuery = true;
          var localDealer = JSON.parse(window.localStorage.getItem(cacheKey));
          if (!localDealer) {
            localDealer = {};
          }

          /*
           *
           * Dealer Class Rates
           *
           * */
          var dealerRates = this.getDealerRates(id);

          var rates = [];
          for (var i = 0; i < dealerRates.length; i++) {
            var rateObj = dealerRates[i];
            var inventoryItem = {};
            inventoryItem.dealerId = id;
            inventoryItem.carClass = rateObj.carClass;
            inventoryItem.rate = rateObj.rate;
            rates.push(inventoryItem);
          }


          localDealer.rates = rates;
          localDealer.timestamp = new Date().getTime().toString();
          window.localStorage.setItem(cacheKey, JSON.stringify(localDealer));

          return rates;

        }
      }
    };

  }
]);