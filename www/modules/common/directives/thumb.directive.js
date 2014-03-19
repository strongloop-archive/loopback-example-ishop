/**
 *
 * Copyright StrongLoop 2013
 *
 * User: seanbrookes
 * Date: 2013-12-25
 * Time: 12:34 PM
 *
 */
app.directive('thumbDirective', function (RestService) {
  return {
    template: '<img ng-src="{{ getCarImage() }}" class="inventory-thumb">',
    replace: true,
    controller: function ($scope) {
      $scope.getCarImage = function () {
        return './images/car/' + $scope.car.carClass + '-thumb.png';
      };
    }
  };
});
app.directive('lbCarThumbDirective', [
  '$scope',
  'RestService',
  function ($scope, RestService) {
    return{
      template: '<img ng-src="{{ carModel.imgPath }}" class="inventory-thumb">',
      controller: function ($scope) {
        var cModel = {};
        cModel.imgPath = 'http://0.0.0.0:3000/images/car/midsize-thumb.png';
        $scope.carModel = cModel;


        $scope.getCarImage = function () {
          return RestService.restHost + 'images/car/' + $scope.car.carClass + '-thumb.png';
        };
      }

    };

  }
]);
app.directive('resThumbDirective', function (RestService, ReservationDataService) {
  return {
    template: '<img ng-src="{{ getCarImage() }}" class="res-thumb">',
    replace: true,
    controller: function ($scope) {
      $scope.getCarImage = function () {
        var currentReqModel = ReservationDataService.getCurrentReservationReqModel();
        return RestService.restHost + 'images/car/' + currentReqModel.car.carClass + '-thumb.png';
      };
    }
  };
});