const toggleButton = document.querySelector(".toggle__button");
const colorPreferenceLocalStorageKey =
  "darkModeToggle_123_userSiteColorPreference";

function toggleDarkMode() {
  const isPressed = eval(toggleButton.getAttribute("aria-pressed"));
  toggleButton.setAttribute("aria-pressed", !isPressed);
  document.body.classList.toggle("dark");
}

function saveColorPreferenceToLocalStorage() {
  const isPressed = eval(toggleButton.getAttribute("aria-pressed"));
  localStorage.setItem(
    colorPreferenceLocalStorageKey,
    isPressed ? "dark" : "light"
  );
}

function setInitialColorMode() {
  const userSiteColorPreference = localStorage.getItem(
    colorPreferenceLocalStorageKey
  );
  const systemPreferenceIsDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (
    userSiteColorPreference === "dark" ||
    (!userSiteColorPreference && systemPreferenceIsDark)
  ) {
    toggleDarkMode();
  }
}

setInitialColorMode();

toggleButton.addEventListener("click", function () {
  toggleDarkMode();
  saveColorPreferenceToLocalStorage();
});
