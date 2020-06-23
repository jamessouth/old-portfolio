const myWorker = new Worker('./worker.js');
const panels = document.querySelectorAll('.projects div');
const projects = [
  {
    title: 'clean tablet',
    live: 'http://clean-tablet.herokuapp.com/',
    code: 'https://github.com/jamessouth/clean-tablet',
    alt: 'names and scores from a game',
    tech1: 'go websockets',
    tech2: 'react heroku',
    liveAria: 'live site for clean tablet game',
    codeAria: 'code for clean tablet project',
  },
  {
    title: 'time zones',
    tech1: 'react mongodb',
    tech2: 'node graphql heroku',
    live: 'http://timezones.herokuapp.com/',
    code: 'https://github.com/jamessouth/timezones',
    alt: 'list of countries in a time zone',
    liveAria: 'live site for timezones project',
    codeAria: 'code for timezones project',
  },
  {
    title: 'portfolio',
    tech1: 'pwa snowpack a11y paint',
    tech2: 'components workers sass',
    code: 'https://github.com/jamessouth/portfolio',
    alt: 'hovering cubes with images of my websites on each side',
    codeAria: 'code for portfolio project',
  },
  {
    title: 'dashboard',
    tech1: 'pwa vue vuex',
    tech2: 'ajax chart.js fp',
    live: 'https://jamessouth.github.io/dashboard/',
    code: 'https://github.com/jamessouth/dashboard',
    alt: 'a doughnut chart',
    liveAria: 'live site for web app dashboard project',
    codeAria: 'code for web app dashboard project',
  },
  {
    title: 'directory',
    tech1: 'pwa react a11y',
    tech2: 'tdd ajax fp',
    live: 'https://jamessouth.github.io/directory/',
    code: 'https://github.com/jamessouth/directory',
    alt: 'employee info cards laid out in a grid',
    liveAria: 'live site for employee directory project',
    codeAria: 'code for employee directory project',
  },
  {
    title: 'puzzle generator',
    tech1: 'angular',
    tech2: 'typescript',
    live: 'https://jamessouth.github.io/fifteen-puzzle-generator/home',
    code: 'https://github.com/jamessouth/fifteen-puzzle-generator',
    alt: 'an unsolved sliding block puzzle',
    liveAria: 'live site for 15 puzzle generator project',
    codeAria: 'code for 15 puzzle generator project',
  },
  {
    title: 'face scramble!',
    tech1: 'angular typescript',
    tech2: 'nativescript',
    code: 'https://github.com/jamessouth/face-scramble',
    alt: 'a 15 puzzle being solved along with moves and elapsed time',
    codeAria: 'code for face scramble project',
  },
  {
    title: 'web dev kit',
    live: 'https://chrome.google.com/webstore/detail/web-dev-kit/geedfiohcopjhgancckdfanhobhfbgmm',
    code: 'https://github.com/jamessouth/webdevkit',
    alt: 'a laptop on a desk',
    tech1: 'javascript',
    tech2: 'chrome extension',
    liveAria: 'live site for web dev kit project',
    codeAria: 'code for web dev kit project',
  },
  {
    title: 'random quotes',
    live: 'https://jamessouth.github.io/random-quotes/',
    code: 'https://github.com/jamessouth/random-quotes',
    alt: 'part of a famous quote',
    tech1: 'javascript',
    liveAria: 'live site for random quotes project',
    codeAria: 'code for random quotes project',
  },
  {
    title: 'tic tac toe',
    live: 'https://jamessouth.github.io/tic-tac-toe/',
    code: 'https://github.com/jamessouth/tic-tac-toe',
    alt: 'a tic tac toe game',
    tech1: 'javascript',
    liveAria: 'live site for tic tac toe project',
    codeAria: 'code for tic tac toe project',
  },
  {
    title: 'vue-style-lint',
    tech1: 'node es6 fp ci tdd',
    tech2: 'npm|v1.0.3',
    live: 'https://www.npmjs.com/package/vue-style-lint',
    code: 'https://github.com/jamessouth/vue-style-lint',
    alt: 'output of a computer terminal',
    liveAria: 'live site for vue-style-lint project',
    codeAria: 'code for vue-style-lint project',
  },
  {
    title: 'web scraper',
    code: 'https://github.com/jamessouth/web-scraper',
    alt: 'a stuffed frog',
    tech1: 'node',
    tech2: 'javascript',
    codeAria: 'code for node.js web scraper project',
  },
  {
    title: 'twitter interface',
    tech1: 'node express',
    tech2: 'pug es6 ajax',
    code: 'https://github.com/jamessouth/twitter-interface',
    alt: 'twitter sign up and login buttons',
    codeAria: 'code for twitter interface project',
  },
  {
    title: 'flickr gallery',
    tech1: 'react',
    tech2: 'ajax',
    code: 'https://github.com/jamessouth/react-flickr-gallery',
    alt: 'a gallery of pictures',
    codeAria: 'code for flickr gallery project',
  },
];

