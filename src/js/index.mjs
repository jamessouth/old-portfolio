// import './loadSW.mjs';
import projects from './projects.mjs';
import links from './links.mjs';

const projectDivs = document.querySelectorAll('.projects div');
const cdivs = document.querySelectorAll('.contact div');
const sections = document.querySelectorAll('section');
const contactDivs = [...cdivs].slice(0, cdivs.length - 2);

fetch('./src/images/resume.pdf')
.then(b => {
  const resLink = document.querySelector('li:last-of-type a');
  resLink.href = b.url;
  resLink.download = 'james_south_res.pdf';
})
.catch(e => console.log('failed to fetch: ', e));

if (CSS.paintWorklet) {
  CSS.paintWorklet.addModule('./src/js/BorderPaint.js');
  CSS.paintWorklet.addModule('./src/js/ButtonPaint.js');
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

const idObserver = new IntersectionObserver((ents, obs) => {
  ents.filter((entry) => entry.isIntersecting).forEach(({ target }) => {
    if (target.id == 'cont') {
      console.log('tg: ', target);

      fetch('./src/css/cont.css')
        .then(s => {
          const link = document.createElement('link');
          link.href = s.url;
          link.rel = 'stylesheet';
          link.type = 'text/css';
          document.head.appendChild(link);
          
        })
        .catch(e => console.log('failed to fetch: ', e));



    }
    obs.unobserve(target);
  });
}, IOoptions);

sections.forEach(s => idObserver.observe(s));
