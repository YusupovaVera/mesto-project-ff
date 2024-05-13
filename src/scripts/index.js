import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";
import { createCardElement } from "../scripts/cards.js";
import { deleteCard } from "../scripts/cards.js";
import { likeCard } from "../scripts/cards.js";
import { openModal } from "../scripts/modal.js";
import { closeModal } from "../scripts/modal.js";

const cardsContainer = document.querySelector(".places__list");

const profileTitle = document.querySelector(".profile__title");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileDescription = document.querySelector(".profile__description");
const profileAddButton = document.querySelector(".profile__add-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const formElementEdit = document.forms["edit-profile"];
const nameInput = formElementEdit.elements.name;
const jobInput = formElementEdit.elements.description;``

const formElementNewCard = document.forms["new-place"];
const placeNameInput = formElementNewCard.elements["place-name"];
const linkInput = formElementNewCard.elements.link;

initialCards.forEach(function (cardData) {
  cardsContainer.append(
    createCardElement(cardData, deleteCard, likeCard, openImage)
  );
});

//добавляем обработчик клика
profileEditButton.addEventListener("click", function (evt) {
  // отменим стандартное поведение браузера
  evt.preventDefault();

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupTypeEdit);
});

//добавляем обработчик клика
profileAddButton.addEventListener("click", function (evt) {
  // отменим стандартное поведение браузера
  evt.preventDefault();

  openModal(popupTypeNewCard);
});

formElementEdit.addEventListener("submit", processFormEditSubmit);
formElementNewCard.addEventListener("submit", processFormNewCardSubmit);

function processFormEditSubmit(evt) {
  // отменим стандартное поведение браузера
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupTypeEdit);
}

function processFormNewCardSubmit(evt) {
  // отменим стандартное поведение браузера
  evt.preventDefault();

  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  cardsContainer.prepend(
    createCardElement(newCard, deleteCard, likeCard, openImage)
  );

  formElementNewCard.reset();

  closeModal(popupTypeNewCard);
}

function openImage(evt) {
  // отменим стандартное поведение браузера
  evt.preventDefault();

  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;

  openModal(popupTypeImage);
}
