/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-07
 * Time: 8:27 AM
 *
 */
Product.directive('lbProductMainDirective', [
  'ProductService',
  function (ProductService) {

    return {
      templateUrl: './modules/product/templates/product.main.html',
      controller: function ($scope) {
        $scope.viewTitle = 'Products';
        ProductService.getAllProducts(function(products) {
          $scope.products = products;
        });
      }
    };
  }
]);

/*
Product.directive('lbAllProductListDirective', [
  '$templateCache',
  'ProductService',
  function ($templateCache, ProductService) {

    return {
      templateUrl: './modules/product/templates/product.list.html',
      controller: function ($scope, ProductService) {
        ProductService.getAllProducts(function(products) {
          $scope.products = products;
        });
      }
    };
  }
]);
*/
