/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2013-12-19
 * Time: 7:42 AM
 *
 */
app.controller('AppHeaderController', [
  '$scope',
  function ($scope) {
    $scope.headerTitle = 'iShop';
    $scope.rightButtons = [
      {
        type: 'button-dark',
        content: '<i class="icon ion-navicon"></i>',
        tap: function (e) {
        }
      }
    ];

    $scope.leftButtons = [
      {
        type: 'button-dark',
        content: '<i class="icon ion-arrow-left-c"></i>',
        tap: function (e) {
          //console.log('BACK BUTTON CLICKED');
        }
      }
    ];
  }
]);
app.controller('XController', [
  '$scope',
  function ($scope) {
    $scope.x = 'y';
  }
]);
