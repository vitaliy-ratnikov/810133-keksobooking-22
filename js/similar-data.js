import { TYPES_HOUSES } from './data.js';


const getBaloonContent = function (offerData) {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offerData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offerData.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offerData.offer.price} Р/ночь`;
  cardElement.querySelector('.popup__type').textContent = TYPES_HOUSES[offerData.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offerData.offer.rooms} комнаты для ${offerData.offer.guests} гостей.`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offerData.offer.checkin}, выезд до ${offerData.offer.checkout}.`;
  cardElement.querySelector('.popup__avatar').src = offerData.autor.avatar;

  const cardElementFeatures = cardElement.querySelector('.popup__features');
  const cardElementFeature = cardElement.querySelector('.popup__feature');

  offerData.offer.features.forEach(function (feature) {
    cardElementFeatures.innerHTML = '';
    const newElementFeature = cardElementFeature.cloneNode(true);
    newElementFeature.className = (`popup__feature popup__feature--${feature}`);
    cardElementFeatures.appendChild(newElementFeature);
  });

  cardElement.querySelector('.popup__description').textContent = offerData.offer.description;

  const cardElementPhotos = cardElement.querySelector('.popup__photos');
  if (offerData.offer.photos.length === 0) {
    cardElementPhotos.remove();
  }
  else {
    const cardElementPhoto = cardElement.querySelector('.popup__photo');
    cardElementPhoto.src = offerData.offer.photos[0];
    if (offerData.offer.photos.length > 1) {
      for (let i = 1; i < offerData.offer.photos.length; i++) {
        const nextElementCardPhoto = cardElementPhoto.cloneNode(true);
        nextElementCardPhoto.src = offerData.offer.photos[i];
        cardElementPhoto.appendChild(nextElementCardPhoto);
      }
    }
  }
  return cardElement;
};


export { getBaloonContent };
