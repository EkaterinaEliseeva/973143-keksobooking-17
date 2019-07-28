'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  // функция загрузки данных с сервера
  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // добавление обработчика события load
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    // добавление обработчика события error
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    // добавление обработчика события timeout
    xhr.addEventListener('timeout', function () {
      onError('Запрос не был выполнен за ' + xhr.timeout + 'мс');
    });

    // установка таймаута
    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  // функция отправки данных на сервер
  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    // добавление обработчика события load
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка отправки объявления. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    // добавление обработчика события error
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    // добавление обработчика события timeout
    xhr.addEventListener('timeout', function () {
      onError('Запрос не был выполнен за ' + xhr.timeout + 'мс');
    });

    // установка таймаута
    xhr.timeout = TIMEOUT;

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.load = {
    load: load,
    upload: upload
  };

})();

