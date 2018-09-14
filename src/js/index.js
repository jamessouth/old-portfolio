import "@babel/polyfill";

import './web-animations-next.min.js';


import '../css/styles.css';
import '../html/index.html';

import './cube';

import Explosion from '../images/explosion.gif';
import Contact from '../images/contact.jpg';
import Project7 from '../images/project7.jpg';
import Project9 from '../images/project9.jpg';
import Project10 from '../images/project10.jpg';
import Project11 from '../images/project11.jpg';

import Project7GIF from '../images/p7.gif';
import Project9GIF from '../images/p9.gif';
import Project10GIF from '../images/p10.gif';
import Project11GIF from '../images/p11.gif';

const canvas = document.querySelector('canvas#board');
const canvasholder = document.querySelector('.canvasholder');
const sizeInput = document.querySelector('.slider input');
const sizeInputP = document.querySelector('.slider p');
const sizeTrack = document.querySelector('.slider .track');


const menuHolder = document.querySelector('ul');
const options = document.querySelectorAll('li');
const menuHold = document.querySelector('.menu-hold');


const applyButton = document.querySelector('#apply');


const check = document.querySelectorAll('.menu-hold input.check');
const checkLabel = document.querySelectorAll('.menu-hold input.check + label');


const headline = document.querySelector('h1');
const seconds = document.querySelector('.menu-hold select');
const secondsLabel = document.querySelector('.menu-hold label[for="sec"]');
const secondsP = document.querySelector('li p.seconds');
const canvasbutton = document.querySelector('.canvasbutton button');
const faderCanv = document.querySelector('.canvasbutton #fader');
const linksDiv = document.querySelector('#contactinfolinks');
const linksDivLinks = document.querySelectorAll('#contactinfolinks a');
const clickCounter = document.querySelector('.canvasbutton .clickCounter p:last-of-type');
const helpText = document.querySelector('.canvasbutton .help');
const explode = document.querySelectorAll('.explode');
const pb = document.querySelectorAll('.photo-cube');
let destroyFlag = false;

const subhead = document.querySelectorAll('.subhead:nth-of-type(odd)');
const desc = document.querySelectorAll('.subhead:nth-of-type(even)');


let ctx = canvas.getContext('2d');
let ctxFader = faderCanv.getContext('2d');



let boxes = [];
let timerOne = 0;
let timerTwo = 0;
let shades = [];
let canvArray = [];
let contact = new Image();
let clicks = 0;


check[0].checked = false;
check[1].checked = false;
check[0].setAttribute('aria-checked', false);
check[1].setAttribute('aria-checked', false);
seconds.value = 0;
[...seconds.children].forEach(x => x.setAttribute('aria-selected', false));
seconds.children[0].setAttribute('aria-selected', true);
sizeInput.value = 220;
sizeInput.setAttribute('aria-valuenow', 220);


const proj7 = pb[1].querySelector('.front');
const proj9 = pb[1].querySelector('.right');
const proj10 = pb[1].querySelector('.back');
const proj11 = pb[1].querySelector('.top');

