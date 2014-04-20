/**
 *
 * Copyright StrongLoop 2013
 *
 * User: seanbrookes
 * Date: 2013-12-11
 * Time: 10:54 AM
 *
 */


/**
 *
 * Product Controller
 *
 * */
Product.controller('ProductController', [
  '$scope',
  '$state',
  '$http',
  'ProductService',
  function ($scope, $state, $http, ProductService) {

    $scope.onRefresh = function () {
      init();
    };

    $scope.viewTitle = 'Products';

    $scope.detailView = function (productId) {
      $state.go('p.detail', {id: productId});
    };

    function init() {

      $scope.viewTitle = 'Products';
      $scope.$broadcast('scroll.refreshComplete');

    }

    init();

    $scope.$on('tab.shown', function ($scope) {
      var index = $scope.currentScope.$parent.tabsController.selectedIndex;
      if (index === 0) {
        init();
      }
    });
  }

]);

/**
 *
 * Product Detail Controller
 *
 * */
Product.controller('ProductDetailController', [
  '$scope',
  '$state',
  '$stateParams',
  '$http',
  '$templateCache',
  'ProductService',
  'RestService',
  'UIService',
  function ($scope, $state, $stateParams, $http, $templateCache, ProductService, RestService, UIService) {
    /*
     * Load Product Detail
     */

    $scope.viewTitle = 'Product Detail';
    var id = $stateParams.id;
    $scope.productDetail = ProductService.getProductDetail(id);
    $scope.baseURL = ProductService.baseURL;
    ProductService.getProductSKUs(id, function(err, skus) {
      //
    });

  }
]);
