'use strict';
(function () {
  var pins = window.data.pins;

  // добавление меток на карту
  var addTagsToMap = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.data.renderPin(pins[i]));
    }
    window.util.mapPins.appendChild(fragment);
  };

  window.map = {
    addTagsToMap: addTagsToMap
  };
})();
