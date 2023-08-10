//'use strict'

const line = document.querySelectorAll('.line');

line.forEach(e=>{
  for (let i = 0; i < e.offsetWidth / 35; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.left = i * 35 + 'px';
    circle.style.backgroundColor = i % 2 === 0 ? '#CE3A42' : '#2A9F75';
    e.appendChild(circle);
  }

})


