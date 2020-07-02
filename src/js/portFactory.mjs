const myWorker = new Worker('./worker.js');
const panels = document.querySelectorAll('.projects div');
const projects = [
  {
    _title: 'clean tablet',
    _live: 'http://clean-tablet.herokuapp.com/',
    _code: 'https://github.com/jamessouth/clean-tablet',
    _alt: 'names and scores from a game',
    _tech1: 'go websockets',
    _tech2: 'react heroku',
    _liveAria: 'live site for clean tablet game',
    _codeAria: 'code for clean tablet project',
  },
  {
    _title: 'time zones',
    _tech1: 'react mongodb',
    _tech2: 'node graphql heroku',
    _live: 'http://timezones.herokuapp.com/',
    _code: 'https://github.com/jamessouth/timezones',
    _alt: 'list of countries in a time zone',
    _liveAria: 'live site for timezones project',
    _codeAria: 'code for timezones project',
  },
  {
    _title: 'portfolio',
    _tech1: 'pwa snowpack a11y paint',
    _tech2: 'components workers sass',
    _code: 'https://github.com/jamessouth/portfolio',
    _alt: 'hovering cubes with images of my websites on each side',
    _codeAria: 'code for portfolio project',
  },
  {
    _title: 'dashboard',
    _tech1: 'pwa vue vuex',
    _tech2: 'ajax chart.js fp',
    _live: 'https://jamessouth.github.io/dashboard/',
    _code: 'https://github.com/jamessouth/dashboard',
    _alt: 'a doughnut chart',
    _liveAria: 'live site for web app dashboard project',
    _codeAria: 'code for web app dashboard project',
  },
  {
    _title: 'directory',
    _tech1: 'pwa react a11y',
    _tech2: 'tdd ajax fp',
    _live: 'https://jamessouth.github.io/directory/',
    _code: 'https://github.com/jamessouth/directory',
    _alt: 'employee info cards laid out in a grid',
    _liveAria: 'live site for employee directory project',
    _codeAria: 'code for employee directory project',
  },
  {
    _title: 'puzzle generator',
    _tech1: 'angular',
    _tech2: 'typescript',
    _live: 'https://jamessouth.github.io/fifteen-puzzle-generator/home',
    _code: 'https://github.com/jamessouth/fifteen-puzzle-generator',
    _alt: 'an unsolved sliding block puzzle',
    _liveAria: 'live site for 15 puzzle generator project',
    _codeAria: 'code for 15 puzzle generator project',
  },
  {
    _title: 'face scramble!',
    _tech1: 'angular typescript',
    _tech2: 'nativescript',
    _code: 'https://github.com/jamessouth/face-scramble',
    _alt: 'a 15 puzzle being solved along with moves and elapsed time',
    _codeAria: 'code for face scramble project',
  },
  {
    _title: 'web dev kit',
    _live: 'https://chrome.google.com/webstore/detail/web-dev-kit/geedfiohcopjhgancckdfanhobhfbgmm',
    _code: 'https://github.com/jamessouth/webdevkit',
    _alt: 'a laptop on a desk',
    _tech1: 'javascript',
    _tech2: 'chrome extension',
    _liveAria: 'live site for web dev kit project',
    _codeAria: 'code for web dev kit project',
  },
  {
    _title: 'vue-style-lint',
    _tech1: 'node es6 fp ci tdd',
    _tech2: 'npm|v1.0.3',
    _live: 'https://www.npmjs.com/package/vue-style-lint',
    _code: 'https://github.com/jamessouth/vue-style-lint',
    _alt: 'output of a computer terminal',
    _liveAria: 'live site for vue-style-lint project',
    _codeAria: 'code for vue-style-lint project',
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
    background-color: #08415C;
    color: #fafad2;
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
  const repoName = projects[index]._code.match(/[\w-]+$/)[0];
  myWorker.postMessage({
    id: div.id,
    repoName,
  });
  const panel = new Panel(projects[index], sprite, index);
  div.appendChild(panel);
}

window.customElements.define('project-panel', Panel);