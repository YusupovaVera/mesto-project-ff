// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCardElement(cardData, deleteCallback) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const elementImage = cardElement.querySelector(".card__image");

  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // @todo: Функция удаления карточки
  deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCallback(cardElement));

  return cardElement;
}

function deleteCallback(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (cardData) {
  placesList.append(createCardElement(cardData, deleteCallback));
});
