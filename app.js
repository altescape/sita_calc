/**
 * Created by michaelwatts
 * Date: 11/06/2014
 * Time: 15:54
 */

(function () {

  var app = angular.module('hozCalc', ['ngStorage', 'ngRoute', 'highcharts-ng']);

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

  app.factory('Data', ['$localStorage',
    function ($localStorage) {
      return {
        username        : $localStorage.username,
        session_name    : $localStorage.session_name,
        total_passengers: $localStorage.total_passengers,
        passenger_growth: $localStorage.passenger_growth,
        tickets_issued  : $localStorage.tickets_issued,
        tickets_reissued: $localStorage.tickets_reissued,
        labour_cost     : $localStorage.labour_cost,
        option1         : $localStorage.option1
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

      /* Highcharts */
      this.chartConfig = {
        options: {
          chart: {
            type    : 'pie',
            options3d: {
              enabled: true,
              alpha: 15,
              beta: 0
            },
            backgroundColor: 'rgba(255, 255, 255, 0)',
            plotBackgroundColor: 'rgba(255, 255, 255, 0)'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions : {
            series: {
              tooltip: {
                followPointer :false
              },
              animation : true
            },
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              depth: 35,
              borderColor: 'rgba(255, 255, 255, 0)',
              dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '0px 1px 2px black'
                }
              },
              startAngle: -90,
              endAngle: 90,
              center: ['50%', '75%']
            }
          }
        },
        series : [
          {
            name: 'Browser share',
            innerSize: '50%',
            data: [
              ['Firefox',   45.0],
              ['IE',       26.8],
              {
                name: 'Chrome',
                y: 12.8,
                sliced: true,
                selected: true
              },
              ['Safari',    8.5],
              ['Opera',     6.2],
              ['Others',   0.7]
            ]
          }
        ],
        exporting: {
          buttons: {
            contextButton: {
              symbol: 'square',
              symbolStrokeWidth: 1,
              symbolFill: 'rgba(255,255,255,0.2)',
              symbolStroke: 'rgba(255,255,255,0.4)'
            }
          }
        },
        title: {
          text: 'Browser<br>shares',
          style : {
            'color': 'white'
          },
          align: 'center',
          verticalAlign: 'middle',
          y: 100
        },
        xAxis  : {currentMin: 0, currentMax: 10, minRange: 1},
        loading: false
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
      this.total_passengers = this.data.total_passengers;
      this.passenger_growth = this.data.passenger_growth;
      this.tickets_issued = this.data.tickets_issued;
      this.tickets_reissued = this.data.tickets_reissued;
      this.labour_cost = this.data.labour_cost;
      this.option1 = this.data.option1;

      /* Set input */
      this.setInput = function (input) {

        /* Save to data factory */
        this.data.total_passengers = input.total_passengers;
        this.data.passenger_growth = input.passenger_growth;
        this.data.tickets_issued = input.tickets_issued;
        this.data.tickets_reissued = input.tickets_reissued;
        this.data.labour_cost = input.labour_cost;
        this.data.option1 = input.option1;

        /* Save to local storage */
        $localStorage.total_passengers = input.total_passengers;
        $localStorage.passenger_growth = input.passenger_growth;
        $localStorage.tickets_issued = input.tickets_issued;
        $localStorage.tickets_reissued = input.tickets_reissued;
        $localStorage.labour_cost = input.labour_cost;
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
