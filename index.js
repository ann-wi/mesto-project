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

  popUp.classList.remove("pop-up_opened");
}

form.addEventListener("submit", formSaveHandler);

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
