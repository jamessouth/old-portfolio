const linkTemplate = document.createElement('template');

const htmlTag = `
<a rel="noopener noreferrer">
  <img/>
</a>
<style>
a{
  display: block;
  border: 2px solid transparent;
  padding: 4px;
}
a:focus{
  outline: none;
  border: 2px solid #1a2845;
`;

class Link extends HTMLElement {
  constructor({ link, alt, src }) {
    super();
    Object.assign(this, { link, alt, src });
    const shadowRoot = this.attachShadow({ mode: 'open' });
    linkTemplate.innerHTML = htmlTag;
    shadowRoot.appendChild(linkTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.anchor.setAttribute('href', this.link);
    this.img.setAttribute('src', this.src);
    this.img.setAttribute('alt', this.alt);
  }

  get anchor() {
    return this.shadowRoot.querySelector('a');
  }

  get img() {
    return this.shadowRoot.querySelector('img');
  }
}

export default function linkFactory(div, aLink) {
  const link = new Link(aLink);
  div.appendChild(link);
}

window.customElements.define('contact-link', Link);
