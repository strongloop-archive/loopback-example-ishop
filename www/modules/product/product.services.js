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

var catalog =
{"category": [
  {
    "childCategories": null,
    "childProducts": [
      {
        "currencyCode": "USD",
        "displayName": "Distressed Jeans",
        "itemDescriptorName": "product",
        "listPrice": 89,
        "repositoryId": "prod20001",
        "salePrice": null,
        "thumbnailImageUrl": "/crsdocroot/content/images/products/thumb/APP_DistressedJeans_thumb.jpg"
      },
      {
        "currencyCode": "USD",
        "displayName": "Cargo Pants",
        "itemDescriptorName": "product",
        "listPrice": 67.5,
        "repositoryId": "prod20002",
        "salePrice": null,
        "thumbnailImageUrl": "/crsdocroot/content/images/products/thumb/APP_CargoPants_thumb.jpg"
      },
      {
        "currencyCode": "USD",
        "displayName": "Corduroy Pants",
        "itemDescriptorName": "product",
        "listPrice": 67,
        "repositoryId": "prod20003",
        "salePrice": null,
        "thumbnailImageUrl": "/crsdocroot/content/images/products/thumb/APP_CorduroyPants_thumb.jpg"
      },
      {
        "currencyCode": "USD",
        "displayName": "Weekend Jeans",
        "itemDescriptorName": "product",
        "listPrice": 95,
        "repositoryId": "prod20004",
        "salePrice": null,
        "thumbnailImageUrl": "/crsdocroot/content/images/products/thumb/APP_WeekendJeans_thumb.jpg"
      },
      {
        "currencyCode": "USD",
        "displayName": "Rugged Khakis",
        "itemDescriptorName": "product",
        "listPrice": 65,
        "repositoryId": "prod20005",
        "salePrice": null,
        "thumbnailImageUrl": "/crsdocroot/content/images/products/thumb/APP_RuggedKhakis_thumb.jpg"
      }
    ],
    "displayName": "Pants",
    "repositoryId": "catMenPants",
    "smallImage": null
  },
  {
    "childCategories": null,
    "childProducts": [
      {
        "currencyCode": "USD",
        "displayName": "Checkered Pillow",
        "itemDescriptorName": "product",
        "listPrice": 19,
        "repositoryId": "xprod2063",
        "salePrice": null,
        "thumbnailImageUrl": "/crsdocroot/content/images/products/thumb/HOME_CheckeredPillow_thumb.jpg"
      },
      {
        "currencyCode": "USD",
        "displayName": "Embroidered Throw Pillow",
        "itemDescriptorName": "product",
        "listPrice": 26,
        "repositoryId": "xprod2066",
        "salePrice": null,
        "thumbnailImageUrl": "/crsdocroot/content/images/products/thumb/HOME_EmbroideredThrowPillow_thumb.jpg"
      },
      {
        "currencyCode": "USD",
        "displayName": "Decorative Throw Pillow",
        "itemDescriptorName": "product",
        "listPrice": 16,
        "repositoryId": "xprod2069",
        "salePrice": null,
        "thumbnailImageUrl": "/crsdocroot/content/images/products/thumb/HOME_DecorativeThrowPillow_thumb.jpg"
      },
      {
        "currencyCode": "USD",
        "displayName": "Velour Pillow",
        "itemDescriptorName": "product",
        "listPrice": 39,
        "repositoryId": "xprod2070",
        "salePrice": null,
        "thumbnailImageUrl": "/crsdocroot/content/images/products/thumb/HOME_VelourPillow_thumb.jpg"
      },
      {
        "currencyCode": "USD",
        "displayName": "Soccer Cushion Chair",
        "itemDescriptorName": "product",
        "listPrice": 79,
        "repositoryId": "xprod2041",
        "salePrice": null,
        "thumbnailImageUrl": "/crsdocroot/content/images/products/thumb/HOME_SoccerCushionChair_thumb.jpg"
      }
    ],
    "displayName": "Cushions and Pillows",
    "repositoryId": "cat10022",
    "smallImage": null
  }
]};

var products = {};

catalog.category.forEach(function(c) {
  if (c.childProducts) {
    c.childProducts.forEach(function (p) {
      products[p.repositoryId] = p;
    });
  }
});


/*

 $http.get(productURL).success(function (data) {
 alert(JSON.stringify(data));
 data.category.forEach(function(c) {
 if (c.childProducts) {
 c.childProducts.forEach(function (p) {
 $scope.products.push(p);
 });
 }
 });
 }).error(function(data, status) {
 alert('Error ' + status);
 });
 */

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

      /**
       *
       * Get All Products
       *
       * */
      getAllProducts: function (fn) {
        /*
        var productURL = 'http://demo.strongloop.com:7003/rest/repository/atg/commerce/catalog/ProductCatalog/category?atg-rest-depth=4';
        $http.get(productURL, {headers: {
          'Accept': 'application/json'
        }}).success(function(data, status) {
          alert('Status ' + status);
          alert(JSON.stringify(data));
          var productList = [];
          data.category.forEach(function(c) {
            if (c.childProducts) {
              c.childProducts.forEach(function (p) {
                productList.push(p);
              });
            }
          });
          fn && fn(productList);
        }).error(function(data, status) {
          alert('Error ' + status);
          fn && fn([]);
        });
        */

        var productList = [];
        for(var p in products) {
          productList.push(products[p]);
        }
        setTimeout(function() {
          fn && fn(productList);
        }, 0);

      },

      getProductDetail: function (id) {
        return products[id];
      }
    };
  }
]);