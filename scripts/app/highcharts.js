/**
 * Created by michaelwatts
 * Date: 19/06/2014
 * Time: 14:16
 */

(function(){

  var hc = angular.module('highCharts', ['highcharts-ng']);

  hc.controller('ChartCtrl', ['Data',
    function($scope, Data){

      /* Highcharts */
      this.chartConfig = {
        options  : {
          chart      : {
            type               : 'pie',
            backgroundColor    : 'rgba(255, 255, 255, 0)',
            plotBackgroundColor: 'rgba(255, 255, 255, 0)'
          },
          tooltip    : {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            series: {
              tooltip  : {
                followPointer: false
              },
              animation: true
            },
            pie   : {
              allowPointSelect: true,
              cursor          : 'pointer',
              depth           : 35,
              borderColor     : 'rgba(255, 255, 255, 0)',
              dataLabels      : {
                enabled : true,
                distance: -50,
                style   : {
                  fontWeight: 'bold',
                  color     : 'white',
                  textShadow: '0px 1px 2px black'
                }
              },
              startAngle      : -90,
              endAngle        : 90,
              center          : ['50%', '75%']
            }
          }
        },
        series   : [
          {
            name     : 'Browser share',
            innerSize: '50%',
            data     : [
              ['Firefox', 45.0],
              ['IE', 26.8],
              {
                name    : 'Chrome',
                y       : 12.8,
                sliced  : true,
                selected: true
              },
              ['Safari', 8.5],
              ['Opera', 6.2],
              ['Others', 0.7]
            ]
          }
        ],
        exporting: {
          buttons: {
            contextButton: {
              symbol           : 'square',
              symbolStrokeWidth: 1,
              symbolFill       : 'rgba(255,255,255,0.2)',
              symbolStroke     : 'rgba(255,255,255,0.4)'
            }
          }
        },
        title    : {
          text         : 'Browser<br>shares',
          style        : {
            'color': 'white'
          },
          align        : 'center',
          verticalAlign: 'middle',
          y            : 100
        },
        xAxis    : {currentMin: 0, currentMax: 10, minRange: 1},
        loading  : false
      };
  }]);

})();