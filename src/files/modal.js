//Функция открытия  модального окна
function openModal(popupOpen) {
  popupOpen.classList.add("popup_is-animated", "popup_is-opened");

  document.addEventListener("keydown", closePopupEsc);
  popupOpen.addEventListener("click", closePopupOverlayClick);
}

//Функция закрытия модального окна
function closeModal(popupClose) {
  popupClose.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closePopupEsc);
  popupClose.removeEventListener("click", closePopupOverlayClick);
  //removeEscapeHandler();
}

//Функция закрытия попапа нажатием на Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

//Функция закрытия попапа кликом на оверлей
function closePopupOverlayClick({ currentTarget, target }) {
  const popupCloseButton = currentTarget.querySelector(".popup__close");
  if (target === currentTarget || target === popupCloseButton) {
    closeModal(currentTarget);
  }
}

export { openModal, closeModal };
