/**
 * Created by michaelwatts
 * Date: 05/06/2014
 * Time: 17:13
 */

// Calculator functions:
// ARR - Airfare reprice refund

var ARR = (function () {
  'use strict';

  // Agent Efficiency Savings
  var user_input = 0, // | USR INPUT
      share_of_tickets_reissued_high = 5, // 5% | USR INPUT
      share_of_tickets_reissued_low = share_of_tickets_reissued_high / 2, 
      estimated_time_to_reissue = 5, // 5% 40/60 revisit this as easy to put in as time rather than percentages  | USR INPUT
      automated_time_to_reissue = 3, // 3% 2/60 revisit this as easier to input time, surely...
      estimated_time_savings = estimated_time_to_reissue - automated_time_to_reissue,
      hourly_call_center_wages = 0; //  | USR INPUT

  // Fee Collection Gains
  var incorrectly_collected_fees = 0, // | USR INPUT
      collections_per_arr_transaction = 0; // | USR INPUT

  // Agent Efficiency Savings
  /**
   * Set annual number of E-Tickets issued via direct channels (website, ATO/CTO, Call centre, Mobile)
   * @param input
   */
  function setUserInput (input) {
    user_input = input;
  }

  /**
   * Get annual number of E-Tickets issued via direct channels (website, ATO/CTO, Call centre, Mobile)
   * @returns {number}
   */
  function getUserInput () {
    return user_input;
  }

  /**
   * Set share of tickets reissued (industry average)
   * @param input
   */
  function setShareOfTicketsReissued (input) {
    share_of_tickets_reissued_high = input;
  }

  /**
   * Get share of tickets reissued (industry average)
   * @returns {number}
   */
  function getShareOfTicketsReissued (type) {
    if (type === "high") {
      return share_of_tickets_reissued_high;
    } else {
      return share_of_tickets_reissued_low;
    }
  }

  /**
   * Estimated number of tickets reissued
   * @returns {number}
   */
  function estimatedNumberOfTicketsReissued (type) {
    return getShareOfTicketsReissued(type) / 100 * getUserInput()
  }

  /**
   * Set estimated time to reissue, initially (=40/60)
   * @param input
   */
  function setEstimatedTimeToReissue (input) {
    estimated_time_to_reissue = input;
  }

  /**
   * Get estimated time to reissue, initially (=40/60)
   * @returns {number}
   */
  function getEstimatedTimeToReissue () {
    return estimated_time_to_reissue;
  }

  /**
   * Get estimated time savings
   * @returns {number}
   */
  function getEstimatedTimeSavings () {
    return estimated_time_savings;
  }

  /**
   * Efficiency gains in hours (saved and deployed to sales activities)
   * @returns {number}
   */
  function efficiencyGains (type) {
    return estimated_time_savings / 100 * estimatedNumberOfTicketsReissued(type);
  }

  /**
   * Set hourly call centre/ATO/CTO wages (USD)
   * @param input
   */
  function setHourlyCallCenterWages (input) {
    hourly_call_center_wages = input;
  }

  /**
   * Get hourly call centre/ATO/CTO wages (USD)
   * @returns {number}
   */
  function getHourlyCallCenterWages () {
    return hourly_call_center_wages;
  }

  /**
   * Agent wage savings
   * @returns {number}
   */
  function agentWageSavings (type) {
    return hourly_call_center_wages * efficiencyGains(type);
  }

  // Fee Collection Gains
  /**
   * Set airline estimated share of tickets on which fees were previously not or incorrectly collected
   * @param input
   */
  function setEstimatedShareOfTicketsOnWhichFeesWereNotCorrectlyCollected (input) {
    incorrectly_collected_fees = input;
  }

  /**
   * Get airline estimated share of tickets on which fees were previously not or incorrectly collected
   * @returns {number}
   */
  function getEstimatedShareOfTicketsOnWhichFeesWereNotCorrectlyCollected () {
    return incorrectly_collected_fees;
  }

  /**
   * Number of tickets with improved collections
   * @returns {number}
   */
  function numberOfTicketsWithImprovedCollections (type) {
    return getEstimatedShareOfTicketsOnWhichFeesWereNotCorrectlyCollected() / 100 * estimatedNumberOfTicketsReissued(type);
  }

  /**
   * Set airline estimated incremental collections per ARR transactions
   * @param input
   */
  function setEstimatedIncrementalCollectionsPerARRTransaction (input) {
    collections_per_arr_transaction = input;
  }

  /**
   * Get airline estimated incremental collections per ARR transactions
   * @returns {number}
   */
  function getEstimatedIncrementalCollectionsPerARRTransaction () {
    return collections_per_arr_transaction;
  }

  /**
   * Total fee collection improvement gains
   * @returns {number}
   */
  function totalFeeCollectionImprovementGains (type) {
    return numberOfTicketsWithImprovedCollections(type) * getEstimatedIncrementalCollectionsPerARRTransaction();
  }

  /**
   * Total ARR wage savings and fee collection gains
   * @returns {number}
   */
  function totalARRWageSavingsFeeCollectionGains (type) {
    return totalFeeCollectionImprovementGains(type) + agentWageSavings(type);
  }

  return {
    setUserInput                                                  : setUserInput,
    getUserInput                                                  : getUserInput,
    setShareOfTicketsReissued                                     : setShareOfTicketsReissued,
    getShareOfTicketsReissued                                     : getShareOfTicketsReissued,
    estimatedNumberOfTicketsReissued                              : estimatedNumberOfTicketsReissued,
    setEstimatedTimeToReissue                                     : setEstimatedTimeToReissue,
    getEstimatedTimeToReissue                                     : getEstimatedTimeToReissue,
    getEstimatedTimeSavings                                       : getEstimatedTimeSavings,
    efficiencyGains                                               : efficiencyGains,
    setHourlyCallCenterWages                                      : setHourlyCallCenterWages,
    getHourlyCallCenterWages                                      : getHourlyCallCenterWages,
    agentWageSavings                                              : agentWageSavings,
    setEstimatedShareOfTicketsOnWhichFeesWereNotCorrectlyCollected: setEstimatedShareOfTicketsOnWhichFeesWereNotCorrectlyCollected,
    getEstimatedShareOfTicketsOnWhichFeesWereNotCorrectlyCollected: getEstimatedShareOfTicketsOnWhichFeesWereNotCorrectlyCollected,
    numberOfTicketsWithImprovedCollections                        : numberOfTicketsWithImprovedCollections,
    setEstimatedIncrementalCollectionsPerARRTransaction           : setEstimatedIncrementalCollectionsPerARRTransaction,
    getEstimatedIncrementalCollectionsPerARRTransaction           : getEstimatedIncrementalCollectionsPerARRTransaction,
    totalFeeCollectionImprovementGains                            : totalFeeCollectionImprovementGains,
    totalARRWageSavingsFeeCollectionGains                         : totalARRWageSavingsFeeCollectionGains
  };


}());