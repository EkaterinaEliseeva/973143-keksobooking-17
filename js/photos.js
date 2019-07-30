'use strict';
(function () {
  var adForm = window.util.adForm;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PREVIEW_WIDTH = '100%';
  var PREVIEW_HEIGHT = '100%';

  var avatarField = adForm.querySelector('.ad-form-header__input');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview').querySelector('img');
  var defaultAvatar = avatarPreview.src;
  var photoField = adForm.querySelector('.ad-form__input');
  var photoPreviewBlock = adForm.querySelector('.ad-form__photo');
  var photoContainer = adForm.querySelector('.ad-form__photo-container');
  var fileAvatar;
  var filePhoto;
  var photoItem = false;

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
    var photoBlocks = photoContainer.querySelectorAll('.ad-form__photo');
    photoBlocks.forEach(function (photoBlock, item) {
      var photo = photoBlock.querySelector('img');
      if (photo) {
        if (item > 0) {
          photo.remove();
          photoBlock.remove();
        } else {
          photo.remove();
        }
      }
    });
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
    if (!photoItem) {
      var photoPreview = document.createElement('img');

      photoPreview.setAttribute('width', PREVIEW_WIDTH);
      photoPreview.setAttribute('height', PREVIEW_HEIGHT);

      photoPreviewBlock.appendChild(photoPreview);
      photoItem = true;
    } else {
      var newPhotoPreviewBlock = photoPreviewBlock.cloneNode(true);
      photoContainer.appendChild(newPhotoPreviewBlock);
      photoPreview = newPhotoPreviewBlock.querySelector('img');
    }

    if (filePhoto && checkType(filePhoto)) {
      uploadPreview(filePhoto, photoPreview);
    }
  });

  window.photos = {
    clearAvatar: clearAvatar,
    clearPhotos: clearPhotos
  };

})();
