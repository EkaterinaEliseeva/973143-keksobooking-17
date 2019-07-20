'use strict';
(function () {
  // добавление меток на карту
  var addTagsToMap = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.renderPin(pins[i]));
    }
    window.util.mapPins.appendChild(fragment);
  };

  window.map = {
    addTagsToMap: addTagsToMap
  };
})();


