const form = document.querySelector(".form");
const inputsWithPattern = document.querySelectorAll(".form__input[pattern]");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const genderRadioInputs = document.querySelectorAll(
  'input[type="radio"][name="gender"]'
);

const inputValidityState = {
  username: true,
  email: true,
  password: true,
  confirmPassword: true,
  gender: true,
};

function checkIfInputsWithPatternAreValid() {
  for (const input of inputsWithPattern) {
    if (input.validity.patternMismatch || input.value === "") {
      inputValidityState[input.id] = false;
    }
  }
}

function checkIfPasswordsMatch() {
  if (
    confirmPasswordInput.value === "" ||
    passwordInput.value !== confirmPasswordInput.value
  ) {
    inputValidityState[confirmPasswordInput.id] = false;
  }
}

function checkIfGenderIsSelected() {
  const inputName = genderRadioInputs[0].name;
  for (const input of genderRadioInputs) {
    if (input.checked) {
      inputValidityState[inputName] = true;
      return;
    }
  }
  inputValidityState[inputName] = false;
}

function formIsValid() {
  let allInputsAreValid = true;

  checkIfInputsWithPatternAreValid();
  checkIfPasswordsMatch();
  checkIfGenderIsSelected();

  for (const inputName in inputValidityState) {
    const input = document.getElementById(inputName);
    const inputHint = document.getElementById(`${inputName}Hint`);
    // If input is not valid
    if (!inputValidityState[inputName]) {
      allInputsAreValid = false;
      input?.classList.add("form__input--invalid");
      inputHint.classList.add("form__hint--invalid");
      continue;
    }
    // If input is valid
    input?.classList.remove("form__input--invalid");
    inputHint.classList.remove("form__hint--invalid");
  }

  return allInputsAreValid;
}

function resetFormValidityState() {
  for (inputName in inputValidityState) {
    inputValidityState[inputName] = true;
  }
}

function handleSubmit(e) {
  e.preventDefault();
  if (!formIsValid()) {
    resetFormValidityState();
    return;
  }
  console.log({
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    confirmPassword: confirmPasswordInput.value,
  });
  form.reset();
}

form.addEventListener("submit", handleSubmit);
