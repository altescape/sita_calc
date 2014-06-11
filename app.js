/**
 * Created by michaelwatts
 * Date: 11/06/2014
 * Time: 15:54
 */

(function () {

  var app = angular.module('hozCalc', []);

  app.controller('CalcController', function () {
    this.sessData = session_data;
  });

  app.controller('CalcData', function () {
    this.session = {};
  });

  app.directive("scrollArea", function() {
    return {
      restrict: "E",
      templateUrl: "scroll-area.html"
    };
  });

  var session_data = [
    {
      username: 'user 1',
      name: 'session 1',
      info: 'something'
    }
  ];
})();
