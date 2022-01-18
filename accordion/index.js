const accordion = document.querySelector(".accordion");
const accordionHeadings = document.getElementsByClassName("accordion__heading");
const accordionPanels = document.getElementsByClassName("accordion__panel");

const panelIdTemplate = "accordion__panel--";
const buttonIdTemplate = "accordion__button--";

function enhanceAccordionPanels() {
  for (let i = 0; i < accordionPanels.length; i++) {
    const panel = accordionPanels[i];
    panel.classList.add("hidden");
    panel.id = `${panelIdTemplate}${i + 1}`;
    panel.setAttribute("aria-labelledby", `${buttonIdTemplate}${i + 1}`);
  }
}

function addAccordionIcon(container) {
  const iconMarkup = `
  <svg class="accordion__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <title>chevron-right</title>
    <path d="M12.95 10.707l0.707-0.707-5.657-5.657-1.414 1.414 4.242 4.243-4.242 4.243 1.414 1.414 4.95-4.95z"></path>
  </svg>
  `;

  container.insertAdjacentHTML("beforeend", iconMarkup);
}

// make the heading interactive by inserting a button into it
function enhanceAccordionHeadings() {
  for (let i = 0; i < accordionHeadings.length; i++) {
    const heading = accordionHeadings[i];
    const button = document.createElement("button");

    button.textContent = heading.textContent;
    heading.textContent = "";

    addAccordionIcon(button);

    button.classList.add("accordion__button");
    button.id = `${buttonIdTemplate}${i + 1}`;

    button.ariaExpanded = "false";
    button.setAttribute("aria-controls", `${panelIdTemplate}${i + 1}`);

    heading.appendChild(button);
  }
}

function toggleAccordionPanel(e) {
  const accordionButton = e.target;
  // If the event didn't occur on an accordion button, then don't do anything
  if (!accordionButton.classList.contains("accordion__button")) return;

  const associatedPanelId = accordionButton.getAttribute("aria-controls");
  const associatedPanel = document.getElementById(associatedPanelId);
  const associatedIcon = accordionButton.querySelector(".accordion__icon");

  associatedPanel.classList.toggle("hidden");
  accordionButton.ariaExpanded =
    accordionButton.ariaExpanded === "true" ? "false" : "true";
  associatedIcon.classList.toggle("accordion__icon--rotated");
}

// Progressively enhance the accordion (make it interactive and maintain accessibility) with JavaScript
function enhanceAccordion() {
  enhanceAccordionHeadings();
  enhanceAccordionPanels();
  accordion.addEventListener("click", toggleAccordionPanel);
}

enhanceAccordion();
