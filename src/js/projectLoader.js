import { projects } from './projects';

export default function projectLoader(divs) {
  divs.forEach((div, i) => {
    const {
      title, tech1, tech2, live, code, alt, src, liveAria, codeAria
    } = projects[i];

    const panelFragment = document.createDocumentFragment();

    const h3 = document.createElement('h3');
    h3.className = 'panH3';
    h3.textContent = title;
    panelFragment.appendChild(h3);

    const p1 = document.createElement('p');
    p1.className = 'panP';
    p1.textContent = tech1;
    panelFragment.appendChild(p1);

    const p2 = document.createElement('p');
    p2.className = 'panP';
    p2.textContent = tech2 || '';
    panelFragment.appendChild(p2);

    const divi = document.createElement('div');
    divi.className = 'panDiv';

    const image = document.createElement('img');
    image.className = 'panImg';
    image.setAttribute('src', src);
    image.setAttribute('alt', alt);
    divi.appendChild(image);

    const a1 = document.createElement('a');
    a1.textContent = 'code';
    a1.className = 'panA';
    a1.setAttribute('href', code);
    a1.setAttribute('rel', 'noopener noreferrer');
    a1.setAttribute('aria-label', codeAria);
    !live && a1.classList.add('panAGrid');
    live && a1.classList.add('panAGrids');
    divi.appendChild(a1);

    const a2 = document.createElement('a');
    a2.textContent = 'live';
    a2.className = 'panA';
    a2.setAttribute('href', live);
    a2.setAttribute('rel', 'noopener noreferrer');
    a2.setAttribute('aria-label', liveAria);
    live && a2.classList.add('panAGrids');
    live && divi.appendChild(a2);

    panelFragment.appendChild(divi);
    div.appendChild(panelFragment);
  });
}
