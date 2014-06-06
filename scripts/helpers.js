/**
 * Created by michaelwatts
 * Date: 06/06/2014
 * Time: 14:53
 */

// Helpers

var HELPERS = (function () {
  'use strict';
  function isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function numberCheck (input) {
    if (!isNumber(input)) throw new Error("Entered value is not a number");
    return input;
  }

  return {
    numberCheck: numberCheck
  }

}());