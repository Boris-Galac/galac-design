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

// CLICK OUT OF NAV WRAPPER

navList.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    navList.setAttribute("data-visible", "false");
    hamLine.forEach((line) => {
      line.setAttribute("aria-expanded", "false");
    });
  } else return;
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

// FAQ

const faqQuestion = document.querySelectorAll(".faq__question");
faqQuestion.forEach((question) => {
  question.addEventListener("click", (e) => {
    const faq__paragraph = question.nextElementSibling;
    const btn = question.firstElementChild;
    const btnActive = btn.firstElementChild.classList.contains("active");
    if (!btnActive) {
      btn.firstElementChild.classList.add("active");
      faq__paragraph.classList.add("active");
    } else {
      faq__paragraph.classList.remove("active");
      btn.firstElementChild.classList.remove("active");
    }
  });
});

// SHOW MENU ABOVE 1024PX DATA VISIBLE TRUE

window.addEventListener("resize", (e) => {
  const nav = document.querySelector(".nav__list");
  if (window.innerWidth > 1024) {
    nav.setAttribute("data-visible", "true");
  } else {
    nav.setAttribute("data-visible", "false");
  }
});
window.addEventListener("DOMContentLoaded", (e) => {
  if (window.innerWidth > 1024)
    document.querySelector(".nav__list").setAttribute("data-visible", "true");
});

/// PROGRESS CIRCULAR BAR

const backToTop = document.querySelector(".spin-loader");

let progressBar = document.querySelector(".spin-loader");

window.addEventListener("scroll", (e) => {
  // show when scrolling
  if (window.scrollY > 100) {
    backToTop.classList.add("active");
  } else backToTop.classList.remove("active");

  // spin on scroll
  let winScroll = window.scrollY; /// 0 - 1519
  let height = document.body.scrollHeight - innerHeight; /// 2806 - 1287

  let scrolled = Math.ceil((winScroll / height) * 100);

  progressBar.style.background = `
    conic-gradient(
        var(--spinner-clr) ${scrolled * 3.6}deg,
        var(--black) ${scrolled * 3.6}deg
)`;

  backToTop.addEventListener("click", (e) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
});

// PORTFOLIO SLIDER

const prevBtn = document.querySelector(".prev-slide");
const nextBtn = document.querySelector(".next-slide");
const sliders = document.querySelectorAll(".project-wrapper");

const nextPortfolioSlide = () => {
  const current = document.querySelector(".current");
  current.classList.remove("current");
  if (current.nextElementSibling) {
    current.nextElementSibling.classList.add("current");
  } else {
    sliders[0].classList.add("current");
  }
};

const prevPortfolioSlide = () => {
  const current = document.querySelector(".current");
  current.classList.remove("current");
  if (current.previousElementSibling) {
    current.previousElementSibling.classList.add("current");
  } else {
    sliders[sliders.length - 1].classList.add("current");
  }
};

prevBtn.addEventListener("click", nextPortfolioSlide);

nextBtn.addEventListener("click", prevPortfolioSlide);

// OFFER TABS

const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const target = document.querySelector(tab.dataset.tabTarget);
    const targetAll = document.querySelectorAll(".solution-btn");
    targetAll.forEach((tab) => {
      tab.classList.remove("active-btn");
    });
    e.currentTarget.classList.add("active-btn");
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    target.classList.add("active");
  });
});

// EMAIL CONSULTATION

document.getElementById("emailForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Spriječava slanje obrasca

  // Dohvati uneseni e-mail korisnika
  const userEmail = document.getElementById("userEmail").value;

  // Provjeri ispravnost e-mail adrese
  if (!isValidEmail(userEmail)) {
    alert("Molimo unesite ispravnu e-mail adresu.");
    return;
  }

  // Pošalji e-mail na određenu adresu
  const emailBody = `Korisnikov e-mail: ${userEmail}`;
  const mailtoLink = `mailto:boris.galac@gmail.com?subject=Novi e-mail&body=${encodeURIComponent(
    emailBody
  )}`;
  window.location.href = mailtoLink;
});

// Funkcija za provjeru ispravnosti e-mail adrese
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
