//Forms validation

//Show error message function
function showInputError(formElem, inputElem, errorMessage, settings) {
  const inputError = formElem.querySelector(`.${inputElem.name}-error`);

  inputElem.classList.add(settings.itemErrorSelector);

  inputError.textContent = errorMessage;
  inputError.classList.add(settings.activeErrorSelector);
}

//Hide error message function
function hideInputError(formElem, inputElem, settings) {
  const inputError = formElem.querySelector(`.${inputElem.name}-error`);

  inputElem.classList.remove(settings.itemErrorSelector);

  inputError.classList.remove(settings.activeErrorSelector);
  inputError.textContent = "";
}

//Validity
function checkInputValidity(formElem, inputElem, settings) {
  if (!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage, settings);
  } else {
    hideInputError(formElem, inputElem, settings);
  }
}

//check inputs valid status
function hasInvalidInput(inputElems) {
  return inputElems.some((inputElem) => {
    return !inputElem.validity.valid;
  });
}

//toggle button
function toggleButtonState(inputElems, buttonElem, settings) {
  if (hasInvalidInput(inputElems)) {
    buttonElem.setAttribute("disabled", "");
    buttonElem.classList.add(settings.inactiveButtonSelector);
  } else {
    buttonElem.removeAttribute("disabled");
    buttonElem.classList.remove(settings.inactiveButtonSelector);
  }
}

//set Event Listeners for all forms
function setEventListeners(formElem, settings) {
  const inputsList = Array.from(
    formElem.querySelectorAll(settings.formInputSelector)
  );
  const submitButton = formElem.querySelector(settings.saveButtonSelector);

  toggleButtonState(inputsList, submitButton, settings);

  inputsList.forEach((inputElem) => {
    inputElem.addEventListener("input", function () {
      checkInputValidity(formElem, inputElem, settings);

      toggleButtonState(inputsList, submitButton, settings);
    });
  });
}

//enable validation
function enableValidation(settings) {
  const formsList = Array.from(
    document.querySelectorAll(settings.formSelector)
  );

  formsList.forEach((formElem) => {
    setEventListeners(formElem, settings);

    formElem.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  });
}

export { enableValidation };
