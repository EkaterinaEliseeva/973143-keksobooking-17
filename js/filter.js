'use strict';
(function () {
  var selectHousingType = document.querySelector('#housing-type');
  var defaultTypeValue = 'any';
  var filterByTypeOfHousing = function (evt) {
    var pins = window.activate.pins;
    if (evt.target.value !== defaultTypeValue) {
      pins = pins
      .slice()
      .filter(function (pinItem) {
        return pinItem.offer.type === evt.target.value;
      });
      window.map.deleteTagsFromMap();
    }
    window.map.addTagsToMap(pins);
  };

  selectHousingType.addEventListener('change', filterByTypeOfHousing);

})();
