function createSnowfall(section) {
  const canvas = document.createElement("canvas");
  canvas.classList.add("canvasStyle");
  canvas.width = section.offsetWidth;
  canvas.height = section.offsetHeight;
  section.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let snowflakes = [];
  const maxSnowflakes = window.innerWidth < 650 ? 30 : 40;

  function resizeCanvas() {
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  function createSnowflakes() {
    const radius = window.innerWidth < 650 ? 4 : 10;
    for (let i = 0; i < maxSnowflakes; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + radius,
        speed: Math.random() * 3 + 1,
      });
    }
  }

  function updateSnowflakes() {
    const radius = window.innerWidth < 650 ? 4 : 10;
    snowflakes.forEach((snowflake, index) => {
      snowflake.y += snowflake.speed;
      if (snowflake.y > canvas.height) {
        snowflakes[index] = {
          x: Math.random() * canvas.width,
          y: 0,
          radius: Math.random() * 4 + radius,
          speed: Math.random() * 3 + 1,
        };
      }
    });
  }

  function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#DCF2FF";
    snowflakes.forEach((snowflake) => {
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  function animate() {
    updateSnowflakes();
    drawSnowflakes();
    requestAnimationFrame(animate);
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  createSnowflakes();
  animate();
}
window.onload = function () {
  const sections = document.querySelectorAll(".repeating-section");
  sections.forEach((section) => createSnowfall(section));
};
