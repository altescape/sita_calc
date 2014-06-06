/**
 * Created by michaelwatts
 * Date: 05/06/2014
 * Time: 17:00
 */

var NUMBER = (function() {
  'use strict';

  function toString(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return {
    toString:toString
  };

}());