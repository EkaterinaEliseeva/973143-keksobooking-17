'use strict';
(function () {
  var map = document.querySelector('.map');
  var error = document.querySelector('#error').content.querySelector('.error');
  var errorModal = error.cloneNode(true);
  var errorMessage = errorModal.querySelector('.error__message');
  var mainBlock = window.util.mainBlock;
  var errorButton = errorModal.querySelector('.error__button');

  var onSuccess = function (pins) {
    window.map.addTagsToMap(pins);
    window.activate.pins = pins;
  };

  var removeErrorModal = function () {
    errorModal.remove();
    errorButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('click', onEscButtonClick);
  };

  var onErrorButtonClick = function (evt) {
    evt.preventDefault();
    removeErrorModal();
    window.load.load(onSuccess, onError);
  };

  var onErrorClick = function (evt) {
    evt.preventDefault();
    removeErrorModal();
  };

  var onEscButtonClick = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      removeErrorModal();
    }
  };

  var onError = function (message) {
    errorMessage.textContent = message;
    mainBlock.insertAdjacentElement('afterbegin', errorModal);
    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('click', onErrorClick);
    document.addEventListener('click', onEscButtonClick);
  };

  // установка начальных значений и отключение форм
  var deactivatePage = function () {
    window.form.disableFormAd();
    window.form.disableFormFilter();
    window.form.setStartAddress(window.util.pinMainStartAddress);
  };
  deactivatePage();

  // активация страницы
  var activatePage = function () {
    window.load.load(onSuccess, onError);
    window.form.activateFormAd();
    window.form.setMinAndMaxPrice();
    window.form.activateFormFilter();
    map.classList.remove('map--faded');
    window.util.adForm.classList.remove('ad-form--disabled');
  };

  window.activate = {
    onError: onError,
    activatePage: activatePage
  };
})();
