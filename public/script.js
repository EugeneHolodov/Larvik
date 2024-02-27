const repeatingSection = document.querySelector(".repeating-section");
const allRepeatingSections = document.querySelectorAll(".repeating-section");
const cardConteinerOrSwiper = repeatingSection.querySelector(
  ".repeating-section__card-conteiner"
);
const cardWrapperOrSwiperWrapper = repeatingSection.querySelector(
  ".repeating-section__card-wrapper"
);
const cards = repeatingSection.querySelectorAll(".repeating-section__card");

const swiperPagination = document.querySelector(".swiper-pagination");

const swiperButtonPrev = document.querySelector(".swiper-button-prev");
const swiperButtonNext = document.querySelector(".swiper-button-next");

// Function for castom cards color
function changeSectionsColor(sectionsId, color, linesColor, cardsBorderColor) {
  const section = document.querySelector(`#${sectionsId}`);
  const line = section.querySelector(".line");
  const titlesBackground = section.querySelector(
    ".repeating-section__title-ivent-svg path"
  );
  const cards = section.querySelectorAll(".card");
  line.style.backgroundColor = linesColor;
  titlesBackground.style.fill = color;
  titlesBackground.style.fillOpacity = 1;
  section.querySelectorAll(".swiper-button").forEach((btn) => {
    btn.style.color = cardsBorderColor;
  });
  cards.forEach((card) => {
    card.style.backgroundColor = color;
    card.style.borderColor = cardsBorderColor;
  });
}

function addCardsIntoSection(
  sectionsId,
  firstCardInfo,
  secondCardInfo,
  thirdCardInfo,
  fourthCardInfo
) {
  const section = document.querySelector(`#${sectionsId}`);
  const cardsCanteiners = section.querySelectorAll(".repeating-section__card");
  const cardsObj = {
    0: firstCardInfo,
    1: secondCardInfo,
    2: thirdCardInfo,
    3: fourthCardInfo,
  };

  cardsCanteiners.forEach((cardsWrapper, index) =>
    cardsWrapper.insertAdjacentHTML(
      "afterbegin",
      `<div class="card">
  <div class="card__inner">
    <div class="card__svg" style=" background-image: url('./svg/card${
      index + 1
    }-second-section.svg')"></div>
    <div class="card__inner-wrapper">
      <div class="card__title">
        <h4 class="card__title-first">${cardsObj[index][0]}</h4>
        <h5 class="card__title-second">${cardsObj[index][1]}</h5>
      </div>
      <div class="card__info-wrapper">
        <p class="card__text">
          <svg class="card__text-svg">
            <use xlink:href="./svg/icons.svg#Type icon"></use>
          </svg>
          ${cardsObj[index][2]}
        </p>
      
        <p class="card__text">
          <svg class="card__text-svg">
            <use xlink:href="./svg/icons.svg#Date icon"></use>
          </svg>
          ${cardsObj[index][3]}
        </p>
        <p class="card__text">
          <svg class="card__text-svg">
            <use xlink:href="./svg/icons.svg#Sted icon"></use>
          </svg>
            kl. ${cardsObj[index][4]}
        </p>
        <p class="card__text">
          <svg class="card__text-svg">
            <use xlink:href="./svg/icons.svg#Klokka icon"></use>
          </svg>
          ${cardsObj[index][5]}
        </p>
      </div>
    
    </div>
  </div>`
    )
  );
}
const cardsInforArr = [
  "Navn på en aktivivtet",
  "Arrangører",
  "Tønsberg",
  "Barn og unge",
  "17:00",
  "24.11.2023",
];

addCardsIntoSection(
  "first-section",
  cardsInforArr,
  cardsInforArr,
  cardsInforArr,
  cardsInforArr
);
changeSectionsColor("first-section", "#F0D5AC", "#8FD8D5", "#876D4C");

addCardsIntoSection(
  "second-section",
  cardsInforArr,
  cardsInforArr,
  cardsInforArr,
  cardsInforArr
);
changeSectionsColor("second-section", "#C8EED7", "#6CC0A2", "#126C0F");

addCardsIntoSection(
  "third-section",
  cardsInforArr,
  cardsInforArr,
  cardsInforArr,
  cardsInforArr
);
changeSectionsColor("third-section", "#F7C1C1", "#F7C1C1", "#B54147");

