import Contact from '../images/contact.jpg';

const canvas = document.querySelector('canvas#board');
const canvasholder = document.querySelector('.canvasholder');

const canvasbutton = document.querySelector('.canvasbutton button');
const faderCanv = document.querySelector('.canvasbutton #fader');
const linksDiv = document.querySelector('#contactinfolinks');
const linksDivLinks = document.querySelectorAll('#contactinfolinks a');
const clickCounter = document.querySelector('.canvasbutton .clickCounter p:last-of-type');
const helpText = document.querySelector('.canvasbutton .help');

let ctx = canvas.getContext('2d');
let ctxFader = faderCanv.getContext('2d');
let boxes = [];
let timerOne = 0;
let timerTwo = 0;
let shades = [];
let canvArray = [];
let contact = new Image();
let clicks = 0;

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
