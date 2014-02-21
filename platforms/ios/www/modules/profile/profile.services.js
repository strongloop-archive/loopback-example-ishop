/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-13
 * Time: 4:50 PM
 *
 */
/**
 *
 * Profile Service
 *
 * */
Profile.service('ProfileService', [
  'User',
  function (User) {
    var svc = {};

    svc.getCurrentUserId = function () {
      return window.localStorage.getItem('currentUserId');
    };

    svc.authUser = function () {
      return false;
    };

    svc.logCurrentUserOut = function () {
      window.localStorage.removeItem('currentUserId');
      window.localStorage.removeItem('accessToken');
      User.logout();
    };

    return svc;

  }
]);






