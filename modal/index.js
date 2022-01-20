const mainContent = document.querySelector("main");
const buttonOpenModal = document.querySelector(".btn");
const buttonCloseModal = document.querySelector(".btn-close");
const modal = document.querySelector(".modal");

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
    e.target.classList.contains("btn-close");
  if (clickedInValidArea) closeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});
