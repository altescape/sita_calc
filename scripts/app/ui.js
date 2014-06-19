/**
 * Created by michaelwatts
 * Date: 19/06/2014
 * Time: 14:05
 */
(function () {

  var ui = angular.module('userInterface', ['ngRoute']);

  ui.controller('CalcController', function () {

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

  ui.directive("mainNav", function () {
    return {
      restrict    : "E",
      templateUrl : "templates/layout/main-nav.html",
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

  ui.directive("snapDrawLeft", function () {
    return {
      restrict    : "E",
      templateUrl : "templates/layout/snap-draw-left.html",
      controller  : function ($localStorage) {
        this.user = $localStorage.username;
      },
      controllerAs: "drawer"
    }
  });

  ui.directive("scrollArea", function () {
    return {
      restrict   : "E",
      templateUrl: "templates/layout/scroll-area.html",
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

  ui.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider.
          when('/user', {
            templateUrl: 'templates/partials/in-user.html',
            controller : 'UserCtrl'
          }).
          when('/calculator', {
            templateUrl: 'templates/partials/calculator.html',
            controller : 'CalCtrl'
          }).
          otherwise({
            redirectTo: '/user'
          });
    }
  ]);

})();

