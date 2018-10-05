import '../css/main.scss';
import '../html/index.html';
import './makeCubes';

function callImports() {
  return Promise.all([
    import(/* webpackChunkName: "sizeOpt" */ './sizeOpt'),
    import(/* webpackChunkName: "gifOpt" */ './gifOpt'),
    import(/* webpackChunkName: "destroyOpt" */ './destroyOpt'),
    import(/* webpackChunkName: "contact" */ './contact')
  ]).catch(err => console.log(err));
}
document.addEventListener('scroll', callImports, { once: true });
