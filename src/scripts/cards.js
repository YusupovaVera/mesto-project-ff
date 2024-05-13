const cardTemplate = document.querySelector("#card-template").content;

function createCardElement(cardData, deleteCard, likeCard, openImage) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const elementImage = cardElement.querySelector(".card__image");

  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;

  cardElement.querySelector(".card__title").textContent = cardData.name;

  // удалениe карточки
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  //Лайк карточки
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (evt) => likeCard(evt.target));

  elementImage.addEventListener("click", (evt) => openImage(evt));

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(currentButton) {
  currentButton.classList.toggle("card__like-button_is-active");
}

export { createCardElement, deleteCard, likeCard };
