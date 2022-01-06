import "../pages/index.css";

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileEditAvatarButton = profile.querySelector(
  ".profile__edit-avatar-button"
);

const formProfileInfo = document.querySelector(".form_type_profile-info");
const nameInput = formProfileInfo.querySelector(".form__item_name");
const occupationInput = formProfileInfo.querySelector(".form__item_occupation");

const popUpProfile = document.querySelector(".pop-up_type_profile");
const popUpNewCard = document.querySelector(".pop-up_type_new-card");
const popUpCard = document.querySelector(".pop-up_type_card");
const popUpAvatar = document.querySelector(".pop-up_type_avatar");

const formAvatar = document.querySelector(".form_type_profile-avatar");
const avatarInput = formAvatar.querySelector(".form__item_avatar");

const closePopUpProfile = popUpProfile.querySelector(".pop-up__close-button");
const closePopUpNewCard = popUpNewCard.querySelector(".pop-up__close-button");
const closePopUpCard = popUpCard.querySelector(".pop-up__close-button");
const closePopUpAvatar = popUpAvatar.querySelector(".pop-up__close-button");

const popUpImage = popUpCard.querySelector(".pop-up__image");
const popUpCaption = popUpCard.querySelector(".pop-up__caption");

const cardsContainer = document.querySelector(".cards");
const profileAddButton = profile.querySelector(".profile__add-button");
const formNewCard = document.querySelector(".form_type_new-card");

//Functions to open and close pop-ups and addind addEvtLists to close buttons
function openPopUp(popup) {
  popup.classList.add("pop-up_opened");
}

function closePopUp(popup) {
  popup.classList.remove("pop-up_opened");
}
/*
closePopUpProfile.addEventListener("click", function () {
  closePopUp(popUpProfile);
});

closePopUpNewCard.addEventListener("click", function () {
  closePopUp(popUpNewCard);
});

closePopUpCard.addEventListener("click", function () {
  closePopUp(popUpCard);
});

closePopUpAvatar.addEventListener("click", function () {
  closePopUp(popUpAvatar);
});
*/
//ESC for modal pop-ups
/*
const forms = Array.from(document.querySelectorAll(".form"));

forms.forEach((form) => {
  form.addEventListener("keydown", function (evt) {
    const popUp = form.closest(".pop-up");

    if (evt.key === "Escape") {
      closePopUp(popUp);
    }
  });
});
*/

//ESC for all pop-ups

const popUpsList = Array.from(document.querySelectorAll(".pop-up"));

function closePopUpsESC(evt) {
  popUpsList.forEach((popup) => {
    if (popup.classList.contains("pop-up_opened")) {
      closePopUp(popup);
    }
  });
}

window.addEventListener("keydown", closePopUpsESC);

//

const popUpCloseButtonsList = Array.from(
  document.querySelectorAll(".pop-up__close-button")
);

popUpCloseButtonsList.forEach((button) => {
  button.addEventListener("click", function (evt) {
    const popUp = button.closest(".pop-up");

    closePopUp(popUp);
  });
});

//Saving new profile info
function formSaveHandler(event) {
  event.preventDefault();

  const nameInputValue = nameInput.value;
  const occupationInputValue = occupationInput.value;

  const profileName = profile.querySelector(".profile__name");
  const profileOccupation = profile.querySelector(".profile__occupation");

  profileName.textContent = nameInputValue;
  profileOccupation.textContent = occupationInputValue;

  closePopUp(popUpProfile);
}

formProfileInfo.addEventListener("submit", formSaveHandler);

profileEditButton.addEventListener("click", function () {
  openPopUp(popUpProfile);
});

//Saving avatar
function formSaveAvatar(event) {
  event.preventDefault();

  const avatarInputValue = avatarInput.value;

  const profileAvatar = profile.querySelector(".profile__avatar");

  profileAvatar.src = avatarInputValue;

  formAvatar.reset();

  closePopUp(popUpAvatar);
}

formAvatar.addEventListener("submit", formSaveAvatar);

profileEditAvatarButton.addEventListener("click", function () {
  openPopUp(popUpAvatar);
});

//Creating card with template
function createCard(imageLink, titleValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").setAttribute("src", imageLink);
  cardElement.querySelector(".card__image").setAttribute("alt", titleValue);
  cardElement.querySelector(".card__title").textContent = titleValue;

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("card__like-button_active");
    });

  cardElement
    .querySelector(".card__trash-button")
    .addEventListener("click", function () {
      cardElement.remove();
    });

  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      popUpImage.src = imageLink;
      popUpImage.alt = titleValue;
      popUpCaption.textContent = titleValue;
      openPopUp(popUpCard);
    });

  return cardElement;
}

//Adding card to container
function renderCard(obj, container) {
  const newCard = createCard(obj.link, obj.name);

  container.prepend(newCard);
}

//Submit new card button
function formAddHandler(event) {
  event.preventDefault();

  const inputs = {
    name: formNewCard.querySelector(".form__item_heading").value,
    link: formNewCard.querySelector(".form__item_image").value,
  };

  renderCard(inputs, cardsContainer);

  formNewCard.reset();

  closePopUp(popUpNewCard);
}

formNewCard.addEventListener("submit", formAddHandler);

profileAddButton.addEventListener("click", function () {
  openPopUp(popUpNewCard);
});

//Array of cards and adding them to the page
const initialCards = [
  {
    name: "Осака",
    link: "https://images.unsplash.com/photo-1589451814294-26d36298ac22?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Замок Нойшванштайн",
    link: "https://images.unsplash.com/photo-1622281834944-bd3801342652?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
  },
  {
    name: "Алма-Ата",
    link: "https://images.unsplash.com/photo-1548450847-8a9a5cc3968f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1173&q=80",
  },
  {
    name: "Пекин",
    link: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Водопад Скоугафосс",
    link: "https://images.unsplash.com/photo-1634055633771-48a7a9d2464a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Хоккайдо",
    link: "https://images.unsplash.com/photo-1589218482020-ad16425f18eb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80",
  },
];

initialCards.forEach((elem) => {
  return renderCard(elem, cardsContainer);
});