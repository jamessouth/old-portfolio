import './loadSW.mjs';

const projectDivs = [...document.querySelectorAll('.projects div')];
const cdivs = document.querySelectorAll('.contact div');
const contactDivs = [...cdivs].slice(0, cdivs.length - 2);
const sections = document.querySelectorAll('section:not(#about)');
const harpersOpenBtn = document.querySelector('span + button');
const harpersCloseBtn = document.querySelector('#harp button');
const harpersImg = document.querySelector('#harp img');
const harp = document.querySelector('#harp');

window.onload = () => {
  Promise.all([
    fetch('./src/css/about.css'),
    fetch('./src/images/resume.pdf'),
    fetch('./src/images/harpers.jpg'),
  ])
    .then(([styles, resume, harpers]) => {
      document.querySelector('li:last-of-type a').href = resume.url;
      makeLink(styles);
      harpersImg.src = harpers.url;
    })
    .catch(e => console.log('failed to fetch: ', e));

  harpersOpenBtn.addEventListener('click', () => {
    harp.classList.add('show');
    harpersCloseBtn.focus();
  });

  harpersCloseBtn.addEventListener('click', () => {
    harp.classList.remove('show');
    harpersOpenBtn.focus();
  });

  if (CSS.paintWorklet) {
    CSS.paintWorklet.addModule('./src/js/ButtonPaint.js');
  }
};

function makeLink({ url }) {
  const link = document.createElement('link');
  link.href = url;
  link.rel = 'stylesheet';
  link.type = 'text/css';
  document.head.appendChild(link);
}

const idObserver = new IntersectionObserver((ents, obs) => {
  ents.filter((entry) => entry.isIntersecting).forEach(({ target, target: { id } }) => {

    if (id == 'port') {
      Promise.all([
        fetch('./src/images/portsprite.jpg'),
        import('./portFactory.mjs'),
        fetch('./src/css/port.css'),
      ])
        .then(([sprite, factory, styles]) => {
          projectDivs.forEach((el, i) => factory.default(el, i, sprite.url));
          makeLink(styles);
        })
        .catch(e => console.log('failed to fetch: ', e));
      if (CSS.paintWorklet) {
        CSS.paintWorklet.addModule('./src/js/BorderPaint.js');
      }
    } else if (id == 'articles') {
      const imgs = document.querySelectorAll('.arts img');
      Promise.all([
        fetch(`./src/images/articlessprite.jpg`),
        fetch('./src/css/articles.css'),
      ])
        .then(([sprite, styles]) => {
          [...imgs].forEach(i => i.src = sprite.url);
          makeLink(styles);
        })
        .catch(e => console.log('failed to fetch: ', e));
    } else {
      Promise.all([
        fetch('./src/images/contsprite.png'),
        import('./contFactory.mjs'),
        fetch('./src/css/cont.css'),
      ])
        .then(([sprite, factory, styles]) => {
          contactDivs.forEach((el, i) => factory.default(el, i, sprite.url));
          makeLink(styles);
        })
        .catch(e => console.log('failed to fetch: ', e));
    }

    obs.unobserve(target);
  });
}, {
  root: null,
  rootMargin: '0px 0px 240px 0px',
  threshold: 0.1,
});

sections.forEach(s => idObserver.observe(s));