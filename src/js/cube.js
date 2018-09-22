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


// const main = document.querySelector('main');
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
      _class: 'front',
    },
    {
      aria: 'interactive form; ',
      href: 'https://jamessouth.github.io/JS-Project-3/',
      pic: Project2,
      _class: 'left',
    },
    {
      aria: 'tic tac toe; ',
      href: 'https://jamessouth.github.io/JS-Project-4/',
      pic: Project3,
      _class: 'right',
    },
    {
      aria: '15 puzzle generator; vue ajax webcam routing geolocation',
      href: 'https://jamessouth.github.io/fifteenpuzzlegenerator/',
      pic: Project4,
      _class: 'back',
    },
    {
      aria: 'node web scraper; ',
      href: 'https://github.com/jamessouth/JS-Project-6/',
      pic: Project5,
      _class: 'top',
    },
    {
      aria: 'twitter interface; node express pug es6 ajax',
      href: 'https://github.com/jamessouth/JS-Project-7/',
      pic: Project6,
      _class: 'bottom',
    },
    {
      aria: 'interactive video; ',
      href: 'https://jamessouth.github.io/Project-7/',
      pic: Project7,
      _class: 'front',
    },
    {
      aria: 'accessibility refactor; ',
      href: 'https://jamessouth.github.io/Project-8/',
      pic: Project8,
      _class: 'left',
    },
    {
      aria: 'web app dashboard; vue-cli routing vuex ajax chart.js',
      href: 'https://jamessouth.github.io/Project-9/',
      pic: Project9,
      _class: 'right',
    },
    {
      aria: 'employee directory; react wai-aria ajax',
      href: 'https://jamessouth.github.io/React-Project-10/',
      pic: Project10,
      _class: 'back',
    },
    {
      aria: 'flickr gallery; react routing ajax',
      href: 'https://github.com/jamessouth/Project-11/',
      pic: Project11,
      _class: 'top',
    },
    {
      aria: 'portfolio; webpack babel wai-aria eslint',
      href: '#1',
      pic: Project12,
      _class: 'bottom',
    }
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
  duration: 6000, iterations: 1, delay: 1000, easing: 'linear',
};

let no = 0;





async function buildCubes() {
  let pic;
  let pic2;
  try {
    pic = await fetch(panelData[no].pic);
    pic2 = await fetch(panelData[no + 6].pic);
    pic = await pic.blob();
    pic2 = await pic2.blob();
    const objectURL = URL.createObjectURL(pic);
    const objectURL2 = URL.createObjectURL(pic2);


    let panel = new Panel({ ...panelData[no] });
    let panel2 = new Panel({ ...panelData[no + 6] });
    pb[0].appendChild(panel);
    pb[1].appendChild(panel2);
    // pb[0].children[no - 1].style.backgroundImage = `url(${objectURL})`;
    // pb[1].children[no - 1].style.backgroundImage = `url(${objectURL2})`;
    no += 1;
  } catch (err) {
    console.log('error ', err);
  }
}

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

function animCubes() {
  const spin = pb[0].animate(KEYFRAMES(), KEYTIMING);
  const spin2 = pb[1].animate(KEYFRAMES(), KEYTIMING);

  const si = setInterval(() => {
    buildCubes();
    if (spin.currentTime >= 4999) {
      clearInterval(si);
    }
  }, 1000);

  return Promise.all([spin.finished, spin2.finished]);
}
animCubes().then(hoverCubes);


['mouseover', 'focus', 'touchstart'].forEach((evt) => {
  pb.forEach((x, i) => {
    x.addEventListener(evt, (e) => {
      if (e.target.tagName === 'A') {
        const projNum = e.target.id;
        subhead[i].textContent = projects[projNum - 1];
        desc[i].textContent = features[projNum - 1];
      }
    }, true);
  });
});


function rotate(e) {
  if (!isRotating) return;
  const xPos = (e.x || Math.floor(e.touches[0].clientX)) + window.scrollX;
  const yPos = (e.y || Math.floor(e.touches[0].clientY)) - 0 + window.scrollY;
  rotObj[whichPB].xs = xPos - xStart + rotObj[whichPB].x;
  rotObj[whichPB].ys = yPos - yStart + rotObj[whichPB].y;
  pb[whichPB].style.transform = `rotateX(${-rotObj[whichPB].ys}deg) rotateY(${rotObj[whichPB].xs}deg)`;
}

