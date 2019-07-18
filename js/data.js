'use strict';

(function () {
  var minX = 0;
  var maxX = document.querySelector('.map__pins').getBoundingClientRect().width;
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
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

  // присваивание метке значений элемента массива
  var renderPin = function (pinsElement) {
    var pinElem = pin.cloneNode(true);

    pinElem.style.left = pinsElement.location.x - window.util.PIN_WIDTH / 2 + 'px';
    pinElem.style.top = pinsElement.location.y - window.util.PIN_HEIGHT + 'px';
    pinElem.querySelector('img').setAttribute('src', pinsElement.author.avatar);
    pinElem.querySelector('img').setAttribute('alt', pinsElement.offer.type);

    return pinElem;
  };

  window.data = {
    pins: pins,
    renderPin: renderPin
  };

})();

