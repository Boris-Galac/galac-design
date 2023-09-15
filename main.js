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
