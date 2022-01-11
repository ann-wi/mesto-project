import { openPopUp, closePopUp } from "./utils";
import { profile } from "./modal";

const formNewCard = document.querySelector(".form_type_new-card");
const popUpNewCard = document.querySelector(".pop-up_type_new-card");
const cardsContainer = document.querySelector(".cards");
const profileAddButton = profile.querySelector(".profile__add-button");

const popUpCard = document.querySelector(".pop-up_type_card");
const popUpImage = popUpCard.querySelector(".pop-up__image");
const popUpCaption = popUpCard.querySelector(".pop-up__caption");

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

export {
  popUpNewCard,
  cardsContainer,
  profileAddButton,
  initialCards,
  formAddHandler,
  renderCard,
  formNewCard,
};
