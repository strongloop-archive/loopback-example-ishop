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

var baseURL = 'http://demo.strongloop.com:3008';
var products = null;

/**
 *
 * Product Service
 *
 */
Product.service('ProductService', [
  '$http',
  '$q',
  '$rootScope',
  'RestService',
  function ($http, $q, $rootScope, RestService) {

    return {

      baseURL: baseURL,
      /**
       *
       * Get All Products
       *
       * */
      getAllProducts: function (fn) {

        if(products) {
          var productList = [];
          for(var p in products) {
            productList.push(products[p]);
          }
          setTimeout(function() {
            fn && fn(productList);
          }, 0);
          return;
        }
        var productURL = baseURL + '/api/product?filter=%7B%22atg-rest-depth%22%3A+4%7D';
        $http.get(productURL, {headers: {
          'Accept': 'application/json'
        }}).success(function(productList, status) {
          products = {};
          productList.forEach(function(p) {
            products[p.repositoryId] = p;
          });
          fn && fn(productList);
        }).error(function(data, status) {
          alert('Error: ' + status);
          fn && fn([]);
        });

      },

      getProductDetail: function (id) {
        return products && products[id];
      },

      getProductSKUs: function(id, fn) {
        if(products && products[id] && products[id].childSKUs) {
          setTimeout(function() {
            fn && fn(products[id].childSKUs);
          }, 0);
          return;
        }
        var skuURL = baseURL + '/api/product/' + id + '/skus';
        $http.get(skuURL, {headers: {
          'Accept': 'application/json'
        }}).success(function(skus, status) {
          products[id].childSKUs = skus;
          fn && fn(skus);
        }).error(function(data, status) {
          alert('Error: ' + status);
          fn && fn([]);
        });

      }
    };
  }
]);