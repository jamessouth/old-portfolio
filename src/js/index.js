import "@babel/polyfill";

import './web-animations-next.min.js';


import '../css/styles.css';
import '../html/index.html';



import Explosion from '../images/explosion.gif';
import Contact from '../images/contact.jpg';


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


const main = document.querySelector('main');
const pb = document.querySelectorAll('.photo-cube');
const cc = document.querySelectorAll('.cube-container');
// const menuIcon = document.querySelector('.hamburger');
// const projectNotesIcon = document.querySelector('.star');

const canvas = document.querySelector('canvas#board');
const canvasholder = document.querySelector('.canvasholder');
const sizeInput = document.querySelector('.slider input');
const sizeInputP = document.querySelector('.slider p');
const sizeTrack = document.querySelector('.slider .track');
// const overlay = document.querySelector('div.overlay');
// const overlay2 = document.querySelector('div.overlay2');
// const overlayCloseButton = overlay.querySelector('button.close');
// const overlayNextButton = overlay.querySelector('button.next');
// const overlayPrevButton = overlay.querySelector('button.prev');
// const overlayContactButton = overlay.querySelector('button.contact');
const menuHolder = document.querySelector('ul');
const options = document.querySelectorAll('li');
const menuHold = document.querySelector('.menu-hold');
// const overlayButtons = document.querySelectorAll('.overlay > button');
const hold = main.querySelector('div.hold');




const check = document.querySelectorAll('.menu-hold input.check');
const checkLabel = document.querySelectorAll('.menu-hold input.check + label');
const subhead = hold.querySelectorAll('.subhead:nth-of-type(odd)');
const desc = hold.querySelectorAll('.subhead:nth-of-type(even)');
// const liOverlay = menuHolder.querySelectorAll('.li-overlay');
const cubeLinks = document.querySelectorAll('div.cube-container div.photo-cube div a');
let destroyFlag = false;
const explode = document.querySelectorAll('.explode');
const headline = main.querySelector('h1');
const seconds = document.querySelector('.menu-hold select');
const secondsLabel = document.querySelector('.menu-hold label[for="sec"]');
const secondsP = document.querySelector('li p.seconds');
const canvasbutton = document.querySelector('.canvasbutton button');
const faderCanv = document.querySelector('.canvasbutton #fader');
const linksDiv = document.querySelector('#contactinfolinks');
const linksDivLinks = document.querySelectorAll('#contactinfolinks a');
const clickCounter = document.querySelector('.canvasbutton .clickCounter p:last-of-type');
const helpText = document.querySelector('.canvasbutton .help');
// const proj3 = pb[0].querySelector('.right');
// const proj4 = pb[0].querySelector('.back');
const proj7 = pb[1].querySelector('.front');
const proj9 = pb[1].querySelector('.right');
const proj10 = pb[1].querySelector('.back');
const proj11 = pb[1].querySelector('.top');
// menuIcon.hamb = true;
// projectNotesIcon.hamb = false;
// overlayCloseButton.over = true;

