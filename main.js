//// QUERY SELECTOR

function element(element) {
  return document.querySelector(element);
}

//////// 💡💡💡💡💡
if (
  window.location.href.includes("index") ||
  !window.location.href.includes("graficki-dizajn")
) {
  // HAMBURGER BTN AND MENU

  const hamBtn = document.querySelector(".ham-btn");
  const navList = document.querySelector(".nav__list");
  const hamLine = document.querySelectorAll(".ham-line");
  hamBtn.addEventListener("click", (e) => {
    let navAttr = navList.getAttribute("data-visible");
    if (navAttr === "false") {
      navList.setAttribute("data-visible", "true");
      navList.setAttribute("aria-expanded", "true");
      hamLine.forEach((line) => {
        line.setAttribute("aria-expanded", "true");
      });
    } else {
      navList.setAttribute("data-visible", "false");
      navList.setAttribute("aria-expanded", "false");
      hamLine.forEach((line) => {
        line.setAttribute("aria-expanded", "false");
      });
    }
  });
  // WHEN USER CLIKS ON LINK CLOSE NAV MENU
  document.querySelector(".nav__list").addEventListener("click", (e) => {
    if (e.target.matches(".nav__link")) {
      e.currentTarget.setAttribute("data-visible", "false");
      e.currentTarget.setAttribute("aria-expanded", "false");
      hamLine.forEach((line) => {
        line.setAttribute("aria-expanded", "false");
      });
    }
  });
  window.addEventListener("resize", (e) => {
    if (window.innerWidth > 1921) {
      document.querySelector(".nav__list").addEventListener("click", (e) => {
        if (e.target.matches(".nav__link")) {
          e.currentTarget.setAttribute("data-visible", "true");
          e.currentTarget.setAttribute("aria-expanded", "true");
          hamLine.forEach((line) => {
            line.setAttribute("aria-expanded", "false");
          });
        }
      });
    } else {
      document.querySelector(".nav__list").addEventListener("click", (e) => {
        if (e.target.matches(".nav__link")) {
          e.currentTarget.setAttribute("data-visible", "false");
          e.currentTarget.setAttribute("aria-expanded", "false");
          hamLine.forEach((line) => {
            line.setAttribute("aria-expanded", "false");
          });
        }
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
  if (
    window.location.href.includes("index") ||
    window.location.href.includes("/")
  ) {
    innerWrapper.addEventListener("transitionend", (e) => {
      if (direction === -1) {
        innerWrapper.appendChild(innerWrapper.firstElementChild);
      } else if (direction === 1) {
        innerWrapper.prepend(innerWrapper.lastElementChild);
      }

      innerWrapper.style.transition = "none";
      innerWrapper.style.transform = "translateX(0)";
    });
  }
  // FAQ

  const faqQuestion = document.querySelectorAll(".faq__question");
  faqQuestion.forEach((question) => {
    question.addEventListener("click", (e) => {
      const faq__paragraph = question.nextElementSibling;
      const btn = question.firstElementChild.nextElementSibling;
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

  // SHOW MENU ABOVE 1920PX DATA VISIBLE TRUE

  window.addEventListener("resize", (e) => {
    const nav = document.querySelector(".nav__list");
    if (window.innerWidth > 1920) {
      nav.setAttribute("data-visible", "true");
    } else {
      nav.setAttribute("data-visible", "false");
    }
  });
  window.addEventListener("DOMContentLoaded", (e) => {
    if (window.innerWidth > 1920)
      document.querySelector(".nav__list").setAttribute("data-visible", "true");
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

  prevBtn.addEventListener("click", prevPortfolioSlide);

  nextBtn.addEventListener("click", nextPortfolioSlide);

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

  ///////// INTERSECTION OBSERVER

  // from left stagger

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.2 }
  );

  const leftStagger = document.querySelectorAll(".hidden-left-stagger");
  leftStagger.forEach((el) => observer.observe(el));
  // from bottom opacity stagger
  const bottomStagger = document.querySelectorAll(".hidden-bottom");
  bottomStagger.forEach((el) => observer.observe(el));

  // from right opacity

  const abc = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-full");
        }
      });
    },
    { threshold: 0.15 }
  );
  const b = document.querySelectorAll(".opacity");
  b.forEach((el) => abc.observe(el));

  // O NAMA MODAL

  const linkOnama = document.querySelector("#o-nama");
  const modalOnama = document.querySelector(".o-nama");
  const overlay = document.querySelector(".overlay");

  linkOnama.addEventListener("click", (e) => {
    const attrOnama = modalOnama.getAttribute("data-visible");
    if (attrOnama === "false") {
      overlay.setAttribute("data-visible", "true");
      overlay.setAttribute("aria-expanded", "true");
      modalOnama.setAttribute("data-visible", "true");
      modalOnama.setAttribute("aria-expanded", "true");
    } else {
      overlay.setAttribute("data-visible", "false");
      overlay.setAttribute("aria-expanded", "true");
      modalOnama.setAttribute("data-visible", "false");
      modalOnama.setAttribute("aria-expanded", "false");
    }
  });

  //// WEB SOLUTIONS

  let webSolutionsBtnbs = document.querySelectorAll(".web-solution-btn");

  webSolutionsBtnbs.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const obj = [
        {
          id: "custom-code",
          text: `Custom code rješenje je rješenje koje naš tim prihvaća jedino ukoliko to izričito kupac želi, što zbog potrebnog transparentnog koda na Github u i daljnje, moguće aplikativne nadogradnje, a što zbog određenih detalja koje primjerice neki page builderi ne mogu izvesti.`,
          img: "/assets/images/custom-code-tab.svg",
        },
        {
          id: "wordpress",
          text: `WordPress je najpoznatija platforma za izradu web stranica i blogova. Omogućava korisnicima lako prilagodljiv izgled i funkcionalnost svojih web stranica. WordPress je jednostavan za upotrebu i podržava upravljanje sadržajem putem CMS-a, uključujući blogove, galerije i e-trgovinu. Sa velikom zajednicom i bogatim ekosistemom, WordPress je popularan izbor za razvoj web stranica svih vrsta, od osobnih blogova do korporativnih sajtova i online shopova.`,
          img: "/assets/images/wp-tab.svg",
        },
        {
          id: "webflow",
          text: `Webflow je visokokvalitetna platforma za izradu web stranica koja kombinira jednostavan vizualni dizajn s naprednim mogućnostima kodiranja. Sa svojim vizualnim alatom, korisnici mogu brzo kreirati privlačne web stranice, bez potrebe za pisanjem koda. Takođe pruža funkcionalnosti kao što su CMS za upravljanje sadržajem, responsivni dizajn za prilagodbu na različite uređaje, interaktivne animacije i hosting. Webflow takođe omogućava prilagodljivost i kontrolu putem pristupa kodu za one sa više tehničkog iskustva. Svi ovi elementi čine Webflow popularnim izborom za razvoj web stranica.`,
          img: "/assets/images/webflow-tab.svg",
        },
      ];
      const modal = document.createElement("div");
      const modalImg = document.createElement("img");
      modal.classList.add("web-modal");
      modal.setAttribute("aria-expanded", "true");
      modal.setAttribute("aria-label", "Web solutions for you");
      const paragraph = document.createElement("p");
      paragraph.classList.add("solution--webdesign-paragraph");
      const abc = btn.dataset.tab;
      const hej = obj.find((obj) => obj.id === abc);
      paragraph.innerText = hej.text;
      modalImg.src = hej.img;
      modal.append(modalImg, paragraph);
      createOverlay(modal);
    });
  });

  //// OVERLAY

  overlay.addEventListener("click", (e) => {
    overlay.setAttribute("data-visible", "false");
    overlay.setAttribute("aria-expanded", "false");
    modalOnama.setAttribute("aria-expanded", "false");
    modalOnama.setAttribute("data-visible", "false");
    navList.setAttribute("data-visible", "false");
    navList.setAttribute("aria-expanded", "false");
    hamLine.forEach((line) => {
      line.setAttribute("aria-expanded", "false");
    });
    if (window.innerWidth >= 1024) {
      navList.setAttribute("data-visible", "true");
      navList.setAttribute("aria-expanded", "true");
    }
  });
  // WF BTN

  const wfBtn = document.querySelector(".wf-btn");
  wfBtn.addEventListener("click", (e) => {
    const targetUrl = "https://webflow.com/";
    window.open(targetUrl, "_blank");
  });

  // GRAFIKA PAGE

  if (window.location.href.includes("graficki-dizajn")) {
    const headerHeight = document.querySelector(".header").scrollHeight;
    document.querySelector(".grafika-main").style = `
    padding-top: ${headerHeight}px;
  `;
  }
}

