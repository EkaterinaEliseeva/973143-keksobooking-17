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
  var resetButton = document.querySelector('.ad-form__reset');
  var pinMain = window.util.pinMain;
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  // сброс формы кнопкой очистить
  var onResetButtonClick = function () {
    window.activate.deactivatePage();
    resetButton.removeEventListener('click', onResetButtonClick);
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

  // синхронизация времени заезда и выезда
  var synchronizeTime = function (evt) {
    if (evt.target === timeIn) {
      timeOut.selectedIndex = timeIn.selectedIndex;
    } else {
      timeIn.selectedIndex = timeOut.selectedIndex;
    }
  };

  // проверка вместимости комнат
  var changeCapacity = function () {
    var customValidity;
    if (roomNumber.value === '100') {
      if (capacity.value !== '0') {
        customValidity = 'Допустимое значение количества гостей для 100 комнат - Не для гостей';
      } else {
        customValidity = '';
      }
    } else {
      if (capacity.value === '0' || Number(capacity.value) > Number(roomNumber.value)) {
        var room = (roomNumber.value === '1') ? 'комнаты' : 'комнат';
        customValidity = 'Максимально возможное количество гостей для ' + roomNumber.value + ' ' + room + ' - ' + roomNumber.value;
      } else {
        customValidity = '';
      }
    }
    capacity.setCustomValidity(customValidity);
  };

  changeCapacity();

  // валидация формы
  var validateForm = function () {
    return validateTitle() && validatePrice();
  };

  // проверка и отправка формы кнопкой "опубликовать"
  var onSubmitButtonClick = function (evt) {
    evt.preventDefault();
    if (validateForm()) {

      var formData = new FormData(window.util.adForm);

      window.load.upload(formData, onSuccessSend, window.activate.onError);
    }
  };

  // отключение элементов формы объявления
  var disableFormAd = function () {
    adFieldsInput.forEach(function (adFieldInput) {
      adFieldInput.setAttribute('disabled', 'disabled');
    });

    // удаление обработчика отправки формы
    adForm.removeEventListener('submit', onSubmitButtonClick);

    // удаление обработчика сброса формы
    resetButton.removeEventListener('click', onResetButtonClick);

    // удаление обработчика валидации заголовка
    titleInput.removeEventListener('input', validateTitle);

    // удаление обработчика валидации цены
    priceInput.removeEventListener('input', validatePrice);

    // удаление обработчиков синхронизации времени
    timeIn.removeEventListener('change', synchronizeTime);
    timeOut.removeEventListener('change', synchronizeTime);

    // удаление обработчиков изменения вместимости комнат
    roomNumber.addEventListener('change', changeCapacity);
    capacity.addEventListener('change', changeCapacity);
  };

  // включение элементов формы объявления
  var activateFormAd = function () {
    adFieldsInput.forEach(function (adFieldInput) {
      adFieldInput.disabled = false;
    });

    // добавление обработчика отправки формы
    adForm.addEventListener('submit', onSubmitButtonClick);

    // добавление обработчика сброса формы
    resetButton.addEventListener('click', onResetButtonClick);

    // добавление обработчика валидации заголовка
    titleInput.addEventListener('input', validateTitle);

    // добавление обработчика валидации цены
    priceInput.addEventListener('input', validatePrice);

    // добавление обработчиков синхронизации времени
    timeIn.addEventListener('change', synchronizeTime);
    timeOut.addEventListener('change', synchronizeTime);

    // добавление обработчиков изменения вместимости комнат
    roomNumber.addEventListener('change', changeCapacity);
    capacity.addEventListener('change', changeCapacity);
  };

  // отключение элементов фильтра
  var disableFormFilter = function () {
    filterFieldsInput.forEach(function (filterFieldInput) {
      filterFieldInput.setAttribute('disabled', 'disabled');
    });
  };

  // включение элементов фильтра
  var activateFormFilter = function () {
    filterFieldsInput.forEach(function(filterFieldInput) {
      filterFieldInput.disabled = false;
    });
  };

  // установка начального значения адреса
  var setStartAddress = function (startAddress) {
    addressInput.value = startAddress.x + ', ' + startAddress.y;
  };

  // установка адреса
  var setAddress = function (x, y) {
    addressInput.value = x + ', ' + y;
  };

  // установка минимального и максимального значений цены
  var setMinAndMaxPrice = function () {
    priceInput.min = minPrice[typeOffer.value.toUpperCase()];
    priceInput.max = 1000000;
  };

  // установка минимальных значений цены за ночь, в зависимости от типа жилья
  typeOffer.addEventListener('change', function () {
    priceInput.min = minPrice[typeOffer.value.toUpperCase()];
    priceInput.placeholder = minPrice[typeOffer.value.toUpperCase()];
    validatePrice();
  });

  // возвращение метки в начальное положение
  var returnPinToStart = function (startAddress) {
    pinMain.style.left = startAddress.x + 'px';
    pinMain.style.top = startAddress.y + 'px';
  };

  // удаление окна успешной отправки
  var removeSuccessModal = function () {
    successModal.remove();
    document.removeEventListener('click', onSuccessClickHanler);
    document.removeEventListener('keydown', onSuccessEscButtonPress);
  };

  // обработчик клика на странице, удаляющий окно об успешной отправке
  var onSuccessClickHanler = function (evt) {
    evt.preventDefault();
    removeSuccessModal();
  };

  // обработчик нажатия esc, удаляющий окно об успешной отправке
  var onSuccessEscButtonPress = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      removeSuccessModal();
    }
  };

  // при успешной отправке объявления
  var onSuccessSend = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var mainBlock = window.util.mainBlock;

    // сброс полей формы
    window.util.adForm.reset();

    // деактивация страницы
    window.activate.deactivatePage();

    // создание попапа с сообщением об успехе
    successModal = successTemplate.cloneNode(true);

    // добавление обработчиков закрытия попапа
    document.addEventListener('click', onSuccessClickHanler);
    document.addEventListener('keydown', onSuccessEscButtonPress);

    // добавление сообщения в разметку
    mainBlock.insertAdjacentElement('afterbegin', successModal);
  };

  window.form = {
    disableFormAd: disableFormAd,
    activateFormAd: activateFormAd,
    disableFormFilter: disableFormFilter,
    activateFormFilter: activateFormFilter,
    setStartAddress: setStartAddress,
    setAddress: setAddress,
    setMinAndMaxPrice: setMinAndMaxPrice,
    returnPinToStart: returnPinToStart
  };

})();

