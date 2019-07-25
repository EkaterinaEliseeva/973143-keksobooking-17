'use strict';
(function () {

  // обработчик клика на метке, удаляет старую карточку и создает новую.
  var onPinClickHandler = function (pinItem) {
    window.card.deleteCard();
    window.card.renderCard(pinItem);
  };

  // добавление меток на карту
  var addTagsToMap = function (pins) {
    var fragment = document.createDocumentFragment();
    // массив отрисованных пинов
    var renderPins = [];

    if (pins.length !== 0) {
      pins
      .slice(0, 5)
      .forEach(function (pinItem) {

        // рендер элемента
        var pinsElement = window.pin.renderPin(pinItem);

        // добавление элемента в фрагмент
        fragment.appendChild(pinsElement);

        // добавление элемента в массив отрисованных
        renderPins.push(pinsElement);
      });

      // добавление фрагмента в разметку
      window.util.mapPins.appendChild(fragment);

      // добавление обработчиков клика на пины
      renderPins.forEach(function (pinsElementItem, i) {
        pinsElementItem.addEventListener('click', function () {
          onPinClickHandler(pins[i]);
        });
        pinsElementItem.addEventListener('keydown', function (evt) {
          if (evt.keyCode === 13) {
            onPinClickHandler(pins[i]);
          }
        });
      });

      // отрисовка карточки при загрузке страницы для первого элемента
      window.card.renderCard(pins[0]);
    }
  };

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


