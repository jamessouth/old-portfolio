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
    .then(([ss, re, ha]) => {
      document.querySelector('li:last-of-type a').href = re.url;
      const link = document.createElement('link');
      link.href = ss.url;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      document.head.appendChild(link);
      harpersImg.src = ha.url;
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

const idObserver = new IntersectionObserver((ents, obs) => {
  ents.filter((entry) => entry.isIntersecting).forEach(({ target, target: { id } }) => {
    if (id != 'articles') {
      Promise.all([
        fetch(`./src/images/${id}sprite.${id == `port` ? `jpg` : `png`}`),
        import(`./${id}Factory.mjs`),
      ])
        .then(([sprite, factory]) => {
          (() => id == 'port' ? projectDivs : contactDivs)().forEach((el, i) => factory.default(el, i, sprite.url));
        })
        .catch((err) => console.log(err));
      if (CSS.paintWorklet) {
        CSS.paintWorklet.addModule('./src/js/BorderPaint.js');
      }
    } else {
      const imgs = document.querySelectorAll('.arts img');
      fetch(`./src/images/articlessprite.jpg`)
        .then(img => {
          [...imgs].forEach(i => i.src = img.url);
        })
        .catch(e => console.log('failed to fetch: ', e));
    }
    fetch(`./src/css/${id}.css`)
      .then(s => {
        const link = document.createElement('link');
        link.href = s.url;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        document.head.appendChild(link);
      })
      .catch(e => console.log('failed to fetch: ', e));
    obs.unobserve(target);
  });
}, {
  root: null,
  rootMargin: '0px 0px 240px 0px',
  threshold: 0.1,
});

sections.forEach(s => idObserver.observe(s));
