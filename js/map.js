/* global L:readonly */
import { sendData } from './api.js';
import { showErrorAlert, showSuccessAlert } from './alertError.js';
import { resetMapFilters, mapFilters, pins } from './filter.js';

const mainForm = document.querySelector('.ad-form');
const formElements = mainForm.querySelectorAll('fieldset');
const filterFeatures = mapFilters.querySelector('fieldset');
const adressPosition = document.querySelector('#address');

const MAP_ZOOM = 12;
const MAP_DEFAULT = {
  lat: 35.652832,
  lng: 139.839478,
};



mainForm.classList.add('ad-form--disabled');
for (let formElement of formElements) {
  formElement.setAttribute('disabled', 'disabled');
}
mapFilters.classList.add('ad-form--disabled');
filterFeatures.setAttribute('disabled', 'disabled');
const mapSelectForms = mapFilters.querySelectorAll('select');
for (let mapSelectForm of mapSelectForms) {
  mapSelectForm.setAttribute('disabled', 'disabled');
}



const map = L.map('map-canvas')
  .on('load', function () {
    mainForm.classList.remove('ad-form--disabled');
    for (const formElement of formElements) {
      formElement.removeAttribute('disabled', 'disabled');
    }

    mapFilters.classList.remove('ad-form--disabled');
    filterFeatures.removeAttribute('disabled', 'disabled');
    for (const mapSelectForm of mapSelectForms) {
      mapSelectForm.removeAttribute('disabled', 'disabled');
    }

  })
  .setView([MAP_DEFAULT.lat, MAP_DEFAULT.lng], MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinMarker = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinMarker = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: MAP_DEFAULT.lat,
    lng: MAP_DEFAULT.lng,
  },
  {
    draggable: true,
    icon: mainPinMarker,
  },
);

mainMarker.addTo(map);

adressPosition.value = `${map._lastCenter.lat} и ${map._lastCenter.lng}`;
mainMarker.on('moveend', function () {
  const move = this.getLatLng();
  const x = move.lng.toFixed(5);
  const y = move.lat.toFixed(5);
  adressPosition.value = `${x} и ${y}`;
});

pins.addTo(map);


const setUserFormSubmit = function (onSuccess) {
  mainForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    sendData(
      function () {
        mainForm.reset();
        onSuccess();
        showSuccessAlert();
      },
      () => {
        showErrorAlert();
      },
      new FormData(evt.target),
    );
  });
};

const userFormResetHandler = function (handler) {
  mainForm.addEventListener('reset', function () {
    resetMapFilters();
    handler();
  })
};







export {
  setUserFormSubmit,
  userFormResetHandler,
  MAP_DEFAULT,
  mainMarker,
  map,
  mainForm,
  adressPosition,
  MAP_ZOOM,
  pinMarker
};

