/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-07
 * Time: 8:27 AM
 *
 */
Dealer.directive('lbDealerMainDirective', [
  function () {

    return {
      templateUrl: 'dealer.main.html',
      controller: function ($scope) {

        $scope.viewTitle = 'Dealers';
      }
    };
  }
]);
Dealer.directive('lbAllDealerListDirective', [
  '$templateCache',
  'DealerService',
  function ($templateCache, DealerService) {

    return {
      templateUrl: './modules/dealer/templates/dealer.list.html',
      controller: function ($scope, DealerService) {
        $scope.dealers = DealerService.getAllDealers();
      }
    };
  }
]);
