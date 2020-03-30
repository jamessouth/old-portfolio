// import './loadSW';
import projects from './projects.mjs';
import links from './links.mjs';

const projectDivs = document.querySelectorAll('.projects div');
const ldivs = document.querySelectorAll('.contact div');
const contactDivs = [...ldivs].slice(0, ldivs.length - 2);

fetch('./src/images/resume.pdf')
.then(b => {
  const resLink = document.querySelector('li:last-of-type a');
  resLink.href = b.url;
  resLink.download = 'james_south_resume.pdf';
})
.catch(e => console.log('failed to fetch: ', e));

if (CSS.paintWorklet) {
  CSS.paintWorklet.addModule('./src/js/BorderPaint.js');
  CSS.paintWorklet.addModule('./src/js/ButtonBG.js');
}

const IOoptions = {
  root: null,
  rootMargin: '0px 0px 420px 0px',
  threshold: 0.1,
};

const IOcallback = function IOcallback(panFact, linkFact) {
  return function innerIOCB(entries, observer) {
    entries.filter((entry) => entry.isIntersecting).forEach(({ target, target: { id } }) => {
      if (id.includes('x')) {
        linkFact(target, links[parseInt(id, 10)]);
      } else {
        panFact(target, projects[id]);
      }
      observer.unobserve(target);
    });
  };
};

Promise.all([
  import('./panelFactory.mjs'),
  import('./linkFactory.mjs'),
])
  .then(([panFact, linkFact]) => {
    const observer = new IntersectionObserver(IOcallback(
      panFact.default,
      linkFact.default,
    ), IOoptions);
    [
      ...projectDivs,
      ...contactDivs,
    ]
      .forEach((el) => observer.observe(el));
  })
  .catch((err) => console.log(err));
