const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "66513836-3591-419e-b6c4-3871ea4b7d14",
    "Content-Type": "application/json; charset=UTF-8",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

//Promise.all for cards and user
const fetchCards = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
}).then(checkResponse);

const fetchUser = fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
}).then(checkResponse);

const getProfileAndCards = Promise.all([fetchUser, fetchCards]);

const changeProfileInfo = (nameInput, occupationInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: nameInput.value,
      about: occupationInput.value,
    }),
    headers: config.headers,
  }).then(checkResponse);
};

const changeProfileAvatar = (avatarInput) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
    headers: config.headers,
  }).then(checkResponse);
};

const postNewCard = (headingInput, imageInput) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: headingInput.value,
      link: imageInput.value,
    }),
    headers: config.headers,
  }).then(checkResponse);
};

const putCardLike = (obj, button, likeNum) => {
  return fetch(`${config.baseUrl}/cards/likes/${obj._id}`, {
    method: "PUT",
    body: JSON.stringify(obj.owner),
    headers: config.headers,
  }).then(checkResponse);
};

const deleteCardLike = (obj, button, likeNum) => {
  return fetch(`${config.baseUrl}/cards/likes/${obj._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

const deleteCard = (obj, cardElem) => {
  return fetch(`${config.baseUrl}/cards/${obj._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

export {
  getProfileAndCards,
  changeProfileInfo,
  changeProfileAvatar,
  postNewCard,
  putCardLike,
  deleteCardLike,
  deleteCard,
};