let ctx = canvas.getContext('2d');
let ctxFader = faderCanv.getContext('2d');
let depths = [0, -2000, -3250, -4500];
let rotations = [0, 1, 2, 3];
let descs = ['random quotes', 'interactive form', 'tic tac toe', '15 puzzle generator', 'node web scraper', 'node/express/pug twitter interface', 'interactive video player', 'accessibility refactor', 'web app dashboard', 'react employee directory', 'react flickr gallery', 'portfolio'];
// let switchFlag = true;
let nextAnims = ['applyAnimFTB', 'applyAnimMFTF', 'applyAnimMBTMF', 'applyAnimBTMB'];
let prevAnims = ['applyAnimFTMF', 'applyAnimMFTMB', 'applyAnimMBTB', 'applyAnimBTF'];
let boxes = [];
let timerOne = 0;
let timerTwo = 0;
let shades = [];
let canvArray = [];
let contact = new Image();
let clicks = 0;
let isRotating = false;
let xStart;
let yStart;
let xEnd;
let yEnd;
let whichPB = 0;
let rotObj = {
  0 : {
    x : 0,
    y : 0,
    xs : 0,
    ys : 0
  },
  1 : {
    x : 0,
    y : 0,
    xs : 0,
    ys : 0
  }
};
check[0].checked = false;
check[1].checked = false;
check[0].setAttribute('aria-checked', false);
check[1].setAttribute('aria-checked', false);
seconds.value = 0;
[...seconds.children].forEach(x => x.setAttribute('aria-selected', false));
seconds.children[0].setAttribute('aria-selected', true);
sizeInput.value = 220;
sizeInput.setAttribute('aria-valuenow', 220);
// radioLinear.checked = true;
// radioLinear.setAttribute('aria-checked', true);
let KEYFRAMES = {
  zero: [
    {transform: 'rotateY(0deg) rotateX(0deg)'},
    {transform: 'rotateY(0deg) rotateX(0deg)'}
  ],
  one: [
    {transform: 'rotateY(188deg) rotateX(194deg)'},
    {transform: 'rotateY(360deg) rotateX(360deg)'}
  ],
  two: [
    {transform: 'rotateY(106deg) rotateX(11deg)'},
    {transform: 'rotateY(0deg) rotateX(0deg)'}
  ],
  three: [
    {transform: 'rotateY(-112deg) rotateX(-55deg)'},
    {transform: 'rotateY(0deg) rotateX(0deg)'}
  ],
  four: [
    {transform: 'rotateY(-259deg) rotateX(-14deg)'},
    {transform: 'rotateY(0deg) rotateX(0deg)'}
  ],
  five: [
    {transform: 'rotateY(-170deg) rotateX(-91deg)'},
    {transform: 'rotateY(0deg) rotateX(0deg)'}
  ],
  six: [
    {transform: 'rotateY(13deg) rotateX(85deg)'},
    {transform: 'rotateY(0deg) rotateX(0deg)'}
  ]
};
let KEYTIMING = {duration: 650, iterations: 1, delay: 250, easing: 'cubic-bezier(.81,.02,.75,.51)'};
let anims = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];
let no = 1, num = 0;
let spin, spin2;

const cubeProjectImgs = [null, Project1, Project2, Project3, Project4, Project5, Project6, Project7, Project8, Project9, Project10, Project11, Project12];
async function buildCubes(){
  let pic, pic2;
  try{
    pic = await fetch(cubeProjectImgs[no]);
    pic2 = await fetch(cubeProjectImgs[no + 6]);
    pic = await pic.blob();
    pic2 = await pic2.blob();
    var objectURL = URL.createObjectURL(pic);
    var objectURL2 = URL.createObjectURL(pic2);
    pb[0].children[no - 1].style.backgroundImage = `url(${objectURL})`;
    pb[1].children[no - 1].style.backgroundImage = `url(${objectURL2})`;
    no++;
  }
  catch(err){
    console.log('error ', err);
  }
}
animCubes().then(buildCubes).then(animCubes).then(buildCubes).then(animCubes).then(buildCubes).then(animCubes).then(buildCubes).then(animCubes).then(buildCubes).then(animCubes).then(buildCubes).then(animCubes).then(hoverCubes);
function animCubes(){
  spin = pb[0].animate(
    KEYFRAMES[anims[num]], KEYTIMING);
  spin2 = pb[1].animate(
    KEYFRAMES[anims[num]], KEYTIMING);
  num++;
  if(num === 2){
    KEYTIMING.delay = 10;
  }
  return Promise.all([spin.finished, spin2.finished]);
}
let hover, hover2;
function hoverCubes(){
  hover = cc[0].animate([
    {transform: 'translateY(0px)'},
    {transform: 'translateY(10px)'}
  ], {duration: 1000, iterations: 20, direction: 'alternate'});
  hover2 = cc[1].animate([
    {transform: 'translateY(0px)'},
    {transform: 'translateY(10px)'}
  ], {duration: 1000, iterations: 20, direction: 'alternate'});
}




