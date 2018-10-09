import Contact from '../images/contact.jpg';
import ContactBG from '../images/winterscape2.jpg';
import GH from '../images/gh64.png';

const canvas = document.querySelector('#board');
const canvasbutton = document.querySelector('.canvasbutton button');
const faderCanv = document.querySelector('#fader');
const linksDiv = document.querySelector('#contactinfolinks');
const linksDivImg = document.querySelector('#contactinfolinks img');
const linksDivLinks = document.querySelectorAll('#contactinfolinks a');
const clickCounter = document.querySelector('.clickCounter p:last-of-type');
const helpText = document.querySelector('.help');
const ctx = canvas.getContext('2d');
const ctxFader = faderCanv.getContext('2d');
const boxes = [];
let timerOne = 0;
let timerTwo = 0;
const shades = [];
let canvArray = [];
const contact = new Image();
let clicks = 0;
let paintStart = 0;
for (let q = 0; q < 15; q += 1) {
  for (let z = 0; z < 15; z += 1) {
    boxes.push([q * 20, z * 20]);
  }
}
function getRands(amt) {
  const nums = new Set();
  while (nums.size < amt) {
    const n = Math.floor(Math.random() * amt);
    nums.add(n);
  }
  return [...nums];
}
function randomizeBoxes() {
  const randos = getRands(boxes.length);
  const randArray = [];
  randos.forEach((x, i) => {
    randArray[x] = boxes[i];
  });
  return randArray;
}
const randBoxes = randomizeBoxes();
function animateRevealContact() {
  if (timerTwo < randBoxes.length - 1) { requestAnimationFrame(animateRevealContact); }
  ctx.clearRect(randBoxes[timerTwo][0], randBoxes[timerTwo][1], 20, 20);
  timerTwo += 1;
  if (timerTwo === randBoxes.length) {
    linksDiv.style.zIndex = 5;
    linksDivLinks.forEach((s) => {
      s.tabIndex = '0';
    });
    linksDivLinks[0].focus();
  }
}
for (let i = 100; i >= 0; i -= 1) {
  shades.push(i / 100);
}
function animatePaint() {
  if (paintStart < 900) {
    requestAnimationFrame(animatePaint);
  } else {
    canvasbutton.parentNode.classList.remove('animating');
    return;
  }
  canvasbutton.parentNode.style.cssText = `--a: ${paintStart}`;
  paintStart += 5;
}
function animateFader() {
  if (timerOne < shades.length) { requestAnimationFrame(animateFader); }
  ctxFader.fillStyle = `rgba(173, 216, 230, ${shades[timerOne]})`;
  ctxFader.clearRect(0, 0, 75, 75);
  ctxFader.fillRect(0, 0, 75, 75);
  timerOne += 1;
  if (timerOne === shades.length) {
    faderCanv.style.display = 'none';
    canvas.style.backgroundColor = 'transparent';
    canvasbutton.parentNode.classList.add('animating');
    if (CSS.paintWorklet) {
      animatePaint();
    }
    setTimeout(animateRevealContact, 3000);
  }
}
for (let i = 0; i < 4; i += 1) {
  for (let j = 0; j < 4; j += 1) {
    canvArray.push([j * 75, i * 75]);
  }
}
function checkBoard() {
  const randos = getRands(canvArray.length - 1);
  const solArray = [];
  randos.forEach((x, i) => {
    solArray[x] = i;
  });
  return [solArray.concat([15]), randos.concat([15])];
}
function getInversions(arr) {
  let inversions = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] == null) { continue; }
    for (let j = 0; j < arr.length; j += 1) {
      if (arr[i] > arr[j + i]) {
        inversions += 1;
      }
    }
  }
  return inversions;
}
let doable = checkBoard();
while (getInversions(doable[0]) % 2 !== 0) {
  doable = checkBoard();
}
const boardOrder = doable[0].slice();
contact.onload = () => {
  for (let i = 0; i < canvArray.length - 1; i += 1) {
    ctx.drawImage(contact, canvArray[i][0], canvArray[i][1], 75, 75,
      canvArray[doable[1][i]][0], canvArray[doable[1][i]][1], 75, 75);
  }
};
contact.src = Contact;
function swapTiles(x, y) {
  if (canvArray.length === 0) { return; }
  const tileClicked = (Math.floor(y / 75) * 4) + Math.floor(x / 75);
  const blank = boardOrder.indexOf(15);
  let finalCheck;
  const brdInd = boardOrder[tileClicked];
  if (![1, 4].includes(Math.abs(tileClicked - blank))) {
    return;
  }
  ctx.clearRect(canvArray[tileClicked][0], canvArray[tileClicked][1], 75, 75);
  ctx.drawImage(contact, canvArray[brdInd][0], canvArray[brdInd][1], 75, 75,
    canvArray[blank][0], canvArray[blank][1], 75, 75);
  [boardOrder[tileClicked], boardOrder[blank]] = [boardOrder[blank], boardOrder[tileClicked]];
  if (boardOrder[0] === 0 && boardOrder[3] === 3
    && boardOrder[11] === 11 && boardOrder[14] === 14) {
    finalCheck = true;
    for (let f = 0; f < boardOrder.length; f += 1) {
      if (boardOrder[f] !== f) {
        finalCheck = false;
        break;
      }
    }
  }
  if (finalCheck) {
    faderCanv.style.display = 'block';
    canvasbutton.style.display = 'none';
    animateFader();
    ctx.drawImage(contact, 225, 225, 75, 75,
      225, 225, 75, 75);
    canvArray = [];
  }
}
canvas.addEventListener('click', (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  swapTiles(x, y);
  clicks += 1;
  if (clicks === 1) {
    helpText.style.display = 'none';
  }
  if (clicks === 10) {
    if (CSS.paintWorklet) {
      CSS.paintWorklet.addModule('./burst.min.js');
    }
  }
  if (clicks === 20) {
    linksDivImg.src = GH;
  }
  if (clicks === 30) {
    linksDiv.style.backgroundImage = `url(${ContactBG})`;
  }
  clickCounter.textContent = clicks;
});
canvasbutton.addEventListener('click', () => {
  linksDivImg.src = GH;
  linksDiv.style.backgroundImage = `url(${ContactBG})`;
  helpText.style.display = 'none';
  ctx.clearRect(0, 0, 300, 300);
  ctx.drawImage(contact, 0, 0, 300, 300);
  canvArray = [];
  canvas.style.backgroundColor = 'transparent';
  setTimeout(animateRevealContact, 3000);
  canvasbutton.style.display = 'none';
});
