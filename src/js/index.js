import '../css/main.scss';
import './loadSW';
import resumePDF from '../images/resume.pdf';
import createAside from './createAside';
import projects from './projects';
import links from './links';

const openModalBtn = document.querySelector('li button');
const closeModalBtn = document.querySelector('aside button');
const modal = document.querySelector('aside');
const headerAnchors = document.querySelectorAll('li a');
const projectDivs = document.querySelectorAll('.projects div');
const contactDivs = document.querySelectorAll('.contact div');
const articles = document.querySelectorAll('.arts > div');
const firstArtImgs = document.querySelectorAll('.art1');
let asideNotBuilt = true;

openModalBtn.addEventListener('click', () => {
  if (asideNotBuilt) {
    const asideTree = createAside(resumePDF);
    modal.insertBefore(asideTree, closeModalBtn);
    asideNotBuilt = false;
  }
  modal.style.display = 'block';
  openModalBtn.blur();
  [openModalBtn, ...headerAnchors].forEach((item) => item.setAttribute('tabindex', '-1'));
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  openModalBtn.focus();
  [openModalBtn, ...headerAnchors].forEach((item) => item.removeAttribute('tabindex'));
});

if (CSS.paintWorklet) {
  CSS.paintWorklet.addModule('./BorderPaint.min.js');
  CSS.paintWorklet.addModule('./ButtonBG.min.js');
}

if (window.IntersectionObserver && window.customElements && HTMLElement.prototype.attachShadow) {
  const IOoptions = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.1,
  };

  const IOcallback = function IOcallback(panFact, linkFact) {
    return function innerIOCB(entries, observer) {
      entries.filter((entry) => entry.isIntersecting).forEach(({ target, target: { id } }) => {
        if (id.includes('x')) {
          linkFact(target, links[parseInt(id, 10)]);
          target.removeAttribute('tabindex');
        } else if (id.startsWith('art')) {
          import(`../images/${id}.jpg`).then((x) => {
            target.lastElementChild.src = x.default; // eslint-disable-line no-param-reassign
          });
        } else {
          panFact(target, projects[id]);
        }
        observer.unobserve(target);
      });
    };
  };

  Promise.all([
    import(/* webpackChunkName: "panelFactory" */ './panelFactory'),
    import(/* webpackChunkName: "linkFactory" */ './linkFactory'),
  ])
    .then(([panFact, linkFact]) => {
      const observer = new IntersectionObserver(IOcallback(
        panFact.default,
        linkFact.default,
      ), IOoptions);
      [...projectDivs, ...contactDivs, ...articles].forEach((el) => observer.observe(el));
    })
    .catch((err) => console.log(err));
} else {
  Promise.all([
    import(/* webpackChunkName: "projectLoader" */ './projectLoader'),
    import(/* webpackChunkName: "linkLoader" */ './linkLoader'),
    import('../images/art_paint_one.jpg'),
    // import('../images/art_paint_two.jpg'),
    import(/* webpackChunkName: "fallback" */ '../css/fallback.scss'),
  ])
    .then(([
      projLoad,
      linkLoad,
      art_paint_one,
      // art_paint_two
    ]) => {
      projLoad.default(projectDivs, projects);
      contactDivs.forEach((div) => div.removeAttribute('tabindex'));
      linkLoad.default(contactDivs, links);
      // [art_paint_one, art_paint_two].forEach((img, i) => {
      //   articles[i].lastElementChild.src = img.default;
      // });
      firstArtImgs.forEach((img, i) => {
        img.src = art_paint_one.default;
        img.style.objectPosition = `${i * 150}px 0%`;

      });



    })
    .catch((err) => console.log(err));
}
