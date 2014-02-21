/**
 *
 * Copyright StrongLoop 2014
 *
 * User: seanbrookes
 * Date: 2014-01-07
 * Time: 10:20 AM
 *
 */
Search.service('SearchService', [
  function () {

    var cSearchModel = {};

    function currentSearchModel() {


      if (window.localStorage) {
        cSearchModel = JSON.parse(window.localStorage.getItem('currentSearchModel'));
      }


      if (!cSearchModel) {
        cSearchModel = {
          fromDate: new Date().toISOString().substring(0, 10),
          toDate: new Date().toISOString().substring(0, 10),
          carClass: 'compact'
        };

      }


      return cSearchModel;

    }

    function setCurrentSearchModel(model) {
      localStorage.setItem('currentSearchModel', JSON.stringify(model));
    }

    var fromDate = new Date();
    var toDate = new Date();
    var carType = 'midsize';
    var location = {};


    if (window.localStorage) {
      var searchObj = JSON.parse(window.localStorage.getItem('currentSearchModel'));
      if (searchObj) {
        if (searchObj.fromDate) {
          fromDate = searchObj.fromDate;
        }
        if (searchObj.toDate) {
          toDate = searchObj.toDate;
        }
        if (searchObj.carType) {
          carType = searchObj.carType;
        }
        if (searchObj.referenceLocation) {
          location = searchObj.referenceLocation;
        }
      }
    }


    return{
      fromDate: fromDate,
      toDate: toDate,
      carType: carType,
      location: location,
      sModel: cSearchModel,
      setSearchModel: setCurrentSearchModel,
      getCurrentSearchModel: currentSearchModel
    };
  }
]);