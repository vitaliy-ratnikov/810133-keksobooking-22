const getRandom = function (min, max, digits) {
  if (max < 0 || min < 0) {
    return alert('Number < 0');
  }
  if (max < min) {
    alert('Wrong number');
    return getRandom(max, min, digits);
  }
  return (min + Math.random() * (max - min)).toFixed(digits);
}
alert(getRandom(1, 6));


const getRandomInt = function (min, max) {
  return getRandom(Math.cell(min), Math.floor(max), 0);
}
alert(getRandomInt(1, 6));



