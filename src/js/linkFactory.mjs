function htmlGen(offset) {
  const linkTemplate = document.createElement('template');

  const htmlTag = `
  <a rel="noopener noreferrer">
    <img height="64"/>
  </a>
  <style>
  img{
    object-fit: none;
    object-position: ${offset}px;
  }
  a{
    display: block;
    line-height: 0;
    border: 2px solid transparent;
    padding: 4px;
  }
  a:focus,
  a:hover{
    outline: none;
    border: 2px solid #1a2845;
  `;

  linkTemplate.innerHTML = htmlTag;
  return linkTemplate;

}

class Link extends HTMLElement {
  constructor({ link, alt, off, w }, sprite) {
    super();
    Object.assign(this, { link, alt, w, sprite });
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = htmlGen(off);
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.anchor.setAttribute('href', this.link);
    this.img.setAttribute('src', this.sprite);
    this.img.setAttribute('alt', this.alt);
    this.img.setAttribute('width', this.w);
  }

  get anchor() {
    return this.shadowRoot.querySelector('a');
  }

  get img() {
    return this.shadowRoot.querySelector('img');
  }
}

export default function linkFactory(div, aLink, sprite) {
  const link = new Link(aLink, sprite);
  div.appendChild(link);
}

window.customElements.define('contact-link', Link);
