'use strict';
(function () {
  var error = document.querySelector('#error').content.querySelector('.error');
  var errorModal = error.cloneNode(true);
  var errorMessage = errorModal.querySelector('.error__message');
  var mainBlock = window.util.mainBlock;
  var errorButton = errorModal.querySelector('.error__button');
  var isActivePage = false;

  // при успешном получении данных с сервера
  var onSuccess = function (pins) {
    window.map.addTagsToMap(pins);
    window.activate.pins = pins;
  };

  // удаление сообщения об ошибке
  var removeErrorModal = function () {
    errorModal.remove();
    errorButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('click', onEscButtonClick);
  };

  // обработчик клика на кнопке закрытия модалки с ошибкой
  var onErrorButtonClick = function (evt) {
    evt.preventDefault();
    removeErrorModal();
    window.load.load(onSuccess, onError);
  };

  // обработчик клика на странице для закрытия модалки с ошибкой
  var onErrorClick = function (evt) {
    evt.preventDefault();
    removeErrorModal();
  };

  // обработчик нажатия esc для закрытия модалки с ошибкой
  var onEscButtonClick = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      removeErrorModal();
    }
  };

  // если ошибка при получении данных с сервера
  var onError = function (message) {

    // добавление текста сообщения
    errorMessage.textContent = message;

    // добавление модального окна в разметку
    mainBlock.insertAdjacentElement('afterbegin', errorModal);

    // добавление обработчиков для закрытия модалки
    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('click', onErrorClick);
    document.addEventListener('click', onEscButtonClick);
  };

  // установка начальных значений и отключение форм
  var disablePageInitial = function () {
    window.form.disableFormAd();
    window.form.disableFormFilter();
    window.form.setStartAddress(window.util.pinMainStartAddress);
  };
  disablePageInitial();

  // активация страницы
  var activatePage = function () {
    if (!isActivePage) {
      // временно для проверки отправки
      document.querySelector('#title').value = '123456789123456789123456789123';
      document.querySelector('#price').value = '1000';

      // загрузка данных с сервера
      window.load.load(onSuccess, onError);

      // активация формы объявленияя
      window.form.activateFormAd();

      // установка максимальной и минимальной цены
      window.form.setMinAndMaxPrice();

      // активация вормы фильтра
      window.form.activateFormFilter();

      // удаление классов map--faded и ad-form--disabled
      window.util.map.classList.remove('map--faded');
      window.util.adForm.classList.remove('ad-form--disabled');
    }
  };

  // дезактивация страницы
  var deactivatePage = function () {

    // отключение форм и установка начального адреса
    disablePageInitial();

    // удаление меток с карты
    window.map.deleteTagsFromMap();

    // возвращение метки в исходное положение
    window.form.returnPinToStart(window.util.pinMainStartAddress);

    // удаление карточки
    window.card.deleteCard();

    // добавление класса map--faded карте
    if (!window.util.map.classList.contains('map--faded')) {
      window.util.map.classList.add('map--faded');
    }

    // добавление класса ad-form--disabled форме объявления
    if (!window.util.adForm.classList.contains('ad-form--disabled')) {
      window.util.adForm.classList.add('ad-form--disabled');
    }

    // удаление аватара и фоторгафий
    window.photos.clearAvatar();
    window.photos.clearPhotos();

    isActivePage = false;
  };

  window.activate = {
    onError: onError,
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };
})();
