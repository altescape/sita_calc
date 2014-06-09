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
   * Revenue recovered via revenue integrity (batch) - high
   * @returns {number}
   */
  function revenueIntegrityBatchHigh () {
    return high_revenue_improvement_batch_percentage / 100 * getUserInput();
  }

  /**
   * Revenue recovered via revenue integrity (batch) - low
   * @returns {number}
   */
  function revenueIntegrityBatchLow () {
    return low_revenue_improvement_batch_percentage / 100 * getUserInput();
  }

  /**
   * Additional revenue recovered via revenue integrity (real time) - high
   * @returns {number}
   */
  function revenueIntegrityRealtimeHigh () {
    return high_revenue_improvement_real_time_percentage / 100 * revenueIntegrityBatchHigh();
  }

  /**
   * Additional revenue recovered via revenue integrity (real time) - low
   * @returns {number}
   */
  function revenueIntegrityRealtimeLow () {
    return low_revenue_improvement_real_time_percentage / 100 * revenueIntegrityBatchLow();
  }

  /**
   * Estimated combination revenue integrity - high
   * @returns {number}
   */
  function revenueIntegrityCombinedHigh () {
    return revenueIntegrityRealtimeHigh() + revenueIntegrityBatchHigh();
  }

  /**
   * Estimated combination revenue integrity - low
   * @returns {number}
   */
  function revenueIntegrityCombinedLow () {
    return revenueIntegrityRealtimeLow() + revenueIntegrityBatchLow();
  }

  return {
    setUserInput                : setUserInput,
    getUserInput                : getUserInput,
    revenueIntegrityBatchHigh   : revenueIntegrityBatchHigh,
    revenueIntegrityBatchLow    : revenueIntegrityBatchLow,
    revenueIntegrityRealtimeHigh: revenueIntegrityRealtimeHigh,
    revenueIntegrityRealtimeLow : revenueIntegrityRealtimeLow,
    revenueIntegrityCombinedHigh: revenueIntegrityCombinedHigh,
    revenueIntegrityCombinedLow : revenueIntegrityCombinedLow
  };

}());


