'use strict';
var PIN_HEIGHT = 70;
var PIN_WIDTH = 40;

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

var minX = 0;
var maxX = mapPins.getBoundingClientRect().width;

var offers = ['palace', 'flat', 'house', 'bungalo'];
var arr = [];

// генерация рандомного числа в промежутке
var generateIntInGap = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// ф-я создания объекта
var makeElement = function (x, typeHousing) {
  var elem = {
    'author': {
      'avatar': 'img/avatars/user0' + x + '.png'
    },
    'offer': {
      'type': typeHousing
    },
    'location': {
      'x': generateIntInGap(minX, maxX),
      'y': generateIntInGap(130 + PIN_HEIGHT, 670)
    }
  };
  return elem;
};

// генерация 8 объектов
for (var i = 0; i < 8; i++) {
  arr[i] = makeElement(i + 1, offers[generateIntInGap(0, offers.length - 1)]);
}

// удаление класса map--faded
map.classList.remove('map--faded');


// присваивание метке значений элемента массива
var renderPin = function (obj) {
  var pinElem = pin.cloneNode(true);

  pinElem.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
  pinElem.style.top = obj.location.y - PIN_HEIGHT + 'px';
  pinElem.querySelector('img').src = obj.author.avatar;
  pinElem.querySelector('img').alt = obj.offer.type;

  return pinElem;
};

// добавление меток на карту
var fragment = document.createDocumentFragment();
for (i = 0; i < arr.length; i++) {
  fragment.appendChild(renderPin(arr[i]));
}
mapPins.appendChild(fragment);