check[0].addEventListener('change', function(e){
  if(e.target.checked){
    checkLabel[0].textContent = 'GIFs!';
    this.setAttribute('aria-checked', true);
    proj7.style.backgroundImage = `url(${Project7GIF})`;
    proj9.style.backgroundImage = `url(${Project9GIF})`;
    proj10.style.backgroundImage = `url(${Project10GIF})`;
    proj11.style.backgroundImage = `url(${Project11GIF})`;
  } else {
    checkLabel[0].textContent = 'no GIFs';
    this.setAttribute('aria-checked', false);
    proj7.style.backgroundImage = `url(${Project7})`;
    proj9.style.backgroundImage = `url(${Project9})`;
    proj10.style.backgroundImage = `url(${Project10})`;
    proj11.style.backgroundImage = `url(${Project11})`;
  }
});
check[1].addEventListener('change', function(e){
  if(e.target.checked){
    fetch(Explosion)
    .then(res => {
      return res.status !== 200 ? console.log('there was a problem fetching the resource. Status Code and Text: ' + res.status, res.statusText) : res.blob();
    })
    .then(res => {
      var objectURL = URL.createObjectURL(res);
      explode[0].src = objectURL;
      explode[1].src = objectURL;
    })
    .catch(err => console.log('Fetch error: ', err));
    checkLabel[1].textContent = 'DESTROY!';
    this.setAttribute('aria-checked', true);
    destroyFlag = true;
    seconds.style.display = 'block';
    secondsLabel.style.display = 'block';
    secondsP.style.display = 'block';
    seconds.removeAttribute('disabled');
    seconds.setAttribute('aria-disabled', false);
    seconds.tabIndex = "1";
  } else {
    checkLabel[1].textContent = 'do not destroy';
    this.setAttribute('aria-checked', false);
    destroyFlag = false;
    seconds.style.display = 'none';
    secondsLabel.style.display = 'none';
    secondsP.style.display = 'none';
    seconds.setAttribute('disabled', '');
    seconds.setAttribute('aria-disabled', true);
    seconds.tabIndex = "-1";
  }
});