function htmlGen(title, tech1, tech2, live, code, alt, liveAria, codeAria, sprite, index) {
  const panelTemplate = document.createElement('template');

  const htmlTag = `
  <h3>${title}</h3>
  <p>${tech1}</p>
  <p>${tech2 ? tech2 : ''}</p>
  <div></div>
  <div>
    <img src="${sprite}" alt="${alt}"/>
    <a rel="noopener noreferrer" href="${code}" aria-label="${codeAria}">code</a>
    ${live ? `<a rel="noopener noreferrer" href="${live}" aria-label="${liveAria}">live</a>` : ``}
  </div>
  <style>
  a:hover,
  a:focus{
    outline: none;
    background-color: #1a2845;
    color: #e5d7ba;
  }
  img{
    object-fit: cover;
    object-position: ${index * -288}px;
    width: 100%;
    height: 100%;
    grid-area: top;
  }
  h3, p, a{
    text-align: center;
    color: #30511d;
  }
  h3{
    font-size: 1.9em;
    line-height: 1.6;
    margin: 0;
  }
  p{
    margin: 0;
    font-size: 1.5em;
    line-height: 1;
    height: 24px;
    font-weight: bold;
  }
  a{
    width: calc(100% - 2px);
    height: 30px;
    line-height: 0.8;
    font-size: 2em;
    text-decoration: none;
    border: 1px solid #30511d;
    font-weight: bold;
  }
  div:first-of-type{
    width: 100%;
    height: .5625rem;
    background: transparent;
  }
  div:last-of-type{
    display: grid;
    grid: "top top" 90% "lbot rbot" 10% / 1fr 1fr;
    justify-items: center;
    width: 288px;
    height: 320px;
  }
  ${live ? `
  a:first-of-type{
    grid-area: lbot;
  }
  a:last-of-type{
    grid-area: rbot;
  }` : `
  a{
    grid-column: 1 / -1;
  }`}
  `;

  panelTemplate.innerHTML = htmlTag;
  return panelTemplate;

}


class Panel extends HTMLElement {
  constructor({
    title, tech1, tech2, live, code, alt, liveAria, codeAria,
  }, sprite, index) {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = htmlGen(title, tech1, tech2, live, code, alt, liveAria, codeAria, sprite, index);
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get langDiv() {
    return this.shadowRoot.querySelector('div:first-of-type');
  }

}



myWorker.addEventListener('message', (e) => {
    panels[e.data.id].children[0].shadowRoot.children[3].style.background = e.data.style;
    panels[e.data.id].children[0].shadowRoot.children[3].setAttribute('title', e.data.title);
});

export default function portFactory(div, index, sprite) {
  const repoName = projects[index].code.match(/[\w-]+$/)[0];
  myWorker.postMessage({
    id: div.id,
    repoName,
  });
  const panel = new Panel(projects[index], sprite, index);
  div.appendChild(panel);
  
}

window.customElements.define('project-panel', Panel);