['mouseover', 'focus', 'touchstart'].forEach(evt => {
  pb.forEach((x,i) => {
    x.addEventListener(evt, e => {
      if(e.target.tagName === 'A'){
        let projNum = e.target.id;
        subhead[i].textContent = 'Project ' + projNum;
        desc[i].textContent = descs[projNum - 1];
      }
    }, true);
  });
});
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
function tabIndMgr(i){
  options[i].tabIndex = "-1";
  seconds.tabIndex = "-1";
  let thisInput = options[i].querySelectorAll('input');
  if(thisInput[1]){
    thisInput[1].tabIndex = "-1";
  }
  thisInput[0].tabIndex = "-1";
}
function tabIndMgrCurrentItem(i){
  options[i].tabIndex = "1";
  let thisInput = options[i].querySelectorAll('input');
  if(thisInput[1] && thisInput[0].checked){
    thisInput[0].tabIndex = "1";
    thisInput[1].tabIndex = "-1";
  } else if(thisInput[1] && thisInput[1].checked){
    thisInput[0].tabIndex = "-1";
    thisInput[1].tabIndex = "1";
  } else {
    thisInput[0].tabIndex = "1";
  }
  if(thisInput[0].id === 'destroy' && destroyFlag){
    seconds.tabIndex = "1";
  }
}
// function styleMgr(i){
//   if(parseInt(options[i].style.transform.match(/(-?\d+)(?=px\)$)/)[0], 10) === -4500){
//     options[i].style.opacity = '0.3';
//     liOverlay[i].style.display = 'block';
//     tabIndMgr(i);
//   } else if(parseInt(options[i].style.transform.match(/(-?\d+)(?=px\)$)/)[0], 10) === -3250){
//     options[i].style.opacity = '0.45';
//     liOverlay[i].style.display = 'block';
//     options[i].tabIndex = "-1";
//   } else if(parseInt(options[i].style.transform.match(/(-?\d+)(?=px\)$)/)[0], 10) === -2000){
//     options[i].style.opacity = '0.65';
//     liOverlay[i].style.display = 'block';
//     tabIndMgr(i);
//   } else {
//     options[i].style.opacity = '1';
//     liOverlay[i].style.display = 'none';
//     tabIndMgrCurrentItem(i);
//   }
// }
// function handleLinearTransInit(){
//  for(let i = 0; i < options.length; i++){
//    options[i].className = '';
//    if(options[i].dataset.pos === '0'){
//      options[i].style.transform = `rotateX(0deg) translateY(-180px) translateZ(${depths[i]}px)`;
//    } else {
//      options[i].style.transform = `rotateX(5deg) translateY(-180px) translateZ(${depths[i]}px)`;
//    }
//    styleMgr(i);
//  }
// }
// function handleCurvedTransInit(){
//   for(let i = 0; i < options.length; i++){
//     let menuCard = options[i];
//     liOverlay[i].style.display = 'none';
//     menuCard.style.opacity = '1';
//     if(menuCard.dataset.pos === '0'){
//       menuCard.style.transform = 'rotateX(0deg) translateY(-180px) translateZ(0px)';
//       tabIndMgrCurrentItem(i);
//     } else if(menuCard.dataset.pos === '1'){
//       menuCard.style.transform = 'rotateX(30deg) translateY(-180px) translateZ(0px)';
//       tabIndMgr(i);
//     } else if(menuCard.dataset.pos === '2'){
//       menuCard.style.transform = 'rotateX(40deg) translateY(-180px) translateZ(0px)';
//       menuCard.tabIndex = "-1";
//     } else {
//       menuCard.style.transform = 'rotateX(50deg) translateY(-180px) translateZ(0px)';
//       tabIndMgr(i);
//     }
//   }
// }
// function handleCurvedTransNextPrev(){
//   for(let i = 0; i < options.length; i++){
//     let menuCard = options[i];
//     if(menuCard.dataset.pos === '0'){
//       tabIndMgrCurrentItem(i);
//     } else if(menuCard.dataset.pos === '1'){
//       tabIndMgr(i);
//     } else if(menuCard.dataset.pos === '2'){
//       menuCard.tabIndex = "-1";
//     } else {
//       tabIndMgr(i);
//     }
//   }
// }


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
// [radioLinear, radioCurved].forEach(x => x.addEventListener('focus', function(e){
//   this.parentNode.style.boxSizing = "content-box";
//   this.parentNode.style.border = "3px white solid";
// }));
// [radioLinear, radioCurved].forEach(x => x.addEventListener('blur', function(e){
//   this.parentNode.style.border = "none";
//   this.parentNode.style.boxSizing = "border-box";
// }));
function handleRangeUpdate() {
  const suffix = this.dataset.sizing;
  const width = this.max - this.min;
  const perc = Math.floor(((this.value - width) / width) * 100) / 100;
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  this.setAttribute('aria-valuenow', this.value);
  sizeInputP.textContent = `<\u00A0\u00A0\u00A0${this.value}px\u00A0\u00A0\u00A0>`;
  sizeTrack.style.width = `${perc * 142}px`;
  sizeTrack.style.backgroundColor = `hsl(${perc * 720}, 65%, 30%)`;
}
sizeInput.addEventListener('change', handleRangeUpdate);
sizeInput.addEventListener('mousemove', handleRangeUpdate);
// function handleMenu(e){
//   if(e.type === 'keydown'){
//     if(e.key.toLowerCase() === 'tab' || e.keyCode === 9){
//       return;
//     } else if(e.key.toLowerCase() === 'enter' || e.keyCode === 13){
//     } else if(e.key.toLowerCase() === ' ' || e.keyCode === 32){
//       e.preventDefault();
//     } else {
//       e.preventDefault();
//       return;
//     }
//   }
//   [...cubeLinks, menuIcon, projectNotesIcon].forEach(x => {
//     x.tabIndex = "-1";
//     x.setAttribute('aria-hidden', true);
//   });
//   this.blur();
//   headline.setAttribute('aria-hidden', true);
//   [main, menuIcon, projectNotesIcon, subhead[0], subhead[1], desc[0], desc[1]].forEach(w => w.style.opacity = '0.35');
//   if(this.hamb){

