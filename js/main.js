'use strict';
var PIN_HEIGHT = 70;
var PIN_WIDTH = 40;
var MIN_LENGTH_TITLE = 30;
var MAX_LENGTH_TITLE = 100;

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
// var roomNumber = document.querySelector('#room_number');
// var capacity = document.querySelector('#capacity');

var minX = 0;
var maxX = mapPins.getBoundingClientRect().width;

var offers = ['palace', 'flat', 'house', 'bungalo'];
var minPrice = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

// var optionsRoom = {
//   1: [1],
//   2: [1, 2],
//   3: [1, 2, 3],
//   100: [0]
// };

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

// установка минимального и максимального значений цены
var setMinAndMaxPrice = function () {
  priceInput.min = minPrice[typeOffer.value.toUpperCase()];
  priceInput.max = 1000000;
};

// валидация заголовка объявления
var validateTitle = function () {
  var isValid = titleInput.value.length >= MIN_LENGTH_TITLE && titleInput.value.length <= MAX_LENGTH_TITLE;
  if (isValid) {
    titleInput.setCustomValidity('');
    return true;
  } else {
    titleInput.setCustomValidity('Введите заголовок длиной от 30 до 100 символов');
    titleInput.focus();
    return false;
  }
};

titleInput.addEventListener('input', validateTitle);

// валидация цены
var validatePrice = function () {
  if (priceInput.value.length === 0) {
    priceInput.setCustomValidity('Введите число от ' + priceInput.min + ' до 1000000');
    priceInput.focus();
    return false;
  }
  var isValid = Number(priceInput.value) >= Number(priceInput.min) && Number(priceInput.value) <= Number(priceInput.max);
  if (isValid) {
    priceInput.setCustomValidity('');
    return true;
  } else {
    priceInput.setCustomValidity('Введите число от ' + priceInput.min + ' до 1000000');
    priceInput.focus();
    return false;
  }
};

priceInput.addEventListener('input', validatePrice);

// установка минимальных значений цены за ночь, в зависимости от типа жилья
typeOffer.addEventListener('change', function () {
  priceInput.min = minPrice[typeOffer.value.toUpperCase()];
  priceInput.placeholder = minPrice[typeOffer.value.toUpperCase()];
  validatePrice();
});

// синхронизация времени заезда и выезда
var synchronizeTime = function (evt) {
  if (evt.target === timeIn) {
    timeOut.selectedIndex = timeIn.selectedIndex;
  } else {
    timeIn.selectedIndex = timeOut.selectedIndex;
  }
};

timeIn.addEventListener('change', synchronizeTime);
timeOut.addEventListener('change', synchronizeTime);

// изменение вместимости в зависимости от кол-ва комнат
// var changeCapacity = function () {
//   // варианты вместимости
//   var optionsCapacity = capacity.options;
//   // отключение всех
//   for (var i = 0; i < capacity.options.length; i++) {
//     optionsCapacity[i].setAttribute('disabled', 'disabled');
//     if (optionsCapacity[i].selected) {
//       optionsCapacity[i].selected = false;
//     }
//   }
//   // подходящие варианты для определенной roomNumber
//   var suitableOptions = optionsRoom[roomNumber.value];

//   // мне это не нравится, но пока не пойму как сделать
//   for (var j = 0; j < suitableOptions.length; j++) {
//     for (i = 0; i < optionsCapacity.length; i++) {
//       if (suitableOptions[j] === Number(optionsCapacity[i].value)) {
//         optionsCapacity[i].removeAttribute('disabled');
//         optionsCapacity[i].selected = true;
//       }
//     }
//   }
// };

// roomNumber.addEventListener('change', changeCapacity);

// валидация формы
var validateForm = function () {
  return validateTitle() && validatePrice();
};

// проверка и отправка формы кнопкой "опубликовать"
adForm.addEventListener('submit', function (evt) {
  if (!validateForm()) {
    evt.preventDefault();
  }
});

// установка начальных значений и отключение форм
// changeCapacity();
disableFormAd();
disableFormFilter();

pinMain.addEventListener('click', function () {
  activateFormAd();
  setStartAddress();
  setMinAndMaxPrice();
  activateFormFilter();
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  addTagsToMap();
});

