/**
 *
 * Copyright StrongLoop 2013
 *
 * User: seanbrookes
 * Date: 2013-12-14
 * Time: 7:33 AM
 *
 */
/*
 * Reservation Service
 *
 * */
app.service('RestService', function () {
  return {
    restHost: 'http://0.0.0.0:3003/'
  };
});
app.service('UIService', [
  'RestService',
  function (RestService) {

    var svc = {};
    var logArray = [];
    svc.formatCarClass = function (carClass) {

      var displayName = '';


      switch (carClass) {

        case 'subcompact':
          displayName = 'Economy';
          break;
        case 'compact':
          displayName = 'Compact';
          break;

        case 'midsize':
          displayName = 'Midsize';
          break;

        case 'fullsize':
          displayName = 'Fullsize';
          break;

        case 'pickup':
          displayName = 'Pickup';
          break;

        case 'suv':
          displayName = 'SUV';
          break;

        default:


      }
      return displayName;

    };
    svc.getCarThumb = function (carClass) {
      var imgPath = '';


      switch (carClass) {

        case 'subcompact':
          imgPath = RestService.restHost + '/images/car/subcompact-thumb.png';
          break;
        case 'compact':
          imgPath = RestService.restHost + '/images/car/compact-thumb.png';
          break;

        case 'midsize':
          imgPath = RestService.restHost + '/images/car/midsize-thumb.png';
          break;

        case 'fullsize':
          imgPath = RestService.restHost + '/images/car/fullsize-thumb.png';
          break;

        case 'pickup':
          imgPath = RestService.restHost + '/images/car/pickup-thumb.png';
          break;

        case 'suv':
          imgPath = RestService.restHost + '/images/car/suv-thumb.png';
          break;

        default:
      }
      return imgPath;
    };
    svc.getPrimaryThemeName = function () {
      var retVal = window.localStorage.getItem('themeName');
      if (!retVal){
        retVal = 'positive';
        window.localStorage.setItem('themeName',retVal);
      }
      return retVal;

    };
    svc.debugMode = function () {
      var debugMode = false;
      if (window.sessionStorage.getItem('debugMode') && (window.sessionStorage.getItem('debugMode') === true)) {
        debugMode = true;
      }
      return debugMode;
    };
    svc.setDebugMode = function (mode) {
      window.sessionStorage.setItem('debugMode', mode);
    };
    svc.addLogEntry = function (entry) {
      logArray.push(entry);
    };
    svc.clearLogArray = function () {
      logArray = [];
    };
    svc.getLogArray = function () {
      return logArray;
    }
    return svc;
  }
]);