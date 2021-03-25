import { getRandom, getRandomInt } from './util.js'
const TYPES_PLACE = ['palace', 'flat', 'house', 'bungalow'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const FEATURES_PLACE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PLACES_PRICE =
{
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const TYPES_HOUSES = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

const getRandomList = function (possibleValues) {
  let length = getRandomInt(0, possibleValues.length - 1);
  let result = [];
  while (result.length < length) {
    let item = possibleValues[getRandomInt(0, possibleValues.length - 1)];

    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
}

let generateHomes = function (length) {
  let homes = [];


  for (let i = 0; i < length; i++) {
    let location = {
      x: getRandom(35.65000, 35.70000, 5),
      y: getRandom(139.70000, 139.80000, 5),
    }
    let dataObj = {
      autor: {
        avatar: `img/avatars/user0${getRandom(1, 8)}.png`,
      },
      offer: {
        title: 'Home',
        address: `Home ${location.x}, ${location.y}`,
        price: `${getRandomInt(1, 1000000000)}`,
        type: TYPES_PLACE[getRandomInt(0, TYPES_PLACE.length - 1)],
        rooms: `${getRandomInt(1, 10)}`,
        guests: `${getRandomInt(1, 10)}`,
        checkin: CHECKINS[getRandomInt(0, CHECKINS.length - 1)],
        checkout: CHECKOUTS[getRandomInt(0, CHECKOUTS.length - 1)],
        features: getRandomList(FEATURES_PLACE),
        description: 'Big house',
        photos: getRandomList(PHOTOS),
      },
      location: location,

    }

    homes.push(dataObj);

  }
  return homes;
}



export { getRandomList, generateHomes, TYPES_HOUSES, PLACES_PRICE };