function getCube(e) {
  const cubeZeroCtr = {
    x: (cc[0].offsetLeft + cc[0].offsetWidth / 2),
    y: (cc[0].offsetTop - 0 + cc[0].offsetHeight / 2),
  };
  const cubeOneCtr = {
    x: (cc[1].offsetLeft + cc[1].offsetWidth / 2),
    y: (cc[1].offsetTop - 0 + cc[1].offsetHeight / 2),
  };
  xStart = (e.x || Math.floor(e.touches[0].clientX)) + window.scrollX;
  yStart = (e.y || Math.floor(e.touches[0].clientY)) - 0 + window.scrollY;
  const distFromCubeZero = Math.round(Math.sqrt((Math.abs(cubeZeroCtr.x - xStart) ** 2)
  + (Math.abs(cubeZeroCtr.y - yStart) ** 2)));
  const distFromCubeOne = Math.round(Math.sqrt((Math.abs(cubeOneCtr.x - xStart) ** 2)
  + (Math.abs(cubeOneCtr.y - yStart) ** 2)));
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


hold.addEventListener('touchmove', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
  }
}, { passive: false });

function releaseCube() {
  isRotating = false;
  rotObj[whichPB].x = rotObj[whichPB].xs || 0;
  rotObj[whichPB].y = rotObj[whichPB].ys || 0;
}


hold.addEventListener('mouseup', releaseCube);
hold.addEventListener('touchend', releaseCube);
hold.addEventListener('mouseleave', releaseCube);





let panelTemplate = document.createElement('template');
panelTemplate.innerHTML = `
<style>
.common-cube{
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: contain;
}
.front{
  transform: translateZ(calc(var(--size) / 2));
}
.left{
   transform: rotateY(270deg) translateX(calc(var(--size) / -2));
  -webkit-transform-origin: bottom left;
  -moz-transform-origin: bottom left;
  -o-transform-origin: bottom left;
  transform-origin: bottom left;
}
.right{
   transform: rotateY(-270deg) translateX(calc(var(--size) / 2));
  -webkit-transform-origin: bottom right;
  -moz-transform-origin: bottom right;
  -o-transform-origin: bottom right;
  transform-origin: bottom right;
}
.back{
  transform: translateZ(calc(var(--size) / -2)) rotateY(180deg);
}
.top{
  transform: translateZ(calc(var(--size) / -2)) rotateX(90deg);
  -webkit-transform-origin: top;
  -moz-transform-origin: top;
  -o-transform-origin: top;
  transform-origin: top;
}
.bottom{
  transform: translateZ(calc(var(--size) / -2)) rotateX(-90deg);
  -webkit-transform-origin: bottom;
  -moz-transform-origin: bottom;
  -o-transform-origin: bottom;
  transform-origin: bottom;
}
</style>

<div class="common-cube">
  <a tabindex="0"></a>
</div>
`;



// <div class="common-cube front">
//   <a aria-label="Random Quotes" id="1" tabindex="0" href="https://jamessouth.github.io/JS-Project-1/"></a>
// </div>
// <div class="common-cube left">
//   <a aria-label="Interactive Form" id="2" tabindex="0" href="https://jamessouth.github.io/JS-Project-3/"></a>
// </div>
// <div class="common-cube right">
//   <a aria-label="Tic Tac Toe" id="3" tabindex="0" href="https://jamessouth.github.io/JS-Project-4/"></a>
// </div>
// <div class="common-cube back">
//   <a aria-label="15 puzzle generator" id="4" tabindex="0" href="https://jamessouth.github.io/fifteenpuzzlegenerator/"></a>
// </div>
// <div class="common-cube top">
//   <a aria-label="Node web scraper" id="5" tabindex="0" href="https://github.com/jamessouth/JS-Project-6"></a>
// </div>
// <div class="common-cube bottom">
//   <a aria-label="Node/express/pug Twitter interface" id="6" tabindex="0" href="https://github.com/jamessouth/JS-Project-7"></a>
// </div>



class Panel extends HTMLElement {
  constructor(config) {
    super();
    // { this.aria, this.href, this._class, this.pic } = config;

    Object.assign(this, config);


    // console.log(this.aria);

    let shadowRoot = this.attachShadow({ mode: 'open', });
    shadowRoot.appendChild(panelTemplate.content.cloneNode(true));
    // console.log(this.anchor);

    this.anchor.setAttribute('aria-label', this.aria);
    this.anchor.setAttribute('href', this.href);
    this.div.classList.add(this._class);
    this.div.style.backgroundImage = `url(${this.pic})`;


  }

  connectedCallback() {






  }

  get panelNumber() {
    return this.getAttribute('num');
  }

  get photoCube() {
    return this.parentNode;
  }

  get anchor() {
    return this.shadowRoot.querySelector('a');
  }

  get div() {
    return this.shadowRoot.querySelector('div');
  }

}
window.customElements.define('cube-panel', Panel);
