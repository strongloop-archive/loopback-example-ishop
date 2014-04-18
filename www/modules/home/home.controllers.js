/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-18
 * Time: 1:20 PM
 *
 */
/**
 *
 * Home Controller
 *
 * */
Home.controller('HomeController', [
  '$scope',
  '$state',
  function ($scope, $state) {
    $scope.viewTitle = 'iShop';
  }
]);

Home.controller('HomeAppController', [
  '$scope',
  function ($scope) {
    $scope.viewTitle = 'iShop';
  }
]);

app.controller('HomeTabController', [
  '$scope',
  '$state',
  function ($scope, $state) {

    $scope.$on('tab.shown', function ($scope) {
      if ($scope.currentScope.$parent.tabsController.selectedIndex) {
        var tIndex = $scope.currentScope.$parent.tabsController.selectedIndex;
        if (tIndex === 3) {
          $state.go('home');
        }
      }
    });
  }
]);