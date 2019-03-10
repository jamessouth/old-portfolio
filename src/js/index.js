import '../css/main.scss';
import './makeCubes';

const opts = document.querySelectorAll('li');
const canvas = document.querySelector('#board');
const IOoptions = {
  root: null,
  rootMargin: '0px 0px 40px 0px',
  threshold: 0.1,
};

function IOcallback(entries, observer) {
  entries.filter(entry => entry.isIntersecting).forEach((x) => {
    switch (x.target.id) {
      case 'sizeOpt':
        import(/* webpackChunkName: "sizeOpt" */ './sizeOpt').catch(err => console.log(err));
        break;
      case 'gifOpt':
        import(/* webpackChunkName: "gifOpt" */ './gifOpt').catch(err => console.log(err));
        break;
      case 'destroyOpt':
        import(/* webpackChunkName: "destroyOpt" */ './destroyOpt').catch(err => console.log(err));
        break;
      case 'board':
        import(/* webpackChunkName: "contact" */ './contact').catch(err => console.log(err));
        break;
    }
    observer.unobserve(x.target);
  });
};

if (!window.IntersectionObserver) {
  import(/* webpackChunkName: "sizeOpt" */ './sizeOpt').catch(err => console.log(err));
  import(/* webpackChunkName: "gifOpt" */ './gifOpt').catch(err => console.log(err));
  import(/* webpackChunkName: "destroyOpt" */ './destroyOpt').catch(err => console.log(err));
  import(/* webpackChunkName: "contact" */ './contact').catch(err => console.log(err));
} else {
  const observer = new IntersectionObserver(IOcallback, IOoptions);
  [...opts, canvas].forEach(el => observer.observe(el));
}
