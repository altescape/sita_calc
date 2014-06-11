/**
 * Created by michaelwatts
 * Date: 09/06/2014
 * Time: 14:23
 */

/*
EMD/HSF Merchandising Value Calculator
*/

var EMD_HSF_MERCH = (function () {
  'use strict';

  var user_input = 0;

  /**
   * Set annual revenue
   * @param input
   */
  function setUserInput (input) {
    user_input = input;
  }

  /**
   * Get annual revenue
   * @returns {number}
   */
  function getUserInput () {
    return user_input;
  }

  /**
   * Potential revenue increase from Ancillary Sales by using
   * Horizon Service Fees and eMiscellaneous Document (HSF/EMD)
   * @param percentage
   * @returns {number}
   */
  function potentialRevenueIncrease (percentage) {
    return percentage / 100 * user_input;
  }

  return {
    setUserInput            : setUserInput,
    getUserInput            : getUserInput,
    potentialRevenueIncrease: potentialRevenueIncrease
  };

}());