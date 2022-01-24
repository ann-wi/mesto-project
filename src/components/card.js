import { userID } from "./index";
import { openPopUp, closePopUp } from "./utils";
import { loadForm } from "./modal";
import { putCardLike, deleteCardLike, deleteCard, postNewCard } from "./api";

const formNewCard = document.querySelector(".form_type_new-card");
const formNewCardHeadingInput = formNewCard.querySelector(
  ".form__item_heading"
);
const formNewCardImageInput = formNewCard.querySelector(".form__item_image");
const formNewCardSubmitButton = formNewCard.querySelector(".form__save-button");

const popUpNewCard = document.querySelector(".pop-up_type_new-card");
const cardsContainer = document.querySelector(".cards");
const profileAddButton = document.querySelector(".profile__add-button");

const popUpCard = document.querySelector(".pop-up_type_card");
const popUpImage = popUpCard.querySelector(".pop-up__image");
const popUpCaption = popUpCard.querySelector(".pop-up__caption");

//PUT like
function handleCardLike(obj, button, likeNum) {
  putCardLike(obj, button, likeNum)
    .then((data) => {
      const numberLikes = data.likes.length;
      likeNum.textContent = numberLikes;

      button.classList.add("card__like-button_active");
    })
    .catch((err) => {
      console.log(err);
    });
}

//DELETE like
function handleDeleteCardLike(obj, button, likeNum) {
  deleteCardLike(obj, button, likeNum)
    .then((data) => {
      const numberLikes = data.likes.length;
      likeNum.textContent = numberLikes;

      button.classList.remove("card__like-button_active");
    })
    .catch((err) => {
      console.log(err);
    });
}

//DELETE card
function handleDeleteCard(obj, cardElem) {
  deleteCard(obj, cardElem)
    .then(() => {
      cardElem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Creating card with template
function createCard(imageLink, titleValue, obj) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.setAttribute("src", imageLink);
  cardImage.setAttribute("alt", titleValue);
  cardElement.querySelector(".card__title").textContent = titleValue;

  const likeNumber = cardElement.querySelector(".card__like-number");
  likeNumber.textContent = obj.likes.length;

  const cardLikes = obj.likes;

  if (cardLikes.find((like) => like._id == userID)) {
    likeButton.classList.add("card__like-button_active");
  }

  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("card__like-button_active")) {
      handleDeleteCardLike(obj, likeButton, likeNumber);
    } else {
      handleCardLike(obj, likeButton, likeNumber);
    }
  });

  cardImage.addEventListener("click", function () {
    popUpImage.src = imageLink;
    popUpImage.alt = titleValue;
    popUpCaption.textContent = titleValue;
    openPopUp(popUpCard);
  });

  if (obj["owner"]["_id"] == userID) {
    const cardTrashButton = document.createElement("button");

    cardTrashButton.classList.add("card__trash-button");
    cardTrashButton.setAttribute("type", "button");

    cardTrashButton.addEventListener("click", function () {
      handleDeleteCard(obj, cardElement);
    });

    cardElement.appendChild(cardTrashButton);
  }

  return cardElement;
}

//Adding card to container
function renderCard(obj, container) {
  const newCard = createCard(obj.link, obj.name, obj);

  formNewCardSubmitButton.classList.add("form__save-button_inactive");
  formNewCardSubmitButton.setAttribute("disabled", "");

  container.prepend(newCard);
}

function handleNewCardSubmit(event) {
  event.preventDefault();

  postNewCard(formNewCardHeadingInput, formNewCardImageInput)
    .then((data) => {
      renderCard(data, cardsContainer);

      formNewCard.reset();
    })
    .then(() => loadForm(formNewCard))
    .then(() => closePopUp(popUpNewCard))
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formNewCardSubmitButton.textContent = "Сохранить";
    });
}

export {
  popUpNewCard,
  cardsContainer,
  profileAddButton,
  renderCard,
  formNewCard,
  formNewCardImageInput,
  formNewCardHeadingInput,
  formNewCardSubmitButton,
  handleNewCardSubmit,
};
