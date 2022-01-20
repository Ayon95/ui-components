const mainContent = document.querySelector("main");
const buttonOpenModal = document.querySelector(".btn");
const buttonCloseModal = document.querySelector(".btn-close");
const modal = document.querySelector(".modal");

const focusableElementsSelector =
  'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

const modalFocusableElements = modal.querySelectorAll(
  focusableElementsSelector
);

const modalFirstFocusableElement = modalFocusableElements[0];
const modalLastFocusableElement =
  modalFocusableElements[modalFocusableElements.length - 1];

function manageModalFocus(e) {
  if (e.key !== "Tab") return;

  if (e.shiftKey) {
    // if Shift + Tab is pressed, and the first element is focused, then move focus to the last focusable element
    if (document.activeElement === modalFirstFocusableElement) {
      modalLastFocusableElement.focus();
      e.preventDefault();
    }
  } else {
    // if the Tab key is pressed, and the last element is focused, move focus back to the first focusable element
    if (document.activeElement === modalLastFocusableElement) {
      modalFirstFocusableElement.focus();
      // prevent the default browser action of moving to the next focusable element when Tab is pressed
      e.preventDefault();
    }
  }
}

function openModal() {
  modal.classList.remove("hidden");
  // focus should be moved to the default focusable control in the modal
  buttonCloseModal.focus();
}

function closeModal() {
  // focus should be moved back to the element that opened the model
  buttonOpenModal.focus();
  modal.classList.add("hidden");
}

buttonOpenModal.addEventListener("click", openModal);

modal.addEventListener("click", function (e) {
  const clickedInValidArea =
    e.target.classList.contains("modal") ||
    e.target.classList.contains("btn-close") ||
    e.target.classList.contains("btn");
  if (clickedInValidArea) closeModal();
});

document.addEventListener("keydown", function (e) {
  const modalIsOpen = !modal.classList.contains("hidden");
  if (e.key === "Escape" && modalIsOpen) closeModal();
  if (modalIsOpen) manageModalFocus(e);
});
