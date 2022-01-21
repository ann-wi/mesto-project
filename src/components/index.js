import "../pages/index.css";
import { enableValidation } from "./validation";
import { openPopUp, closePopUp } from "./utils";
import {
  loadForm,
  popUpsList,
  popUpCloseButtonsList,
  formProfileInfo,
  profileEditButton,
  popUpProfile,
  popUpAvatar,
  formAvatar,
  profileEditAvatarButton,
} from "./modal";
import { popUpNewCard, profileAddButton, formNewCard } from "./card";
import {
  loadInitialCards,
  loadProfileInfo,
  changeProfileInfo,
  changeProfileAvatar,
  postNewCard,
} from "./api";

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

formProfileInfo.addEventListener("submit", changeProfileInfo);
profileEditButton.addEventListener("click", function () {
  openPopUp(popUpProfile);
});

formAvatar.addEventListener("submit", changeProfileAvatar);
profileEditAvatarButton.addEventListener("click", function () {
  openPopUp(popUpAvatar);
});

formNewCard.addEventListener("submit", postNewCard);
profileAddButton.addEventListener("click", function () {
  openPopUp(popUpNewCard);
});

loadInitialCards();
loadProfileInfo();

enableValidation({
  formSelector: ".form",
  formInputSelector: ".form__item",
  itemErrorSelector: "form__item_type_error",
  activeErrorSelector: "form__item-error_active",
  saveButtonSelector: ".form__save-button",
  inactiveButtonSelector: "form__save-button_inactive",
});
