/**
 * Created by michaelwatts
 * Date: 11/06/2014
 * Time: 15:54
 */

(function () {

  var app = angular.module('hozCalc', ['userInterface', 'calculations', 'highCharts']);

  app.controller('UserCtrl', ['$route', '$routeParams', '$location', '$localStorage', 'Data',
    function ($route, $routeParams, $location, $localStorage, Data) {

      /* Route variables */
      this.$route = $route;
      this.$location = $location;
      this.$routeParams = $routeParams;

      console.info(Data);

      /* Localise Data Factory */
      this.data = Data;

      /* Check if username and session name is set */
      this.isChanged = function(user) {
        if ((user.username !== undefined && user.username !== "") && (user.session_name !== undefined && user.session_name !== "")) {
          return false;
        }
        return true;
      };

      /* For output */
      if (this.data.username !== undefined || this.data.username === "") {
        can_proceed = true;
        this.username = this.data.username;
      }

      if (this.data.session_name !== undefined || this.data.session_name === "") {
        this.can_proceed = true;
        this.session_name = this.data.session_name;
      }

      /* Set input */
      this.setInput = function (input) {

        if (this.data.username !== undefined || this.data.username === "" && this.data.session_name !== undefined || this.data.session_name === "") {
          this.can_proceed = true;
        }

        /* Save to data factory */
        this.data.username = input.username;
        this.data.session_name = input.session_name;

        /* Save to local storage */
        $localStorage.username = input.username;
        $localStorage.session_name = input.session_name;

        console.info(this.data);
      };

    }]);

})();
