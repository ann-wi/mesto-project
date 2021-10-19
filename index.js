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
