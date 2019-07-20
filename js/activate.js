'use strict';
(function () {
  var map = document.querySelector('.map');
  var error = document.querySelector('#error').content.querySelector('.error');
  var errorModal = error.cloneNode(true);
  var errorMessage = errorModal.querySelector('.error__message');
  var mainBlock = document.querySelector('main');
  var errorButton = errorModal.querySelector('.error__button');


  var onSuccess = function (pins) {
    window.map.addTagsToMap(pins);
  };

  var removeErrorModal = function () {
    errorModal.remove();
    errorButton.removeEventListener('click', onErrorButtonClick);
  };

  var onErrorButtonClick = function (evt) {
    evt.preventDefault();
    removeErrorModal();
    window.load('https://js.dump.academy/keksobooking/data//', onSuccess, onError);
  };

  var onError = function (message) {
    errorMessage.textContent = message;
    mainBlock.insertAdjacentElement('afterbegin', errorModal);
    errorButton.addEventListener('click', onErrorButtonClick);
  };

  // установка начальных значений и отключение форм
  var deactivatePage = function () {
    window.form.disableFormAd();
    window.form.disableFormFilter();
    window.form.setStartAddress();
  };
  deactivatePage();

  // активация страницы
  var activatePage = function () {
    window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
    window.form.activateFormAd();
    window.form.setMinAndMaxPrice();
    window.form.activateFormFilter();
    map.classList.remove('map--faded');
    window.util.adForm.classList.remove('ad-form--disabled');
  };

  window.activate = {
    activatePage: activatePage
  };
})();
