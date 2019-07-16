import gmail from '../images/gmail.png';
import github from '../images/github.png';
import twit from '../images/twit.png';




const linkTemplate = document.createElement('template');

const styleTag = `
<a rel="noopener noreferrer" target="_blank">
  <img/>
</a>
<style>
a:focus{
  outline: none;
  border: 2px solid #1a2845;
}
img{
  width: 100%;
  height: 100%;
}
a{
  cursor: pointer;
`;




class Link extends HTMLElement {
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
    this.ps[1].textContent = no;
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
