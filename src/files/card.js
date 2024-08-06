import { deleteCardFromServer, addRemoveLike } from "../files/api.js";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, currentUserIDd, deleteCard, likeCard, openImage) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const elementImage = cardElement.querySelector(".card__image");

  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__likes").textContent = cardData.likes.length;
  cardElement.querySelector(".card__id").textContent = cardData._id;

  if (cardData.owner._id === currentUserIDd) {
    deleteButton.addEventListener("click", () => deleteCard(cardElement));
  } else {
    deleteButton.classList.add("card__delete-button-hidden");
  }

  //Лайк карточки
  const likeButton = cardElement.querySelector(".card__like-button");
  if (checkLike(currentUserIDd, cardData.likes)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", (evt) => likeCard(evt.target));

  elementImage.addEventListener("click", (evt) => openImage(evt));

  return cardElement;
}

function deleteCard(cardElement) {
  deleteCardFromServer(cardElement.querySelector(".card__id").textContent)
    .then(cardElement.remove())
    .catch((err) => {
      console.error(err);
    });
}

function likeCard(currentButton) {
  const addLike = !currentButton.classList.contains(
    "card__like-button_is-active"
  );
  const card = currentButton.closest(".card");
  addRemoveLike(card.querySelector(".card__id").textContent, addLike)
    .then((cardData) => {
      card.querySelector(".card__likes").textContent = cardData.likes.length;
      currentButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.error(err);
    });
}

function checkLike(userId, likeArray) {
  let hasUserLike = false;
  likeArray.forEach((element) => {
    if (element._id == userId) {
      hasUserLike = true;
      return hasUserLike;
    }
  });
  return hasUserLike;
}

export { createCard, deleteCard, likeCard };
