const links = [
  {
    link: 'mailto:jamesdanielsouth@outlook.com',
    alt: 'open your email client to email me',
    off: 0,
    w: 78,
  },
  {
    link: 'https://github.com/jamessouth',
    alt: 'go to my github',
    off: -78,
    w: 64,
  },
  {
    link: 'https://app.pluralsight.com/profile/jamessouth',
    alt: 'go to my pluralsight profile',
    off: -142,
    w: 196,
  },
  {
    link: 'https://stackoverflow.com/users/9996080/james-south?tab=profile',
    alt: 'go to my stack overflow profile',
    off: -338,
    w: 54,
  },
  {
    link: 'https://twitter.com/dsouthbot',
    alt: 'go to my twitter',
    off: -392,
    w: 78,
  },
  {
    link: 'https://exercism.io/profiles/jamessouth',
    alt: 'go to my exercism profile',
    off: -470,
    w: 130,
  },
  {
    link: 'https://dev.to/jamessouth',
    alt: 'go to my dev community profile',
    off: -600,
    w: 64,
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
