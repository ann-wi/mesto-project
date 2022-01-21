import { openPopUp, closePopUp } from "./utils";
import { profile, profileName } from "./modal";
import { putCardLike, deleteCardLike } from "./api";

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
    console.log("something has like");
  }

  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("card__like-button_active")) {
      deleteCardLike(obj, likeButton, likeNumber);
      likeNumber.textContent = obj["likes"].length;
    } else {
      putCardLike(obj, likeButton, likeNumber);
      likeNumber.textContent = obj["likes"].length;
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

    cardElement.appendChild(cardTrashButton);
  }

  return cardElement;
}

//func for likes
//setLikesInfo(likesData) {//
//  if(like)
//}

//api part
//.then((data) => //
//  setLikesInfo(//obj)
//)

//obj = {
//  liked: data.likes.map(like => like._id).includes(profile_id),
//  likes: data.likes,
//}

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
  handleCardFormSubmit,
  renderCard,
  formNewCard,
  formNewCardImageInput,
  formNewCardHeadingInput,
};
