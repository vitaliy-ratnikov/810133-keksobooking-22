import { PLACES_PRICE } from './data.js';

const placesType = document.querySelector('#type');
const placesPrice = document.querySelector('#price');
const timeCheckIn = document.querySelector('#timein');
const timeCheckOut = document.querySelector('#timeout');

placesType.addEventListener('change', (event) => {
  event.target.value === placesType.value;
  placesPrice.placeholder = PLACES_PRICE[placesType.value];
  placesPrice.min = PLACES_PRICE[placesType.value];

});

timeCheckOut.addEventListener('change', () => {
  timeCheckIn.value = timeCheckOut.value;
});

timeCheckIn.addEventListener('change', () => {
  timeCheckOut.value = timeCheckIn.value;
});
