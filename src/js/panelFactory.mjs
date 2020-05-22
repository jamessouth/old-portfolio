// const myWorker = new Worker('./worker.js', { type: 'module' });
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
    title: 'timezones',
    tech1: 'node mongodb',
    tech2: 'react graphql',
    code: 'https://github.com/jamessouth/timezones',
    alt: 'a graphql query string and response',
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
    title: 'face scramble!',
    tech1: 'angular typescript',
    tech2: 'nativescript',
    code: 'https://github.com/jamessouth/face-scramble',
    alt: 'a 15 puzzle being solved along with moves and elapsed time',
    codeAria: 'code for face scramble project',
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
    title: 'web scraper',
    code: 'https://github.com/jamessouth/web-scraper',
    alt: 'a stuffed frog',
    tech1: 'node',
    tech2: 'javascript',
    codeAria: 'code for node.js web scraper project',
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
    title: 'flickr gallery',
    tech1: 'react',
    tech2: 'ajax',
    code: 'https://github.com/jamessouth/react-flickr-gallery',
    alt: 'a gallery of pictures',
    codeAria: 'code for flickr gallery project',
  },
];

function htmlGen(link, alt, off, w, sprite) {
  const panelTemplate = document.createElement('template');

  const htmlTag = `
  <h3></h3>
  <p></p>
  <p></p>
  <div>
    <img/>
    ${str}
  </div>
  <style>
  a:hover,
  a:focus{
    outline: none;
    background-color: #1a2845;
    color: #e5d7ba;
  }
  img{
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
  p:last-of-type{
    border-bottom: 1px solid #30511d;
    padding-bottom: .5rem;
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
  div{
    display: grid;
    grid: "top top" 90% "lbot rbot" 10% / 1fr 1fr;
    justify-items: center;
    width: 288px;
    height: 320px;
  }
  `;

  panelTemplate.innerHTML = htmlTag;
  return panelTemplate;

}


function panelMarkupTag(, ...anchors) {
  const str = [...anchors].map((anc) => `<a rel="noopener noreferrer">${anc}</a>`).join('\n      ');


}




const oneAnchorStyle = `
a{
  grid-column: 1 / -1;
`;

const twoAnchorsStyle = `
a:first-of-type{
  grid-area: lbot;
}
a:last-of-type{
  grid-area: rbot;
`;

class Panel extends HTMLElement {
  constructor({
    title, tech1, tech2, live, code, alt, src, liveAria, codeAria,
  }, no) {
    super();
    Object.assign(this, {
      title, tech1, tech2, live, code, alt, src, liveAria, codeAria,
    }, no);
    const shadowRoot = this.attachShadow({ mode: 'open' });
    panelTemplate.innerHTML = live ? `${panelMarkupTag`${`code`}${`live`}`}${styleTag}${twoAnchorsStyle}` : `${panelMarkupTag`${`code`}`}${styleTag}${oneAnchorStyle}`;
    shadowRoot.appendChild(panelTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.h3.textContent = this.title;
    this.anchors[0].setAttribute('href', this.code);
    this.anchors[0].setAttribute('aria-label', this.codeAria);
    this.live && this.anchors[1].setAttribute('href', this.live);
    this.liveAria && this.anchors[1].setAttribute('aria-label', this.liveAria);
    fetch(this.src)
    .then(i => {
      this.img.setAttribute('src', i.url);
    })
    .catch(e => console.log('failed to fetch: ', e));
    this.img.setAttribute('alt', this.alt);
    this.ps[0].textContent = this.tech1;
    this.ps[1].textContent = this.tech2;
  }

  get anchors() {
    return this.shadowRoot.querySelectorAll('a');
  }

  get div() {
    return this.shadowRoot.querySelector('div');
  }

  get img() {
    return this.shadowRoot.querySelector('img');
  }

  get h3() {
    return this.shadowRoot.querySelector('h3');
  }

  get ps() {
    return this.shadowRoot.querySelectorAll('p');
  }
}

// myWorker.addEventListener('message', (e) => {
//   console.log(e);
// });

export default function panelFactory(div, index, sprite) {
  const panel = new Panel(projects[index], sprite);
  div.appendChild(panel);
  // myWorker.postMessage(div.id);
}

window.customElements.define('project-panel', Panel);
