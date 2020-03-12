/* eslint-disable no-param-reassign */

// import './loadSW';
// import projects from './projects';
// import links from './links';




fetch('./src/images/resume.pdf')
.then(b => {
  const resLink = document.querySelector('li:last-of-type a');
  resLink.href = b.url;
  resLink.download = 'james_south_resume.pdf';
});



const headerAnchors = document.querySelectorAll('li a');
const projectDivs = document.querySelectorAll('.projects div');
const contactDivs = document.querySelectorAll('.contact div');
const firstArtImgs = document.querySelectorAll('.art_paint_one');
const secondArtImg = document.querySelector('.art_paint_two');



// if (CSS.paintWorklet) {
//   CSS.paintWorklet.addModule('./BorderPaint_v1.min.js');
//   CSS.paintWorklet.addModule('./ButtonBG_v1.min.js');
// }

// if (window.IntersectionObserver && window.customElements && HTMLElement.prototype.attachShadow) {
//   const articles = document.querySelectorAll('.arts > div');

//   const IOoptions = {
//     root: null,
//     rootMargin: '0px 0px -320px 0px',
//     threshold: 0.1,
//   };

//   const IOcallback = function IOcallback(panFact, linkFact) {
//     return function innerIOCB(entries, observer) {
//       entries.filter((entry) => entry.isIntersecting).forEach(({ target, target: { id } }) => {
//         if (id.includes('x')) {
//           linkFact(target, links[parseInt(id, 10)]);
//         } else if (id.startsWith('art')) {



//           // import(`../images/${id}.jpg`).then((image) => {
//             // switch (id) {
//             //   case 'art_paint_one':
//             //     firstArtImgs.forEach((img, i) => {
//             //       // img.src = image.default;
//             //       // img.style.objectPosition = `${i * -150}px 0%`;
//             //       // img.classList.add('apo');
//             //       // img.classList.add(`apo${i}`);
//             //     });
//             //     break;
//             //   case 'art_paint_two':
//             //     secondArtImg.src = image.default;
//             //     break;
//             //   default:
//             //     console.log('unable to load image');
//             // }
//           // });


//         } else {
//           panFact(target, projects[id]);
//         }
//         observer.unobserve(target);
//       });
//     };
//   };

//   Promise.all([
//     import(/* webpackChunkName: "panelFactory" */ './panelFactory'),
//     import(/* webpackChunkName: "linkFactory" */ './linkFactory'),
//   ])
//     .then(([panFact, linkFact]) => {
//       const observer = new IntersectionObserver(IOcallback(
//         panFact.default,
//         linkFact.default,
//       ), IOoptions);
//       [
//         ...projectDivs,
//         ...contactDivs,
//         ...articles,
//       ]
//         .forEach((el) => observer.observe(el));
//     })
//     .catch((err) => console.log(err));
// } else {
//   Promise.all([
//     import(/* webpackChunkName: "projectLoader" */ './projectLoader'),
//     import(/* webpackChunkName: "linkLoader" */ './linkLoader'),
//     import('../images/art_paint_one.jpg'),
//     import('../images/art_paint_two.jpg'),
//     import(/* webpackChunkName: "fallback" */ '../css/fallback.scss'),
//   ])
//     .then(([
//       projLoad,
//       linkLoad,
//       art_paint_one,
//       art_paint_two,
//     ]) => {
//       projLoad.default(projectDivs, projects);
//       linkLoad.default(contactDivs, links);
//       firstArtImgs.forEach((img, i) => {
//         img.src = art_paint_one.default;
//         img.style.objectPosition = `${i * -150}px 0%`;
//       });
//       secondArtImg.src = art_paint_two.default;
//     })
//     .catch((err) => console.log(err));
// }

// if (!CSS.supports('place-items', 'center')) {
//   import(/* webpackChunkName: "edgeStyles" */ '../css/edgeStyles.scss').catch((err) => console.log(err));
// }
