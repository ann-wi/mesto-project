//Forms validation

//Show error message function
function showInputError(formElem, inputElem, errorMessage) {
  const inputError = formElem.querySelector(`.${inputElem.name}-error`);

  inputElem.classList.add("form__item_type_error");

  inputError.textContent = errorMessage;
  inputError.classList.add("form__item-error_active");
}

//Hide error message function
function hideInputError(formElem, inputElem) {
  const inputError = formElem.querySelector(`.${inputElem.name}-error`);

  inputElem.classList.remove("form__item_type_error");

  inputError.classList.remove("form__item-error_active");
  inputError.textContent = "";
}

//Validity
function checkInputValidity(formElem, inputElem) {
  if (!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage);
  } else {
    hideInputError(formElem, inputElem);
  }
}

//check inputs valid status
function hasInvalidInput(inputElems) {
  return inputElems.some((inputElem) => {
    return !inputElem.validity.valid;
  });
}

//toggle button
function toggleButtonState(inputElems, buttonElem) {
  if (hasInvalidInput(inputElems)) {
    buttonElem.setAttribute("disabled", "");
    buttonElem.classList.add("form__save-button_inactive");
  } else {
    buttonElem.removeAttribute("disabled");
    buttonElem.classList.remove("form__save-button_inactive");
  }
}

//set Event Listeners for all forms
function setEventListeners(formElem) {
  const inputsList = Array.from(formElem.querySelectorAll(".form__item"));
  const submitButton = formElem.querySelector(".form__save-button");

  toggleButtonState(inputsList, submitButton);

  inputsList.forEach((inputElem) => {
    inputElem.addEventListener("input", function () {
      checkInputValidity(formElem, inputElem);

      toggleButtonState(inputsList, submitButton);
    });
  });
}

//enable validation
function enableValidation() {
  const formsList = Array.from(document.querySelectorAll(".form"));

  formsList.forEach((formElem) => {
    setEventListeners(formElem);

    formElem.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  });
}

export { enableValidation };
