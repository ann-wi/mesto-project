//close open pop-up
function openPopUp(popup) {
  popup.classList.add("pop-up_opened");
}

function closePopUp(popup) {
  popup.classList.remove("pop-up_opened");
}

//closebutton
const popUp = document.querySelector(".pop-up");
const popUpCloseButton = popUp.querySelector(".pop-up__close-button"); //does't work for new card

popUpCloseButton.addEventListener("click", function () {
  closePopUp(popUp);
});

//profile
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");

const form = document.querySelector(".form");
const nameInput = form.querySelector(".form__item_name");
const occupationInput = form.querySelector(".form__item_occupation");

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

form.addEventListener("submit", formSaveHandler);

const popUpProfile = document.querySelector(".pop-up_type_profile");

profileEditButton.addEventListener("click", function () {
  openPopUp(popUpProfile);
});

//new card pop-up
const popUpNewCard = document.querySelector(".pop-up_type_new-card");
const profileAddButton = profile.querySelector(".profile__add-button");

profileAddButton.addEventListener("click", function () {
  openPopUp(popUpNewCard);
});

//card like
const card = document.querySelector(".card");
const likeButton = card.querySelector(".card__like-button");

likeButton.addEventListener("click", function (event) {
  event.target.classList.toggle("card__like-button_active");
});

//remove card

//get initial cards from array

//create card

//pop-up image
//make card images links

const initialCards = [
  {
    name: "Осака",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
