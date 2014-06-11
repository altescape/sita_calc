/**
 * Created by michaelwatts
 * Date: 05/06/2014
 * Time: 17:13
 */

// Calculator functions:
// Revenue Integrity

var REVENUE_INTEGRITY = (function () {
  'use strict';

  var user_input = 0,
      revenue_improvement = 0,
      revenue_integrity = 0,
      revenue_recovered_batch = 0,
      high_revenue_improvement_batch_percentage = 1.2,		// 1.6%
      low_revenue_improvement_batch_percentage = 0.8,		// 0.8%
      high_revenue_improvement_real_time_percentage = 20,	// 20%
      low_revenue_improvement_real_time_percentage = 10;		// 10%

  /**
   * Set airline revenue
   * @param input
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
   * Set revenue improvement constant, will be a low and high value
   * @param input
   */
  function setRevenueImprovement (input) {
    revenue_improvement = input
  }

  /**
   * Get revenue improvement constant, will be a low or high value
   * @returns {number}
   */
  function getRevenueImprovement () {
    return revenue_improvement;
  }

  /**
   * Set Revenue integrity constant, will be a low or high value
   * @param input
   */
  function setRevenueIntegrity (input) {
    revenue_integrity = input;
  }

  /**
   * Get Revenue integrity constant, will be a low or high value
   * @returns {number}
   */
  function getRevenueIntegrity () {
    return revenue_integrity;
  }

  /**
   * Return revenue recovered via Revenue Integrity (Batch)
   * @param value
   * @returns {number}
   */
  function revenueRecoveredBatch (value) {
    return value / 100 * getUserInput();
  }

  function additionalRevenueRecovered (value_a, value_b) {
    return value_a / 100 * value_b;
  }

  function combinedRevenueIntegrity (value_a, value_b) {
    return value_a + value_b;
  }

  return {
    setUserInput              : setUserInput,
    getUserInput              : getUserInput,
    setRevenueImprovement     : setRevenueImprovement,
    getRevenueImprovement     : getRevenueImprovement,
    setRevenueIntegrity       : setRevenueIntegrity,
    getRevenueIntegrity       : getRevenueIntegrity,
    revenueRecoveredBatch     : revenueRecoveredBatch,
    additionalRevenueRecovered: additionalRevenueRecovered,
    combinedRevenueIntegrity  : combinedRevenueIntegrity
  };

}());


