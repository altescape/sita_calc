/**
 * Created by michaelwatts
 * Date: 11/06/2014
 * Time: 15:54
 */

(function () {

  var app = angular.module('hozCalc', ['ngStorage', 'ngRoute']);

  app.controller('CalcController', function ($scope, $localStorage) {

    this.sessData = session_data;

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

        // Init snap
        this.snapper = new Snap({
          element: document.getElementById('content')
        });

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

  app.directive("inUser", function () {
    return {
      restrict    : "E",
      templateUrl : "in-user.html",
      controller  : function ($localStorage) {

        this.username = $localStorage.username;
        this.session_name = $localStorage.session_name ;

        this.setInput = function (information) {

          this.username = information.username;
          this.session_name = information.session_name;

          $localStorage.username = information.username;
          $localStorage.session_name = information.session_name;
        };
      },
      controllerAs: "user"
    }
  });

  app.directive("inRevenueIntegrity", function () {
    return {
      restrict    : "E",
      templateUrl : "in-revenue-integrity.html",
      controller  : function ($localStorage) {

        this.calculations = {};

        this.setInput = function (input) {
          $localStorage.ri_airline_revenue = input.ri_airline_revenue;
        };

      },
      controllerAs: "ri"
    }
  });

  app.controller('UserCtrl', ['$route', '$routeParams', '$location',
    function($route, $routeParams, $location) {
      this.$route = $route;
      this.$location = $location;
      this.$routeParams = $routeParams;
    }]);

  app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
          .when('/user', {
            templateUrl: 'in-user.html',
            controller : 'UserCtrl'
          })
          .when('/calculator', {
            templateUrl: 'in-revenue-integrity.html',
            controller : 'UserCtrl'
          })
    }
  ]);

  var session_data = [
    {
      username: 'user 1',
      name    : 'session 1',
      info    : 'something'
    }
  ];

})();
