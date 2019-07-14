import { projects } from './projects';
// import Project4GIF from '../images/p4.gif';
// import Project7GIF from '../images/p7.gif';
// import Project9GIF from '../images/p9.gif';
// import Project10GIF from '../images/p10.gif';
// import Project11GIF from '../images/p11.gif';
const myWorker = new Worker('./worker.js');




const divs = document.querySelectorAll('.projects div');


function panelMarkupTag(strings, ...anchors) {
  const str = [...anchors].map(anc => `<a rel="noopener noreferrer" target="_blank">${anc}</a>`).join('\n      ');

  return `
    <h3></h3>
    <p></p>
    <p></p>
    <div>
      <img/>
      ${str}
    </div>
    `;
}


const panelTemplate = document.createElement('template');

const styleTag = `
<style>
div:focus,
a:focus{
  outline: none;
  background-color: #1a2845;
  color: #e5d7ba;
}
img{
  width: 100%;
  height: 100%;
  grid-area: top;
}
h3, p, a{
  text-align: center;
  color: #30511d;
}
h3{
  font-size: 2em;
  line-height: 1.5;
  margin: 0;
}
p{
  margin: 0;
  font-size: 1.5em;
  line-height: 1;
  height: 24px;
  font-weight: bold;
}
p:last-of-type{
  border-bottom: 1px solid #30511d;
  padding-bottom: .5rem;
}
a{
  width: calc(100% - 2px);
  height: 30px;
  line-height: 0.8;
  font-size: 2em;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid #30511d;
  font-weight: bold;
}
div{
  display: grid;
  grid: "top top" 90% "lbot rbot" 10% / 1fr 1fr;
  justify-items: center;
  width: 288px;
  height: 320px;
}
`;
const oneAnchorStyle = `
a{
  grid-column: 1 / -1;
`;
const twoAnchorsStyle = `
a:first-of-type{
  grid-area: lbot;
}
a:last-of-type{
  grid-area: rbot;
`;





class Panel extends HTMLElement {
  // static get observedAttributes() {
  //   return ['gif-on'];
  // }

// }
// :host{
//   display: grid;



  constructor({ title, tech1, tech2, live, code, alt, src, live_aria, code_aria }, no) {
    super();
    // Object.assign(this, config);
    const shadowRoot = this.attachShadow({ mode: 'open' });
    panelTemplate.innerHTML = live ? `${panelMarkupTag`${`code`}${`live`}`}${styleTag}${twoAnchorsStyle}` : `${panelMarkupTag`${`code`}`}${styleTag}${oneAnchorStyle}`;
    shadowRoot.appendChild(panelTemplate.content.cloneNode(true));
    this.h3.textContent = title;
    this.anchors[0].setAttribute('href', code);
    this.anchors[0].setAttribute('aria-label', code_aria);
    live && this.anchors[1].setAttribute('href', live);
    live_aria && this.anchors[1].setAttribute('aria-label', live_aria);
    this.img.setAttribute('src', src);
    this.img.setAttribute('alt', alt);
    this.ps[0].textContent = tech1;
    this.ps[1].textContent = tech2;
    // console.log(new Date());


  }




  get anchors() {
    return this.shadowRoot.querySelectorAll('a');
  }

  get div() {
    return this.shadowRoot.querySelector('div');
  }

  get img() {
    return this.shadowRoot.querySelector('img');
  }

  get h3() {
    return this.shadowRoot.querySelector('h3');
  }

  get ps() {
    return this.shadowRoot.querySelectorAll('p');
  }
}
// function getUseCubesJS() {
//   return import(/* webpackChunkName: "useCubes" */ './useCubes').catch(err => console.log(err));
// }
myWorker.addEventListener('message', e => {
  // console.log(e);
  // console.log(divs);
  const panel = new Panel(projects[e.data], e.data);
  divs[e.data].appendChild(panel);

});

export default function panelFactory({ target: { id } }) {
  // console.log('kkkkk');
  myWorker.postMessage(id);





  // if (no < 6) requestAnimationFrame(buildCubes);
  // if ((Math.floor(time || perf) - perf) > interval) {
    // pb[1].appendChild(panel2);
    // no += 1;
    // interval += 1000;
    // if (no > 5) getUseCubesJS();
  // }
}
// function animCubes() {
//   if (document.body.animate) { // polyfill for animation.finished promise at https://gist.github.com/simevidas/2e721c8e6d67f04b5e1a0083c542a767
//     if (typeof Animation === 'undefined') {
//       window.Animation = document.body.animate({}).constructor;
//     }
//     if (Animation.prototype.finished === undefined) {
//       Object.defineProperty(Animation.prototype, 'finished', {
//         get() {
//           if (!this._finished) {
//             this._finished = this.playState === 'finished' ?
//               Promise.resolve() :
//               new Promise((resolve, reject) => {
//                 this.addEventListener('finish', resolve, {once: true});
//                 this.addEventListener('cancel', reject, {once: true});
//               });
//           }
//           return this._finished;
//         }
//       });
//     }
//   }
//   const spin = pb[0].animate(KEYFRAMES(), KEYTIMING);
//   const spin2 = pb[1].animate(KEYFRAMES(), KEYTIMING);
//
//   return Promise.all([spin.finished, spin2.finished]);
// }
// buildCubes();
window.customElements.define('project-panel', Panel);
// if (window.customElements && HTMLElement.prototype.attachShadow) {
//   window.customElements.define('cube-panel', Panel);
//   if (!document.body.animate) {
//     import(/* webpackChunkName: "anim_polyfill" */ 'web-animations-js').then(animCubes).then(hoverCubes).catch(err => console.log(err));
//   } else {
//     animCubes().then(hoverCubes);
//   }
// } else {
//   const info = document.createElement('p');
//   info.innerHTML = `Hello! Your browser does not support custom elements. Try a (non-Microsoft) browser like <span>Google Chrome</span>.
//   Native support for custom elements will ship in <span>Firefox</span> 63 in late October 2018; until then, do the following: open a new tab and go to <span>about:config</span>.
//   Click through any warnings and in the search bar, type in <span>webcomponent</span>.
//   Toggle the <span>...customelements.enabled</span> and <span>...shadowdom.enabled</span> flags to <span>true</span> and reload this page.`;
//   hold.insertBefore(info, subhead[0]);
// }
