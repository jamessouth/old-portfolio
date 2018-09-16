import '@babel/polyfill';

import './web-animations-next.min';


import '../css/styles.css';
import '../html/index.html';

import './cube';
import './contact';

import Explosion from '../images/explosion.gif';

import Project7 from '../images/project7.jpg';
import Project9 from '../images/project9.jpg';
import Project10 from '../images/project10.jpg';
import Project11 from '../images/project11.jpg';

import Project7GIF from '../images/p7.gif';
import Project9GIF from '../images/p9.gif';
import Project10GIF from '../images/p10.gif';
import Project11GIF from '../images/p11.gif';


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


const proj7 = pb[1].querySelector('.front');
const proj9 = pb[1].querySelector('.right');
const proj10 = pb[1].querySelector('.back');
const proj11 = pb[1].querySelector('.top');

check[0].addEventListener('change', (e) => {
  if (e.target.checked) {
    checkLabel[0].textContent = 'GIFs!';
    proj7.style.backgroundImage = `url(${Project7GIF})`;
    proj9.style.backgroundImage = `url(${Project9GIF})`;
    proj10.style.backgroundImage = `url(${Project10GIF})`;
    proj11.style.backgroundImage = `url(${Project11GIF})`;
  } else {
    checkLabel[0].textContent = 'no GIFs';
    proj7.style.backgroundImage = `url(${Project7})`;
    proj9.style.backgroundImage = `url(${Project9})`;
    proj10.style.backgroundImage = `url(${Project10})`;
    proj11.style.backgroundImage = `url(${Project11})`;
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
