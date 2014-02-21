/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-26
 * Time: 7:52 AM
 *
 */
//app.directive('dealerIdList', [
//  'RestService',
//  function (RestService) {
//    return {
//      template: '{{ dealer.id }}',
//      replace: true,
//      controller: function ($scope, RestService, DealerService) {
//
//        $scope.dealers = DealerService.getAllDealers();
//
//      }
//    };
//  }
//]);
app.directive('debugRegion',
  function () {
    return{
      template: '<div ng-show="debugModeOn"><h3>Logs:</h3><div>LOGS GO HERE</div></div>',
      controller: function () {
        console.log('DEBUG DIRECTIVE CONTROLLER');
      },
      link: function (UIService) {
        console.log('DEBUG DIRECTIVE LINK function');
      }
    };
  }
);