addCardsIntoSection(
  "fourth-section",
  cardsInforArr,
  cardsInforArr,
  cardsInforArr,
  cardsInforArr
);
changeSectionsColor("fourth-section", "#DFF3CF", "#DFF3CF", "#316D00");

function toggleInactive() {
  allRepeatingSections.forEach((section) => {
    const elements = [
      section.querySelector(".swiper-pagination"),
      section.querySelector(".swiper-button-prev"),
      section.querySelector(".swiper-button-next"),
    ];
    elements.forEach((element) => {
      element.classList.toggle("inactive");
    });
  });
}
function toggleSlidesStyles() {
  allRepeatingSections.forEach((section) => {
    section
      .querySelector(".repeating-section__card-conteiner")
      .classList.toggle("swiper");
    section
      .querySelector(".repeating-section__card-conteiner")
      .classList.toggle("swiper--inactive");

    section
      .querySelector(".repeating-section__card-wrapper")
      .classList.toggle("swiper-wrapper");
    section
      .querySelector(".repeating-section__card-wrapper")
      .classList.toggle("swiper-wrapper--inactive");

    section.querySelectorAll(".repeating-section__card").forEach((element) => {
      element.classList.toggle("swiper-slide");
    });
  });
}

let swipers = []; 

function initSwiper() {
  toggleInactive();
  toggleSlidesStyles();

  const swiperElements = document.querySelectorAll('.swiper');
  swiperElements.forEach(element => {
    const swiper = new Swiper(element, {
      loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    effect: "flip",
    flipEffect: {
      slideShadows: true,
    },
    });
    swipers.push(swiper);
  });
}
function destroySwiper() {
  toggleInactive();
  toggleSlidesStyles();
  
  swipers.forEach(swiper => swiper.destroy(true, true));
  swipers = [];
}
let previousWidth = window.innerWidth;

function handleWidthChange() {
  let currentWidth = window.innerWidth;

  if (previousWidth > 650 && currentWidth <= 650) {
    initSwiper();
  } else if (previousWidth <= 650 && currentWidth > 650) {
    destroySwiper();
  }

  previousWidth = currentWidth;
}

if (window.innerWidth <= 650) {
  initSwiper();
}

window.addEventListener("resize", handleWidthChange);

const renderCircles = () => {

  document.querySelectorAll(".circle").forEach((circle) => circle.remove());

  const line = document.querySelectorAll(".line");
  line.forEach(function (e, index) {

    if (e.offsetWidth >= window.innerWidth) {
      const totalCircles = 20; // Например, вы хотите 10 шариков на экране
      const spacingPercent = 100 / totalCircles;
      for (let i = 0; i < totalCircles; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        if (index == 0) {
          circle.classList.add(i % 2 === 0 ? "color1" : "color2");
        } else if (index == 1) {
          circle.classList.add(i % 2 === 0 ? "color3" : "color4");
        } else if (index == 2) {
          circle.classList.add(i % 2 === 0 ? "color1" : "color2");
        } else if (index == 3) {
          circle.classList.add(i % 2 === 0 ? "color5" : "color6");
        }

        circle.style.left = i * spacingPercent + "%"; // Задаем позицию в процентах
        e.appendChild(circle);
      }
    }
  });
};

// Вызовите функцию при первой загрузке страницы
renderCircles();

// И вызывайте функцию при изменении размера окна
window.addEventListener("resize", renderCircles);

// Функция для переключения цветов
const toggleCircleColors = () => {
  const colorMapping = {
    color1: "color2",
    color2: "color1",
    color3: "color4",
    color4: "color3",
    color5: "color6",
    color6: "color5",
  };

  document.querySelectorAll(".circle").forEach((circle) => {
    for (let color in colorMapping) {
      if (circle.classList.contains(color)) {
        circle.classList.remove(color);
        circle.classList.add(colorMapping[color]);
        break; // выход из цикла, так как цвет был найден
      }
    }
  });
};

// Запустите функцию каждую секунду
setInterval(toggleCircleColors, 1000);

const menuBtn = document.querySelector(".header__btn");
const menu = document.querySelector(".menu__list");

menuBtn.addEventListener("click", () =>
  menu.classList.toggle("menu__list--active")
);
