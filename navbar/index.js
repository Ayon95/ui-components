const hamburgerButton = document.querySelector(".nav__hamburger-btn");
const topBar = document.getElementById("bar--top");
const bottomBar = document.getElementById("bar--bottom");
const leftHalfBar = document.querySelector(".bar--left");
const rightHalfBar = document.querySelector(".bar--right");
const navMenu = document.querySelector(".nav__list");

const mediaQueryMediumAndUp = window.matchMedia("(min-width: 56.25em)");

function toggleHamburgerMenuAndButton() {
  topBar.classList.toggle("rotate-down");
  bottomBar.classList.toggle("rotate-up");
  leftHalfBar.classList.toggle("disappear-to-left");
  rightHalfBar.classList.toggle("disappear-to-right");
  navMenu.classList.toggle("enter-screen-from-right");
}

function handleClickNavLink(e) {
  if (!e.target.classList.contains("nav__link")) return;
  // if the screen is smaller than medium-sized screen
  if (!mediaQueryMediumAndUp.matches) {
    toggleHamburgerMenuAndButton();
  }
}

hamburgerButton.addEventListener("click", toggleHamburgerMenuAndButton);
navMenu.addEventListener("click", handleClickNavLink);