//////// 💡💡💡💡💡 GRAFICKI DIZAJN PAGE

if (window.location.href.includes("graficki-dizajn")) {
  let currentImageIndex = -1;

  function galleryFunction() {
    const galleryImages = document.querySelectorAll(".project__gallery > img");

    if (galleryImages) {
      galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
          currentImageIndex = index;
          createOverlay();
          displayCurrentImage();
          createGalleryBtns();
        });
      });
    }

    function changeImg(changeDir) {
      const newImg = document.getElementById("current-img");
      if (newImg) {
        // Remove any existing classes
        newImg.classList.remove("right-image", "left-image");
      }

      currentImageIndex += changeDir;

      if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
      } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
      }

      // Determine the class to add
      const classToAdd = changeDir === 1 ? "right-image" : "left-image";

      displayCurrentImage(classToAdd);
    }
    const newImg = document.createElement("img");

    function displayCurrentImage(classToAdd) {
      const currentImg = document.getElementById("current-img");

      if (currentImg) {
        currentImg.remove();
      }

      newImg.setAttribute("class", `current-gallery-img ${classToAdd}`);
      newImg.setAttribute("id", "current-img");
      newImg.setAttribute("src", galleryImages[currentImageIndex].src);
      newImgWindow.append(newImg);
    }

    function createGalleryBtns() {
      // prev btn
      const prevBtn = document.createElement("button");
      prevBtn.setAttribute("class", "gallery-btn gallery-btn--prev");
      prevBtn.addEventListener("click", () => {
        changeImg(-1);
      });
      const prevImgIcon = document.createElement("i");
      prevImgIcon.setAttribute("class", "fa-solid fa-chevron-left");
      prevBtn.append(prevImgIcon);
      newImgWindow.append(prevBtn);

      // next btn
      const nextBtn = document.createElement("button");
      nextBtn.setAttribute("class", "gallery-btn gallery-btn--next ");
      nextBtn.addEventListener("click", (e) => {
        changeImg(1);
      });
      const nextImgIcon = document.createElement("i");
      nextImgIcon.setAttribute("class", "fa-solid fa-chevron-right");
      nextBtn.append(nextImgIcon);
      newImgWindow.append(nextBtn);
    }
  }

  // PADDING MAIN IN GRAFIKA PAGE

  const heightHeader = document.querySelector(".header").scrollHeight;
  const grafikaMain = document.querySelector(".grafika-main");

  grafikaMain.style = `
  padding-top: ${heightHeader}px;
  `;

  // OPEN THE PROJECT & ASIDE BAR
  const layoutBtn = document.querySelector(".layout-btn");

  const asideBarProjectWrapper = document.querySelector(
    ".grafika__projects-wrapper"
  );
  const asideBarProjects = document.querySelector(
    ".grafika__projects-inner-wrapper"
  );
  const projectsWrapper = document.querySelector(".projects");

  const projectsBtns = document.querySelectorAll(".project-btn");
  projectsBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const projectBtn = btn.dataset.project;
      const filteredProjectHrv = projectsHrv.filter(
        (obj) => obj.id === projectBtn
      );
      const filteredProjectEng = projectsEng.filter(
        (obj) => obj.id === projectBtn
      );
      if (localStorage.getItem("language") === "hrv") {
        const imgs = filteredProjectHrv[0].images.map((img) => {
          return `<img src="/assets/images/project-imgs/img (${img}).png" alt="image">`;
        });
        const project = filteredProjectHrv
          .map((obj) => {
            return `
              <figure class="project right-image">
              <div class="project__header">
              <div class="project__col project__col--first-col">
              <span class="project__label">Ime projekta</span>
              <h2 class="project__description project__title--main-heading">${obj.nameOfProject}</h2>
              </div>
              <div class="project__col">
              <span class="project__label">Opis projekta</span>
              <p class="project__description project__description--paragraph">${obj.projectDescription}</p>
              </div>
              <div class="project__col">
              <span class="project__label">Tip projekta</span>
              <h2 class="project__description project__description--brand-heading">${obj.typeOfProject}</h2>
              </div>
              <div class="project__col">
              <span class="project__label">Korištene tehnologije</span>
              <h2 class="project__description project__description__last-col"><img src="/assets/images/illustrator-tech.png" alt="adobe photoshop"><img src="/assets/images/ps-tech.png" alt="adobe photoshop">
              </div>
              </div>
              <div class="project__content">
              <div class="project__gallery">
              ${imgs}
              </div>
              </div>
              </figure>
            `;
          })
          .join("");
        projectsWrapper.setAttribute("data-opened", "true");
        projectsWrapper.innerHTML = project;
      } else if (localStorage.getItem("language") === "eng") {
        const imgs = filteredProjectEng[0].images.map((img) => {
          return `<img src="/assets/images/project-imgs/img (${img}).png" alt="image">`;
        });
        const project = filteredProjectEng
          .map((obj) => {
            return `
              <figure class="project right-image">
              <div class="project__header">
              <div class="project__col project__col--first-col">
              <span class="project__label">Ime projekta</span>
              <h2 class="project__description project__title--main-heading">${obj.nameOfProject}</h2>
              </div>
              <div class="project__col">
              <span class="project__label">Opis projekta</span>
              <p class="project__description project__description--paragraph">${obj.projectDescription}</p>
              </div>
              <div class="project__col">
              <span class="project__label">Tip projekta</span>
              <h2 class="project__description project__description--brand-heading">${obj.typeOfProject}</h2>
              </div>
              <div class="project__col">
              <span class="project__label">Korištene tehnologije</span>
              <h2 class="project__description project__description__last-col"><img src="/assets/images/illustrator-tech.png" alt="adobe photoshop"><img src="/assets/images/ps-tech.png" alt="adobe photoshop">
              </div>
              </div>
              <div class="project__content">
              <div class="project__gallery">
              ${imgs}
              </div>
              </div>
              </figure>
            `;
          })
          .join("");
        projectsWrapper.setAttribute("data-opened", "true");
        projectsWrapper.innerHTML = project;
      }
      galleryFunction();

      if (
        !asideBarProjectWrapper.classList.contains("opened-project-layout") &&
        !asideBarProjects.classList.contains("aside-projects") &&
        !layoutBtn.classList.contains("active")
      ) {
        asideBarProjectWrapper.classList.add("opened-project-layout");
        asideBarProjects.classList.add("aside-projects");
        layoutBtn.classList.add("active");
      }
    });
  });

  // CHANGE LAYOUT
  layoutBtn.addEventListener("click", (e) => {
    if (
      asideBarProjectWrapper.classList.contains("opened-project-layout") &&
      asideBarProjects.classList.contains("aside-projects") &&
      layoutBtn.classList.contains("active")
    ) {
      asideBarProjectWrapper.classList.remove("opened-project-layout");
      asideBarProjects.classList.remove("aside-projects");
      layoutBtn.classList.remove("active");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (projectsWrapper.hasChildNodes()) {
      projectsWrapper.firstElementChild.remove();
    }
    projectsWrapper.setAttribute("data-opened", "false");
  });

  function createOverlay() {
    ////////// create overlay for curr img
    newImgWindow = document.createElement("div");
    newImgWindow.setAttribute("class", "overlay-image");

    ////////// when clicks overlay close img
    newImgWindow.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        e.currentTarget.remove();
      }
    });
    document.body.append(newImgWindow);
  }
}
////////// 💡💡💡💡💡END OF GRAFICKI DIZAJN PAGE

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

