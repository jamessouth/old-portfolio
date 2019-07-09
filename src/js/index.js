import '../css/main.scss';
import { projects } from './projects';
// import './loadSW';
import panelFactory from './panelFactory';

// const pdiv = document.querySelector('.projects');
const divs = document.querySelectorAll('.projects div');
// const canvas = document.querySelector('#board');
const IOoptions = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0.5,
};

function IOcallback(entries, observer) {
  entries.filter(entry => entry.isIntersecting).forEach((x) => {
    console.log(x, x.target.id);
    panelFactory(x.target, projects[x.target.id]);


    observer.unobserve(x.target);
    // x.target.remove();
  });
};

if (!window.IntersectionObserver) {
  import(/* webpackChunkName: "sizeOpt" */ './sizeOpt').catch(err => console.log(err));
  import(/* webpackChunkName: "gifOpt" */ './gifOpt').catch(err => console.log(err));
  import(/* webpackChunkName: "destroyOpt" */ './destroyOpt').catch(err => console.log(err));
  import(/* webpackChunkName: "contact" */ './contact').catch(err => console.log(err));
} else {
  const observer = new IntersectionObserver(IOcallback, IOoptions);
  [...divs].forEach(el => observer.observe(el));
}
