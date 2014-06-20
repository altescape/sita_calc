/**
 * Created by michaelwatts
 * Date: 19/06/2014
 * Time: 14:16
 */

(function () {

  var hc = angular.module('highCharts', ['highcharts-ng']);

  hc.controller('ChartCtrl', ['Data', '$localStorage',
    function ($scope, Data, $localStorage) {

      this.data = Data;

//      this.serviceData = [
//        ["Revenue Integrity", this.data.service_revenue_integrity],
//        ["Revenue Integrity process improvement consultancy", this.data.service_revenue_integrity_process],
//        ["Channel shift", this.data.service_channel_shift],
//        ["Ancillary sales", this.data.service_ancillary_sales],
//        ["Weight and Balance Cost Manager Application (for fuel) (CMAP)", this.data.service_weight_balance],
//        ["O&D (origin and destination) revenue management", this.data.service_o_and_d],
//        ["Point of sale controls", this.data.service_pos_controls],
//        ["Reprice/re-issue", this.data.service_reprice_reissue],
//        ["Airfare Insight", this.data.service_airfare_insight]
//      ];

      this.services = [
        ["Revenue Integrity", "service_revenue_integrity"],
        ["Revenue Integrity process improvement consultancy", "service_revenue_integrity_process"],
        ["Channel shift", "service_channel_shift"],
        ["Ancillary sales", "service_ancillary_sales"],
        ["Weight and Balance Cost Manager Application (for fuel) (CMAP)", "service_weight_balance"],
        ["O&D (origin and destination) revenue management", "service_o_and_d"],
        ["Point of sale controls", "service_pos_controls"],
        ["Reprice/re-issue", "service_reprice_reissue"],
        ["Airfare Insight", "service_airfare_insight"]
      ];

      this.filterData = function (service, data) {

        this.serviceData2 = [];
        this.data2 = data;
        var that = this;

        angular.forEach(service, function (value) {
          if (that.data2[value[1]] !== 0) {
            that.serviceData2.push([value[0], that.data2[value[1]]]);
          }
        });

        return this.serviceData2;
      };

      this.serviceSum = function (numbers) {

        this.sum = 0;
        var that = this;

        angular.forEach(numbers, function (value) {
          that.sum = that.sum + value[1];
        });
        return this.sum;
      };

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
              center: ["25%", 250],
              size            : 350,
              allowPointSelect: true,
              cursor          : 'pointer',
              borderColor     : 'rgba(255, 255, 255, 0)',
              dataLabels      : {
                enabled: false
              },
              showInLegend    : true,
              point           : {
                events: {
                  legendItemClick: function () {
                    return false;
                  }
                }
              }
            }
          },
          legend     : {
            verticalAlign: "bottom",
            align           : 'center',
            itemMarginBottom: 10,
            itemStyle       : {
              "color": "#FFF"
            },
            labelFormatter  : function () {
              if (this.percentage === 0) return false;
              return this.name + " (" + this.percentage.toFixed(1) + "%)";
            },
            enabled         : true,
            layout          : 'horizontal',
            symbolRadius    : 20,
            symbolHeight    : 20,
            symbolWidth     : 20
          }
        },
        series   : [
          {
            name     : 'Browser share',
            innerSize: '20%',
            data     : this.filterData(this.services, this.data)
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
          text : this.serviceSum(this.filterData(this.services, this.data)),
          style: {
            'color': 'white'
          },
          align: 'center'
        },
        loading  : false
      };

      this.updateChart = function () {

        this.seriesArray = this.chartConfig.series[0];
        this.servicesIncluded = this.filterData(this.services, this.data);

        this.chartConfig.title.text = this.serviceSum(this.servicesIncluded);
        this.seriesArray.data = this.servicesIncluded;
      };


    }]);

})();