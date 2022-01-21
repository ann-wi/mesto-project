import {
  renderCard,
  cardsContainer,
  formNewCardImageInput,
  formNewCardHeadingInput,
  formNewCard,
  popUpNewCard,
  formNewCardSubmitButton,
} from "./card";
import {
  loadForm,
  popUpAvatar,
  profileAvatar,
  profileName,
  profileOccupation,
  nameInput,
  occupationInput,
  formProfileSubmitButton,
  formAvatar,
  formAvatarSubmitButton,
  avatarInput,
  popUpProfile,
  formProfileInfo,
} from "./modal";
import { closePopUp } from "./utils";

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "66513836-3591-419e-b6c4-3871ea4b7d14",
    "Content-Type": "application/json; charset=UTF-8",
  },
};

function loadInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((data) => {
        return renderCard(data, cardsContainer);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((data) => {
      profileName.textContent = data.name;
      profileOccupation.textContent = data.about;
      profileAvatar.src = data.avatar;

      nameInput.value = data.name;
      occupationInput.value = data.about;

      formProfileSubmitButton.classList.remove("form__save-button_inactive");
      formProfileSubmitButton.removeAttribute("disabled");
    })
    .catch((err) => {
      console.log(err);
    });
}

function changeProfileInfo(event) {
  event.preventDefault();
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: nameInput.value,
      about: occupationInput.value,
    }),
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((data) => {
      profileName.textContent = data.name;
      profileOccupation.textContent = data.about;

      formProfileSubmitButton.classList.remove("form__save-button_inactive");
      formProfileSubmitButton.removeAttribute("disabled");
    })
    .then(loadForm(formProfileInfo))
    .then(() => {
      formProfileSubmitButton.textContent = "Сохранить";
    })
    .then(closePopUp(popUpProfile))
    .catch((err) => {
      console.log(err);
    });
}

function changeProfileAvatar(event) {
  event.preventDefault();
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((data) => {
      profileAvatar.src = data.avatar;

      formAvatar.reset();

      formAvatarSubmitButton.classList.add("form__save-button_inactive");
      formAvatarSubmitButton.setAttribute("disabled", "");
    })
    .then(loadForm(formAvatar))
    .then(() => {
      formAvatarSubmitButton.textContent = "Сохранить";
    })
    .then(closePopUp(popUpAvatar))
    .catch((err) => {
      console.log(err);
    });
}

function postNewCard(event) {
  event.preventDefault();
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: formNewCardHeadingInput.value,
      link: formNewCardImageInput.value,
    }),
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((data) => {
      renderCard(data, cardsContainer);

      formNewCard.reset();
    })
    .then(loadForm(formNewCard))
    .then(() => {
      formNewCardSubmitButton.textContent = "Сохранить";
    })
    .then(closePopUp(popUpNewCard))
    .catch((err) => {
      console.log(err);
    });
}

function putCardLike(obj, button, likeNum) {
  return fetch(`${config.baseUrl}/cards/likes/${obj._id}`, {
    method: "PUT",
    body: JSON.stringify(obj.owner),
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((data) => {
      const numberLikes = data.likes.length;
      likeNum.textContent = numberLikes;

      button.classList.add("card__like-button_active");
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCardLike(obj, button, likeNum) {
  return fetch(`${config.baseUrl}/cards/likes/${obj._id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((data) => {
      const numberLikes = data.likes.length;
      likeNum.textContent = numberLikes;

      button.classList.remove("card__like-button_active");
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCard(obj, cardElem) {
  return fetch(`${config.baseUrl}/cards/${obj._id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => res.json())
    .then(() => {
      cardElem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export {
  loadInitialCards,
  loadProfileInfo,
  changeProfileInfo,
  changeProfileAvatar,
  postNewCard,
  putCardLike,
  deleteCardLike,
  deleteCard,
};
