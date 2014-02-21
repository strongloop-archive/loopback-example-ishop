/**
 *
 * Copyright StrongLoop 2013
 *
 * User: seanbrookes
 * Date: 2013-12-13
 * Time: 2:22 PM
 *
 */
Reservation.controller('ReservationController', [
  '$scope',
  '$state',
  'ReservationDataService',
  'RestService',
  'UIService',
  function ($scope, $state, ReservationDataService, RestService, UIService) {

    /**
     *
     * Make sure there is a valid request object
     *
     * */
    if (ReservationDataService.getCurrentReservationReqModel()) {


      $scope.viewTitle = 'Reserve Car';

      $scope.themeName = UIService.getPrimaryThemeName();

      $scope.reservationReqObj = ReservationDataService.getCurrentReservationReqModel();

      $scope.confirmReservation = function () {
        ReservationDataService.confirmCurrentReservation();
      };

      $scope.isConfirmResDisabled = function () {
        return !$scope.reservationReqObj.userId;
      };
      $scope.formatCarClass = UIService.formatCarClass;

      $scope.getThumb = UIService.getCarThumb;
//
    }
    // no valid request object
    else {
      $state.go('home');
    }

  }
]);
Reservation.controller('ConfirmationController', [
  '$scope',
  'ReservationDataService',
  function ($scope, ReservationDataService) {

    $scope.viewTitle = 'Confirmation';
    $scope.confirmationNumber = ReservationDataService.generateConfirmationNumber();

  }
]);
