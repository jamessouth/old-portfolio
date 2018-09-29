import Project1 from '../images/project1.jpg';
import Project2 from '../images/project2.jpg';
import Project3 from '../images/project3.jpg';
import Project4 from '../images/project4.jpg';
import Project5 from '../images/project5.jpg';
import Project6 from '../images/project6.jpg';
import Project7 from '../images/project7.jpg';
import Project8 from '../images/project8.jpg';
import Project9 from '../images/project9.jpg';
import Project10 from '../images/project10.jpg';
import Project11 from '../images/project11.jpg';
import Project12 from '../images/project12.jpg';
import Project7GIF from '../images/p7.gif';
import Project9GIF from '../images/p9.gif';
import Project10GIF from '../images/p10.gif';
import Project11GIF from '../images/p11.gif';

const pb = document.querySelectorAll('.photo-cube');
const cc = document.querySelectorAll('.cube-container');
const hold = document.querySelector('.hold');
const subhead = hold.querySelectorAll('.subhead:nth-of-type(odd)');
const desc = hold.querySelectorAll('.subhead:nth-of-type(even)');
const panelData = [
  {
    aria: 'random quotes; ',
    href: 'https://jamessouth.github.io/JS-Project-1/',
    pic: Project1,
  },
  {
    aria: 'interactive form; ',
    href: 'https://jamessouth.github.io/JS-Project-3/',
    pic: Project2,
  },
  {
    aria: 'tic tac toe; ',
    href: 'https://jamessouth.github.io/JS-Project-4/',
    pic: Project3,
  },
  {
    aria: '15 puzzle generator; vue ajax webcam routing geolocation',
    href: 'https://jamessouth.github.io/fifteenpuzzlegenerator/',
    pic: Project4,
  },
  {
    aria: 'node web scraper; ',
    href: 'https://github.com/jamessouth/JS-Project-6/',
    pic: Project5,
  },
  {
    aria: 'twitter interface; node express pug es6 ajax',
    href: 'https://github.com/jamessouth/JS-Project-7/',
    pic: Project6,
  },
  {
    aria: 'interactive video; ',
    href: 'https://jamessouth.github.io/Project-7/',
    pic: Project7,
    gif: Project7GIF,
  },
  {
    aria: 'accessibility refactor; ',
    href: 'https://jamessouth.github.io/Project-8/',
    pic: Project8,
  },
  {
    aria: 'web app dashboard; vue-cli routing vuex ajax chart.js',
    href: 'https://jamessouth.github.io/Project-9/',
    pic: Project9,
    gif: Project9GIF,
  },
  {
    aria: 'employee directory; react wai-aria ajax',
    href: 'https://jamessouth.github.io/React-Project-10/',
    pic: Project10,
    gif: Project10GIF,
  },
  {
    aria: 'flickr gallery; react routing ajax',
    href: 'https://github.com/jamessouth/Project-11/',
    pic: Project11,
    gif: Project11GIF,
  },
  {
    aria: 'portfolio; webpack babel a11y sass web components css paint',
    href: '',
    pic: Project12,
  },
];
let isRotating = false;
let xStart;
let yStart;
let whichPB = 0;
const rotObj = {
  0: {
    x: 0,
    y: 0,
    xs: 0,
    ys: 0,
  },
  1: {
    x: 0,
    y: 0,
    xs: 0,
    ys: 0,
  },
};
const rando = () => Math.floor(Math.random() * 360) - 180;
const KEYFRAMES = () => ([
  { transform: 'rotateX(0deg) rotateY(0deg)' },
  { transform: `rotateX(${rando()}deg) rotateY(${rando()}deg)` },
  { transform: `rotateX(${rando()}deg) rotateY(${rando()}deg)` },
  { transform: `rotateX(${rando()}deg) rotateY(${rando()}deg)` },
  { transform: `rotateX(${rando()}deg) rotateY(${rando()}deg)` },
  { transform: `rotateX(${rando()}deg) rotateY(${rando()}deg)` },
  { transform: 'rotateX(0deg) rotateY(0deg)' },
]);
const KEYTIMING = {
  duration: 6000, iterations: 1, delay: 900, easing: 'linear',
};
let no = 0;
function hoverCubes() {
  cc[0].animate([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(10px)' },
  ], { duration: 1000, iterations: 20, direction: 'alternate' });
  cc[1].animate([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(10px)' },
  ], {
    duration: 1000, iterations: 20, direction: 'alternate',
  });
}
function rotate(e) {
  if (!isRotating) return;
  const xPos = (e.touches ? Math.floor(e.touches[0].clientX) : e.x) + window.scrollX;
  const yPos = (e.touches ? Math.floor(e.touches[0].clientY) : e.y) + window.scrollY;
  rotObj[whichPB].xs = xPos - xStart + rotObj[whichPB].x;
  rotObj[whichPB].ys = yPos - yStart + rotObj[whichPB].y;
  pb[whichPB].style.transform = `rotateX(${-rotObj[whichPB].ys}deg) rotateY(${rotObj[whichPB].xs}deg)`;
}
function getCenter(cube) {
  return {
    x: (cube.offsetLeft + cube.offsetWidth / 2),
    y: (cube.offsetTop + cube.offsetHeight / 2),
  };
}
function getCube(e) {
  const cubeZeroCtr = getCenter(cc[0]);
  const cubeOneCtr = getCenter(cc[1]);
  xStart = (e.x || Math.floor(e.touches[0].clientX)) + window.scrollX;
  yStart = (e.y || Math.floor(e.touches[0].clientY)) + window.scrollY;
  const distFromCubeZero = Math.round(Math.hypot(cubeZeroCtr.x - xStart, cubeZeroCtr.y - yStart));
  const distFromCubeOne = Math.round(Math.hypot(cubeOneCtr.x - xStart, cubeOneCtr.y - yStart));
  if (distFromCubeZero <= distFromCubeOne) {
    whichPB = 0;
  } else {
    whichPB = 1;
  }
  isRotating = true;
}
hold.addEventListener('mousedown', getCube);
hold.addEventListener('touchstart', getCube, { passive: true });
hold.addEventListener('mousemove', rotate);
hold.addEventListener('touchmove', rotate, { passive: true });
function releaseCube() {
  isRotating = false;
  rotObj[whichPB].x = rotObj[whichPB].xs || 0;
  rotObj[whichPB].y = rotObj[whichPB].ys || 0;
}
hold.addEventListener('mouseup', releaseCube);
hold.addEventListener('touchend', releaseCube);
hold.addEventListener('mouseleave', releaseCube);
const classes = [
  `  transform: translateZ(calc(var(--size) / 2));
  }</style>`,
  `  transform: rotateY(270deg) translateX(calc(var(--size) / -2));
  -webkit-transform-origin: bottom left;
  -moz-transform-origin: bottom left;
  -o-transform-origin: bottom left;
  transform-origin: bottom left;
  }</style>`,
  `  transform: rotateY(-270deg) translateX(calc(var(--size) / 2));
  -webkit-transform-origin: bottom right;
  -moz-transform-origin: bottom right;
  -o-transform-origin: bottom right;
  transform-origin: bottom right;
  }</style>`,
  `  transform: translateZ(calc(var(--size) / -2)) rotateY(180deg);
  }</style>`,
  `  transform: translateZ(calc(var(--size) / -2)) rotateX(90deg);
  -webkit-transform-origin: top;
  -moz-transform-origin: top;
  -o-transform-origin: top;
  transform-origin: top;
  }</style>`,
  `  transform: translateZ(calc(var(--size) / -2)) rotateX(-90deg);
  -webkit-transform-origin: bottom;
  -moz-transform-origin: bottom;
  -o-transform-origin: bottom;
  transform-origin: bottom;
  }</style>`,
];
const panelTemplate = document.createElement('template');
const htmlStr = `
<div>
  <a tabindex="0"></a>
</div>
<style>
div:focus,
a:focus{
  outline: none;
}
a{
  width: 100%;
  height: 100%;
  display: inline-block;
}
div{
  height: 100%;
  background-size: contain;
}
:host{
  width: 100%;
  height: 100%;
  position: absolute;
`;
class Panel extends HTMLElement {
  static get observedAttributes() {
    return ['gif'];
  }

