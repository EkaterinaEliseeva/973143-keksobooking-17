'use strict';
(function () {

  // обработка кликов на метках
  var mapClickHandler = function (pins, target) {

    // всплытие события до элемента mapPins, чтобы клик внутри метки(по фото) поднимался до метки
    while (target !== window.util.mapPins) {

      // проверка соответствует ли target метке
      if (target.classList.contains('map__pin--small')) {

        // добавление класса active метке
        target.classList.add('.map__pin--active');

        // удаление старой карточки
        window.card.deleteCard();

        // добавление новой карточки
        window.card.renderCard(pins[target.getAttribute('data-id')]);

        return;
      }

      // переход к родительскому target
      target = target.parentNode;
    }
  };

  // добавление меток на карту
  var addTagsToMap = function (pins) {

    var fragment = document.createDocumentFragment();

    // массив отрисованных пинов
    var renderPins = [];

    if (pins.length !== 0) {
      pins
      .slice(0, window.util.MAX_PINS)
      .forEach(function (pinItem, id) {

        // рендер элемента
        var pinsElement = window.pin.renderPin(pinItem, id);

        // добавление элемента в фрагмент
        fragment.appendChild(pinsElement);

        // добавление элемента в массив отрисованных
        renderPins.push(pinsElement);
      });

      // добавление фрагмента в разметку
      window.util.mapPins.appendChild(fragment);

      // добавление обработчика кликов на карте
      window.util.mapPins.addEventListener('click', function (evt) {

        var target = evt.target;

        mapClickHandler(pins, target);

      });
    }

  };

  // удаление меток с карты
  var deleteTagsFromMap = function () {

    var mapPins = document.querySelectorAll('.map__pin--small');

    mapPins.forEach(function (mapPinItem) {
      mapPinItem.remove();
    });
  };

  window.map = {
    addTagsToMap: addTagsToMap,
    deleteTagsFromMap: deleteTagsFromMap
  };
})();


