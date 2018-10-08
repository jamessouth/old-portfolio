import { throttle } from 'lodash-es';

import '../css/main.scss';
import '../html/index.html';
import './makeCubes';

const opts = document.querySelectorAll('li');

function callImports() {
  return Promise.all([
    import(/* webpackChunkName: "sizeOpt" */ './sizeOpt'),
    import(/* webpackChunkName: "gifOpt" */ './gifOpt'),
    import(/* webpackChunkName: "destroyOpt" */ './destroyOpt'),
    import(/* webpackChunkName: "contact" */ './contact')
  ]).catch(err => console.log(err));
}

function lazy() {

}

document.addEventListener('scroll', throttle(lazy, 1000, {
  'leading': false,
  'trailing': true
}));
