import { closePopUp } from "./utils";

const popUpsList = Array.from(document.querySelectorAll(".pop-up"));
const popUpCloseButtonsList = Array.from(
  document.querySelectorAll(".pop-up__close-button")
);

const popUpProfile = document.querySelector(".pop-up_type_profile");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileOccupation = profile.querySelector(".profile__occupation");
const profileEditButton = profile.querySelector(".profile__edit-button");

const formProfileInfo = document.querySelector(".form_type_profile-info");
const nameInput = formProfileInfo.querySelector(".form__item_name");
const occupationInput = formProfileInfo.querySelector(".form__item_occupation");
const formProfileSubmitButton =
  formProfileInfo.querySelector(".form__save-button");

const popUpAvatar = document.querySelector(".pop-up_type_avatar");
const profileEditAvatarButton = profile.querySelector(
  ".profile__edit-avatar-button"
);

const formAvatar = document.querySelector(".form_type_profile-avatar");
const avatarInput = formAvatar.querySelector(".form__item_avatar");
const profileAvatar = profile.querySelector(".profile__avatar");
const formAvatarSubmitButton = formAvatar.querySelector(".form__save-button");

//nameInput.value = profileName.textContent;
//occupationInput.value = profileOccupation.textContent;

function loadForm(form) {
  const submitButton = form.querySelector(".form__save-button");

  submitButton.textContent = "Сохранение...";
}

//ESC for all pop-ups
function closePopUpsESC(evt) {
  if (evt.key === "Escape") {
    popUpsList.forEach((popup) => {
      if (popup.classList.contains("pop-up_opened")) {
        closePopUp(popup);
      }
    });
  }
}

//Saving new profile info
function handleProfileFormSubmit(event) {
  event.preventDefault();

  const nameInputValue = nameInput.value;
  const occupationInputValue = occupationInput.value;

  profileName.textContent = nameInputValue;
  profileOccupation.textContent = occupationInputValue;

  closePopUp(popUpProfile);
}

//Saving avatar
function handleAvatarFormSubmit(event) {
  event.preventDefault();

  const avatarInputValue = avatarInput.value;

  profileAvatar.src = avatarInputValue;

  formAvatar.reset();

  formAvatarSubmitButton.classList.add("form__save-button_inactive");
  formAvatarSubmitButton.setAttribute("disabled", "");

  closePopUp(popUpAvatar);
}

export {
  loadForm,
  popUpsList,
  profileName,
  profileOccupation,
  nameInput,
  occupationInput,
  formProfileSubmitButton,
  avatarInput,
  profileAvatar,
  popUpCloseButtonsList,
  closePopUpsESC,
  formProfileInfo,
  handleProfileFormSubmit,
  profileEditButton,
  profile,
  popUpProfile,
  popUpAvatar,
  formAvatar,
  handleAvatarFormSubmit,
  profileEditAvatarButton,
  formAvatarSubmitButton,
};
