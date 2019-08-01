import rando from '../images/rando.jpg';
import time from '../images/time.jpg';
import tictac from '../images/tictac.jpg';
import puzz from '../images/puzz.jpg';
import scrape from '../images/scrape.jpg';
import twitter from '../images/twitter.jpg';
import face from '../images/face.jpg';
import vuelint from '../images/vuelint.jpg';
import dash from '../images/dash.jpg';
import emp from '../images/emp.jpg';
import flickr from '../images/flickr.jpg';
import port from '../images/port.jpg';
import wdk from '../images/wdk.jpg';

const projects = [
  {
    title: 'random quotes',
    live: 'https://jamessouth.github.io/random-quotes/',
    code: 'https://github.com/jamessouth/random-quotes',
    alt: 'part of a famous quote',
    tech1: 'javascript',
    src: rando,
    liveAria: 'live site for random quotes project',
    codeAria: 'code for random quotes project',
  },
  {
    title: 'directory',
    tech1: 'pwa react a11y',
    tech2: 'tdd ajax fp',
    live: 'https://jamessouth.github.io/directory/',
    code: 'https://github.com/jamessouth/directory',
    alt: 'employee info cards laid out in a grid',
    src: emp,
    liveAria: 'live site for employee directory project',
    codeAria: 'code for employee directory project',
  },
  {
    title: 'dashboard',
    tech1: 'pwa vue vuex',
    tech2: 'ajax chart.js fp',
    live: 'https://jamessouth.github.io/dashboard/',
    code: 'https://github.com/jamessouth/dashboard',
    alt: 'charts and graphs',
    src: dash,
    liveAria: 'live site for web app dashboard project',
    codeAria: 'code for web app dashboard project',
  },
  {
    title: 'vue-style-lint',
    tech1: 'node es6 fp ci tdd',
    tech2: 'npm|v1.0.3',
    live: 'https://www.npmjs.com/package/vue-style-lint',
    code: 'https://github.com/jamessouth/vue-style-lint',
    alt: 'output of a computer terminal',
    src: vuelint,
    liveAria: 'live site for vue-style-lint project',
    codeAria: 'code for vue-style-lint project',
  },
  {
    title: 'web dev kit',
    live: 'https://chrome.google.com/webstore/detail/web-dev-kit/geedfiohcopjhgancckdfanhobhfbgmm',
    code: 'https://github.com/jamessouth/webdevkit',
    alt: 'a laptop on a desk',
    tech1: 'javascript',
    tech2: 'chrome extension',
    src: wdk,
    liveAria: 'live site for web dev kit project',
    codeAria: 'code for web dev kit project',
  },
  {
    title: 'puzzle generator',
    tech1: 'angular',
    tech2: 'typescript',
    live: 'https://jamessouth.github.io/fifteen-puzzle-generator/home',
    code: 'https://github.com/jamessouth/fifteen-puzzle-generator',
    alt: 'a web form',
    src: puzz,
    liveAria: 'live site for 15 puzzle generator project',
    codeAria: 'code for 15 puzzle generator project',
  },
  {
    title: 'tic tac toe',
    live: 'https://jamessouth.github.io/tic-tac-toe/',
    code: 'https://github.com/jamessouth/tic-tac-toe',
    alt: 'a tic tac toe game',
    tech1: 'javascript',
    src: tictac,
    liveAria: 'live site for tic tac toe project',
    codeAria: 'code for tic tac toe project',
  },
  {
    title: 'timezones',
    tech1: 'node mongodb',
    tech2: 'react graphql',
    code: 'https://github.com/jamessouth/timezones',
    alt: 'a graphql query string and response',
    src: time,
    codeAria: 'code for timezones project',
  },
  {
    title: 'portfolio',
    tech1: 'pwa webpack a11y paint',
    tech2: 'components workers sass',
    code: 'https://github.com/jamessouth/portfolio',
    alt: 'hovering cubes with images of my websites on each side',
    src: port,
    codeAria: 'code for portfolio project',
  },
  {
    title: 'face scramble!',
    tech1: 'angular typescript',
    tech2: 'nativescript',
    code: 'https://github.com/jamessouth/face-scramble',
    alt: 'a 15 puzzle being solved along with moves and elapsed time',
    src: face,
    codeAria: 'code for face scramble project',
  },
  {
    title: 'twitter interface',
    tech1: 'node express',
    tech2: 'pug es6 ajax',
    code: 'https://github.com/jamessouth/twitter-interface',
    alt: 'twitter sign up and login buttons',
    src: twitter,
    codeAria: 'code for twitter interface project',
  },
  {
    title: 'web scraper',
    code: 'https://github.com/jamessouth/web-scraper',
    alt: 'a stuffed frog',
    tech1: 'node',
    tech2: 'javascript',
    src: scrape,
    codeAria: 'code for node.js web scraper project',
  },
  {
    title: 'flickr gallery',
    tech1: 'react',
    tech2: 'ajax',
    code: 'https://github.com/jamessouth/react-flickr-gallery',
    alt: 'a gallery of pictures',
    src: flickr,
    codeAria: 'code for flickr gallery project',
  },
];

export default projects;
