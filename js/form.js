'use strict';

(function () {
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;
  var minPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var successModal;

  var adForm = window.util.adForm;
  var adFieldsInput = adForm.querySelectorAll('fieldset');
  var filterFieldsInput = document.querySelector('.map__filters').querySelectorAll('select, fieldset');
  var addressInput = adForm.querySelector('#address');
  var typeOffer = document.querySelector('#type');
  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var pinMain = window.util.pinMain;

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
  var setStartAddress = function (startAddress) {
    addressInput.value = startAddress.x + ', ' + startAddress.y;
  };

  var setAddress = function (x, y) {
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

  // roomNumber.addEventListener('change', changeCapacity);

  // валидация формы
  var validateForm = function () {
    return validateTitle() && validatePrice();
  };

  var returnPinToStart = function (startAddress) {
    pinMain.offsetLeft = startAddress.x;
    pinMain.offsetTop = startAddress.y;
    setStartAddress(window.util.pinMainStartAddress);
  };

  var removeSuccessModal = function () {
    successModal.remove();
    document.removeEventListener('click', onSuccessClickHanler);
    document.removeEventListener('keydown', onSuccessEscButtonPress);
  };

  var onSuccessClickHanler = function (evt) {
    evt.preventDefault();
    removeSuccessModal();
  };

  var onSuccessEscButtonPress = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      removeSuccessModal();
    }
  };

  var onSuccessSend = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var mainBlock = window.util.mainBlock;

    // сброс полей формы
    window.util.adForm.reset();

    // удаление меток
    window.map.deleteTagsFromMap();

    // удаление карточки
    window.card.deleteCard();

    // возвращение пина в начальную позицию
    returnPinToStart(window.util.pinMainStartAddress);

    // создание попапа с сообщением об успехе
    successModal = successTemplate.cloneNode(true);

    // обработчики закрытия попапа
    document.addEventListener('click', onSuccessClickHanler);
    document.addEventListener('keydown', onSuccessEscButtonPress);

    // добавление сообщения в разметку
    mainBlock.insertAdjacentElement('afterbegin', successModal);
  };

  // проверка и отправка формы кнопкой "опубликовать"
  adForm.addEventListener('submit', function (evt) {
    if (!validateForm()) {
      evt.preventDefault();
    } else {
      evt.preventDefault();
      var formData = new FormData(window.util.adForm);

      window.load.upload(formData, onSuccessSend, window.activate.onError);
    }
  });

  window.form = {
    disableFormAd: disableFormAd,
    activateFormAd: activateFormAd,
    disableFormFilter: disableFormFilter,
    activateFormFilter: activateFormFilter,
    setStartAddress: setStartAddress,
    setAddress: setAddress,
    setMinAndMaxPrice: setMinAndMaxPrice
  };

})();

