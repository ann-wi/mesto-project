const popUp = document.querySelectorAll(".pop-up");

const popUpCloseButton = document.querySelectorAll(".pop-up__close-button");

function openPopUp(popup) {
  popup.classList.add("pop-up_opened");
}

function closePopUp(popup) {
  popup.forEach((elem) => {
    elem.classList.remove("pop-up_opened");
  });
}

popUpCloseButton.forEach((item) => {
  item.addEventListener("click", (event) => {
    closePopUp(popUp);
  });
});

//edit profile
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const popUpProfile = document.querySelector(".pop-up_type_profile");

const formProfileInfo = document.querySelector(".form_type_profile-info");
const nameInput = formProfileInfo.querySelector(".form__item_name");
const occupationInput = formProfileInfo.querySelector(".form__item_occupation");

function formSaveHandler(event) {
  event.preventDefault();

  const nameInputValue = nameInput.value;
  const occupationInputValue = occupationInput.value;

  const profileName = profile.querySelector(".profile__name");
  const profileOccupation = profile.querySelector(".profile__occupation");

  profileName.textContent = nameInputValue;
  profileOccupation.textContent = occupationInputValue;

  closePopUp(popUp);
}

formProfileInfo.addEventListener("submit", formSaveHandler);

profileEditButton.addEventListener("click", function () {
  openPopUp(popUpProfile);
});

const popUpCard = document.querySelector(".pop-up_type_card");
const popUpImage = popUpCard.querySelector(".pop-up__image");
const popUpCaption = popUpCard.querySelector(".pop-up__caption");

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
      popUpCaption.textContent = titleValue;
      openPopUp(popUpCard);
    });
  //
  return cardElement;
}

const cardsContainer = document.querySelector(".cards");

function renderCard(obj, container) {
  const newCard = createCard(obj.link, obj.name);

  container.append(newCard);
}

const profileAddButton = profile.querySelector(".profile__add-button");
const popUpNewCard = document.querySelector(".pop-up_type_new-card");
const formNewCard = document.querySelector(".form_type_new-card");

function formAddHandler(event) {
  event.preventDefault();

  const inputs = {
    name: formNewCard.querySelector(".form__item_heading").value,
    link: formNewCard.querySelector(".form__item_image").value,
  };

  const addedCard = renderCard(inputs, cardsContainer);

  closePopUp(popUp);
}

formNewCard.addEventListener("submit", formAddHandler);

profileAddButton.addEventListener("click", function () {
  openPopUp(popUpNewCard);
});

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
