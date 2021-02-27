const getRandom = function (min, max, digits) {
  if (max < 0 || min < 0) {
    return alert('Number < 0');
  }
  if (max < min) {
    alert('wrong number');
    return getRandom(max, min, digits);
  }
  return (min + Math.random() * (max - min)).toFixed(digits);
}

const getRandomInt = function (min, max) {
  return getRandom(Math.ceil(min), Math.floor(max), 0);
}

const TYPES_PLACE = ['palace', 'flat', 'house', 'bungalow'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const FEATURES_PLACE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


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

const generateHomes = function (length) {
  let homes = [];
  let location = {
    x: getRandom(35.65000, 35.70000, 5),
    y: getRandom(139.70000, 139.80000, 5),
  }

  for (let i = 0; i < length; i++) {

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

generateHomes(10);

