'use strict';
(function () {
  var map = document.querySelector('.map');

  // установка начальных значений и отключение форм
  window.form.disableFormAd();
  window.form.disableFormFilter();
  window.form.setStartAddress();

  // активация страницы
  var activatePage = function () {
    window.form.activateFormAd();
    window.form.setMinAndMaxPrice();
    window.form.activateFormFilter();
    map.classList.remove('map--faded');
    window.util.adForm.classList.remove('ad-form--disabled');
    window.map.addTagsToMap();
  };

  window.activate = {
    activatePage: activatePage
  };
})();
