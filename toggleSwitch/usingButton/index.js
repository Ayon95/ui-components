const toggleButton = document.querySelector(".toggle__button");

toggleButton.addEventListener("click", function (e) {
  const isPressed = eval(e.currentTarget.getAttribute("aria-pressed"));
  e.currentTarget.setAttribute("aria-pressed", !isPressed);
});