///////// OVERLAY FUNCTION

function createOverlay(element) {
  let overlay = document.createElement("div");
  overlay.setAttribute("class", "overlay overlay--darker");
  overlay.setAttribute("data-visible", "true");
  overlay.setAttribute("aria-expanded", "true");
  overlay.append(element);
  document.body.append(overlay);
  overlay.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) return;

    overlay.setAttribute("data-visible", "false");
    overlay.addEventListener("animationend", (e) => {
      overlay.remove();
    });
  });
}

////// PAGE TRANSITIONS

window.addEventListener("load", (e) => {
  const transitionElement = document.querySelector(".transition");
  const allLinksOnPage = document.querySelectorAll(".nav__link--trans");
  setTimeout(() => {
    transitionElement.setAttribute("data-active", "false");
  }, 500);
  allLinksOnPage.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.href;
      transitionElement.setAttribute("data-active", "true");
      setTimeout(() => {
        window.location.href = target;
      }, 500);
    });
  });
});

////// LANGUAGES

let currLanguage = localStorage.getItem("language") || "hrv";
let langOverlay = document.querySelector(".lang-question");

///// language intro overlay modal

if (!localStorage.getItem("language")) {
  langOverlay.setAttribute("data-active", "true");
  document.querySelectorAll(".lang-question__option-btn").forEach((option) => {
    option.addEventListener("click", (e) => {
      function updateLanguage(language) {
        if (language === "eng") {
          eng();
        } else if (language === "hrv") {
          hrv();
        }
      }
      const selectedLanguage = e.target.dataset.value;
      if (selectedLanguage === "eng" || selectedLanguage === "hrv") {
        localStorage.setItem("language", selectedLanguage);
        updateLanguage(selectedLanguage);

        document
          .querySelectorAll(".language-form__option")
          .forEach((option) => {
            option.classList.remove("active");
          });
        const initiallySelectedOption = document.querySelector(
          `.language-form__option > [data-value="${selectedLanguage}"]`
        );
        initiallySelectedOption.parentElement.classList.add("active");
      }
      langOverlay.setAttribute("data-active", "false");
    });
  });
}

// set LANGUAGE to LOCAL STORAGE

document.addEventListener("DOMContentLoaded", () => {
  let options = document.querySelectorAll(".language-form__option");

  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      options.forEach((opt) => {
        opt.classList.remove("active");
      });

      if (!option.classList.contains("active")) {
        option.classList.add("active");
      }

      const selectedLanguage = e.target.dataset.value;

      if (selectedLanguage === "eng" || selectedLanguage === "hrv") {
        localStorage.setItem("language", selectedLanguage);
        updateLanguage(selectedLanguage);
      }
    });
  });

  function updateLanguage(language) {
    if (language === "eng") {
      eng();
    } else if (language === "hrv") {
      hrv();
    }
  }
  // Call the function to set the initial language based on localStorage
  updateLanguage(currLanguage);

  // Add the 'active' class to the initially selected language
  const initiallySelectedOption = document.querySelector(
    `[data-value="${currLanguage}"]`
  );
  if (initiallySelectedOption) {
    initiallySelectedOption.parentElement.classList.add("active");
  }
});

