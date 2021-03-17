import { generateHomes, typesHouses } from './data.js';

const similarData = generateHomes(1);



const similarListFragment = document.createDocumentFragment();

similarData.forEach(({ offer, autor }) => {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} Р/ночь`;
  cardElement.querySelector('.popup__type').textContent = typesHouses[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей.`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;
  cardElement.querySelector('.popup__avatar').src = autor.avatar;


  const cardElementFeatures = cardElement.querySelector('.popup__features');
  const cardElementFeature = cardElement.querySelector('.popup__feature');


  offer.features.forEach((feature) => {
    const newElementFeature = cardElementFeature.cloneNode(true);
    newElementFeature.className = (`popup__feature popup__feature--${feature}`);
    cardElementFeatures.appendChild(newElementFeature);
  });

  cardElement.querySelector('.popup__description').textContent = offer.description;

  const cardElementPhotos = cardElement.querySelector('.popup__photos');

  if (offer.photos.length === 0) {
    cardElementPhotos.remove();
  }
  else {
    const cardElementPhoto = cardElement.querySelector('.popup__photo');
    cardElementPhoto.src = offer.photos[0];

    if (offer.photos.length > 1) {
      for (let i = 1; i < offer.photos.length; i++) {
        const nextElementCardPhoto = cardElementPhoto.cloneNode(true);
        nextElementCardPhoto.src = offer.photos[i];
        cardElementPhoto.appendChild(nextElementCardPhoto);
      }
    }
  }

  similarListFragment.appendChild(cardElement);
});

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(similarListFragment);


