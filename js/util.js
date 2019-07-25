'use strict';

(function () {
  var PIN_HEIGHT = 65;
  var PIN_WIDTH = 65;
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;

  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mainBlock = document.querySelector('main');
  var pinMainStartAddress = {
    x: pinMain.offsetLeft,
    y: pinMain.offsetTop
  };

  // генерация рандомного числа в промежутке
  var generateIntInGap = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.util = {
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    MIN_LENGTH_TITLE: MIN_LENGTH_TITLE,
    MAX_LENGTH_TITLE: MAX_LENGTH_TITLE,
    map: map,
    pinMain: pinMain,
    adForm: adForm,
    mapPins: mapPins,
    mainBlock: mainBlock,
    pinMainStartAddress: pinMainStartAddress,
    generateIntInGap: generateIntInGap
  };
})();