function eng() {
  if (
    window.location.href.includes("index") &&
    window.location.href.includes("/")
  ) {
    element(".hero__headline-row:nth-child(1)").innerText = "We transform";
    element(".hero__headline-row:nth-child(2)").innerText = "Your ideas";
    element(".hero__headline-row:nth-child(3)").innerText = "Into";
    element(".hero__headline-row:nth-child(4)").innerText = "Digital reality";
    element(".hero__subheadline").innerText =
      "Efficient and high-quality creation of websites, shops, graphic design, all types of digital design and marketing according to your needs";
    element(".lang-item-1").innerText = "OFFER";
    element(".lang-item-2").innerText = "WEB PORTFOLIO";
    element(".lang-item-3").innerText = "GRAPHIC DESIGN";
    element(".lang-item-4").innerText = "FAQ";
    element(".lang-item-5").innerText = "ABOUT US";
    element(".hero__cta > p").innerText = "What we offer";
    element(".slide-text-2").innerText = "WEBSHOPS";
    element(".slide-text-3").innerText = "BUSINESS CARDS";
    element(".slide-text-4").innerText = "FLYERS";
    document.querySelectorAll(".slide-text-1").forEach((element) => {
      element.innerText = "WEBSITES";
    });
    document.querySelectorAll(".slide-text-2").forEach((element) => {
      element.innerText = "WEBSHOPS";
    });
    document.querySelectorAll(".slide-text-3").forEach((element) => {
      element.innerText = "BUSINESS CARDS";
    });
    document.querySelectorAll(".slide-text-4").forEach((element) => {
      element.innerText = "FLYERS";
    });
    document.querySelectorAll(".slide-text-5").forEach((element) => {
      element.innerText = "LOGO";
    });
    document.querySelectorAll(".slide-text-6").forEach((element) => {
      element.innerText = "BANNERS";
    });
    element(".sto-nudimo-heading").innerText = "Offers";
    element(".web-rjesenja-heading").innerText = "WEB SOLUTIONS";
    element(".web-rjesenja-prvi-tekst").innerText =
      "Online presence is a given today. Whether you want to attract attention, facilitate a purchase or simply highlight your online presence, we create custom";
    element(".web-rjesenja-yellow-text").innerText = "websites and webshops";
    element(".web-rjesenja-drugi-tekst").innerText =
      "that reflect your aesthetics and goals.";
    element(".graficki-dizajn-heading").innerText = "GRAPHIC DESIGN";
    element(".graficki-dizajn-prvi-text").innerText =
      "We do all kinds of graphic design for your business.";
    element(".graficki-dizajn-yellow-text").innerText =
      "From logos, business cards, brochures, flyers, banners, etc.";
    element(".graficki-dizajn-drugi-text").innerText =
      "We strive to highlight your uniqueness in creating attractive marketing materials that attract attention and generate revenue.";
    element(".mreze-heading").innerText = "SOCIALS";
    element(".mreze-prvi-text").innerText = "Regardless of whether it is about";
    element(".mreze-yellow-text").innerText =
      "regular updating of social profiles, creation of campaigns";
    element(".mreze-drugi-text").innerText =
      "that attract attention or using analytics to continuously improve performance, we are here to make your brand attractive and desirable.";
    element(".web-solutions-heading").innerText = "WEB SOLUTIONS";
    element(".graphic-heading").innerText = "GRAPHIC DESIGN";
    element(".marketing-heading").innerText = "SOCIALS MARKETING";
    element(".web-h2-heading").innerText =
      "We create high-quality websites and custom-made shops";
    element(".graficki-dizajn-h2-heading").innerText =
      "Do you need a logo, flyer, business card, banner or your own brand design?";
    element(".graficki-dizajn-solution-prvi-text").innerText =
      "Our specialty is making unique and recognizable ones ";
    element(".graficki-dizajn-solution-strong-text").innerText = "logo ";
    element(".graficki-dizajn-solution-drugi-text").innerText =
      "which will make your brand stand out from the competition. We provide creative and modernly designed websites that will attract visitors and improve user experience.";
    element(".graficki-dizajn-solution-treci-text").innerText =
      "Are you looking for attractive ";
    element(".graficki-dizajn-solution-strong-text-2").innerText =
      "leaflets and brochures ";
    element(".graficki-dizajn-solution-cetvrti-text").innerText =
      "to promote your products or services? We offer you a design that will stand out and attract the attention of the target audience. Your brand's visual identity is key to success.";
    element(".graficki-dizajn-solution-peti-text").innerText =
      "With our design, you can expect flawless digital design for your online campaigns, including ";
    element(".graficki-dizajn-solution-strong-text-3").innerText =
      "social networks, e-mail marketing and websites. ";
    element(".graficki-dizajn-solution-sesti-text").innerText =
      "The overall brand design is crucial for long-term success.";
    element(".oglasavanje-h2-heading").innerText =
      "Oglašavanje i vođenje društvenih mreža";
    element(".oglasavanje-prvi-text").innerText =
      "Naša usluga oglašavanja na društvenim mrežama uključuje pažljivo ";
    element(".oglasavanje-strong-text").innerText = "praćenje rezultata";
    element(".oglasavanje-drugi-text").innerText = "putem alata poput";
    element(".oglasavanje-strong-text-2").innerText = "Google Analytics-a";
    element(".oglasavanje-treci-text").innerText =
      "kako biste dobili dublji uvid u performanse vaših kampanja. Kroz pažljivo planiranje i praćenje rezultata, osiguravamo da svaki uloženi novac u oglašavanje na društvenim mrežama donosi maksimalnu vrijednost za vaš brend.";
    element(".oglasavanje-h2-heading").innerText =
      "Advertising and management of socials";
    element(".oglasavanje-prvi-text").innerText =
      "Our social media advertising service includes carefully ";
    element(".oglasavanje-strong-text").innerText = "monitoring results";
    element(".oglasavanje-drugi-text").innerText = "through tools like ";
    element(".oglasavanje-strong-text-2").innerText = "Google Analytics ";
    element(".oglasavanje-treci-text").innerText =
      "to get a deeper insight into the performance of your campaigns. Through careful planning and tracking of results, we ensure that every dollar invested in social media advertising brings maximum value to your brand.";
    element(".oglasavanje-cetvrti-text").innerText = "All aspects of ";
    element(".oglasavanje-strong-text-3").innerText =
      "managing social networks, including planning content, responding to comments and tracking analytics ";
    element(".oglasavanje-peti-text").innerText =
      "are part of our approach to ensuring your social media presence remains strong and relevant. Our social media team ensures that you regularly publish relevant and engaging content, increasing your audience's engagement and building brand loyalty.";
    element(".oglasavanje-sesti-text").innerText =
      "Online visibility is key to success in the digital age. Our strategy is focused on increasing yours ";
    element(".oglasavanje-strong-text-4").innerText =
      "online visibility through SEO, advertising and quality content. ";
    element(".oglasavanje-sedmi-text").innerText =
      "We understand that for today's consumer, online search is the first step towards decision making. Therefore, we work to make your brand easily accessible and recognizable in order to attract new customers and retain existing ones.";
    element(".proces-heading").innerText = "Website creation process";
    element(".proces-info-heading").innerText = "Info about the project";
    element(".proces-info-prvi-text").innerText =
      "Like any project, creating a website or web shop requires a certain information structure. Therefore,";
    element(".proces-info-strong-text").innerText =
      "you fill out one questionnaire";
    element(".proces-info-drugi-text").innerText =
      "in order to get as much information as possible about your business, and to clearly and successfully achieve your goal on the web.";
    element(".web-dizajn-heading").innerText = "Web design";
    element(".web-dizajn-prvi-text").innerText =
      "After we have collected all the necessary data, we can";
    element(".web-dizajn-strong-text").innerText =
      "desirable and attractive design.";
    element(".web-dizajn-drugi-text").innerText =
      "The most correct way is to always have a design before creating the page itself. The client is the one who has the last word regarding the design of the web project, and we owe it to him to turn his goal into reality.";
    element(".web-devlop-heading").innerText = "Web development";
    element(".web-devlop-prvi-text").innerText =
      "The design is approved and we get to work. As soon as possible, we are trying to develop optimized and high-quality code that will";
    element(".web-develop-strong-text").innerText =
      "turn the design into a stable and top-quality website or webshop.";
    element(".web-devlop-treci-text").innerText =
      "We never use a page builder that will create a website in a few clicks, but we do everything manually and expertly :).";
    element(".wf-heading").innerText = "PREMIUM WEBSITES AND SHOPS";
    element(".wf-platforma").innerText = "on the platform";
    element(".wf-button").innerText = "Explore Webflow";

    element(".portfolio-heading").innerText = "Portfolio of works";
    document
      .querySelectorAll(".see-web-heading")
      .forEach((item) => (item.innerText = "See website"));
    document
      .querySelectorAll(".projekt-label")
      .forEach((item) => (item.innerText = "Project name"));
    document
      .querySelectorAll(".projekt-tip-label")
      .forEach((item) => (item.innerText = "Project type"));
    document
      .querySelectorAll(".projekt-presentation-heading")
      .forEach((item) => (item.innerText = "Presentation site"));
    ("Presentation site");
    document
      .querySelectorAll(".projekt-tech-label")
      .forEach((item) => (item.innerText = "Used tehnologies"));
    document
      .querySelectorAll(".opis-label")
      .forEach((item) => (item.innerText = "Project description"));
    element(".aljmas-desc").innerText =
      "This website was created for the parish and shrine of the 'Shrine of Our Lady of Refuge in Aljmaš'. A beautiful and special project that required special attention and professionalism. It's about manual coding and end-to-end integration with cms Wordpress to make regular content entry easier.";
    element(".insta-desc").innerText =
      "This project is primarily related to the food blog of author Dragana Galac, whose brand and Instagram channel showcase the best of Dragana's kitchen. A handful of delicacies that will not leave you indifferent and in the end hungry 😉. In addition to the visual presentation of many specialties, there are also accompanying recipes that facilitate your preparation.";
    element(".modra-nit-desc").innerText =
      "The marketing agency specializes in the visibility of EU projects. The founder and sole owner of Modra nita is the Creative Development Association Slap from Osijek, which has been engaged in social entrepreneurship since 2000.";
    element(".slap-desc").innerText =
      "Association for creative development Slap from Osijek is an organization that deals with development projects through which it encourages social employment, socially responsible business, intersectoral cooperation and through its training center works on the sustainability of civil society organizations.";
    element(".tehnologije-heading").innerText = "Technologies we use";
    element(".faq-heading").innerText = "Frequently asked question";
    //// faq;
    element(".faq-1-heading").innerText = "Who we are?";
    element(".faq-1-paragraph").innerText =
      "Our website represents the heart of our business. We are a small team that professionally deals with web design, web development and graphic design. We proudly point out that we provide all our services legally and with high professionalism. Our passion is creating functional, aesthetically appealing and highly effective web solutions for our clients. We work with you to achieve your digital goals and enable you to stand out online. Get to know us better and let us shape your digital future together.";
    element(".faq-2-heading").innerText = "Do we redesign existing pages?";
    element(".faq-2-paragraph").innerText =
      "Of course, we can create websites completely from scratch. For security and quality reasons, we do not remake existing sites created by someone else, because such sites are often not maintained and may contain 'virus' components that represent a potential threat not only to you but also to other users of our web hosting services.";
    element(".faq-3-heading").innerText =
      "Why do we recommend creating a website using Webflow?";
    element(".faq-3-paragraph").innerText =
      "Webflow is a newer and high-quality platform for creating websites and shops. Webflow is the solution that we primarily recommend to every client. The advantage is in many levels. From hosting that is ultra-fast because it is Webflow's own, to the ability to actively monitor the client's creation of the website itself, performance, and also the protection itself, that is, the security of websites, which is unsurpassed. It is indeed a slightly more expensive option, but it is worth every cent.";
    element(".faq-4-heading").innerText =
      "How long does it take to deliver a website?";
    element(".faq-4-paragraph").innerText =
      "Once you have provided us with all the necessary materials, your pages will be completed within a time frame of 2 to 4 weeks, depending on the amount of content provided and the additional options you have previously selected.";
    element(".faq-5-heading").innerText =
      "Can we leave it up to you to update the content?";
    element(".faq-5-paragraph").innerText =
      "If you have the skills and the time, you can manage all the content yourself, including text, graphics and photos. However, if you want a completely worry-free experience, we recommend leaving that task to our experienced team. Our team will do it faster and with top quality, providing you with a turnkey service.";
    element(".faq-6-heading").innerText =
      "Are the domain and hosting included in the price?";
    element(".faq-6-paragraph").innerText =
      "They are not, the domain and hosting are not included in the price. Our offer refers exclusively to the creation of your web pages. If you do not already have a registered domain and hosting package, after we start creating the websites, we will arrange the domain and hosting details according to the needs of your new websites.";
    element(".faq-7-heading").innerText =
      "Do we use pre-made WordPress themes?";
    element(".faq-7-paragraph").innerText =
      "No, we mostly don't use ready-made Wordpress themes. Our team prefers manual coding of websites because it provides greater security, efficiency and adaptability. Hand-crafted sites are more secure because they don't have the potential vulnerabilities of off-the-shelf themes, adapt to client needs, and require less maintenance in the long run. This approach allows us to create websites that are faster, better adapted to your brand and sustainable in the long term.";
    element(".faq-8-heading").innerText = "What makes our service unique?";
    element(".faq-8-paragraph").innerText =
      "Our team codes each website by hand and every line of code is familiar to us and we know exactly what we are delivering. For this reason, the entire product is safe because it is adapted to your needs and your budget.";
    element(".faq-9-heading").innerText =
      "Is it necessary to pay monthly system maintenance?";
    element(".faq-9-paragraph").innerText =
      "Of course not. But for the safe and carefree operation of your sites, we strongly recommend that you leave the maintenance to us. Lack of regular updates can cause serious security vulnerabilities and increase the risk of malware, which can result in problems or even stop your site from working. Repairs after such incidents are often extremely expensive and sometimes even impossible. Your websites are based on the Wordpress CMS platform and require regular monitoring, upgrades and updates for optimal performance.";
    element(".konzultacije-heading").innerText = "Request a free consultation";
  }
  if (window.location.href.includes("graficki-dizajn")) {
    element(".grafika-heading").innerText = "GRAPHIC DESIGN PROJECTS";
  }
  document
    .querySelectorAll(".footer-item-link-usluge")
    .forEach((item) => (item.innerText = "Offers"));
  document
    .querySelectorAll(".footer-item-link-portfolio")
    .forEach((item) => (item.innerText = "Portfolio"));
  document
    .querySelectorAll(".footer-item-link-faq")
    .forEach((item) => (item.innerText = "FAQ"));
  document
    .querySelectorAll(".naziv-obrta")
    .forEach((item) => (item.innerText = "IT services company"));
  document
    .querySelectorAll(".footer-obrt-label-2")
    .forEach((item) => (item.innerText = "IT services company"));
}

