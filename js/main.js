'use strict';
var PIN_HEIGHT = 70;
var PIN_WIDTH = 40;

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFieldsInput = adForm.querySelectorAll('fieldset');
var filterFieldsInput = document.querySelector('.map__filters').querySelectorAll('select, fieldset');
var addressInput = adForm.querySelector('#address');

var typeOffer = document.querySelector('#type');
var titleInput = document.querySelector('#title');
var priceInput = document.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var submitAdButton = document.querySelector('.ad-form__submit');

var minX = 0;
var maxX = mapPins.getBoundingClientRect().width;

var offers = ['palace', 'flat', 'house', 'bungalo'];
var minPrice = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

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
var addTagsToMap = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  mapPins.appendChild(fragment);
};

// отключение элементов формы объявления
var disableFormAd = function () {
  for (var i = 0; i < adFieldsInput.length; i++) {
    adFieldsInput[i].setAttribute('disabled', 'disabled');
  }
};

// включение элементов формы объявления
var activateFormAd = function () {
  for (var i = 0; i < adFieldsInput.length; i++) {
    adFieldsInput[i].disabled = false;
  }
};

// отключение элементов фильтра
var disableFormFilter = function () {
  for (var i = 0; i < filterFieldsInput.length; i++) {
    filterFieldsInput[i].setAttribute('disabled', 'disabled');
  }
};

// включение элементов фильтра
var activateFormFilter = function () {
  for (var i = 0; i < filterFieldsInput.length; i++) {
    filterFieldsInput[i].disabled = false;
  }
};

// установка начального значения адреса
var setStartAddress = function () {
  var x = pinMain.offsetLeft;
  var y = pinMain.offsetTop;
  addressInput.value = x + ', ' + y;
};

setStartAddress();
disableFormAd();
disableFormFilter();

pinMain.addEventListener('click', function () {
  activateFormAd();
  activateFormFilter();
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  addTagsToMap();
});

// валидация заголовка объявления
var validateTitle = function () {
  return (titleInput.value.length >= 30) & (titleInput.value.length <= 100) ? true : false;
};

// валидация цены
var validatePrice = function () {
  return (Number(priceInput.value) >= Number(priceInput.min)) & (Number(priceInput.value) <= 1000000) ? true : false;
};

// установка минимальных значений цены за ночь, в зависимости от типа жилья
typeOffer.addEventListener('change', function () {
  priceInput.min = minPrice[typeOffer.value.toUpperCase()];
  priceInput.placeholder = minPrice[typeOffer.value.toUpperCase()];
});

// синхронизация времени заезда и выезда
var synchronizeTime = function () {
  timeOut.selectedIndex = timeIn.selectedIndex;
};

timeIn.addEventListener('change', synchronizeTime);

// валидация формы
var validateForm = function () {
  return validateTitle() & validatePrice() ? true : false;
};

// проверка и отправка формы кнопкой "опубликовать"
submitAdButton.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (validateForm()) {
    // отправка формы
  }
});
