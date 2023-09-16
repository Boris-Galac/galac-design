// HAMBURGER BTN AND MENU

const hamBtn = document.querySelector(".ham-btn");
const navList = document.querySelector(".nav__list");
const hamLine = document.querySelectorAll(".ham-line");

hamBtn.addEventListener("click", (e) => {
  let navAttr = navList.getAttribute("data-visible");
  if (navAttr === "false") {
    navList.setAttribute("data-visible", "true");
    hamLine.forEach((line) => {
      line.setAttribute("aria-expanded", "true");
    });
  } else {
    navList.setAttribute("data-visible", "false");
    hamLine.forEach((line) => {
      line.setAttribute("aria-expanded", "false");
    });
  }
});

// AD AUTOMATIC SLIDER

const carousel = document.querySelector(".ads");
const innerWrapper = document.querySelector(".ads__slider");
let direction;

let slideInterval = setInterval(nextSlide, 3000);

function nextSlide() {
  direction = -1;
  innerWrapper.style.transition = "transform 1.5s ease-in-out";
  innerWrapper.style.transform = "translateX(-33.33%)";
}

innerWrapper.addEventListener("transitionend", (e) => {
  if (direction === -1) {
    innerWrapper.appendChild(innerWrapper.firstElementChild);
  } else if (direction === 1) {
    innerWrapper.prepend(innerWrapper.lastElementChild);
  }

  innerWrapper.style.transition = "none";
  innerWrapper.style.transform = "translateX(0)";
});
