'use strict';

(function () {
  var minX = 0;
  var maxX = document.querySelector('.map__pins').getBoundingClientRect().width;
  var offers = ['palace', 'flat', 'house', 'bungalo'];

  // var optionsRoom = {
  //   1: [1],
  //   2: [1, 2],
  //   3: [1, 2, 3],
  //   100: [0]
  // };

  // ф-я создания объекта
  var createUser = function (x, typeHousing) {
    return {
      'author': {
        'avatar': 'img/avatars/user0' + x + '.png'
      },
      'offer': {
        'type': typeHousing
      },
      'location': {
        'x': window.util.generateIntInGap(minX, maxX),
        'y': window.util.generateIntInGap(130 + window.util.PIN_HEIGHT, 670)
      }
    };
  };

  var createUsers = function () {
    var pins = [];
    for (var i = 0; i < 8; i++) {
      pins[i] = createUser(i + 1, offers[window.util.generateIntInGap(0, offers.length - 1)]);
    }
    return pins;
  };

  var pins = createUsers();

  window.data = {
    pins: pins
  };

})();

