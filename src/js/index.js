/* eslint-disable no-param-reassign */
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
const firstArtImgs = document.querySelectorAll('.art_paint_one');
const secondArtImg = document.querySelector('.art_paint_two');
let asideNotBuilt = true;



// let ggg = [...'Generating Shapes and Images with the CSS Paint (Houdini) API', ...'Generating Knockout Text with the CSS Paint (Houdini) API'].reduce((a,b) => {
//       if(!a[b]){
//         a[b] = 0;
//       }
//       a[b]++;
//       return a;
//     },{});
//     console.log(ggg,Object.keys(ggg).sort((m,n) => {
//       return m > n ? 1 : -1;
//     }).join(''));



// let g = [...new Set([...'Generating Shapes and Images with the CSS Paint (Houdini) API', ...'Generating Knockout Text with the CSS Paint (Houdini) API'])];
// let h = g.sort((m,n) => {
//       return m > n ? 1 : -1;
//     }).join('');
// console.log(h);



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
  const articles = document.querySelectorAll('.arts > div');

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
          import(`../images/${id}.jpg`).then((image) => {
            switch (id) {
              case 'art_paint_one':
                firstArtImgs.forEach((img, i) => {
                  img.src = image.default;
                  img.style.objectPosition = `${i * -150}px 0%`;
                });
                break;
              case 'art_paint_two':
                secondArtImg.src = image.default;
                break;
              default:
                console.log('');
            }
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
      [
        ...projectDivs,
        ...contactDivs,
        ...articles,
      ]
        .forEach((el) => observer.observe(el));
    })
    .catch((err) => console.log(err));
} else {
  Promise.all([
    import(/* webpackChunkName: "projectLoader" */ './projectLoader'),
    import(/* webpackChunkName: "linkLoader" */ './linkLoader'),
    import('../images/art_paint_one.jpg'),
    import('../images/art_paint_two.jpg'),
    import(/* webpackChunkName: "fallback" */ '../css/fallback.scss'),
  ])
    .then(([
      projLoad,
      linkLoad,
      art_paint_one,
      art_paint_two,
    ]) => {
      projLoad.default(projectDivs, projects);
      contactDivs.forEach((div) => div.removeAttribute('tabindex'));
      linkLoad.default(contactDivs, links);
      firstArtImgs.forEach((img, i) => {
        img.src = art_paint_one.default;
        img.style.objectPosition = `${i * -150}px 0%`;
      });

      secondArtImg.src = art_paint_two.default;
    })
    .catch((err) => console.log(err));
}
