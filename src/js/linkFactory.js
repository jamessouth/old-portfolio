import { links } from './links';

const linkTemplate = document.createElement('template');

const htmlTag = `
<a rel="noopener noreferrer">
  <img/>
</a>
<style>
a:focus{
  outline: none;
  border: 2px solid #1a2845;
`;


// }
// img{
//   width: 100%;
//   height: 100%;


class Link extends HTMLElement {
  // static get observedAttributes() {
  //   return ['gif-on'];
  // }

// }
// :host{
//   display: grid;



  constructor({ link, alt, src, link_aria}) {
    super();
    // Object.assign(this, config);
    const shadowRoot = this.attachShadow({ mode: 'open' });
    linkTemplate.innerHTML = htmlTag;
    shadowRoot.appendChild(linkTemplate.content.cloneNode(true));

    this.anchor.setAttribute('href', link);
    this.anchor.setAttribute('aria-label', link_aria);
    this.img.setAttribute('src', src);
    this.img.setAttribute('alt', alt);
  }

  get anchor() {
    return this.shadowRoot.querySelector('a');
  }

  get img() {
    return this.shadowRoot.querySelector('img');
  }
}
// function getUseCubesJS() {
//   return import(/* webpackChunkName: "useCubes" */ './useCubes').catch(err => console.log(err));
// }


export default function linkFactory({ target, target: { id } }) {
  // console.log('kkkkk');

  const link = new Link(links[parseInt(id, 10)]);
  target.appendChild(link);

}


window.customElements.define('contact-link', Link);
