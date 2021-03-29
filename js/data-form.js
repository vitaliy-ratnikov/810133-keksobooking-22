import { PLACES_PRICE } from './data.js';
import { mainMarker, map, MAP_DEFAULT, mainForm, MAP_ZOOM, adressPosition } from './map.js';
import { sendData } from './api.js';

const placesType = document.querySelector('#type');
const placesPrice = document.querySelector('#price');
const timeCheckIn = document.querySelector('#timein');
const timeCheckOut = document.querySelector('#timeout');
const placeDescription = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');
const resetButtonSuccess = document.querySelector('.ad-form__reset');
const mainPart = document.querySelector('main');

const guestRoomCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;


placesType.addEventListener('change', function () {
  placesPrice.placeholder = PLACES_PRICE[placesType.value];
  placesPrice.min = PLACES_PRICE[placesType.value];

});

const syncCheckTime = function (selectedValue) {
  timeCheckIn.value = selectedValue;
  timeCheckOut.value = selectedValue;
}

timeCheckOut.addEventListener('change', function () {
  syncCheckTime(this.value);
});

timeCheckIn.addEventListener('change', function () {
  syncCheckTime(this.value);
});


placeDescription.addEventListener('input', function () {
  const inputLength = this.value.length;
  placeDescription.setCustomValidity('');

  if (inputLength < MIN_TITLE_LENGTH) {
    placeDescription.setCustomValidity('Необходимо ввести минимум 30 символов');
  }
  if (inputLength > MAX_TITLE_LENGTH) {
    placeDescription.setCustomValidity(`Удалите лишние ${inputLength - MAX_TITLE_LENGTH} симв.`);
  }

  placeDescription.reportValidity();
});


guestNumber.addEventListener('change', function () {
  const setUserChoice = this.value;

  guestNumber.setCustomValidity('');

  if (!guestRoomCapacity[roomNumber.value].includes(+setUserChoice)) {
    guestNumber.setCustomValidity('Количество комнат ограничено! Количество гостей не может быть больше количества комнат.');
  }
  guestNumber.reportValidity();
});


roomNumber.addEventListener('change', function () {
  const setUserChoice = this.value;

  roomNumber.setCustomValidity('');

  if (!guestRoomCapacity[setUserChoice].includes(+guestNumber.value)) {
    roomNumber.setCustomValidity('Количество комнат ограничено! Количество гостей не может быть больше количества комнат.');
  }
  roomNumber.reportValidity();
});




const templateFormSuccess = document.querySelector('#success')
  .content
  .querySelector('div');

const successMessage = function () {
  const cardElement = templateFormSuccess.cloneNode(true);

  mainPart.append(cardElement);

  document.addEventListener('keydown', function () {
    if (isEscEvent) {
      cardElement.remove();
    }
  });
  document.addEventListener('click', function () {
    cardElement.remove();
  });
}

const resetFunction = function () {
  mainForm.reset();
  mainMarker.setLatLng({ lat: MAP_DEFAULT.lat, lng: MAP_DEFAULT.lng });
  map.closePopup();
  map.setView([MAP_DEFAULT.lat, MAP_DEFAULT.lng], MAP_ZOOM);
  adressPosition.value = `${MAP_DEFAULT.lat} и ${MAP_DEFAULT.lng}`;
};



resetButtonSuccess.addEventListener('click', function (evt) {
  evt.preventDefault();
  resetFunction();
});


const isEscEvent = function (evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const templateFormError = document.querySelector('#error')
  .content
  .querySelector('div');

const errorMessage = function () {
  const cardElement = templateFormError.cloneNode(true);
  mainPart.append(cardElement);


  const errorButton = cardElement.querySelector('.error__button');

  errorButton.addEventListener('click', function () {
    cardElement.remove();
  });
  document.addEventListener('keydown', function () {
    if (isEscEvent) {
      cardElement.remove();
    }
  });
  document.addEventListener('click', function () {
    cardElement.remove();
  });
}


const setUserFormSubmit = function (onSuccess, onFail) {
  mainForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    sendData(
      () => onSuccess(resetFunction()),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

setUserFormSubmit(successMessage, errorMessage);


export { resetFunction };
