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
  if (window.location.href.includes("index")) {
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

  // -------------------- END OF GRAFICKI DIZJAN
}

//////// 💡💡💡💡💡

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
      const filteredProject = projects.filter((obj) => obj.id === projectBtn);
      const imgs = filteredProject[0].images.map((img) => {
        return `<img src="/assets/images/project-imgs/img (${img}).png" alt="image">`;
      });
      const project = filteredProject
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

      if (
        !asideBarProjectWrapper.classList.contains("opened-project-layout") &&
        !asideBarProjects.classList.contains("aside-projects") &&
        !layoutBtn.classList.contains("active")
      ) {
        asideBarProjectWrapper.classList.add("opened-project-layout");
        asideBarProjects.classList.add("aside-projects");
        layoutBtn.classList.add("active");
      }

      projectsWrapper.setAttribute("data-opened", "true");
      projectsWrapper.innerHTML = project;

      galleryFunction();
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

////////// 💡💡💡💡💡

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

// OVERLAY FUNCTION

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
