'use strict';
(function () {
  var adForm = window.util.adForm;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PREVIEW_SIZE = '100%';

  var avatarField = adForm.querySelector('.ad-form-header__input');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview').querySelector('img');
  var defaultAvatar = avatarPreview.src;
  var photoField = adForm.querySelector('.ad-form__input');
  var photoContainer = adForm.querySelector('.ad-form__photo-container');
  var isPhotoItem = false;
  var fileAvatar;

  // проверка типов
  var checkType = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  // удаление аватара
  var clearAvatar = function () {
    avatarPreview.src = defaultAvatar;
    fileAvatar = null;
  };

  // удаление фотографий
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
    isPhotoItem = false;
  };

  // добавление ссылки на загруженное изображение в превью
  var uploadPreview = function (file, preview) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      preview.setAttribute('src', reader.result);
    });

    reader.readAsDataURL(file);
  };

  // добавление фото в блок
  var createPhotoItem = function (photoPreviewBlock, filePhoto) {

    var photoPreview = document.createElement('img');

    photoPreview.setAttribute('width', PREVIEW_SIZE);

    photoPreview.setAttribute('height', PREVIEW_SIZE);

    photoPreviewBlock.appendChild(photoPreview);

    uploadPreview(filePhoto, photoPreview);
  };

  // создание нового блока для фото
  var createPhotoPreviewBlock = function () {
    var newPhotoPreviewBlock = document.createElement('div');

    newPhotoPreviewBlock.classList.add('ad-form__photo');

    return newPhotoPreviewBlock;
  };

  // загрузка превью фотографий
  var uploadPhotos = function (photos) {

    // блок для вставки превью
    var photoPreviewBlock = adForm.querySelector('.ad-form__photo');

    // преобразование полученного списка фотографий в массив
    var filesPhoto = Array.prototype.slice.call(photos);

    filesPhoto.forEach(function (filePhoto) {

      // проверка соответствия типов
      if (filePhoto && checkType(filePhoto)) {

        // проверка есть ли загруженные фото
        if (!isPhotoItem) {

          // добавление фото в существующий блок
          createPhotoItem(photoPreviewBlock, filePhoto);
          isPhotoItem = true;

        } else {
          // создание нового блока для фото
          photoPreviewBlock = createPhotoPreviewBlock();

          // добавление нового блока в разметку
          photoContainer.appendChild(photoPreviewBlock);

          // добавление фото в блок
          createPhotoItem(photoPreviewBlock, filePhoto);

          isPhotoItem = true;
        }
      }
    });
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

    uploadPhotos(photoField.files);

  });

  window.photos = {
    clearAvatar: clearAvatar,
    clearPhotos: clearPhotos
  };

})();
