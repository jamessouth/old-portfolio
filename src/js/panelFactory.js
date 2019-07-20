
import { projects } from './projects';
// import Project4GIF from '../images/p4.gif';
// import Project7GIF from '../images/p7.gif';
// import Project9GIF from '../images/p9.gif';
// import Project10GIF from '../images/p10.gif';
// import Project11GIF from '../images/p11.gif';
const myWorker = new Worker('./worker.js', { type: 'module' });




// const divs = document.querySelectorAll('.projects div');


function panelMarkupTag(strings, ...anchors) {
  const str = [...anchors].map(anc => `<a rel="noopener noreferrer">${anc}</a>`).join('\n      ');

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
    Object.assign(this, { title, tech1, tech2, live, code, alt, src, live_aria, code_aria }, no);
    // console.log(this.title);
    const shadowRoot = this.attachShadow({ mode: 'open' });
    panelTemplate.innerHTML = live ? `${panelMarkupTag`${`code`}${`live`}`}${styleTag}${twoAnchorsStyle}` : `${panelMarkupTag`${`code`}`}${styleTag}${oneAnchorStyle}`;
    shadowRoot.appendChild(panelTemplate.content.cloneNode(true));

  }

  connectedCallback() {

    this.h3.textContent = this.title;
    this.anchors[0].setAttribute('href', this.code);
    this.anchors[0].setAttribute('aria-label', this.code_aria);
    this.live && this.anchors[1].setAttribute('href', this.live);
    this.live_aria && this.anchors[1].setAttribute('aria-label', this.live_aria);
    this.img.setAttribute('src', this.src);
    this.img.setAttribute('alt', this.alt);
    this.ps[0].textContent = this.tech1;
    this.ps[1].textContent = this.tech2;
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
  console.log(e);
  // console.log(divs);


});

export default function panelFactory({ target, target: { id } }) {
  // console.log('kkkkk');

  const panel = new Panel(projects[id]);
  target.appendChild(panel);
  myWorker.postMessage(id);


}


window.customElements.define('project-panel', Panel);
