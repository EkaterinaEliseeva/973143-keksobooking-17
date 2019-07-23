'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var map = window.util.map;
  var mapFiltersBlock = document.querySelector('.map__filters-container');
  var TYPE_HOUSING = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var renderCard = function (pins) {
    var card = cardTemplate.cloneNode(true);
    var cardTitle = card.querySelector('.popup__title');
    var cardAddress = card.querySelector('.popup__text--address');
    var cardPrice = card.querySelector('.popup__text--price');
    var cardTypeOfHousing = card.querySelector('.popup__type');
    var cardCapacity = card.querySelector('.popup__text--capacity');
    var cardTime = card.querySelector('.popup__text--time');
    var cardFeatures = card.querySelector('.popup__features');
    var cardDescription = card.querySelector('.popup__description');
    var cardPhotos = card.querySelector('.popup__photos');
    var cardAvatar = card.querySelector('.popup__avatar');
    var photo = cardPhotos.querySelector('.popup__photo');

    cardTitle.textContent = pins[0].offer.title;
    cardAddress.textContent = pins[0].offer.address;
    cardPrice.textContent = pins[0].offer.price + '₽/ночь';
    cardTypeOfHousing.textContent = TYPE_HOUSING[pins[0].offer.type];
    cardCapacity.textContent = pins[0].offer.rooms + ' комнаты для ' + pins[0].offer.guests + ' гостей.';
    cardTime.textContent = 'Заезд после' + pins[0].offer.checkin + ', выезд до ' + pins[0].offer.checkout;

    var featuresList = card.querySelectorAll('.popup__feature');
    featuresList.forEach(function (featureItem) {
      featureItem.remove();
    });

    pins[0].offer.features.forEach(function (feature) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__features');
      featureItem.classList.add('popup__features--' + feature);
      cardFeatures.appendChild(featureItem);
    });


    cardDescription.textContent = pins[0].offer.description;

    pins[0].offer.photos.forEach(function (photoItem, i) {

      if (i === 0) {
        photo.setAttribute('src', photoItem);
      } else {
        var newPhoto = photo.cloneNode(true);
        newPhoto.setAttribute('src', photoItem);
        cardPhotos.appendChild(newPhoto);
      }

    });

    cardAvatar.setAttribute('src', pins[0].author.avatar);

    map.insertBefore(card, mapFiltersBlock);
  };

  window.card = {
    renderCard: renderCard
  };



})();
