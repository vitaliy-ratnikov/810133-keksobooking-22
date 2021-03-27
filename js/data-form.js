import { PLACES_PRICE } from './data.js';

const placesType = document.querySelector('#type');
const placesPrice = document.querySelector('#price');
const timeCheckIn = document.querySelector('#timein');
const timeCheckOut = document.querySelector('#timeout');
const placeDescription = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');

const guestRoomCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
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


placeDescription.addEventListener('change', function() {
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


guestNumber.addEventListener('change', function() {
  const setUserChoice = this.value;

  guestNumber.setCustomValidity('');

  if (!guestRoomCapacity[roomNumber.value].includes(setUserChoice)) {
    guestNumber.setCustomValidity('Количество комнат ограничено! Количество гостей не может быть больше количества комнат.');
  }
  guestNumber.reportValidity();
});


roomNumber.addEventListener('change', function() {
  const setUserChoice = this.value;

  roomNumber.setCustomValidity('');

  if (!guestRoomCapacity[setUserChoice].includes(guestNumber.value)) {
    roomNumber.setCustomValidity('Количество комнат ограничено! Количество гостей не может быть больше количества комнат.');
  }
  roomNumber.reportValidity();
});