function hrv() {
  if (
    window.location.href.includes("index") &&
    window.location.href.includes("/")
  ) {
    element(".hero__headline-row:nth-child(1)").innerText = "Transformiramo";
    element(".hero__headline-row:nth-child(2)").innerText = "Vaše ideje u";
    element(".hero__headline-row:nth-child(3)").innerText = "Digitalnu";
    element(".hero__headline-row:nth-child(4)").innerText = "Stvarnost";
    element(".lang-item-1").innerText = "USLUGE";
    element(".lang-item-2").innerText = "WEB PORTFOLIO";
    element(".lang-item-3").innerText = "GRAFIČKI DIZAJN";
    element(".lang-item-4").innerText = "ČESTO POSTAVLJENA PITANJA";
    element(".lang-item-5").innerText = "O NAMA";
    element(".hero__cta > p").innerText = "Istraži što sve nudimo";
    element(".hero__subheadline").innerText =
      "Efikasna i kvalitetna izrada web stranica, shopova, grafičkog dizajna, sve vrste digitalnog dizajna i marketinga po Vašoj mjeri";
    document.querySelectorAll(".slide-text-1").forEach((element) => {
      element.innerText = "WEB STRANICE";
    });
    document.querySelectorAll(".slide-text-2").forEach((element) => {
      element.innerText = "WEB SHOPOVI";
    });
    document.querySelectorAll(".slide-text-3").forEach((element) => {
      element.innerText = "VIZITKE";
    });
    document.querySelectorAll(".slide-text-4").forEach((element) => {
      element.innerText = "LETCI";
    });
    document.querySelectorAll(".slide-text-5").forEach((element) => {
      element.innerText = "LOGO";
    });
    document.querySelectorAll(".slide-text-6").forEach((element) => {
      element.innerText = "BANNERI";
    });
    element(".sto-nudimo-heading").innerText = "Što nudimo";
    element(".web-rjesenja-heading").innerText = "WEB RJEŠENJA";
    element(".web-rjesenja-prvi-tekst").innerText =
      "Online prisutnost je danas nešto što se podrazumijeva. Bilo da želite privući pažnju, olakšati kupnju ili jednostavno istaknuti svoju prisutnost na mreži, mi kreiramo prilagođene";
    element(".web-rjesenja-yellow-text").innerText =
      "web stranice i web shopove";
    element(".web-rjesenja-drugi-tekst").innerText =
      "koji odražavaju vašu estetiku i ciljeve.";
    element(".graficki-dizajn-heading").innerText = "GRAFIČKI DIZAJN";
    element(".graficki-dizajn-prvi-text").innerText =
      "Radimo sve vrste grafičkog dizajna za Vaš biznis.";
    element(".graficki-dizajn-yellow-text").innerText =
      "Od logotipa, vizitki, brošura, letaka, bannera i sl.";
    element(".graficki-dizajn-drugi-text").innerText =
      "Nastojimo istaknuti Vašu jedinstvenost u stvaranju atraktivnih marketinških materijala koji privlače pažnju i donose prihod.";
    element(".mreze-heading").innerText = "VOĐENJE DRUŠTVENIH MREŽA";
    element(".mreze-prvi-text").innerText = "Bez obzira radi li se o";
    element(".mreze-yellow-text").innerText =
      "redovnom ažuriranju društvenih profila, kreiranju kampanja";
    element(".mreze-drugi-text").innerText =
      "koje privlače pažnju ili korištenju analitike za kontinuirano poboljšanje performansi, mi smo tu da vaš brend bude atraktivan i poželjan.";
    element(".web-solutions-heading").innerText = "WEB RJEŠENJA";
    element(".graphic-heading").innerText = "GRAFIČKI DIZAJN";
    element(".marketing-heading").innerText = "DRUŠTVENE MREŽE";
    element(".web-h2-heading").innerText =
      "Izrađujemo kvalitetne web stranice i shopove po Vašoj mjeri";
    element(".graficki-dizajn-h2-heading").innerText =
      "Trebate logotip, letak, vizitku, baner ili vlastiti brand dizajn?";
    element(".graficki-dizajn-solution-prvi-text").innerText =
      "Naša specijalnost je izrada jedinstvenih i prepoznatljivih ";
    element(".graficki-dizajn-solution-strong-text").innerText = "logotipa ";
    element(".graficki-dizajn-solution-drugi-text").innerText =
      "koji će istaknuti vaš brend među konkurencijom. Pružamo kreativne i moderno dizajnirane web stranice koje će privući posjetitelje i poboljšati korisničko iskustvo.";
    element(".graficki-dizajn-solution-treci-text").innerText =
      "Tražite li privlačne ";
    element(".graficki-dizajn-solution-strong-text-2").innerText =
      "letke i brošure ";
    element(".graficki-dizajn-solution-cetvrti-text").innerText =
      "za promociju svojih proizvoda ili usluga? Mi vam nudimo dizajn koji će se istaknuti i privući pažnju ciljane publike. Vizualni identitet vašeg brenda ključan je za uspjeh.";
    element(".graficki-dizajn-solution-peti-text").innerText =
      "Uz naš dizajn, možete očekivati besprijekoran digitalni dizajn za vaše online kampanje, uključujući ";
    element(".graficki-dizajn-solution-strong-text-3").innerText =
      "društvene mreže, e-mail marketing i web stranice. ";
    element(".graficki-dizajn-solution-sesti-text").innerText =
      "Cjelokupni brand dizajn ključan je za dugoročni uspjeh.";
    element(".oglasavanje-h2-heading").innerText =
      "Oglašavanje i vođenje društvenih mreža";
    element(".oglasavanje-prvi-text").innerText =
      "Naša usluga oglašavanja na društvenim mrežama uključuje pažljivo ";
    element(".oglasavanje-strong-text").innerText = "praćenje rezultata";
    element(".oglasavanje-drugi-text").innerText = "putem alata poput ";
    element(".oglasavanje-strong-text-2").innerText = "Google Analytics-a ";
    element(".oglasavanje-cetvrti-text").innerText = "Svi aspekti ";
    element(".oglasavanje-strong-text-3").innerText =
      "vođenja društvenih mreža, uključujući planiranje sadržaja, odgovaranje na komentare i praćenje analitike ";
    element(".oglasavanje-peti-text").innerText =
      "dio su našeg pristupa koji osigurava da vaša prisutnost na društvenim mrežama ostaje jaka i relevantna. Naš tim za društvene mreže brine se za redovno objavljivanje relevantnog i privlačnog sadržaja, povećavajući angažman vaše publike i izgrađujući lojalnost prema vašem brendu.";
    element(".oglasavanje-sesti-text").innerText =
      "Vidljivost na internetu ključna je za uspjeh u digitalnom dobu. Naša strategija usmjerena je na povećanje vaše ";
    element(".oglasavanje-strong-text-4").innerText =
      "online vidljivosti kroz SEO, oglašavanje i kvalitetan sadržaj. ";
    element(".oglasavanje-sedmi-text").innerText =
      "Razumijemo da je današnji potrošač pretraga na internetu prvi korak prema donošenju odluka. Stoga radimo na tome da vaš brend bude lako dostupan i prepoznatljiv kako biste privukli nove klijente i zadržali postojeće.";
    element(".proces-heading").innerText = "Proces izrade websitea";
    element(".proces-info-heading").innerText = "Info o projektu";
    element(".proces-info-prvi-text").innerText =
      "Kao i svaki projekt, tako i izrada web stranice ili web shopa zahtijeva određenu informacijsku strukturu. Dakle, ";
    element(".proces-info-strong-text").innerText = "popunjavate jedan upitnik";
    element(".proces-info-drugi-text").innerText =
      "kako bi dobili što više informacija o Vašem biznisu kojim se bavite, te kako bi jasno i uspješno ostvarili Vaš cilj na webu.";
    element(".web-dizajn-heading").innerText = "Web dizajn";
    element(".web-dizajn-prvi-text").innerText =
      "Nakon što smo sve potrebne podatke prikupili možemo na";
    element(".web-dizajn-strong-text").innerText =
      "željeni i atraktivni dizajn.";
    element(".web-dizajn-drugi-text").innerText =
      "Najispravniji put je uvijek imati dizajn prije samog kreiranja stranice. Klijent je taj koji ima zadnju riječ vezano za dizajn web projekta, a mi smo mu dužni cilj pretvoriti u realnost.";
    element(".web-devlop-heading").innerText = "Web development";
    element(".web-devlop-prvi-text").innerText =
      "Dizajn je odobren i mi se bacamo na posao. U što kraćem roku se trudimo razviti optimiziran i kvalitetan kod koji će";
    element(".web-develop-strong-text").innerText =
      "dizajn pretvoriti u stabilan i vrhunski website ili webshop. ";
    element(".web-devlop-treci-text").innerText =
      "Nikad ne koristimo neki page builder koji će u par klikova stvoriti web nego sve radimo ručno i stručno :) .";
    element(".wf-heading").innerText = "PREMIUM WEB STRANICE I SHOPOVI";
    element(".wf-platforma").innerText = "na platformi";
    element(".wf-button").innerText = "Saznaj što je Webflow";

    element(".portfolio-heading").innerText = "Portfolio radova";
    document
      .querySelectorAll(".see-web-heading")
      .forEach((item) => (item.innerText = "Pogledaj website"));
    document
      .querySelectorAll(".projekt-label")
      .forEach((item) => (item.innerText = "Ime projekta"));
    document
      .querySelectorAll(".projekt-tip-label")
      .forEach((item) => (item.innerText = "Tip projekta"));
    document
      .querySelectorAll(".projekt-presentation-heading")
      .forEach((item) => (item.innerText = "Prezentacijska web stranica"));
    ("Prezentacijska stranica");
    document
      .querySelectorAll(".projekt-tech-label")
      .forEach((item) => (item.innerText = "Korištene tehnologije"));
    document
      .querySelectorAll(".opis-label")
      .forEach((item) => (item.innerText = "Opis projekta"));
    element(".aljmas-desc").innerText =
      "Ovaj website je rađen za župu i svetište 'Svetište Gospe od Utočišta u Aljmašu'. Jedan lijep i poseban projekt koji je zahtijevao posebnu pažnju i profesionalnost. Radi se o ručnom kodiranju i krajnjem povezivanju s cms Wordpressom da bi se redoviti sadržaj unosio lakše.";
    element(".modra-nit-desc").innerText =
      "Agencija je za marketing specijalizirana za vidljivost EU projekata. Osnivač i jedini vlasnik Modre niti je Udruga za kreativni razvoj Slap iz Osijeka, koja se od 2000. godine bavi socijalnim poduzetništvom.";
    element(".slap-desc").innerText =
      "Udruga za kreativni razvoj Slap iz Osijeka organizacija je koja se bavi razvojnim projektima kroz koje potiče socijalno zapošljavanje, društveno odgovorno poslovanje, međusektorsku suradnju te kroz svoj trening centar radi na održivosti organizacija civilnog društva.";
    element(".insta-desc").innerText =
      "Ovaj projekt prvenstveno se veže uz food blog autorice Dragane Galac čiji brand i kanal na Instagramu prikazuje najbolje iz Draganine kuhinje. Pregršt delicija koje Vas neće ostavit radvnodušnim i na koncu gladnim 😉. Osim što se bavi vizualnim prikazom mnogih specijaliteta, tu su prisutni i popratni recepti koji Vam olakšavaju pripremu.";
    element(".tehnologije-heading").innerText = "Tehnologije kojima se služimo";
    element(".faq-heading").innerText = "Često postavljena pitanja";
    element(".faq-1-heading").innerText = "Tko smo mi?";
    element(".faq-1-paragraph").innerText =
      "Naša web stranica predstavlja srce našeg obrta. Mi smo manji tim koji se profesionalno bavi web dizajnom, web developmentom i grafičkim dizajnom. S ponosom ističemo da sve naše usluge pružamo legalno i s visokim profesionalizmom. Naša strast je stvaranje funkcionalnih, estetski privlačnih i visoko učinkovitih web rješenja za naše klijente. Surađujemo s Vama kako bismo ostvarili vaše digitalne ciljeve i omogućili vam da se istaknete na internetu. Upoznajte nas bliže i dopustite nam da zajedno oblikujemo vašu digitalnu budućnost.";
    element(".faq-2-heading").innerText =
      "Da li radimo redizajn već postojećih stranica?";
    element(".faq-2-paragraph").innerText =
      "Naravno, možemo izraditi web stranice potpuno ispočetka. Iz sigurnosnih i kvalitativnih razloga, ne prepravljamo postojeće stranice koje je izradio netko drugi, jer takve stranice često nisu održavane i mogu sadržavati 'virusne' komponente koje predstavljaju potencijalnu prijetnju ne samo vama već i drugim korisnicima naših web hosting usluga.";
    element(".faq-3-heading").innerText =
      "Zašto preporučujemo izradu stranice putem Webflowa?";
    element(".faq-3-paragraph").innerText =
      "Webflow je novija i visokokvalitetna platforma za izradu web stranica i shopova. Webflow je rješenje koje preporučujemo svakom klijentu primarno. Prednost je u više razina. Od hostinga koji je ultrabrz jer je vlastiti od Webflowa, do mogućnosti aktivnog praćenja klijenta same izrade web stranice, performanse, pa do također same zaštite odnosno sigurnosti webova koja je nenadmašiva. Doista jeste malo skuplja opcija ali vrijedi svakog centa.";
    element(".faq-4-heading").innerText =
      "Koji je rok potreban da bi isporučili website?";
    element(".faq-4-paragraph").innerText =
      "Nakon što nam dostavite sve potrebne materijale, vaše stranice će biti završene unutar vremenskog okvira od 2 do 4 tjedna, s obzirom na količinu priloženog sadržaja i dodatnih opcija koje ste prethodno odabrali.";
    element(".faq-5-heading").innerText =
      "Da li Vam možemo prepustiti ažuriranje sadržaja?";
    element(".faq-5-paragraph").innerText =
      "Ako posjedujete vještine i imate dovoljno vremena, možete samostalno upravljati cjelokupnim sadržajem, uključujući tekst, grafiku i fotografije. Međutim, ako želite potpuno bezbrižno iskustvo, preporučujemo da prepustite taj zadatak našem iskusnom timu. Naša ekipa će to obaviti brže i s vrhunskom kvalitetom, pružajući vam uslugu 'ključ u ruke'.";
    element(".faq-6-heading").innerText =
      "Da li su domena i hosting uključeni u cijenu?";
    element(".faq-6-paragraph").innerText =
      "Nisu, domena i hosting nisu uključeni u cijenu. Naša ponuda se odnosi isključivo na izradu vaših web stranica. Ako već nemate registriranu domenu i hosting paket, nakon što započnemo s izradom web stranica, dogovorit ćemo detalje vezane uz domenu i hosting prema potrebama vaših novih web stranica.";
    element(".faq-7-heading").innerText =
      "Koristimo li već izrađene WordPress teme?";
    element(".faq-7-paragraph").innerText =
      "Ne, većinom ne koristimo gotove Wordpress teme. Naš tim preferira ručno kodiranje web stranica jer ono pruža veću sigurnost, efikasnost i prilagodljivost. Ručno izrađene stranice su sigurnije jer nemaju potencijalne ranjivosti gotovih tema, prilagođavaju se potrebama klijenata i zahtijevaju manje održavanja u dugoročnoj perspektivi. Ovaj pristup omogućava nam stvaranje web stranica koje su brže, bolje prilagođene vašem brendu i dugoročno održive.";
    element(".faq-8-heading").innerText = "Po čemu je naša usluga jedinstvena?";
    element(".faq-8-paragraph").innerText =
      "Naš tim svaku web stranicu kodira ručno te je svaki redak koda poznat nama i znamo točno što isporučujemo. Iz tog razloga cijeli proizvod je siguran jer je prilagođen Vašim potrebama i Vašem budžetu.";
    element(".faq-9-heading").innerText =
      "Da li je neophodno plaćati mjesečno održavanje sustava?";
    element(".faq-9-paragraph").innerText =
      "Naravno da nije. No za siguran i bezbrižan rad vaših stranica, toplo preporučujemo da održavanje prepustite nama. Nedostatak redovitih ažuriranja može uzrokovati ozbiljne sigurnosne ranjivosti i povećati rizik od malwarea, što može rezultirati problemima ili čak prestankom rada vaših stranica. Popravci nakon takvih incidenata često su izuzetno skupi i ponekad čak nemogući. Vaše web stranice temelje se na Wordpress CMS platformi i zahtijevaju redovito nadgledanje, nadogradnje i ažuriranja radi optimalne performanse.";
    element(".konzultacije-heading").innerText =
      "Zatražite besplatne konzultacije";
  }
  if (window.location.href.includes("graficki-dizajn")) {
    element(".grafika-heading").innerText = "PROJEKTI GRAFIČKOG DIZAJNA";
  }

  document
    .querySelectorAll(".footer-item-link-usluge")
    .forEach((item) => (item.innerText = "Usluge"));
  document
    .querySelectorAll(".footer-item-link-portfolio")
    .forEach((item) => (item.innerText = "Portfolio"));
  document
    .querySelectorAll(".footer-item-link-faq")
    .forEach((item) => (item.innerText = "Često postavljena pitanja"));
  document
    .querySelectorAll(".naziv-obrta")
    .forEach((item) => (item.innerText = "Obrt za računalno programiranje"));
  document
    .querySelectorAll(".footer-obrt-label-2")
    .forEach((item) => (item.innerText = "Obrt za računalno programiranje"));
}

