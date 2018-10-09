import { once, throttle } from 'lodash-es';
import '../css/main.scss';
import '../html/index.html';
import './makeCubes';

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
  [...opts, canvas].forEach((el, ind) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      importsArr[ind]().catch(err => console.log(err));
      if (ind === 3) document.removeEventListener('scroll', lazyLoad);
    }
  });
}
document.addEventListener('scroll', lazyLoad);
