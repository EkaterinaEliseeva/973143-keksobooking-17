'use strict';
var PIN_HEIGHT = 70;
var PIN_WIDTH = 40;

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

var typeOffer = document.querySelector('#type');
var pricePerNight = document.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var minX = 0;
var maxX = mapPins.getBoundingClientRect().width;

var offers = ['palace', 'flat', 'house', 'bungalo'];


// генерация рандомного числа в промежутке
var generateIntInGap = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

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
      'x': generateIntInGap(minX, maxX),
      'y': generateIntInGap(130 + PIN_HEIGHT, 670)
    }
  };
};

var createUsers = function () {
  var pins = [];
  for (var i = 0; i < 8; i++) {
    pins[i] = createUser(i + 1, offers[generateIntInGap(0, offers.length - 1)]);
  }
  return pins;
};

var pins = createUsers();

// удаление класса map--faded
map.classList.remove('map--faded');

// присваивание метке значений элемента массива
var renderPin = function (pinsElement) {
  var pinElem = pin.cloneNode(true);

  pinElem.style.left = pinsElement.location.x - PIN_WIDTH / 2 + 'px';
  pinElem.style.top = pinsElement.location.y - PIN_HEIGHT + 'px';
  pinElem.querySelector('img').setAttribute('src', pinsElement.author.avatar);
  pinElem.querySelector('img').setAttribute('alt', pinsElement.offer.type);

  return pinElem;
};

// добавление меток на карту
var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
mapPins.appendChild(fragment);

// установка минимальных значений цены за ночь, в зависимости от типа жилья
var setMinPrice = function () {
  if (typeOffer.value === 'bungalo') {
    pricePerNight.setAttribute('min', '0');
    pricePerNight.setAttribute('placeholder', '0');
  } else if (typeOffer.value === 'flat') {
    pricePerNight.setAttribute('min', '1000');
    pricePerNight.setAttribute('placeholder', '1000');
  } else if (typeOffer.value === 'house') {
    pricePerNight.setAttribute('min', '5000');
    pricePerNight.setAttribute('placeholder', '5000');
  } else {
    pricePerNight.setAttribute('min', '10000');
    pricePerNight.setAttribute('placeholder', '10000');
  }
};

typeOffer.addEventListener('change', setMinPrice);

// синхронизация времени заезда и выезда
var synchronizeTime = function () {
  timeOut.selectedIndex = timeIn.selectedIndex;
};

timeIn.addEventListener('change', synchronizeTime);

