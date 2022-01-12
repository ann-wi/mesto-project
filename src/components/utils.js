import { closePopUpsESC } from "./modal";

//open and close pop ups
function openPopUp(popup) {
  popup.classList.add("pop-up_opened");

  window.addEventListener("keydown", closePopUpsESC);
}

function closePopUp(popup) {
  popup.classList.remove("pop-up_opened");

  window.removeEventListener("keydown", closePopUpsESC);
}

export { openPopUp, closePopUp };
