const images = document.getElementsByClassName("image");
const buttonPrevious = document.querySelector(".btn--prev");
const buttonNext = document.querySelector(".btn--next");

function getCarouselImageIndex(image) {
  return Number.parseFloat(image.dataset.imageIndex);
}

function adjustImageOpacity(imageIndex, image) {
  if (imageIndex === 0) {
    image.classList.add("image--visible");
  } else {
    image.classList.remove("image--visible");
  }
}

function positionCarouselImage(image, images) {
  const carouselImageIndex = getCarouselImageIndex(image);
  adjustImageOpacity(carouselImageIndex, image);
  // if this condition is true, then that image is the last image (previous image) in the carousel
  if (carouselImageIndex === images.length - 1) {
    image.style.transform = "translateX(-100%)";
    return;
  }
  image.style.transform = `translateX(${carouselImageIndex * 100}%)`;
}

function setUpCarousel() {
  for (const image of images) {
    positionCarouselImage(image, images);
  }
}

function goToNextImage() {
  for (const image of images) {
    const carouselImageIndex = getCarouselImageIndex(image);
    // the current image will become last (previous) image
    if (carouselImageIndex === 0) image.dataset.imageIndex = images.length - 1;
    else {
      image.dataset.imageIndex = getCarouselImageIndex(image) - 1;
    }
    positionCarouselImage(image, images);
  }
}

function goToPreviousImage() {
  for (const image of images) {
    const carouselImageIndex = getCarouselImageIndex(image);
    // the previous (last) image will become the current image
    if (carouselImageIndex === images.length - 1) image.dataset.imageIndex = 0;
    else {
      image.dataset.imageIndex = getCarouselImageIndex(image) + 1;
    }
    positionCarouselImage(image, images);
  }
}

buttonPrevious.addEventListener("click", goToPreviousImage);
buttonNext.addEventListener("click", goToNextImage);

setUpCarousel();
