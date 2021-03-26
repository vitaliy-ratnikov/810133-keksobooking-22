import { PLACES_PRICE } from './data.js';

const placesType = document.querySelector('#type');
const placesPrice = document.querySelector('#price');
const timeCheckIn = document.querySelector('#timein');
const timeCheckOut = document.querySelector('#timeout');

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
