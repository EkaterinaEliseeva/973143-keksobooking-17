'use strict';
(function () {

  var filters = document.querySelector('.map__filters');
  var selectHousingType = document.querySelector('#housing-type');
  var selectHousingPrice = document.querySelector('#housing-price');
  var selectHousingRooms = document.querySelector('#housing-rooms');
  var selectHousingGuests = document.querySelector('#housing-guests');
  var selectFeaturesWifi = document.querySelector('#filter-wifi');
  var selectFeaturesDishwasher = document.querySelector('#filter-dishwasher');
  var selectFeaturesParking = document.querySelector('#filter-parking');
  var selectFeaturesWasher = document.querySelector('#filter-washer');
  var selectFeaturesElevator = document.querySelector('#filter-elevator');
  var selectFeaturesConditioner = document.querySelector('#filter-conditioner');

  var priceMap = {
    'low': {
      min: 0,
      max: 1000
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'high': 50000
  };

  var defaultTypeValue = 'any';

  // фильтрация по типу жилья
  var filterByTypeOfHousing = function (value, type) {
    if (value !== defaultTypeValue) {
      return type === value;
    } else {
      return true;
    }
  };

  // фильтрация по цене
  var filterByPrice = function (value, price) {
    if (value === 'high') {
      return price >= priceMap['high'];
    } else if (value === 'low') {
      return price <= priceMap['low'];
    } else if (value === 'middle') {
      return price >= priceMap['middle'].min && price <= priceMap['middle'].max;
    } else {
      return true;
    }
  };

  // фильтрация по количеству комнат
  var filterByRoomsNumber = function (value, rooms) {
    if (value !== defaultTypeValue) {
      return rooms === Number(value);
    } else {
      return true;
    }
  };

  // фильтрация по количеству гостей
  var filterByCapacity = function (value, capacity) {
    if (value !== defaultTypeValue) {
      return capacity === Number(value);
    } else {
      return true;
    }
  };

  // фильтрация по удобствам
  var filterByFeatures = function (inputFeature, features) {
    if (inputFeature.checked && features.indexOf(inputFeature.value) === -1) {
      return false;
    } else {
      return true;
    }
  };

  filters.addEventListener('change', function () {
    // удаление карточки при изменении фильтра
    window.card.deleteCard();

    var typeValue = selectHousingType.value;
    var priceValue = selectHousingPrice.value;
    var roomValue = selectHousingRooms.value;
    var guestValue = selectHousingGuests.value;

    // фильтрация меток
    var filteredPins = window.activate.pins
    .filter(function (pinItem) {
      return filterByPrice(priceValue, pinItem.offer.price) &&
      filterByTypeOfHousing(typeValue, pinItem.offer.type) &&
      filterByRoomsNumber(roomValue, pinItem.offer.rooms) &&
      filterByCapacity(guestValue, pinItem.offer.guests) &&
      filterByFeatures(selectFeaturesWifi, pinItem.offer.features) &&
      filterByFeatures(selectFeaturesDishwasher, pinItem.offer.features) &&
      filterByFeatures(selectFeaturesParking, pinItem.offer.features) &&
      filterByFeatures(selectFeaturesElevator, pinItem.offer.features) &&
      filterByFeatures(selectFeaturesWasher, pinItem.offer.features) &&
      filterByFeatures(selectFeaturesConditioner, pinItem.offer.features);
    });

    window.debounce(function () {
      // удаление старых меток с карты
      window.map.deleteTagsFromMap();

      // добавление новых меток на карту
      window.map.addTagsToMap(filteredPins);
    });
  });

})();
