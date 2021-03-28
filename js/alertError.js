const ALERT_SHOW_TIME = 5000;

const mainElement = document.querySelector('main');
const successMessageTemplateContent = document.querySelector('#success').content;
const errorMessageTemplateContent = document.querySelector('#error').content;

const showAlert = function (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.left = 0;
  alertContainer.style.zIndex = 1000;
  alertContainer.style.color = 'white';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(function () {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}



const onEscKeyDown = function (evt, onSuccess) {
  const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

  if (isEscKey) {
    onSuccess();
  }
};

const showSuccessAlert = function () {
  const successMessageElement = successMessageTemplateContent
    .querySelector('.success')
    .cloneNode(true);

  successMessageElement.style.zIndex = 1000;

  const removeElementWithListeners = function () {
    successMessageElement.remove();

    document.removeEventListener('keydown', onRemoveAfterKeyDown);
    document.removeEventListener('click', removeElementWithListeners);
  };

  const onRemoveAfterKeyDown = function (evt) {
    onEscKeyDown(evt, removeElementWithListeners);
  };

  document.addEventListener('keydown', onRemoveAfterKeyDown);
  document.addEventListener('click', removeElementWithListeners);

  mainElement.append(successMessageElement);
};

const showErrorAlert = function () {
  const errorMessageElement = errorMessageTemplateContent
    .querySelector('.error')
    .cloneNode(true);
  const errorButton = errorMessageElement.querySelector('.error__button');

  errorMessageElement.style.zIndex = 1000;

  const removeElementWithListeners = function () {
    errorMessageElement.remove();

    document.removeEventListener('keydown', onRemoveAfterKeyDown);
    document.removeEventListener('click', removeElementWithListeners);
    errorButton.removeEventListener('click', removeElementWithListeners);
  };

  const onRemoveAfterKeyDown = function (evt) {
    onEscKeyDown(evt, removeElementWithListeners);
  };

  document.addEventListener('keydown', onRemoveAfterKeyDown);
  document.addEventListener('click', removeElementWithListeners);
  errorButton.addEventListener('click', removeElementWithListeners);

  mainElement.append(errorMessageElement);
};




export {
  showAlert,
  showErrorAlert,
  showSuccessAlert
}
