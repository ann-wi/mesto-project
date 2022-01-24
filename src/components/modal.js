import { closePopUp } from "./utils";
import { changeProfileInfo, changeProfileAvatar } from "./api";

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

function handleProfileFormSubmit(event) {
  event.preventDefault();

  changeProfileInfo(nameInput, occupationInput)
    .then((data) => {
      profileName.textContent = data.name;
      profileOccupation.textContent = data.about;

      formProfileSubmitButton.classList.remove("form__save-button_inactive");
      formProfileSubmitButton.removeAttribute("disabled");
    })
    .then(() => loadForm(formProfileInfo))
    .then(() => closePopUp(popUpProfile))
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formProfileSubmitButton.textContent = "Сохранить";
    });
}

function handleAvatarFormSubmit(event) {
  event.preventDefault();

  changeProfileAvatar(avatarInput)
    .then((data) => {
      profileAvatar.src = data.avatar;

      formAvatar.reset();

      formAvatarSubmitButton.classList.add("form__save-button_inactive");
      formAvatarSubmitButton.setAttribute("disabled", "");
    })
    .then(() => loadForm(formAvatar))
    .then(() => closePopUp(popUpAvatar))
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formAvatarSubmitButton.textContent = "Сохранить";
    });
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
  profileEditButton,
  profile,
  popUpProfile,
  popUpAvatar,
  formAvatar,
  handleAvatarFormSubmit,
  handleProfileFormSubmit,
  profileEditAvatarButton,
  formAvatarSubmitButton,
};
