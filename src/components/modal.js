import { closePopUp } from "./utils";

const popUpsList = Array.from(document.querySelectorAll(".pop-up"));
const popUpCloseButtonsList = Array.from(
  document.querySelectorAll(".pop-up__close-button")
);

const popUpProfile = document.querySelector(".pop-up_type_profile");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");

const formProfileInfo = document.querySelector(".form_type_profile-info");
const nameInput = formProfileInfo.querySelector(".form__item_name");
const occupationInput = formProfileInfo.querySelector(".form__item_occupation");

const popUpAvatar = document.querySelector(".pop-up_type_avatar");
const profileEditAvatarButton = profile.querySelector(
  ".profile__edit-avatar-button"
);

const formAvatar = document.querySelector(".form_type_profile-avatar");
const avatarInput = formAvatar.querySelector(".form__item_avatar");

//ESC for all pop-ups
function closePopUpsESC(evt) {
  popUpsList.forEach((popup) => {
    if (evt.key === "Escape" && popup.classList.contains("pop-up_opened")) {
      closePopUp(popup);
    }
  });
}

//Saving new profile info
function formSaveHandler(event) {
  event.preventDefault();

  const nameInputValue = nameInput.value;
  const occupationInputValue = occupationInput.value;

  const profileName = profile.querySelector(".profile__name");
  const profileOccupation = profile.querySelector(".profile__occupation");

  profileName.textContent = nameInputValue;
  profileOccupation.textContent = occupationInputValue;

  formProfileInfo.reset();

  closePopUp(popUpProfile);
}

//Saving avatar
function formSaveAvatar(event) {
  event.preventDefault();

  const avatarInputValue = avatarInput.value;

  const profileAvatar = profile.querySelector(".profile__avatar");

  profileAvatar.src = avatarInputValue;

  formAvatar.reset();

  closePopUp(popUpAvatar);
}

export {
  popUpsList,
  popUpCloseButtonsList,
  closePopUpsESC,
  formProfileInfo,
  formSaveHandler,
  profileEditButton,
  profile,
  popUpProfile,
  popUpAvatar,
  formAvatar,
  formSaveAvatar,
  profileEditAvatarButton,
};
