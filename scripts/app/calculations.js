/**
 * Created by michaelwatts
 * Date: 19/06/2014
 * Time: 14:10
 */

(function () {
  var cal = angular.module('calculations', ['ngStorage', 'highCharts']);

  cal.factory('DataStructure', function () {
    return [
      // user/session variables
      'username',
      'session_name',

      // Passengers boarded per year
      'core_passengers_costs',
      'dd_direct_distribution_costs',
      'dd_call_centre',
      'dd_ecom',
      'dd_travel_agent',
      'dd_mobile',
      'id_indirect_distribution_costs',
      'id_amadeus',
      'id_sabre',
      'id_galileo',
      'id_abacus',

      // Passenger and ticket variables
      'total_passengers',
      'passenger_growth',
      'tickets_issued_perc',
      'tickets_issued',
      'tickets_reissued',
      'labour_cost',

      // Revenu variables
      'airline_revenue',
      'airline_cost_base',
      'annual_dist_costs_rate',
      'av_yield_per_ticket',
      'annual_fuel_cost_rate',

      // Service includes
      'service_revenue_integrity',
      'service_revenue_integrity_process',
      'service_channel_shift',
      'service_ancillary_sales',
      'service_weight_balance',
      'service_o_and_d',
      'service_pos_controls',
      'service_reprice_reissue',
      'service_airfare_insight'
    ];
  });

  cal.factory('Data', ['$localStorage',
    function ($localStorage) {
      return {
        // Username/session stuff (in-user.html)
        username                         : $localStorage.username,
        session_name                     : $localStorage.session_name,

        // Passengers boarded (cal_partial-passengers-boarded.html)
        core_passengers_costs            : $localStorage.core_passengers_costs,
        dd_direct_distribution_costs     : $localStorage.dd_direct_distribution_costs,
        dd_call_centre                   : $localStorage.dd_call_centre,
        dd_ecom                          : $localStorage.dd_ecom,
        dd_travel_agent                  : $localStorage.dd_travel_agent,
        dd_mobile                        : $localStorage.dd_mobile,
        id_indirect_distribution_costs   : $localStorage.id_indirect_distribution_costs,
        id_amadeus                       : $localStorage.id_amadeus,
        id_sabre                         : $localStorage.id_sabre,
        id_galileo                       : $localStorage.id_galileo,
        id_abacus                        : $localStorage.id_abacus,

        // Passenger and tickets info (cal_partial-passenger_and_tickets.html)
        total_passengers                 : $localStorage.total_passengers,
        passenger_growth                 : $localStorage.passenger_growth,
        tickets_issued_perc              : $localStorage.tickets_issued_perc,
        tickets_issued                   : $localStorage.tickets_issued,
        tickets_reissued                 : $localStorage.tickets_reissued,
        labour_cost                      : $localStorage.labour_cost,

        // Revenue (cal_partial-revenue.html)
        airline_revenue                  : $localStorage.airline_revenue,
        airline_cost_base                : $localStorage.airline_cost_base,
        annual_dist_costs_rate           : $localStorage.annual_dist_costs_rate,
        av_yield_per_ticket              : $localStorage.av_yeild_per_ticket,
        annual_fuel_cost_rate            : $localStorage.annual_fuel_cost_rate,

        // Service includes (cal_partial-service-includes.html)
        service_revenue_integrity        : $localStorage.service_revenue_integrity,
        service_revenue_integrity_process: $localStorage.service_revenue_integrity_process,
        service_channel_shift            : $localStorage.service_channel_shift,
        service_ancillary_sales          : $localStorage.service_ancillary_sales,
        service_weight_balance           : $localStorage.service_weight_balance,
        service_o_and_d                  : $localStorage.service_o_and_d,
        service_pos_controls             : $localStorage.service_pos_controls,
        service_reprice_reissue          : $localStorage.service_reprice_reissue,
        service_airfare_insight          : $localStorage.service_airfare_insight
      }
    }]);

  cal.controller('CalCtrl', ['$route', '$routeParams', '$location', '$localStorage', 'Data', 'DataStructure',
    function ($route, $routeParams, $location, $localStorage, Data, DataStructure) {

      this.title = "Horizon Value Proposition Calculator";

      /* Localise Data Factory */
      this.data = Data;
      this.dataStructure = DataStructure;


      /* Check user has name */
      if (this.data.username === undefined || this.data.username === "") {
        console.info("username is empty");
        $location.path("user");
      }

      /* Check session has name */
      if (this.data.session_name === undefined || this.data.session_name === "") {
        console.info("session_name is empty");
        $location.path("user");
      }

      // Saves to multiple desitinations
      this.saveToDestination = function (name, src, dest) {

        if (!angular.isArray(name)) throw("saveToDestination() error: Destination must be an array");
        if (!angular.isArray(dest)) throw("saveToDestination() error:  Name must be an array");

        angular.forEach(name, function (nameValue) {
          angular.forEach(dest, function (value) {
            value[nameValue] = src[nameValue]
          })
        })
      };

      /* For output */
      this.saveToDestination(this.dataStructure, this.data, [this]);

      /* Set input */
      this.setInput = function (input) {

        this.destinations = [this.data, $localStorage];
        this.saveToDestination(this.dataStructure, input, this.destinations);

        // Change inputs on the fly
        this.tickets_issued = Math.round(input.total_passengers / input.tickets_issued_perc);

        console.info(this.data);

      };

    }]);

  cal.directive("calPassengerTickets", function () {
    return {
      restrict   : "E",
      templateUrl: "templates/partials/cal_partial-passenger_and_tickets.html"
    }
  });

  cal.directive("calRevenue", function () {
    return {
      restrict   : "E",
      templateUrl: "templates/partials/cal_partial-revenue.html"
    }
  });

  cal.directive("calServiceIncludes", function () {
    return {
      restrict   : "E",
      templateUrl: "templates/partials/cal_partial-service-includes.html"
    }
  });
})();