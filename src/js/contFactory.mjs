const links = [
  {
    _link: 'mailto:jamesdanielsouth@outlook.com',
    _alt: 'open your email client to email me',
    _off: 0,
    _w: 78,
  },
  {
    _link: 'https://github.com/jamessouth',
    _alt: 'go to my github',
    _off: -78,
    _w: 64,
  },
  {
    _link: 'https://app.pluralsight.com/profile/jamessouth',
    _alt: 'go to my pluralsight profile',
    _off: -142,
    _w: 196,
  },
  {
    _link: 'https://stackoverflow.com/users/9996080/james-south?tab=profile',
    _alt: 'go to my stack overflow profile',
    _off: -338,
    _w: 54,
  },
  {
    _link: 'https://twitter.com/dsouthbot',
    _alt: 'go to my twitter',
    _off: -392,
    _w: 78,
  },
  {
    _link: 'https://exercism.io/profiles/jamessouth',
    _alt: 'go to my exercism profile',
    _off: -470,
    _w: 130,
  },
  {
    _link: 'https://dev.to/jamessouth',
    _alt: 'go to my dev community profile',
    _off: -600,
    _w: 64,
  },
];

function htmlGen(link, alt, off, w, sprite) {
  const linkTemplate = document.createElement('template');

  const htmlTag = `
  <a rel="noopener noreferrer" href="${link}">
    <img height="64" src="${sprite}" alt="${alt}" width="${w}"/>
  </a>
  <style>
  img{
    object-fit: none;
    object-position: ${off}px;
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
    border: 2px solid #08415C;
  }`;

  linkTemplate.innerHTML = htmlTag;
  return linkTemplate;

}

class Link extends HTMLElement {
  constructor({ link, alt, off, w }, sprite) {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = htmlGen(link, alt, off, w, sprite);
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default function contFactory(div, index, sprite) {
  const link = new Link(links[index], sprite);
  div.appendChild(link);
}

window.customElements.define('contact-link', Link);