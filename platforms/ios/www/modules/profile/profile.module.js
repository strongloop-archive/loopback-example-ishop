/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-13
 * Time: 4:50 PM
 *
 */
var Profile = angular.module('Profile', []).
  run(function ($http, $templateCache) {
    /*
     *
     * pre load the module templates
     *
     * */
    /*
     *
     * Login Main Template
     *
     * */
    $http.get('./modules/profile/templates/profile.main.html').
      success(function (res) {
        $templateCache.put('login.html', res);
      }
    );

    /*
     *
     * Choose Theme Template
     *
     * */
    $http.get('./modules/profile/templates/choose.theme.html').
      success(function (res) {
        $templateCache.put('choose.theme.html', res);
      }
    );

  }
);