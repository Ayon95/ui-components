const hamburgerButton = document.getElementById("nav__hamburger-btn");
const topBar = document.getElementById("bar--top");
const bottomBar = document.getElementById("bar--bottom");
const leftHalfBar = document.querySelector(".bar--left");
const rightHalfBar = document.querySelector(".bar--right");
const navMenu = document.querySelector(".nav__list");
const navLinks = document.getElementsByClassName("nav__link");
const submenus = document.getElementsByClassName("submenu");

const mediaQueryMediumAndUp = window.matchMedia("(min-width: 56.25em)");

const navMenuFocusableElements =
  document.querySelectorAll("button, .nav__link");

const firstFocusableElement = navMenuFocusableElements[0];
const lastFocusableElement =
  navMenuFocusableElements[navMenuFocusableElements.length - 1];

// this function will trap focus within the hamburger menu
function manageNavMenuFocus(e) {
  if (e.key !== "Tab") return;
  if (e.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      e.preventDefault();
    }
  }
}

function toggleHamburgerMenuAndButton() {
  topBar.classList.toggle("rotate-down");
  bottomBar.classList.toggle("rotate-up");
  leftHalfBar.classList.toggle("disappear-to-left");
  rightHalfBar.classList.toggle("disappear-to-right");
  navMenu.classList.toggle("enter-screen-from-right");

  hamburgerButton.ariaExpanded =
    hamburgerButton.ariaExpanded === "true" ? "false" : "true";

  navMenu.ariaHidden = navMenu.ariaHidden === "true" ? "false" : "true";

  for (const link of navLinks) {
    link.tabIndex = link.tabIndex === -1 ? 0 : -1;
  }
}

function toggleSubmenuVisibility(topLevelLink, submenu) {
  topLevelLink.ariaExpanded =
    topLevelLink.ariaExpanded === "true" ? "false" : "true";
  submenu.classList.toggle("visible");
}

function closeSubMenuOnFocusLoss(e) {
  const submenuItem = e.target.parentElement;
  // check whether the link that is about to lose focus is a submenu link or not
  if (!submenuItem.classList.contains("submenu__item")) return;
  // check whether or not the submenu item is the last item in the submenu
  if (submenuItem.nextElementSibling) return;
  const submenu = submenuItem.parentElement;
  const topLevelLink = submenu.previousElementSibling;
  toggleSubmenuVisibility(topLevelLink, submenu);
}

function handleClickNavLink(e) {
  const isLink =
    e.target.classList.contains("nav__link") ||
    e.target.classList.contains("submenu__link");
  if (!isLink) return;
  const navLink = e.target;
  const isTopLevelLink =
    navLink.parentElement.classList.contains("nav__item--submenu");
  console.log(isTopLevelLink);
  if (isTopLevelLink) {
    // since the top-level link does not link to another page, we have to prevent the default action resulting from a link being clicked
    e.preventDefault();
    const submenu = navLink.nextElementSibling;
    toggleSubmenuVisibility(navLink, submenu);
  }
  if (mediaQueryMediumAndUp.matches || isTopLevelLink) return;
  toggleHamburgerMenuAndButton();
}

function handleEscapeKeypress(e) {
  if (e.key !== "Escape") return;
  toggleHamburgerMenuAndButton();
}

function setInitialStateForHamburgerMenu() {
  navMenu.ariaHidden = "true";
  navMenu.setAttribute("aria-labelledby", "nav__hamburger-btn");
  for (const link of navLinks) {
    link.tabIndex = -1;
  }
}

function init() {
  hamburgerButton.addEventListener("click", toggleHamburgerMenuAndButton);
  navMenu.addEventListener("click", handleClickNavLink);
  navMenu.addEventListener("focusout", closeSubMenuOnFocusLoss);

  document.addEventListener("keydown", function (e) {
    const navMenuIsOpen = hamburgerButton.ariaExpanded === "true";
    if (navMenuIsOpen) {
      handleEscapeKeypress(e);
      manageNavMenuFocus(e);
    }
  });

  if (!mediaQueryMediumAndUp.matches) {
    setInitialStateForHamburgerMenu();
  }
}

init();
