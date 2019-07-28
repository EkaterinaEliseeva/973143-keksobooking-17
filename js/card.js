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
  var closeButton = card.querySelector('.popup__close');

  var deleteList = function (list) {
    list.forEach(function (listItem) {
      listItem.remove();
    });
  };


  var createFeature = function (feature) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', 'popup__feature--' + feature);
    return featureItem;
  };

  var createFeaturesList = function (features) {
    var featuresList = card.querySelectorAll('.popup__feature');
    if (featuresList) {
      deleteList(featuresList);
    }
    features.forEach(function (feature) {
      cardFeatures.appendChild(createFeature(feature));
    });
  };

  var createPhotoItem = function (srcPhoto) {
    var photoItem = photo.cloneNode(true);
    photoItem.setAttribute('src', srcPhoto);
    return photoItem;
  };

  var createPhotoGallery = function (photos) {
    var photoGallery = cardPhotos.querySelectorAll('.popup__photo');
    if (photoGallery) {
      deleteList(photoGallery);
    }
    photos.forEach(function (srcPhoto) {
      cardPhotos.appendChild(createPhotoItem(srcPhoto));
    });
  };

  var deleteCard = function () {
    var currentCard = map.querySelector('.map__card');
    if (currentCard) {
      currentCard.remove();
    }
  };

  var closeButtonOnclick = function () {
    deleteCard();
    closeButton.removeEventListener('click', closeButtonOnclick);
  };

  var escButtonPress = function (evt) {
    if (evt.keyCode === 27) {
      deleteCard();
    }
    document.removeEventListener('keydown', escButtonPress);
  };
  // проверяет имеет ли объект свойство offer
  var isOffer = function (pinsItem) {
    return pinsItem.offer ? true : false;
  };

  // скрывает блок в карточке, если его нет
  var hiddenBlock = function (block) {
    block.style.display = 'none';
  };

  var renderCard = function (pinsItem) {
    if (isOffer) {
      var offer = pinsItem.offer;
      // добавление названия предложения
      if (offer.title) {
        cardTitle.textContent = offer.title;
      } else {
        hiddenBlock(cardTitle);
      }

      // добавление адреса предложения
      cardAddress.textContent = offer.address;

      // добавление цены предложения
      cardPrice.textContent = offer.price + '₽/ночь';

      // добавление типа предложения
      cardTypeOfHousing.textContent = TYPE_HOUSING[offer.type];

      // добавление вместимости
      cardCapacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей.';

      // добавление времени заезда и выезда
      cardTime.textContent = 'Заезд после' + offer.checkin + ', выезд до ' + offer.checkout;

      // добавление списка удобств
      if (offer.features !== 0) {
        createFeaturesList(offer.features);
      }
      // добавление описания предложения
      cardDescription.textContent = offer.description;

      // добавление изображений
      createPhotoGallery(offer.photos);

      // добавление ссылки аватара
      cardAvatar.setAttribute('src', pinsItem.author.avatar);

      // вставляем карточку в разметку
      map.insertBefore(card, mapFiltersBlock);

      closeButton.addEventListener('click', closeButtonOnclick);

      document.addEventListener('keydown', escButtonPress);
    }
  };


  window.card = {
    renderCard: renderCard,
    deleteCard: deleteCard
  };
})();
