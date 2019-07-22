import { links } from './links';

export default function linkLoader(divs) {
  divs.forEach((div, i) => {
    const { link, alt, src } = links[i];


    const linkFragment = document.createDocumentFragment();

    let a1 = document.createElement('a');
    a1.setAttribute('rel', "noopener noreferrer");
    a1.setAttribute('href', link);
    let image = document.createElement('img');
    image.setAttribute('src', src);
    image.setAttribute('alt', alt);
    a1.appendChild(image);
    a1.className = 'linkA';







    linkFragment.appendChild(a1);

    // let styles = document.createElement('style');
    // styles.textContent = styleTag;
    // linkFragment.appendChild(styles);

    div.appendChild(linkFragment);



  });
}
