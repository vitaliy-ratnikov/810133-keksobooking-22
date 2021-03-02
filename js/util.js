export { getRandom, getRandomInt };

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