let webSolutionsBtnbs = document.querySelectorAll(".web-solution-btn");
webSolutionsBtnbs.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const obj = [
      {
        lang: "hrv",
        id: "custom-code",
        text: `Custom code rješenje je rješenje koje naš tim prihvaća jedino ukoliko to izričito kupac želi, što zbog potrebnog transparentnog koda na Github u i daljnje, moguće aplikativne nadogradnje, a što zbog određenih detalja koje primjerice neki page builderi ne mogu izvesti.`,
        img: "/assets/images/custom-code-tab.svg",
      },
      {
        lang: "hrv",
        id: "wordpress",
        text: `WordPress je najpoznatija platforma za izradu web stranica i blogova. Omogućava korisnicima lako prilagodljiv izgled i funkcionalnost svojih web stranica. WordPress je jednostavan za upotrebu i podržava upravljanje sadržajem putem CMS-a, uključujući blogove, galerije i e-trgovinu. Sa velikom zajednicom i bogatim ekosistemom, WordPress je popularan izbor za razvoj web stranica svih vrsta, od osobnih blogova do korporativnih sajtova i online shopova.`,
        img: "/assets/images/wp-tab.svg",
      },
      {
        lang: "hrv",
        id: "webflow",
        text: `Webflow je visokokvalitetna platforma za izradu web stranica koja kombinira jednostavan vizualni dizajn s naprednim mogućnostima kodiranja. Sa svojim vizualnim alatom, korisnici mogu brzo kreirati privlačne web stranice, bez potrebe za pisanjem koda. Takođe pruža funkcionalnosti kao što su CMS za upravljanje sadržajem, responsivni dizajn za prilagodbu na različite uređaje, interaktivne animacije i hosting. Webflow takođe omogućava prilagodljivost i kontrolu putem pristupa kodu za one sa više tehničkog iskustva. Svi ovi elementi čine Webflow popularnim izborom za razvoj web stranica.`,
        img: "/assets/images/webflow-tab.svg",
      },
      {
        lang: "eng",
        id: "custom-code",
        text: `A custom code solution is a solution that our team accepts only if the customer specifically wants it, due to the necessary transparent code on Github and further, possible application upgrades, and due to certain details that, for example, some page builders cannot perform.`,
        img: "/assets/images/custom-code-tab.svg",
      },
      {
        lang: "eng",
        id: "wordpress",
        text: `WordPress is the most famous platform for creating websites and blogs. It allows users to easily customize the appearance and functionality of their websites. WordPress is easy to use and supports CMS content management, including blogs, galleries and e-commerce. With a large community and a rich ecosystem, WordPress is a popular choice for developing websites of all kinds, from personal blogs to corporate sites and online shops.`,
        img: "/assets/images/wp-tab.svg",
      },
      {
        lang: "eng",
        id: "webflow",
        text: `Webflow is a high-quality website building platform that combines simple visual design with advanced coding capabilities. With its visual tool, users can quickly create attractive web pages, without the need to write code. It also provides functionalities such as CMS for content management, responsive design to adapt to different devices, interactive animations and hosting. Webflow also allows customization and control through code access for those with more technical experience. All these elements make Webflow a popular choice for website development.`,
        img: "/assets/images/webflow-tab.svg",
      },
    ];
    const modal = document.createElement("div");
    const modalImg = document.createElement("img");
    modal.classList.add("web-modal");
    modal.setAttribute("aria-expanded", "true");
    modal.setAttribute("aria-label", "Web solutions for you");
    const paragraph = document.createElement("p");
    paragraph.classList.add("solution--webdesign-paragraph");
    const abc = btn.dataset.tab;
    document.querySelectorAll(".language-form__option").forEach((option) => {
      if (option.dataset.active === "true") {
        let curentLang = option.firstElementChild.dataset.value;
        const solutionItemLang = obj.filter((obj) => {
          return obj.id === abc;
        });
        let filteredItems = solutionItemLang;
        let buc = filteredItems.find((obj) => obj.lang === curentLang);

        paragraph.innerText = buc.text;
        modalImg.src = buc.img;
        modal.append(modalImg, paragraph);
        createOverlay(modal);
      }
    });
  });
});
