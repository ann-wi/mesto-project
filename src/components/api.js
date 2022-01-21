import {
  renderCard,
  cardsContainer,
  formNewCardImageInput,
  formNewCardHeadingInput,
  formNewCard,
  popUpNewCard,
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

function loadInitialCards() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-6/cards", {
    method: "GET",
    headers: {
      authorization: "66513836-3591-419e-b6c4-3871ea4b7d14",
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((data) => {
        return renderCard(data, cardsContainer);
      });
    });
}

function loadProfileInfo() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-6/users/me", {
    method: "GET",
    headers: {
      authorization: "66513836-3591-419e-b6c4-3871ea4b7d14",
      "Content-Type": "application/json; charset=UTF-8",
    },
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
    });
}

function changeProfileInfo(event) {
  event.preventDefault();
  return fetch("https://nomoreparties.co/v1/plus-cohort-6/users/me", {
    method: "PATCH",
    body: JSON.stringify({
      name: nameInput.value,
      about: occupationInput.value,
    }),
    headers: {
      authorization: "66513836-3591-419e-b6c4-3871ea4b7d14",
      "Content-Type": "application/json; charset=UTF-8",
    },
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
    .then(closePopUp(popUpProfile));
}

function changeProfileAvatar(event) {
  event.preventDefault();
  return fetch("https://nomoreparties.co/v1/plus-cohort-6/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
    headers: {
      authorization: "66513836-3591-419e-b6c4-3871ea4b7d14",
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      profileAvatar.src = data.avatar;

      formAvatar.reset();

      formAvatarSubmitButton.classList.add("form__save-button_inactive");
      formAvatarSubmitButton.setAttribute("disabled", "");

      closePopUp(popUpAvatar);
    });
}

function postNewCard(event) {
  event.preventDefault();
  return fetch("https://nomoreparties.co/v1/plus-cohort-6/cards", {
    method: "POST",
    body: JSON.stringify({
      name: formNewCardHeadingInput.value,
      link: formNewCardImageInput.value,
    }),
    headers: {
      authorization: "66513836-3591-419e-b6c4-3871ea4b7d14",
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      renderCard(data, cardsContainer);

      formNewCard.reset();
      closePopUp(popUpNewCard);
    });
}

function putCardLike(obj, button, likeNum) {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-6/cards/likes/${obj._id}`,
    {
      method: "PUT",
      body: JSON.stringify(obj.owner),
      headers: {
        authorization: "66513836-3591-419e-b6c4-3871ea4b7d14",
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const numberLikes = data.likes.length;
      likeNum.textContent = numberLikes;
      console.log(numberLikes);

      button.classList.add("card__like-button_active");
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCardLike(obj, button, likeNum) {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-6/cards/likes/${obj._id}`,
    {
      method: "DELETE",
      headers: {
        authorization: "66513836-3591-419e-b6c4-3871ea4b7d14",
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const numberLikes = data.likes.length;
      likeNum.textContent = numberLikes;
      console.log(numberLikes);

      button.classList.remove("card__like-button_active");
    })
    .catch((err) => {
      console.log(err);
    });
}

fetch("https://nomoreparties.co/v1/plus-cohort-6/cards", {
  method: "GET",
  headers: {
    authorization: "66513836-3591-419e-b6c4-3871ea4b7d14",
    "Content-Type": "application/json; charset=UTF-8",
  },
})
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
  })
  .then((data) => {
    console.log(data);
  });

export {
  loadInitialCards,
  loadProfileInfo,
  changeProfileInfo,
  changeProfileAvatar,
  postNewCard,
  putCardLike,
  deleteCardLike,
};
