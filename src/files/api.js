const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-20",
  headers: {
    authorization: "2e325792-d081-485e-8e12-765b7431f3f7",
    "Content-Type": "application/json",
  }
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
  .then((res) => {
      return getFetchResult(res);
    });
};

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
  .then((res) => {
      return getFetchResult(res);
    });
};

function getInitialData() {
  return Promise.all([getUserData(), getInitialCards()]);
}

// Метод PATCH - обновление информации о пользователе
const updateUserData = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name: newName, about: newAbout }),
  })
  .then((res) => {
    return getFetchResult(res);
  });
};

// Метод POST - Добавление новой карточки
const createNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name: cardData.name, link: cardData.link }),
  })
  .then((res) => {
    return getFetchResult(res);
  });
};

// DELETE-запрос - удаление карточки
const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) => {
    return getFetchResult(res);
  });
};

// PUT-запрос - постановка и снятие лайка
const addRemoveLike = (cardId, addLike) => {
  const method = addLike == true ? "PUT" : "DELETE";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: `${method}`,
    headers: config.headers,
  })
  .then((res) => {
    return getFetchResult(res);
  });
};

// PATCH-запрос - обновление аватара пользователя
const updateAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: newAvatar }),
  }).then((res) => {
    return getFetchResult(res);
  });
};

function getFetchResult(res) {
  if (res.ok) {
    return res.json(); // возвращаем результат работы метода
  }
  return Promise.reject(`Ошибка:${res.status}`);
}

export { getInitialCards, getUserData, getInitialData, updateUserData, createNewCard, deleteCardFromServer, addRemoveLike, updateAvatar };