//     this.children[0].classList.add('top-bun');
//     this.children[2].classList.add('bottom-bun');
//     overlay.style.display = 'flex';
//     if(switchFlag){
//       handleLinearTransInit();
//     } else {
//       handleCurvedTransInit();
//     }
//     setTimeout(() => {
//       overlayContactButton.focus();
//     }, 400);
//   } else {
//     overlay2.style.display = 'block';
//
//   }
// }
// ['click', 'keydown'].forEach(evt => {
//   menuIcon.addEventListener(evt, handleMenu);
//   projectNotesIcon.addEventListener(evt, handleMenu);
// });


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
  // menuIcon.style.display = 'none';
  // projectNotesIcon.style.display = 'none';
  cube.classList.add('blowup');
  window.setTimeout(() => {
    explode[0].style.display = 'none';
    explode[1].style.display = 'none';
  }, (seconds.value * 1000) + 5490);
}
// function handleClose(e){
//   [...cubeLinks, menuIcon, projectNotesIcon].forEach(x => {
//     x.tabIndex = "0";
//     x.removeAttribute('aria-hidden');
//   });
//   headline.removeAttribute('aria-hidden');
//   [main, menuIcon, projectNotesIcon, subhead[0], subhead[1], desc[0], desc[1]].forEach(w => w.style.opacity = '1');
//   if(this.over){
//     overlay.style.display = 'none';
//     menuIcon.children[0].classList.remove('top-bun');
//     menuIcon.children[2].classList.remove('bottom-bun');
//     for(let i = 0; i < options.length; i++){
//       options[i].className = '';
//       options[i].style.transform = '';
//     }

//     menuIcon.focus();
//   } else {
//     overlay2.style.display = 'none';
//     cancelAnimationFrame(panoAnim);
//   }
// }
// overlayCloseButton.addEventListener('click', handleClose);
// tableCloseButton.addEventListener('click', handleClose);

// overlayNextButton.addEventListener('click', function(){
//   if(switchFlag){
//     rotations.unshift(rotations.pop());
//     for(let i = 0; i < options.length; i++){
//       options[i].dataset.pos = rotations[i];
//     }
//     depths.unshift(depths.pop());
//     handleLinearTransInit();
//   } else {
//     flipCards(nextAnims);
//     rotations.unshift(rotations.pop());
//     for(let i = 0; i < options.length; i++){
//       options[i].dataset.pos = rotations[i];
//     }
//     handleCurvedTransNextPrev();
//   }
// });
// overlayPrevButton.addEventListener('click', function(){
//   if(switchFlag){
//     rotations = rotations.slice(1).concat(rotations[0]);
//     for(let i = 0; i < options.length; i++){
//       options[i].dataset.pos = rotations[i];
//     }
//     depths = depths.slice(1).concat(depths[0]);
//     handleLinearTransInit();
//   } else {
//     flipCards(prevAnims);
//     rotations = rotations.slice(1).concat(rotations[0]);
//     for(let i = 0; i < options.length; i++){
//       options[i].dataset.pos = rotations[i];
//     }
//     handleCurvedTransNextPrev();
//   }
// });
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


