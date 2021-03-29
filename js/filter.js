/* global L:readonly */
/* global _:readonly */
import { showErrorAlert } from './alertError.js';
import { getData } from './api.js';
import { pinMarker } from './map.js';
import { getBaloonContent } from './data.js';


const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingPrice = mapFilters.querySelector('#housing-price');
const ANY = 'any';
const SIMILAR_ADVERT_COUNT = 10;
const RERENDER_DELAY = 500;
const priceValues = {
  START: 10000,
  FINAL: 50000,
};


const pins = L.layerGroup([]);



const resetMapFilters = function () {
  mapFilters.reset();
}

const createFeaturesArray = function () {
  const housingFeaturesChecked = mapFilters.querySelectorAll('.map__features input[name="features"]:checked');
  const checkedFeatures = Array.from(housingFeaturesChecked);
  const featuresCheckedArray = [];
  for (let i = 0; i <= checkedFeatures.length - 1; i++) {
    const ad = checkedFeatures[i].value;
    featuresCheckedArray.push(ad);
  }
  return featuresCheckedArray;
};

const applyFilter = function () {
  getData(
    function (similarDatas) {
      let setFiter = _.debounce(function () {
        renderSimilarList(similarDatas)
      }, RERENDER_DELAY);
      setFiter();


    },
    function (message) { showErrorAlert(message) },

  );
};
applyFilter();

mapFilters.addEventListener('change', function () {
  pins.clearLayers();
  applyFilter();

});

const renderSimilarList = function (adverts) {

  const filterAdData = function (el) {
    let isType = true;
    let isPrice = true;
    let isGuest = true;
    let isRooms = true;
    let isFeature = true;
    const priceLimit = {
      middle: el.offer.price >= priceValues.START && el.offer.price <= priceValues.FINAL,
      low: el.offer.price < priceValues.START,
      high: el.offer.price >= priceValues.FINAL,
    };
    const checkedList = createFeaturesArray();

    if (housingType.value !== ANY) {
      isType = el.offer.type === housingType.value;
    }
    if (housingRooms.value !== ANY) {
      isRooms = el.offer.rooms.toString() === housingRooms.value;
    }
    if (housingGuests.value !== ANY) {
      isGuest = el.offer.guests.toString() === housingGuests.value;
    }
    if (housingPrice.value !== ANY) {
      isPrice = el.offer.price === priceLimit[housingPrice.value];
      isPrice = priceLimit[housingPrice.value];
    }
    if (housingGuests.value !== ANY) {
      isGuest = el.offer.guests.toString() === housingGuests.value;
    }
    if (checkedList.length > 0) {
      let i = 0;
      while (isFeature && i < checkedList.length) {
        isFeature = el.offer.features.includes(checkedList[i]);
        i++;
      }
    }
    return isType && isRooms && isGuest && isFeature && isPrice;
  };



  let ads = adverts.filter(filterAdData);

  ads
    .slice(0, SIMILAR_ADVERT_COUNT)
    .forEach(function (offer) {

      const iconUsual = L.icon({
        iconUrl: pinMarker.iconUrl,
        iconSize: pinMarker.iconSize,
        iconAnchor: pinMarker.iconAnchor,
      });

      const marker2 = L.marker(
        {
          lat: offer.location.lat,
          lng: offer.location.lng,
        },
        {
          iconUsual,
        },
      );

      marker2.bindPopup(
        getBaloonContent(offer),
      );
      pins.addLayer(marker2);
    });
};


export {
  resetMapFilters,
  mapFilters,
  pins
};

