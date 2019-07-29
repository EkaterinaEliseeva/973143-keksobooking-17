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
  var featuresBlock = card.querySelector('.popup__features');

  // создание элемента из списка удобств
  var createFeature = function (feature) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', 'popup__feature--' + feature);
    return featureItem;
  };

  // создание списка удобств
  var createFeaturesList = function (features) {
    var featuresList = card.querySelectorAll('.popup__feature');
    if (featuresList) {
      window.util.deleteList(featuresList);
    }
    features.forEach(function (feature) {
      cardFeatures.appendChild(createFeature(feature));
    });
  };

  // создание фотографии
  var createPhotoItem = function (srcPhoto) {
    var photoItem = photo.cloneNode(true);
    photoItem.setAttribute('src', srcPhoto);
    return photoItem;
  };

  // создание списка фотографий
  var createPhotoGallery = function (photos) {
    var photoGallery = cardPhotos.querySelectorAll('.popup__photo');
    if (photoGallery) {
      window.util.deleteList(photoGallery);
    }
    photos.forEach(function (srcPhoto) {
      cardPhotos.appendChild(createPhotoItem(srcPhoto));
    });
  };

  // удаление карточки
  var deleteCard = function () {
    var currentCard = map.querySelector('.map__card');
    if (currentCard) {
      currentCard.remove();
    }
  };

  // закрытие карточки по клику на кнопку
  var onСloseButtonСlick = function () {
    deleteCard();
    closeButton.removeEventListener('click', onСloseButtonСlick);
  };

  // закрытие карточки по нажатию esc
  var escButtonPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
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

  // создание карточки
  var renderCard = function (pinsItem) {
    if (isOffer) {
      var offer = pinsItem.offer;
      // добавление названия предложения
      cardTitle.textContent = offer.title;

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
      if (offer.features) {
        createFeaturesList(offer.features);
      } else {
        hiddenBlock(featuresBlock);
      }

      // добавление описания предложения
      if (offer.description) {
        cardDescription.textContent = offer.description;
      } else {
        hiddenBlock(cardDescription);
      }

      // добавление изображений
      if (offer.photos) {
        createPhotoGallery(offer.photos);
      } else {
        hiddenBlock(cardPhotos);
      }

      // добавление ссылки аватара
      cardAvatar.setAttribute('src', pinsItem.author.avatar);

      // вставляем карточку в разметку
      map.insertBefore(card, mapFiltersBlock);

      // добавление обработчика клика на кнопку закрытия
      closeButton.addEventListener('click', onСloseButtonСlick);

      // добавлвение обработчика клика на esc
      document.addEventListener('keydown', escButtonPress);
    }
  };

  window.card = {
    renderCard: renderCard,
    deleteCard: deleteCard
  };
})();
