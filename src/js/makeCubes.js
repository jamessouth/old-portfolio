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
import Project4GIF from '../images/p4.gif';
import Project7GIF from '../images/p7.gif';
import Project9GIF from '../images/p9.gif';
import Project10GIF from '../images/p10.gif';
import Project11GIF from '../images/p11.gif';

const pb = document.querySelectorAll('.photo-cube');
const cc = document.querySelectorAll('.cube-container');
const hold = document.querySelector('.hold');
const perf = performance.now();
let interval = 1000;
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
    aria: '15 puzzle generator; angular-cli typescript',
    href: 'https://jamessouth.github.io/fifteen-puzzle-generator/home',
    pic: Project4,
    gifURL: Project4GIF,
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
    aria: 'face scramble!; angular typescript nativescript',
    href: 'https://github.com/jamessouth/face-scramble',
    pic: Project7,
    gifURL: Project7GIF,
  },
  {
    aria: 'vue-style-lint; node es6 fp ci tdd npm|v1.0.3',
    href: 'https://www.npmjs.com/package/vue-style-lint',
    pic: Project8,
  },
  {
    aria: 'web app dashboard; pwa vue-cli vuex ajax chart.js',
    href: 'https://jamessouth.github.io/Vue-Project-9/',
    pic: Project9,
    gifURL: Project9GIF,
  },
  {
    aria: 'employee directory; pwa react a11y tdd ajax',
    href: 'https://jamessouth.github.io/React-Project-10/',
    pic: Project10,
    gifURL: Project10GIF,
  },
  {
    aria: 'flickr gallery; create-react-app ajax',
    href: 'https://github.com/jamessouth/Project-11/',
    pic: Project11,
    gifURL: Project11GIF,
  },
  {
    aria: 'portfolio; pwa webpack a11y sass components worker paint',
    href: '',
    pic: Project12,
  },
];
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
const KEYFRAMES2 = [
  { transform: 'translateY(0px)' },
  { transform: 'translateY(10px)' },
];
const KEYTIMING2 = { duration: 1000, iterations: 20, direction: 'alternate' };
function hoverCubes() {
  cc[0].animate(KEYFRAMES2, KEYTIMING2);
  cc[1].animate(KEYFRAMES2, KEYTIMING2);
}
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
    return ['gifURL'];
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



    if (this.gifURL) {
      this.setAttribute('gif-on', false);
      this.setAttribute('gif-name', this.gifURL);
    }
    ['mouseover', 'focus', 'touchstart'].forEach((evt) => {
      this.addEventListener(evt, () => {
        const projData = this.anchor.getAttribute('aria-label').split('; ');
        [subhead[Math.floor(num / 6)].textContent,
          desc[Math.floor(num / 6)].textContent] = projData;
      }, { capture: true, passive: true });
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
function getUseCubesJS() {
  return import(/* webpackChunkName: "useCubes" */ './useCubes').catch(err => console.log(err));
}
function buildCubes(time) {
  if (no < 6) requestAnimationFrame(buildCubes);
  if ((Math.floor(time || perf) - perf) > interval) {
    const panel = new Panel({ ...panelData[no] }, no);
    const panel2 = new Panel({ ...panelData[no + 6] }, no + 6);
    pb[0].appendChild(panel);
    pb[1].appendChild(panel2);
    no += 1;
    interval += 1000;
    if (no > 5) getUseCubesJS();
  }
}
function animCubes() {
  const spin = pb[0].animate(KEYFRAMES(), KEYTIMING);
  const spin2 = pb[1].animate(KEYFRAMES(), KEYTIMING);
  buildCubes();
  return Promise.all([spin.finished, spin2.finished]);
}
if (window.customElements && HTMLElement.prototype.attachShadow) {
  window.customElements.define('cube-panel', Panel);
  if (!document.body.animate) {
    import(/* webpackChunkName: "anim_polyfill" */ 'web-animations-js').then(animCubes).then(hoverCubes).catch(err => console.log(err));
  } else {
    animCubes().then(() => {
      hoverCubes;

    });
  }
} else {
  const info = document.createElement('p');
  info.innerHTML = `Hello! Your browser does not support custom elements. Try a (non-Microsoft) browser like <span>Google Chrome</span>.
  Native support for custom elements will ship in <span>Firefox</span> 63 in late October 2018; until then, do the following: open a new tab and go to <span>about:config</span>.
  Click through any warnings and in the search bar, type in <span>webcomponent</span>.
  Toggle the <span>...customelements.enabled</span> and <span>...shadowdom.enabled</span> flags to <span>true</span> and reload this page.`;
  hold.insertBefore(info, subhead[0]);
}