// overlayContactButton.addEventListener('click', function(e){
//   canvasholder.style.display = 'flex';
//   [...overlayButtons, menuHold, subhead[0], subhead[1], desc[0], desc[1]].forEach(f => f.style.opacity = '0');
//   [...overlayButtons].forEach(g => g.setAttribute('aria-hidden', true));
//   [...overlayButtons, seconds].forEach(z => z.tabIndex = "-1");
//   for(let i = 0; i < options.length; i++){
//     options[i].tabIndex = "-1";
//     let thisInput = options[i].querySelectorAll('input');
//     if(thisInput[1]){
//       thisInput[1].tabIndex = "-1";
//     }
//     thisInput[0].tabIndex = "-1";
//   }
//
// });
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
// canvasbutton[0].addEventListener('click', e => { //contact info close button
//   canvasholder.style.display = 'none';
//   menuIcon.style.zIndex = '5';
//   menuHold.style.opacity = '1';
//   [subhead[0], subhead[1], desc[0], desc[1]].forEach(q => q.style.opacity = '.35');
//   [...overlayButtons].forEach(o => {
//     o.style.opacity = "1";
//     o.tabIndex = "1";
//   });
//   overlayCloseButton.removeAttribute('aria-hidden');
//   overlayContactButton.removeAttribute('aria-hidden');
//   linksDivLinks.forEach(s => {
//     s.tabIndex = "-1";
//     s.setAttribute('aria-hidden', true);
//   });
//   seconds.tabIndex = seconds.hasAttribute('disabled') ? "-1" : "1";
//   for(let i = 0; i < options.length; i++){
//     if(options[i].dataset.pos === '0'){
//       tabIndMgrCurrentItem(i);
//     }
//   }
//   overlayCloseButton.focus();
// });
canvasbutton.addEventListener('click', e => {
  helpText.style.display = 'none';
  ctx.clearRect(0, 0, 300, 300);
  ctx.drawImage(contact, 0, 0, 300, 300);
  canvArray = [];
  canvas.style.backgroundColor = 'transparent';
  window.setTimeout(animate2, 2000);
  canvasbutton.style.display = 'none';
});
function rotate(e){
  if(!isRotating) return;
  const xPos = (e.x || Math.floor(e.touches[0].clientX)) + window.scrollX;
  const yPos = (e.y || Math.floor(e.touches[0].clientY)) - 0 + window.scrollY;
  rotObj[whichPB].xs = xPos - xStart + rotObj[whichPB].x;
  rotObj[whichPB].ys = yPos - yStart + rotObj[whichPB].y;
  pb[whichPB].style.transform = `rotateX(${-rotObj[whichPB].ys}deg) rotateY(${rotObj[whichPB].xs}deg)`;
}
function getCube(e){
  const cubeZeroCtr = { x : (cc[0].offsetLeft + cc[0].offsetWidth/2),
          y : (cc[0].offsetTop - 0 + cc[0].offsetHeight/2)
        };
  const cubeOneCtr = { x : (cc[1].offsetLeft + cc[1].offsetWidth/2),
          y : (cc[1].offsetTop - 0 + cc[1].offsetHeight/2)
        };
  xStart = (e.x || Math.floor(e.touches[0].clientX)) + window.scrollX;
  yStart = (e.y || Math.floor(e.touches[0].clientY)) - 0 + window.scrollY;
  const distFromCubeZero = Math.round(Math.sqrt(Math.pow(Math.abs(cubeZeroCtr.x - xStart),2) + Math.pow(Math.abs(cubeZeroCtr.y - yStart),2)));
  const distFromCubeOne = Math.round(Math.sqrt(Math.pow(Math.abs(cubeOneCtr.x - xStart),2) + Math.pow(Math.abs(cubeOneCtr.y - yStart),2)));
  if(distFromCubeZero <= distFromCubeOne){
    whichPB = 0;
  } else {
    whichPB = 1;
  }
  isRotating = true;
}
main.addEventListener('mousedown', getCube);
main.addEventListener('touchstart', getCube, {passive: true});
main.addEventListener('mousemove', rotate);
main.addEventListener('touchmove', rotate, {passive: true});
document.addEventListener('touchmove', e => {
  if(e.target.tagName === 'A'){
    e.preventDefault();
  }
}, {passive: false});
function releaseCube(e){
  isRotating = false;
  if(e.type[0] === 'm'){
    xEnd = e.x + window.scrollX;
    yEnd = e.y - 0 + window.scrollY;
  }
  rotObj[whichPB].x = rotObj[whichPB].xs || 0;
  rotObj[whichPB].y = rotObj[whichPB].ys || 0;
}
main.addEventListener('mouseup', releaseCube);
main.addEventListener('touchend', releaseCube);
main.addEventListener('mouseleave', (e) => {
  isRotating = false;
  xEnd = e.x + window.scrollX;
  yEnd = e.y - 0 + window.scrollY;
  rotObj[whichPB].x = rotObj[whichPB].xs || 0;
  rotObj[whichPB].y = rotObj[whichPB].ys || 0;
});
