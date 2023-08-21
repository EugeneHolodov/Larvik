//'use strict'


const renderCircles = () => {
  // Удалите все предыдущие круги
  document.querySelectorAll(".circle").forEach((circle) => circle.remove());

  const line = document.querySelectorAll(".line");
  line.forEach(function (e, index) {
    // Если ширина line больше или равна ширине окна, только тогда рендерим шарики
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

let containers = document.querySelectorAll(".snow-container");

let dimensions = {};

function updateDimensions() {
  containers.forEach((container, index) => {
    dimensions[index] = {
      width: container.offsetWidth,
      height: container.offsetHeight,
    };
  });
}

function createSnowflakeForContainer(container, index) {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.style.left = `${Math.random() * dimensions[index].width}px`;
  snowflake.style.top = `${-20}px`;
  container.appendChild(snowflake);

  let speed = 0.5 + Math.random() * 2;
  let rotation = 0;
  let rotationSpeed = (Math.random() - 0.5) * 0.1;

  function animate() {
    if (snowflake.offsetTop < dimensions[index].height) {
      snowflake.style.top = `${snowflake.offsetTop + speed}px`;
      rotation += rotationSpeed;
      snowflake.style.transform = `rotate(${rotation}rad)`;
      requestAnimationFrame(animate);
    } else {
      container.removeChild(snowflake);
    }
  }

  animate();
}

function createSnowflake() {
  containers.forEach((container, index) => {
    createSnowflakeForContainer(container, index);
  });
}

updateDimensions();
window.addEventListener("resize", updateDimensions);
if (window.innerWidth <= 650) {
  setInterval(createSnowflake, 500);
} else {
  setInterval(createSnowflake, 200);
}

//_________________________________________________________________________
let currentSlide = {};

function getSectionFromChild(child) {
  while (child && !child.matches(".snow-section-container")) {
    child = child.parentElement;
  }
  return child;
}

function wrapCards(section) {
  if (section.dataset.sliderWrapped === "true") return;

  const cards = section.querySelectorAll(".card");
  const outerContainer = document.createElement("div");
  const innerContainer = document.createElement("div");

  outerContainer.className = "slider-wrapper";
  innerContainer.className = "slider";

  outerContainer.appendChild(innerContainer);
  cards.forEach((card) => {
    innerContainer.appendChild(card);
  });

  section.appendChild(outerContainer);
  createDots(section);

  section.dataset.sliderWrapped = "true";
}

function unwrapCards(section) {
  if (section.dataset.sliderWrapped !== "true") return;

  const sliderWrapper = section.querySelector(".slider-wrapper");
  const cards = section.querySelectorAll(".card");
  const oldPlaceForCards = section.querySelector(".grid-container");

  cards.forEach((card) => {
    oldPlaceForCards.appendChild(card);
  });

  section.removeChild(sliderWrapper);
  const dotsWrapper = section.querySelector(".dots-wrapper");
  if (dotsWrapper) section.removeChild(dotsWrapper);

  section.dataset.sliderWrapped = "false";
}

function handleResize() {
  const sections = document.querySelectorAll(".snow-section-container");
  sections.forEach((section) => {
    if (window.innerWidth < 650) {
      wrapCards(section);
    } else {
      unwrapCards(section);
    }
  });
}

function getSectionKey(section) {
  return section.dataset.sectionKey || section.className;
}

function showSlide(section, slideIndex) {
  const sectionKey = getSectionKey(section);
  const totalSlides = section.querySelectorAll(".card").length;

  if (slideIndex < 0) {
    slideIndex = totalSlides - 1;
  } else if (slideIndex >= totalSlides) {
    slideIndex = 0;
  }

  currentSlide[sectionKey] = slideIndex;
  updateSlidePosition(section);
}

function createDots(section) {
  const slider = section.querySelector(".slider");
  const dotsWrapper = document.createElement("div");

  dotsWrapper.className = "dots-wrapper";

  const totalSlides = slider.children.length;
  dotsWrapper.innerHTML = "";

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.className = "dot";
    if (i === currentSlide[getSectionKey(section)]) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", function () {
      showSlide(section, i);
    });

    dotsWrapper.appendChild(dot);
  }
  section.appendChild(dotsWrapper);
}

function updateDots(section) {
  const dots = section.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    if (index === currentSlide[getSectionKey(section)]) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function updateSlidePosition(section) {
  const slider = section.querySelector(".slider");
  const offset = -currentSlide[getSectionKey(section)] * 100;
  slider.style.transform = `translateX(${offset}%)`;

  updateDots(section);
}

function handleNextButtonClick(event) {
  if (window.innerWidth > 650) return;
  const section = getSectionFromChild(event.target);
  moveSlideForward(section);
}

function handlePrevButtonClick(event) {
  if (window.innerWidth > 650) return;
  const section = getSectionFromChild(event.target);
  moveSlideBackward(section);
}
function moveSlideForward(section) {
  const sectionKey = getSectionKey(section);
  const newSlideIndex = (currentSlide[sectionKey] || 0) + 1;
  showSlide(section, newSlideIndex);
}

function moveSlideBackward(section) {
  const sectionKey = getSectionKey(section);
  const newSlideIndex = (currentSlide[sectionKey] || 0) - 1;
  showSlide(section, newSlideIndex);
}
function initSliderEvents() {
  document.querySelectorAll(".nextBtn").forEach((btn) => {
    btn.addEventListener("click", handleNextButtonClick);
  });

  document.querySelectorAll(".prevBtn").forEach((btn) => {
    btn.addEventListener("click", handlePrevButtonClick);
  });
}

function addSwipeFunctionalityForSliders() {
  const sliders = document.querySelectorAll(".slider-wrapper");

  sliders.forEach((slider) => {
    let touchStartX = null;

    slider.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].screenX;
    });

    slider.addEventListener("touchend", (event) => {
      if (window.innerWidth > 650) return;
      const touchEndX = event.changedTouches[0].screenX;
      handleSwipe(slider, touchStartX, touchEndX);
    });
  });
}

function handleSwipe(slider, touchStartX, touchEndX) {
  const section = getSectionFromChild(slider);
  const sectionKey = getSectionKey(section);
  let newSlideIndex = currentSlide[sectionKey] || 0;

  if (touchEndX - touchStartX > 50) {
    newSlideIndex--;
  } else if (touchStartX - touchEndX > 50) {
    newSlideIndex++;
  }

  showSlide(section, newSlideIndex);
}

window.addEventListener("resize", function () {
  handleResize();
  addSwipeFunctionalityForSliders();
  initSliderEvents();
});

window.addEventListener("DOMContentLoaded", function () {
  initSliderEvents();
  handleResize();
  addSwipeFunctionalityForSliders();
});


const menuBtn = document.querySelector(".header__btn");
const menu = document.querySelector(".menu__list");

menuBtn.addEventListener("click", () =>
  menu.classList.toggle("menu__list--active") 
);