function destroyCube(cube){
  cube.addEventListener('animationend', () => {
    headline.style.marginBottom = '0';
    cube.style.display = 'none';
    cube.parentNode.style.display = 'none';
    for(let i = 0; i < 2; i++){
      subhead[i].style.display = 'none';
      desc[i].style.display = 'none';
    }
    if(window.innerWidth < 768){
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
  window.setTimeout(() => {
    explode[0].style.display = 'none';
    explode[1].style.display = 'none';
  }, (seconds.value * 1000) + 5490);
}


function handleSelectUpdate() {
  [...this.children].forEach(x => x.setAttribute('aria-selected', false));
  this.children[this.value].setAttribute('aria-selected', true);
  const suffix = this.dataset.sizing;
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  if(destroyFlag){
    destroyCube(pb[0]);
    destroyCube(pb[1]);
  }
}
seconds.addEventListener('change', handleSelectUpdate);
sizeInput.addEventListener('focus', function(e){
  this.parentNode.style.border = "3px white solid";
});
sizeInput.addEventListener('blur', function(e){
  this.parentNode.style.border = "none";
});



function handleRangeUpdate() {
  const suffix = this.dataset.sizing;
  const width = this.max - this.min;
  const perc = Math.floor(((this.value - width) / width) * 100) / 100;

  this.setAttribute('aria-valuenow', this.value);
  sizeInputP.textContent = `<\u00A0\u00A0\u00A0${this.value}px\u00A0\u00A0\u00A0>`;
  sizeTrack.style.width = `${perc * 142}px`;
  sizeTrack.style.backgroundColor = `hsl(${perc * 720}, 65%, 30%)`;
}
sizeInput.addEventListener('change', handleRangeUpdate);
sizeInput.addEventListener('mousemove', handleRangeUpdate);

applyButton.addEventListener('click', e => {
  document.documentElement.style.setProperty('--size', `${sizeInput.value}px`);
});






for(let q = 0; q < 15; q++){
  for(let z = 0; z < 15; z++){
    boxes.push([q * 20, z * 20]);
  }
}
function randomizeBoxes(){
  let randos = getRands(boxes.length);
  let randArray = [];
  randos.forEach((x,i) => {
    randArray[x] = boxes[i];
  });
  return randArray;
}
let randBoxes = randomizeBoxes();
function animate2(){
    if(timerTwo < randBoxes.length - 1){ requestAnimationFrame(animate2); }
  ctx.clearRect(randBoxes[timerTwo][0], randBoxes[timerTwo][1], 20, 20);
    timerTwo++;
  if(timerTwo === randBoxes.length){
    linksDiv.style.zIndex = 5;
    linksDivLinks.forEach(s => {
      s.tabIndex = "1";
      s.removeAttribute('aria-hidden');
    });
    linksDivLinks[0].focus();
  }
}
for(let i = 100; i >= 0; i--){
  shades.push(i/100);
}
function animate1(){
    if(timerOne < shades.length){ requestAnimationFrame(animate1); }
  ctxFader.fillStyle = `rgba(173, 216, 230, ${shades[timerOne]})`;
  ctxFader.clearRect(0, 0, 75, 75);
  ctxFader.fillRect(0, 0, 75, 75);
    timerOne++;
  if(timerOne === shades.length){
    faderCanv.style.display = 'none';
    canvas.style.backgroundColor = 'transparent';
    window.setTimeout(animate2, 2000);
  }
}
for(let i = 0; i < 4; i++){
  for(let j = 0; j < 4; j++){
    canvArray.push([j * 75, i * 75]);
  }
}
function getRands(amt){
  let nums = new Set();
  while(nums.size < amt){
    let n = Math.floor(Math.random() * amt);
    nums.add(n);
  }
  return [...nums];
}
function checkBoard(){
  let randos = getRands(canvArray.length - 1);
  let solArray = [];
  randos.forEach((x,i) => {
    solArray[x] = i;
  });
  return [solArray.concat([15]), randos.concat([15])];
}
function getInversions(arr){
  let inversions = 0;
  for(let i = 0; i < arr.length; i++){
    if(arr[i] == null){continue;}
    for(let j = 0; j < arr.length; j++){
      if(arr[i] > arr[j + i]){
        inversions++;
      }
    }
  }
  return inversions;
}
let doable = checkBoard();
while(getInversions(doable[0]) % 2 !== 0){
  doable = checkBoard();
}
let boardOrder = doable[0].slice();

if(canvArray.length === 0){
  linksDivLinks.forEach(s => {
    s.tabIndex = "1";
    s.removeAttribute('aria-hidden');
  });
  linksDivLinks[0].focus();
}



contact.onload = () => {
  for(let i = 0; i < canvArray.length-1; i++){
      ctx.drawImage(contact, canvArray[i][0], canvArray[i][1], 75, 75, canvArray[doable[1][i]][0], canvArray[doable[1][i]][1], 75, 75);
  }
}
contact.src = Contact;



function swapTiles(x, y){
  if(canvArray.length === 0){return;}
  let tileClicked = (Math.floor(y / 75) * 4) + Math.floor(x / 75);
  let blank = boardOrder.indexOf(15);
  let finalCheck;
  let brdInd = boardOrder[tileClicked];
  if(![1, 4].includes(Math.abs(tileClicked - blank))){
    return;
  }
  ctx.clearRect(canvArray[tileClicked][0], canvArray[tileClicked][1], 75, 75);
  ctx.drawImage(contact, canvArray[brdInd][0], canvArray[brdInd][1], 75, 75,
  canvArray[blank][0], canvArray[blank][1], 75, 75);
  [boardOrder[tileClicked], boardOrder[blank]] = [boardOrder[blank], boardOrder[tileClicked]];
  if(boardOrder[0] === 0 && boardOrder[3] === 3 && boardOrder[11] === 11 && boardOrder[14] === 14){
    finalCheck = true;
    for(let f = 0; f < boardOrder.length; f++){
      if(boardOrder[f] !== f){
        finalCheck = false;
        break;
      }
    }
  }
  if(finalCheck){
    faderCanv.style.display = 'block';
    canvasbutton.style.display = 'none';
    animate1();
    ctx.drawImage(contact, 225, 225, 75, 75,
    225, 225, 75, 75);
    canvArray = [];
  }
}
canvas.addEventListener('click', function(e){
  let x = e.offsetX;
  let y = e.offsetY;
  swapTiles(x,y);
  clicks++;
  if(clicks === 1){
    helpText.style.display = 'none';
  }
  clickCounter.textContent = clicks;
});


canvasbutton.addEventListener('click', e => {
  helpText.style.display = 'none';
  ctx.clearRect(0, 0, 300, 300);
  ctx.drawImage(contact, 0, 0, 300, 300);
  canvArray = [];
  canvas.style.backgroundColor = 'transparent';
  window.setTimeout(animate2, 2000);
  canvasbutton.style.display = 'none';
});
