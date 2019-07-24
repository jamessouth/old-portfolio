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
let asideNotBuilt = true;

const modlinkFallBack = document.querySelector('aside object iframe');
const headerAnchors = document.querySelectorAll('li a');
const projectDivs = document.querySelectorAll('.projects div');
const contactDivs = document.querySelectorAll('.contact div');
let projectPanels, contactLinks;

openModalBtn.addEventListener('click', function (e) {

  if (asideNotBuilt) {
    const asideTree = createAside(resumePDF);
    modal.insertBefore(asideTree, closeModalBtn);
    asideNotBuilt = false;
  }

  modal.style.display = 'block';

  openModalBtn.blur();

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



if (window.IntersectionObserver && window.customElements && HTMLElement.prototype.attachShadow) {

  const observer = new IntersectionObserver(IOcallback, IOoptions);
  const observer2 = new IntersectionObserver(IOcallback2, IOoptions);
  [...projectDivs].forEach(el => observer.observe(el));
  [...contactDivs].forEach(el => observer2.observe(el));

} else {

  import(/* webpackChunkName: "fallback" */ '../css/fallback.scss')
    .catch(err => console.log('Error loading styles: ', err))
    .then(() => {
      projectLoader(projectDivs);
      contactDivs.forEach((div) => div.removeAttribute('tabindex'));
      linkLoader(contactDivs);
    })
    .catch(err => console.log(err));

}
