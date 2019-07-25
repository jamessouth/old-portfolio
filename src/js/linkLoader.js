import { links } from './links';

export default function linkLoader(divs) {
  divs.forEach((div, i) => {
    const { link, alt, src } = links[i];

    const linkFragment = document.createDocumentFragment();

    const a1 = document.createElement('a');
    a1.className = 'linkA';
    a1.setAttribute('rel', "noopener noreferrer");
    a1.setAttribute('href', link);

    const image = document.createElement('img');
    image.setAttribute('src', src);
    image.setAttribute('alt', alt);
    a1.appendChild(image);

    linkFragment.appendChild(a1);

    div.appendChild(linkFragment);

  });
}
