'use strict';
(function () {
  var PIN_HEIGHT = 65;
  var PIN_WIDTH = 65;

  var isActivePage = false;
  var mapPins = window.util.mapPins;
  var pinMain = window.util.pinMain;

  // перетаскивание метки
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // активация страницы при первом перетаскивании/нажатии
    if (!isActivePage) {
      window.activate.activatePage();
      isActivePage = true;
    }

    // начальные координаты метки
    var startCoords = {
      x: evt.clientX + PIN_WIDTH / 2,
      y: evt.clientY + PIN_HEIGHT
    };
    // установка начальных координат в поле формы
    window.form.setAddress(startCoords.x, startCoords.y);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // границы перетаскивания
      var mapLimits = {
        top: 130,
        right: mapPins.offsetWidth + mapPins.offsetLeft - PIN_WIDTH / 2,
        bottom: 630,
        left: mapPins.offsetLeft - PIN_WIDTH / 2
      };
      // перемещение метки
      var shift = {
        x: startCoords.x - (moveEvt.clientX + PIN_WIDTH / 2),
        y: startCoords.y - (moveEvt.clientY + PIN_HEIGHT)
      };
      // координаты перемещенной метки
      var newCoords = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };
      // проверка выхода за ограничения
      if (newCoords.x > mapLimits.right) {
        newCoords.x = mapLimits.right;
      } else if (newCoords.x < mapLimits.left) {
        newCoords.x = mapLimits.left;
      }

      if (newCoords.y < mapLimits.top) {
        newCoords.y = mapLimits.top;
      } else if (newCoords.y > mapLimits.bottom) {
        newCoords.y = mapLimits.bottom;
      }

      startCoords = {
        x: moveEvt.clientX + PIN_WIDTH / 2,
        y: moveEvt.clientY + PIN_HEIGHT
      };

      pinMain.style.top = newCoords.y + 'px';
      pinMain.style.left = newCoords.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      // утстановка новых координат в поле формы
      window.form.setAddress(startCoords.x, startCoords.y);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
