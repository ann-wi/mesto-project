import "../pages/index.css";
import { enableValidation } from "./validation";
import { openPopUp, closePopUp } from "./utils";
import {
  popUpsList,
  popUpCloseButtonsList,
  formProfileInfo,
  profileName,
  profileOccupation,
  profileAvatar,
  profileEditButton,
  nameInput,
  occupationInput,
  formProfileSubmitButton,
  popUpProfile,
  popUpAvatar,
  formAvatar,
  profileEditAvatarButton,
  handleProfileFormSubmit,
  handleAvatarFormSubmit,
} from "./modal";
import {
  cardsContainer,
  renderCard,
  popUpNewCard,
  profileAddButton,
  formNewCard,
  handleNewCardSubmit,
} from "./card";
import { fetchUser, fetchCards } from "./api";

let userID;

//close pop-up with overlay
popUpsList.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("pop-up")) {
      closePopUp(evt.target);
    }
  });
});

//popUp close buttons
popUpCloseButtonsList.forEach((button) => {
  button.addEventListener("click", function (evt) {
    const popUp = button.closest(".pop-up");

    closePopUp(popUp);
  });
});

formProfileInfo.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", function () {
  openPopUp(popUpProfile);
});

formAvatar.addEventListener("submit", handleAvatarFormSubmit);
profileEditAvatarButton.addEventListener("click", function () {
  openPopUp(popUpAvatar);
});

formNewCard.addEventListener("submit", handleNewCardSubmit);
profileAddButton.addEventListener("click", function () {
  openPopUp(popUpNewCard);
});

//get user and cards
Promise.all([fetchUser, fetchCards])
  .then(([user, cards]) => {
    userID = user._id;

    cards.forEach((card) => {
      return renderCard(card, cardsContainer);
    });

    profileName.textContent = user.name;
    profileOccupation.textContent = user.about;
    profileAvatar.src = user.avatar;

    nameInput.value = user.name;
    occupationInput.value = user.about;

    formProfileSubmitButton.classList.remove("form__save-button_inactive");
    formProfileSubmitButton.removeAttribute("disabled");
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation({
  formSelector: ".form",
  formInputSelector: ".form__item",
  itemErrorSelector: "form__item_type_error",
  activeErrorSelector: "form__item-error_active",
  saveButtonSelector: ".form__save-button",
  inactiveButtonSelector: "form__save-button_inactive",
});

export { userID };
