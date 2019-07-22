import { projects } from './projects';




export default function projectLoader(divs) {
  divs.forEach((div, i) => {
    const { title, tech1, tech2, live, code, alt, src, live_aria, code_aria } = projects[i];


    const panelFragment = document.createDocumentFragment();

    let h3 = document.createElement('h3');
    h3.className = 'panH3';
    h3.textContent = title;
    panelFragment.appendChild(h3);


    let p1 = document.createElement('p');
    p1.className = 'panP';
    p1.textContent = tech1;
    panelFragment.appendChild(p1);

    let p2 = document.createElement('p');
    p2.className = 'panP';
    p2.textContent = tech2 || '';
    panelFragment.appendChild(p2);

    let divi = document.createElement('div');
    divi.className = 'panDiv';
    let image = document.createElement('img');
    image.className = 'panImg';
    let a1 = document.createElement('a');
    a1.textContent = 'code';
    let a2 = document.createElement('a');
    a2.textContent = 'live';
    image.setAttribute('src', src);
    image.setAttribute('alt', alt);
    a1.setAttribute('href', code);
    a1.className = 'panA';
    a1.setAttribute('rel', "noopener noreferrer");
    a1.setAttribute('aria-label', code_aria);
    !live && a1.classList.add('panAGrid');
    a2.setAttribute('href', live);
    a2.className = 'panA';
    live && a1.classList.add('panAGrids');
    live && a2.classList.add('panAGrids');
    a2.setAttribute('rel', "noopener noreferrer");
    a2.setAttribute('aria-label', live_aria);
    divi.appendChild(image);
    divi.appendChild(a1);
    live && divi.appendChild(a2);


    panelFragment.appendChild(divi);

    // let styles = document.createElement('style');
    // styles.textContent = styleTag;
    // panelFragment.appendChild(styles);

    div.appendChild(panelFragment);



  });
}
