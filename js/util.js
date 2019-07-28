'use strict';

(function () {
  var PIN_HEIGHT = 65;
  var PIN_WIDTH = 65;
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mainBlock = document.querySelector('main');
  var pinMainStartAddress = {
    x: pinMain.offsetLeft,
    y: pinMain.offsetTop
  };

  window.util = {
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    MIN_LENGTH_TITLE: MIN_LENGTH_TITLE,
    MAX_LENGTH_TITLE: MAX_LENGTH_TITLE,
    ESC_KEY_CODE: ESC_KEY_CODE,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    map: map,
    pinMain: pinMain,
    adForm: adForm,
    mapPins: mapPins,
    mainBlock: mainBlock,
    pinMainStartAddress: pinMainStartAddress
  };
})();
