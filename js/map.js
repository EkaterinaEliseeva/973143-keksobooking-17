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

      // // добавление обработчиков клика на пины
      // renderPins.forEach(function (pinsElementItem, i) {
      //   pinsElementItem.addEventListener('click', function () {
      //     onPinClickHandler(pins[i]);
      //   });
      //   pinsElementItem.addEventListener('keydown', function (evt) {
      //     if (evt.keyCode === 13) {
      //       onPinClickHandler(pins[i]);
      //     }
      //   });
      // });

      // добавление обработчика кликов на карте
      window.util.mapPins.addEventListener('click', function (evt) {
        var target = evt.target;
        // всплытие события до элемента mapPins, чтобы клик внутри маркера(по фото) поднимался до маркера
        while (target !== window.util.mapPins) {
          // проверка соответствует ли target маркеру
          if (target.classList.contains('map__pin--small')) {
            // вызов обработчика, удаляющего старую карточку и создающего новую.
            onPinClickHandler(pins[target.id]);
            return;
          }
          // переход к родительскому target
          target = target.parentNode;
        }
      });
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


