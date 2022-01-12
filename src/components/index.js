import "../pages/index.css";
import { enableValidation } from "./validation";
import { openPopUp, closePopUp } from "./utils";
import {
  popUpsList,
  popUpCloseButtonsList,
  formProfileInfo,
  handleProfileFormSubmit,
  profileEditButton,
  popUpProfile,
  popUpAvatar,
  formAvatar,
  handleAvatarFormSubmit,
  profileEditAvatarButton,
} from "./modal";
import {
  popUpNewCard,
  cardsContainer,
  profileAddButton,
  initialCards,
  handleCardFormSubmit,
  renderCard,
  formNewCard,
} from "./card";

//close pop-up with overlay
popUpsList.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("pop-up")) {
      closePopUp(evt.target);
    }
  });
});

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

formNewCard.addEventListener("submit", handleCardFormSubmit);
profileAddButton.addEventListener("click", function () {
  openPopUp(popUpNewCard);
});

initialCards.forEach((elem) => {
  return renderCard(elem, cardsContainer);
});

enableValidation({
  formSelector: ".form",
  formInputSelector: ".form__item",
  itemErrorSelector: "form__item_type_error",
  activeErrorSelector: "form__item-error_active",
  saveButtonSelector: ".form__save-button",
  inactiveButtonSelector: "form__save-button_inactive",
});
