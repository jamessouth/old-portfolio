import { once, throttle } from 'lodash-es';
import '../css/main.scss';
import '../html/index.html';
import './makeCubes';

const ht = window.innerHeight;
const opts = document.querySelectorAll('li');
const canvas = document.querySelector('#board');
const importsArr = [
  once(() => import(/* webpackChunkName: "sizeOpt" */ './sizeOpt')),
  once(() => import(/* webpackChunkName: "gifOpt" */ './gifOpt')),
  once(() => import(/* webpackChunkName: "destroyOpt" */ './destroyOpt')),
  once(() => import(/* webpackChunkName: "contact" */ './contact'))
];
const lazyLoad = throttle(lazy, 1000, {
  'leading': false,
  'trailing': true
});
function lazy() {
  performance.mark('begin');
  [...opts, canvas].forEach((el, ind) => {
    if (el.getBoundingClientRect().top < ht) {
      importsArr[ind]().catch(err => console.log(err));
      if (ind === 3) document.removeEventListener('scroll', lazyLoad);
    }
  });
  performance.mark('end');
  performance.measure('mes', 'begin', 'end');
  let gg = [...performance.getEntriesByName('mes')].reduce((acc, it, ind, arr) => {
    return acc+it.duration;
  }, 0);
  console.log(gg/performance.getEntriesByName('mes').length);
}
document.addEventListener('scroll', lazyLoad);
