import Contact from '../images/contact.jpg';
import ContactBG from '../images/winterscape2.jpg';
import GH from '../images/gh64.png';

const myWorker = new Worker('./worker.js');
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
const contact = new Image();
let timerOne = 0;
let timerTwo = 0;
let clicks = 0;
let animatePaint;
myWorker.addEventListener('message', e => {
  const { shades, canvArray, randBoxes, boardOrder, drawOrder } = e.data;
  contact.onload = () => {
    for (let i = 0; i < canvArray.length - 1; i += 1) {
      ctx.drawImage(contact, canvArray[i][0], canvArray[i][1], 75, 75,
        canvArray[drawOrder[i]][0], canvArray[drawOrder[i]][1], 75, 75);
    }
  };
  contact.src = Contact;
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
      canvArray.splice(0);
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
    if (CSS.paintWorklet) {
      if (clicks === 10) {
        import(/* webpackChunkName: "animPaint" */ './animPaint').then(mod => animatePaint = mod.default).catch(err => console.log(err));
      }
      if (clicks === 20) {
        CSS.paintWorklet.addModule('./burst.min.js');
      }
    }
    if (clicks === 30) {
      linksDivImg.src = GH;
    }
    if (clicks === 40) {
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
    canvArray.splice(0);
    canvas.style.backgroundColor = 'transparent';
    setTimeout(animateRevealContact, 3000);
    canvasbutton.style.display = 'none';
  });
  myWorker.terminate();
});
myWorker.addEventListener('error', e => {
  e.preventDefault();
  console.log(e.message, `on line ${e.lineno}`);
});
