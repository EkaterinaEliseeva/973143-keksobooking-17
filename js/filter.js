'use strict';
(function () {
  var selectHousingType = document.querySelector('#housing-type');
  var defaultTypeValue = 'any';

  // фильтрация по типу жилья
  var filterByTypeOfHousing = function (evt) {
    var pins = window.activate.pins;
    if (evt.target.value !== defaultTypeValue) {
      pins = pins
      .filter(function (pinItem) {
        return pinItem.offer.type === evt.target.value;
      });
    }
    // удаление старых меток с карты
    window.map.deleteTagsFromMap();
    // добавление новых меток на карту
    window.map.addTagsToMap(pins);
  };

  // добавление обработчика изменения значения фильтра
  selectHousingType.addEventListener('change', filterByTypeOfHousing);

})();
