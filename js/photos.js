'use strict';
(function () {
  var adForm = window.util.adForm;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarField = adForm.querySelector('.ad-form-header__input');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview').querySelector('img');
  var defaultAvatar = avatarPreview.src;
  var photoField = adForm.querySelector('.ad-form__input');
  var photoPreviewBlock = adForm.querySelector('.ad-form__photo');
  var fileAvatar;
  var filePhoto;

  var checkType = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var clearAvatar = function () {
    avatarPreview.src = defaultAvatar;
    fileAvatar = null;
  };

  var clearPhotos = function () {
    var photos = photoPreviewBlock.querySelectorAll('img');
    if (photos) {
      photos = Array.from(photos);
      photos.forEach(function (photo) {
        photo.remove();
      });
    }
  };

  var uploadPreview = function (file, filePreview) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      filePreview.setAttribute('src', reader.result);
    });

    reader.readAsDataURL(file);
  };

  // добавление обработчика для загрузки аватара
  avatarField.addEventListener('change', function () {
    fileAvatar = avatarField.files[0];

    if (fileAvatar && checkType(fileAvatar)) {
      uploadPreview(fileAvatar, avatarPreview);
    }
  });

  // добавление обработчика для загрузки фотографий
  photoField.addEventListener('change', function () {
    filePhoto = photoField.files[0];

    var photoPreview = document.createElement('img');

    photoPreview.setAttribute('width', 'auto');
    photoPreview.setAttribute('height', 'auto');
    photoPreview.style.maxWidth = '100%';
    photoPreview.style.maxHeight = '100%';

    photoPreviewBlock.appendChild(photoPreview);

    if (filePhoto && checkType(filePhoto)) {
      uploadPreview(filePhoto, photoPreview);
    }

  });

  window.photos = {
    clearAvatar: clearAvatar,
    clearPhotos: clearPhotos
  };

})();
