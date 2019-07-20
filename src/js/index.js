import '../css/main.scss';
import resumePDF from '../images/resume.pdf';
import resumeJPG from '../images/resume.jpg';
// import './loadSW';
import panelFactory from './panelFactory';
import linkFactory from './linkFactory';
// import animatePaint from './animatePaint';



const openModalBtn = document.querySelector('li button');
const closeModalBtn = document.querySelector('aside button');
const modal = document.querySelector('aside');
const modlink = document.querySelector('aside object');

const modlinkFallBack = document.querySelector('aside object img');
const headerAnchors = document.querySelectorAll('li a');
const projectDivs = document.querySelectorAll('.projects div');
const contactDivs = document.querySelectorAll('.contact div');
let projectPanels, contactLinks;

openModalBtn.addEventListener('click', function (e) {
  modal.style.display = 'block';
  if (!!navigator.mimeTypes.namedItem('application/pdf')) {
    modlink.setAttribute('data', resumePDF);

  } else {
    modlinkFallBack.setAttribute('src', resumeJPG);
    openModalBtn.blur();
    // console.log(fff);
    // fff.focus();
  }



  modlink.focus();

  // document.body.style.overflow = 'hidden';
  // console.log(projectPanels);

  [openModalBtn, ...headerAnchors].forEach((item) => item.setAttribute('tabindex', '-1'));
  //
  // [...projectDivs, ...contactDivs].forEach((item) => item.removeAttribute('tabindex'));


});

closeModalBtn.addEventListener('click', function (e) {
  modal.style.display = 'none';
  openModalBtn.focus();

  // document.body.style.overflow = 'visible';

  [openModalBtn, ...headerAnchors].forEach((item) => item.removeAttribute('tabindex'));
  //
  // [...projectDivs, ...contactDivs].forEach((item) => item.setAttribute('tabindex', '0'));

});


CSS.paintWorklet.addModule('./BorderPaint.js');
// const pdiv = document.querySelector('.projects');



const IOoptions = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0.1,
};

// let animatePaint;

function IOcallback(entries, observer) {
  entries.filter(entry => entry.isIntersecting).forEach((x) => {
    console.log(x, x.target.id);

    panelFactory(x);

    observer.unobserve(x.target);
    // x.target.remove();
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



// if (!window.IntersectionObserver) {
//   import(/* webpackChunkName: "sizeOpt" */ './sizeOpt').catch(err => console.log(err));
//   import(/* webpackChunkName: "gifOpt" */ './gifOpt').catch(err => console.log(err));
//   import(/* webpackChunkName: "destroyOpt" */ './destroyOpt').catch(err => console.log(err));
//   import(/* webpackChunkName: "contact" */ './contact').catch(err => console.log(err));
// } else {
  const observer = new IntersectionObserver(IOcallback, IOoptions);
  [...projectDivs].forEach(el => observer.observe(el));
// }

const observer2 = new IntersectionObserver(IOcallback2, IOoptions);
[...contactDivs].forEach(el => observer2.observe(el));
