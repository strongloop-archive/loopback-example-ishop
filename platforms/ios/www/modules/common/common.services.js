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
 * Common Service
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