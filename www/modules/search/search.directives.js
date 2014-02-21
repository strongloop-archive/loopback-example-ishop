/**
 *
 * Copyright StrongLoop 2013
 *
 * User: seanbrookes
 * Date: 2013-12-16
 * Time: 6:39 PM
 *
 */
Search.directive('lbSearchDirective', [
  '$templateCache',
  'SearchService',
  function ($templateCache, SearchService) {

    return {
      templateUrl: 'search.directive.html',
      controller: function ($scope) {

        //  $scope.viewTitle = 'Search';


        $scope.searchModel = SearchService.getCurrentSearchModel();


        /**
         *
         * findCars
         *
         * save search model
         * change tabs to trigger a new search
         *
         * */
        $scope.findCars = function () {

          SearchService.setSearchModel($scope.searchModel);

          // dealers tab
          $scope.$parent.$parent.controllers[0].$parent.tabsController.select(0);

        };

        /**
         *
         * changeFilterLocation
         *
         * take user to location view to modify reference location information
         *
         * */
        $scope.changeFilterLocation = function () {

          // location tab
          $scope.$parent.$parent.controllers[0].$parent.tabsController.select(2);

        };

      }
    };
  }
]);
