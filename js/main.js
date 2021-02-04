const getRandomMinMaxInt = function (min, max) {
  let minInt = Math.ceil(min);
  let maxInt = Math.floor(max);
  if (maxInt < minInt) {
    alert('Wrong number');
    return getRandomMinMaxInt(maxInt, minInt);
  }
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}

alert(getRandomMinMaxInt(0, -7));

const getRandomInt = function (min, max, digits) {
  return (min + Math.random() * (max - min)).toFixed(digits);
}

alert(getRandomInt(0.006, 0.03, 3));


