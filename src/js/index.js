import '../css/main.scss';
import resumePDF from '../images/resume.pdf';
// import resumeJPG from '../images/resume.jpg';
// import './loadSW';
import panelFactory from './panelFactory';
import projectLoader from './projectLoader';
import createAside from './createAside';
import linkLoader from './linkLoader';
import linkFactory from './linkFactory';
// import animatePaint from './animatePaint';



const openModalBtn = document.querySelector('li button');
const closeModalBtn = document.querySelector('aside button');
const modal = document.querySelector('aside');
const modlink = document.querySelector('aside object');
let asideBuilt = false;

const modlinkFallBack = document.querySelector('aside object iframe');
const headerAnchors = document.querySelectorAll('li a');
const projectDivs = document.querySelectorAll('.projects div');
const contactDivs = document.querySelectorAll('.contact div');
let projectPanels, contactLinks;

openModalBtn.addEventListener('click', function (e) {

  if (asideBuilt) {

  } else {
    const asideTree = createAside(resumePDF);
    modal.insertBefore(asideTree, closeModalBtn);
    asideBuilt = true;
  }




  modal.style.display = 'block';
  // if (!!navigator.mimeTypes.namedItem('application/pdf').enabledPlugin.filename) {
    // modlink.setAttribute('data', resumePDF);
  // } else {
    // modlinkFallBack.setAttribute('src', resumePDF);
    // openModalBtn.blur();
    // console.log(fff);
    // fff.focus();
  // }
  // modlink.focus();

  [openModalBtn, ...headerAnchors].forEach((item) => item.setAttribute('tabindex', '-1'));

});

closeModalBtn.addEventListener('click', function (e) {
  modal.style.display = 'none';
  openModalBtn.focus();

  [openModalBtn, ...headerAnchors].forEach((item) => item.removeAttribute('tabindex'));

});

if (CSS.paintWorklet) {
  CSS.paintWorklet.addModule('./BorderPaint.js');
}


const IOoptions = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0.1,
};

function IOcallback(entries, observer) {
  entries.filter(entry => entry.isIntersecting).forEach((x) => {
    console.log(x, x.target.id);

    panelFactory(x);

    observer.unobserve(x.target);

  });
};

function IOcallback2(entries, observer) {
  entries.filter(entry => entry.isIntersecting).forEach((x) => {
    console.log(x, x.target.id);

    linkFactory(x);
    // console.log(x.target.getAttribute('tabindex'));
    x.target.removeAttribute('tabindex');
    observer2.unobserve(x.target);
    // x.target.remove();
  });
};



if (!window.IntersectionObserver) {


} else {
  if (window.customElements && HTMLElement.prototype.attachShadow) {

    const observer = new IntersectionObserver(IOcallback, IOoptions);
    [...projectDivs].forEach(el => observer.observe(el));

    const observer2 = new IntersectionObserver(IOcallback2, IOoptions);
    [...contactDivs].forEach(el => observer2.observe(el));

  } else {

    projectLoader(projectDivs);
    contactDivs.forEach((div) => div.removeAttribute('tabindex'));
    linkLoader(contactDivs);


  }

}
