import "../pages/index.css";
import { enableValidation } from "./validation";
import { openPopUp, closePopUp } from "./utils";
import {
  popUpsList,
  popUpCloseButtonsList,
  closePopUpsESC,
  formProfileInfo,
  formSaveHandler,
  profileEditButton,
  popUpProfile,
  popUpAvatar,
  formAvatar,
  formSaveAvatar,
  profileEditAvatarButton,
} from "./modal";
import {
  popUpNewCard,
  cardsContainer,
  profileAddButton,
  initialCards,
  formAddHandler,
  renderCard,
  formNewCard,
} from "./card";

window.addEventListener("keydown", closePopUpsESC);

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

formProfileInfo.addEventListener("submit", formSaveHandler);
profileEditButton.addEventListener("click", function () {
  openPopUp(popUpProfile);
});

formAvatar.addEventListener("submit", formSaveAvatar);
profileEditAvatarButton.addEventListener("click", function () {
  openPopUp(popUpAvatar);
});

formNewCard.addEventListener("submit", formAddHandler);
profileAddButton.addEventListener("click", function () {
  openPopUp(popUpNewCard);
});

initialCards.forEach((elem) => {
  return renderCard(elem, cardsContainer);
});

enableValidation();
