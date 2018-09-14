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




const main = document.querySelector('main');
const pb = document.querySelectorAll('.photo-cube');
const cc = document.querySelectorAll('.cube-container');
const hold = main.querySelector('.hold');
const subhead = hold.querySelectorAll('.subhead:nth-of-type(odd)');
const desc = hold.querySelectorAll('.subhead:nth-of-type(even)');
const cubeLinks = document.querySelectorAll('div.cube-container div.photo-cube div a');






let projects = ['random quotes', 'interactive form', 'tic tac toe', '15 puzzle generator', 'node web scraper', 'twitter interface', 'interactive video', 'accessibility refactor', 'web app dashboard', 'employee directory', 'flickr gallery', 'portfolio'];
const features = ['', '', '', 'AJAX webcam vue routing geolocation', '', 'Node express pug ES6 AJAX', '', '', 'AJAX vue-cli routing vuex Chart.js', 'React WAI-ARIA AJAX', 'React routing AJAX', 'Webpack babel eslint'];

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

let rando = () => Math.floor(Math.random() * 360) - 180;

let KEYFRAMES = () => ([
  {transform: 'rotateX(0deg) rotateY(0deg)'},
  {transform: `rotateX(${rando()}deg) rotateY(${rando()}deg)`},
  {transform: `rotateX(${rando()}deg) rotateY(${rando()}deg)`},
  {transform: `rotateX(${rando()}deg) rotateY(${rando()}deg)`},
  {transform: `rotateX(${rando()}deg) rotateY(${rando()}deg)`},
  {transform: `rotateX(${rando()}deg) rotateY(${rando()}deg)`},
  {transform: 'rotateX(0deg) rotateY(0deg)'}
]);

let KEYTIMING = {duration: 6000, iterations: 1, delay: 1000, easing: 'linear'};

let no = 1;
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
animCubes().then(hoverCubes);

function animCubes(){
  spin = pb[0].animate(
    KEYFRAMES(), KEYTIMING);
  spin2 = pb[1].animate(
    KEYFRAMES(), KEYTIMING);

  let si = setInterval(() => {
    console.log(spin.currentTime);
    buildCubes();
    if(spin.currentTime >= 4999){
      clearInterval(si);
    }
  }, 1000);

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
        subhead[i].textContent = projects[projNum - 1];
        desc[i].textContent = features[projNum - 1];
      }
    }, true);
  });
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


hold.addEventListener('mousedown', getCube);
hold.addEventListener('touchstart', getCube, {passive: true});
hold.addEventListener('mousemove', rotate);
hold.addEventListener('touchmove', rotate, {passive: true});


hold.addEventListener('touchmove', e => {
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


hold.addEventListener('mouseup', releaseCube);
hold.addEventListener('touchend', releaseCube);
hold.addEventListener('mouseleave', (e) => {
  isRotating = false;
  xEnd = e.x + window.scrollX;
  yEnd = e.y - 0 + window.scrollY;
  rotObj[whichPB].x = rotObj[whichPB].xs || 0;
  rotObj[whichPB].y = rotObj[whichPB].ys || 0;
});
