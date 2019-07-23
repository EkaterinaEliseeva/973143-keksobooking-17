'use strict';
(function () {
  // добавление меток на карту
  var addTagsToMap = function (pins) {
    var fragment = document.createDocumentFragment();
    pins
    .slice(0, 5)
    .forEach(function (pinItem) {
      fragment.appendChild(window.pin.renderPin(pinItem));
    });
    window.util.mapPins.appendChild(fragment);
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


