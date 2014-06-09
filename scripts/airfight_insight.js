/**
 * Created by michaelwatts
 * Date: 09/06/2014
 * Time: 12:47
 */

/*
Airfare Insight Value Calculator
 */

var AFI = (function () {
  'use strict';

  var user_input = 0;

  /**
   * Set airline revenue
   * @type {number}
   */
  function setUserInput (input) {
    user_input = input;
  }

  /**
   * Get airline revenue
   * @returns {number}
   */
  function getUserInput () {
    return user_input;
  }

  /**
   * Contribution
   * @param percentage
   * @returns {number}
   */
  function contribution (percentage) {
    return percentage / 100 * user_input;
  }

  return {
    setUserInput: setUserInput,
    getUserInput: getUserInput,
    contribution: contribution
  };

}());