  constructor(config, num) {
    super();
    Object.assign(this, config);
    const shadowRoot = this.attachShadow({ mode: 'open' });
    panelTemplate.innerHTML = `${htmlStr}${classes[num % 6]}`;
    shadowRoot.appendChild(panelTemplate.content.cloneNode(true));
    this.anchor.setAttribute('aria-label', this.aria);
    this.anchor.setAttribute('href', this.href);
    this.div.style.backgroundImage = `url(${this.pic})`;
    if ([6, 8, 9, 10].includes(num)) {
      this.setAttribute('gif', false);
      this.setAttribute('gif-name', this.gif);
    }
    ['mouseover', 'focus', 'touchstart'].forEach((evt) => {
      this.addEventListener(evt, () => {
        const projData = this.anchor.getAttribute('aria-label').split('; ');
        [subhead[Math.floor(num / 6)].textContent,
          desc[Math.floor(num / 6)].textContent] = projData;
      }, true);
    });
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (newVal === 'true') {
      this.div.style.backgroundImage = `url(${this.getAttribute('gif-name')})`;
    } else {
      this.div.style.backgroundImage = `url(${this.pic})`;
    }
  }

  get anchor() {
    return this.shadowRoot.querySelector('a');
  }

  get div() {
    return this.shadowRoot.querySelector('div');
  }
}
function buildCubes() {
  const panel = new Panel({ ...panelData[no] }, no);
  const panel2 = new Panel({ ...panelData[no + 6] }, no + 6);
  pb[0].appendChild(panel);
  pb[1].appendChild(panel2);
  no += 1;
}
function animCubes() {
  const spin = pb[0].animate(KEYFRAMES(), KEYTIMING);
  const spin2 = pb[1].animate(KEYFRAMES(), KEYTIMING);
  const si = setInterval(() => {
    buildCubes();
    if (no > 5) {
      clearInterval(si);
    }
  }, 1000);
  return Promise.all([spin.finished, spin2.finished]);
}
if (window.customElements && HTMLElement.prototype.attachShadow) {
  window.customElements.define('cube-panel', Panel);
  animCubes().then(hoverCubes);
} else {
  const info = document.createElement('p');
  info.innerHTML = `Hello! Your browser does not support custom elements. Try a (non-Microsoft) browser like <span>Google Chrome</span>.
  Native support for custom elements will ship in <span>Firefox</span> 63 in late October 2018; until then, do the following: open a new tab and go to <span>about:config</span>.
  Click through any warnings and in the search bar, type in <span>webcomponent</span>.
  Toggle the <span>...customelements.enabled</span> and <span>...shadowdom.enabled</span> flags to <span>true</span> and reload this page.`;
  hold.insertBefore(info, subhead[0]);
}
