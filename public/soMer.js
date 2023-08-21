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

        circle.classList.add(i % 2 === 0 ? "color1" : "color2");

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

// Запустить функцию каждую секунду
setInterval(toggleCircleColors, 1000);



const map = L.map("map").setView([59.0529105,10.0314226], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([59.0529105,10.0314226])
  .addTo(map)
  .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
  .openPopup();


const menuBtn = document.querySelector('.header__btn')
const menu = document.querySelector('.menu__list')

menuBtn.addEventListener('click', () => menu.classList.toggle('menu__list--active'))
