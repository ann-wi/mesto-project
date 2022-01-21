import { openPopUp, closePopUp } from "./utils";
import { profile, profileName } from "./modal";
import { putCardLike, deleteCardLike, deleteCard } from "./api";

const formNewCard = document.querySelector(".form_type_new-card");
const formNewCardHeadingInput = formNewCard.querySelector(
  ".form__item_heading"
);
const formNewCardImageInput = formNewCard.querySelector(".form__item_image");
const formNewCardSubmitButton = formNewCard.querySelector(".form__save-button");

const popUpNewCard = document.querySelector(".pop-up_type_new-card");
const cardsContainer = document.querySelector(".cards");
const profileAddButton = profile.querySelector(".profile__add-button");

const popUpCard = document.querySelector(".pop-up_type_card");
const popUpImage = popUpCard.querySelector(".pop-up__image");
const popUpCaption = popUpCard.querySelector(".pop-up__caption");

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

  if (cardLikes.find((like) => like.name === profileName.textContent)) {
    likeButton.classList.add("card__like-button_active");
  }

  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("card__like-button_active")) {
      deleteCardLike(obj, likeButton, likeNumber);
    } else {
      putCardLike(obj, likeButton, likeNumber);
    }
  });

  cardImage.addEventListener("click", function () {
    popUpImage.src = imageLink;
    popUpImage.alt = titleValue;
    popUpCaption.textContent = titleValue;
    openPopUp(popUpCard);
  });

  if (obj["owner"]["name"] === profileName.textContent) {
    const cardTrashButton = document.createElement("button");

    cardTrashButton.classList.add("card__trash-button");
    cardTrashButton.setAttribute("type", "button");

    cardTrashButton.addEventListener("click", function () {
      deleteCard(obj, cardElement);
    });

    cardElement.appendChild(cardTrashButton);
  }

  return cardElement;
}

//Adding card to container
function renderCard(obj, container) {
  const newCard = createCard(obj.link, obj.name, obj);

  container.prepend(newCard);
}

//Submit new card button
function handleCardFormSubmit(event) {
  event.preventDefault();

  const inputs = {
    name: formNewCardHeadingInput.value,
    link: formNewCardImageInput.value,
  };

  renderCard(inputs, cardsContainer);

  formNewCard.reset();

  formNewCardSubmitButton.classList.add("form__save-button_inactive");
  formNewCardSubmitButton.setAttribute("disabled", "");

  closePopUp(popUpNewCard);
}

export {
  popUpNewCard,
  cardsContainer,
  profileAddButton,
  handleCardFormSubmit,
  renderCard,
  formNewCard,
  formNewCardImageInput,
  formNewCardHeadingInput,
  formNewCardSubmitButton,
};
