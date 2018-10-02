// import '@babel/polyfill';

import '../css/main.scss';
import '../html/index.html';
import './cube';
// import './contact';
import Explosion from '../images/explosion.gif';

const sizeInput = document.querySelector('.slider input');
const sizeInputP = document.querySelector('.slider p');
const sizeTrack = document.querySelector('.track');
const applyButton = document.querySelector('#apply');
const check = document.querySelectorAll('.menu-hold input.check');
const checkLabel = document.querySelectorAll('.menu-hold input.check + label');
const headline = document.querySelector('h1');
const seconds = document.querySelector('select');
const secondsLabel = document.querySelector('label[for="sec"]');
const secondsDiv = document.querySelector('select + div');
const explode = document.querySelectorAll('.explode');
const pb = document.querySelectorAll('.photo-cube');
const destroyBtn = secondsDiv.querySelector('button');
const subhead = document.querySelectorAll('.subhead:nth-of-type(odd)');
const desc = document.querySelectorAll('.subhead:nth-of-type(even)');
check[0].checked = false;
check[1].checked = false;
seconds.value = 0;
sizeInput.value = 220;
function loopPanels(bool, text) {
  [0, 2, 3, 4].forEach((ind) => {
    pb[1].children[ind].setAttribute('gif', bool);
  });
  checkLabel[0].textContent = text;
}
check[0].addEventListener('change', (e) => {
  if (e.target.checked) {
    loopPanels(true, 'GIFs!');
  } else {
    loopPanels(false, 'no GIFs');
  }
});
check[1].addEventListener('change', (e) => {
  if (e.target.checked) {
    fetch(Explosion)
      .then(res => (res.status !== 200
        ? console.log(`there was a problem fetching the resource. Status Code and Text: ${res.status}, ${res.statusText}`)
        : res.blob()))
      .then((res) => {
        const objectURL = URL.createObjectURL(res);
        explode[0].src = objectURL;
        explode[1].src = objectURL;
      })
      .catch(err => console.log('Fetch error: ', err));
    checkLabel[1].textContent = 'DESTROY!';
    seconds.style.display = 'block';
    secondsLabel.style.display = 'block';
    secondsDiv.style.display = 'block';
    seconds.removeAttribute('disabled');
  } else {
    checkLabel[1].textContent = 'do not destroy';
    seconds.style.display = 'none';
    secondsLabel.style.display = 'none';
    secondsDiv.style.display = 'none';
    seconds.setAttribute('disabled', '');
  }
});
function destroyCube(cube) {
  cube.addEventListener('animationend', () => {
    headline.style.marginBottom = '0';
    cube.style.display = 'none';
    cube.parentNode.style.display = 'none';
    for (let i = 0; i < 2; i += 1) {
      subhead[i].style.display = 'none';
      desc[i].style.display = 'none';
    }
    if (window.innerWidth < 768) {
      explode[0].style.display = 'block';
      explode[0].style.width = '560px';
      explode[0].style.height = '420px';
      explode[0].style.marginTop = `${-167 + (document.documentElement.clientHeight / 2) - 210}px`;
    } else {
      explode[0].style.display = 'block';
      explode[1].style.display = 'block';
      explode[0].style.marginTop = `${((sizeInput.value - 220) / 3) + 26}px`;
      explode[1].style.marginTop = `${((sizeInput.value - 220) / 3) + 0}px`;
    }
  });
  cube.classList.add('blowup');
  setTimeout(() => {
    explode[0].style.display = 'none';
    explode[1].style.display = 'none';
  }, (seconds.value * 1000) + 5490);
}
destroyBtn.addEventListener('click', () => {
  destroyCube(pb[0]);
  destroyCube(pb[1]);
});
function handleSelectUpdate() {
  const suffix = this.dataset.sizing;
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}
seconds.addEventListener('change', handleSelectUpdate);
sizeInput.addEventListener('focus', () => {
  sizeInput.parentNode.style.border = '3px white solid';
});
sizeInput.addEventListener('blur', () => {
  sizeInput.parentNode.style.border = 'none';
});
function handleRangeUpdate() {
  const width = this.max - this.min;
  const perc = Math.floor(((this.value - width) / width) * 100) / 100;
  sizeInputP.textContent = `<\u00A0\u00A0\u00A0${this.value}px\u00A0\u00A0\u00A0>`;
  sizeTrack.style.width = `${perc * 142}px`;
  sizeTrack.style.backgroundColor = `hsl(${perc * 720}, 65%, 30%)`;
}
sizeInput.addEventListener('change', handleRangeUpdate);
sizeInput.addEventListener('mousemove', handleRangeUpdate);
applyButton.addEventListener('click', () => {
  document.documentElement.style.setProperty('--size', `${sizeInput.value}px`);
});

function getComponent() {
  return import(/* webpackChunkName: "contact" */ './contact').then(({ default: default }) => {

  }).catch(err => 'error happened');
}


setTimeout(getComponent, 6545);












// 15
