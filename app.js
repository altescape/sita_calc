/**
 * Created by michaelwatts
 * Date: 11/06/2014
 * Time: 15:54
 */

(function () {

  var app = angular.module('hozCalc', ['ngStorage', 'ngRoute']);

  app.controller('CalcController', function () {

    FastClick.attach(document.body);

    // Offline options, checks network status
    Offline.options = {
      checkOnLoad: true,
      reconnect  : {
        // How many seconds should we wait before rechecking.
        initialDelay: 15,

        // How long should we wait between retries.
        delay       : (1.5)
      }

    };

  });

  app.directive("mainNav", function () {
    return {
      restrict    : "E",
      templateUrl : "main-nav.html",
      controller  : function ($localStorage) {

        this.settings = {
          disable        : 'right',
          hyperextensible: false,
          transitionSpeed: 0.3,
          easing         : 'ease'
        }

        // Init snap
        this.snapper = new Snap({
          element: document.getElementById('content')
        });

        this.snapper.settings(this.settings);

        // Open left draw (snap)
        this.openLeft = function () {
          this.user = $localStorage.username;
          this.session_name = $localStorage.session_name;
          if (this.snapper.state().state == "left") {
            this.snapper.close();
          } else {
            this.snapper.open('left');
          }
        };

        // Net status (crap because it checks on nav click)
        // @todo need to fix/move this
        this.isNetUp = true;
        var that = this;

        Offline.on('confirmed-up', function () {
          that.isNetUp = true;
          return true;
        });

        Offline.on('confirmed-down', function () {
          that.isNetUp = false;
          return false;
        });

      },
      controllerAs: "nav"
    };
  });

  app.directive("snapDrawLeft", function () {
    return {
      restrict    : "E",
      templateUrl : "snap-draw-left.html",
      controller  : function ($localStorage) {
        this.user = $localStorage.username;
      },
      controllerAs: "drawer"
    }
  });

  app.directive("scrollArea", function () {
    return {
      restrict   : "E",
      templateUrl: "scroll-area.html",
      controller : function () {


        this.contentArea = document.getElementById('content');
        this.scrollArea = document.getElementById('scrollarea');
        var that = this;

        this.resizeContentWrapper = function (ele_id) {
          this.winHeight = document.documentElement.clientHeight;
          ele_id.setAttribute('style', 'height: ' + this.winHeight + 'px');
        };

        this.resizeContentInner = function (ele_id) {
          this.winHeight = document.documentElement.clientHeight;
          this.mainNavHeight = document.getElementById('mainnav').offsetHeight;
          this.footbarHeight = document.getElementById('footbar').offsetHeight;
          this.height = this.winHeight - this.mainNavHeight - this.footbarHeight;
          ele_id.setAttribute('style', 'height: ' + this.height + 'px');
        };

        this.resizeContentWrapper(this.contentArea);
        this.resizeContentInner(this.scrollArea);

        $(window).resize(function () {
          that.resizeContentWrapper(that.contentArea);
          that.resizeContentInner(that.scrollArea);
        });
      }
    };
  });

//  app.directive("inUser", function () {
//    return {
//      restrict    : "E",
//      templateUrl : "in-user.html",
//      controller  : function ($localStorage) {
//
//        this.username = $localStorage.username;
//        this.session_name = $localStorage.session_name;
//
//        this.setInput = function (information) {
//
//          this.username = information.username;
//          this.session_name = information.session_name;
//
//          $localStorage.username = information.username;
//          $localStorage.session_name = information.session_name;
//        };
//      },
//      controllerAs: "user"
//    }
//  });

//  app.directive("inRevenueIntegrity", function () {
//    return {
//      restrict    : "E",
//      templateUrl : "in-revenue-integrity.html",
//      controller  : function ($localStorage) {
//
//        this.calculations = {};
//        this.ri_airline_revenue = $localStorage.ri_airline_revenue;
//        this.option1 = $localStorage.option1;
//
//        this.setInput = function (input) {
//
//          this.ri_airline_revenue = input.ri_airline_revenue;
//          this.option1 = input.option1;
//
//          $localStorage.ri_airline_revenue = input.ri_airline_revenue;
//        };
//
//      },
//      controllerAs: "ri"
//    }
//  });

  app.factory('Data', ['$localStorage',
    function ($localStorage) {
      return {
        username: $localStorage.username,
        session_name : $localStorage.session_name,
        ri_airline_revenue : $localStorage.ri_airline_revenue,
        option1 : $localStorage.option1
      }
    }]);

  app.controller('UserCtrl', ['$route', '$routeParams', '$location', '$localStorage', 'Data',
    function ($route, $routeParams, $location, $localStorage, Data) {

      /* Route variables */
      this.$route = $route;
      this.$location = $location;
      this.$routeParams = $routeParams;

      console.info(Data);

      /* Localise Data Factory */
      this.data = Data;

      /* For output */
      this.username = this.data.username;
      this.session_name = this.data.session_name;

      /* Set input */
      this.setInput = function (input) {

        /* Save to data factory */
        this.data.username = input.username;
        this.data.session_name = input.session_name;

        /* Save to local storage */
        $localStorage.username = input.username;
        $localStorage.session_name = input.session_name;

        console.log(this.data);
      };

    }]);

  app.controller('RiCtrl', ['$route', '$routeParams', '$location', '$localStorage', 'Data',
    function ($route, $routeParams, $location, $localStorage, Data) {

      this.title = "Service";

      /* Route variables */
      this.$route = $route;
      this.$location = $location;
      this.$routeParams = $routeParams;

      console.info(Data);

      /* Localise Data Factory */
      this.data = Data;

      /* For output */
      this.ri_airline_revenue = this.data.ri_airline_revenue;
      this.option1 = this.data.option1;

      /* Set input */
      this.setInput = function (input) {

        /* Save to data factory */
        this.data.ri_airline_revenue = input.ri_airline_revenue;
        this.data.option1 = input.option1;

        /* Save to local storage */
        $localStorage.ri_airline_revenue = input.ri_airline_revenue;
        $localStorage.option1 = input.option1;

        console.log(this.data);
      };

    }]);

  app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider.
          when('/user', {
            templateUrl: 'in-user.html',
            controller : 'UserCtrl'
          }).
          when('/calculator', {
            templateUrl: 'calculator.html',
            controller : 'RiCtrl'
          }).
          otherwise({
            redirectTo: '/calculator'
          });
    }
  ]);

})();
