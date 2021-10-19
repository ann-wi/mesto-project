const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");

const popUp = document.querySelector(".pop-up");
const popUpCloseButton = popUp.querySelector(".pop-up__close-button");

profileEditButton.addEventListener("click", function () {
  popUp.classList.add("pop-up_opened");
});

popUpCloseButton.addEventListener("click", function () {
  popUp.classList.remove("pop-up_opened");
});

const profileAddButton = profile.querySelector(".profile__add-button");

profileAddButton.addEventListener("click", function () {
  popUp.classList.add("pop-up_opened");
});

const card = document.querySelector(".card");
const likeButton = card.querySelector(".card__like-button");

likeButton.addEventListener("click", function (event) {
  event.target.classList.toggle("card__like-button_active");
});
