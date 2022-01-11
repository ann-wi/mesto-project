//open and close pop ups
function openPopUp(popup) {
  popup.classList.add("pop-up_opened");
}

function closePopUp(popup) {
  popup.classList.remove("pop-up_opened");
}

export { openPopUp, closePopUp };
