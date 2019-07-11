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

export const projects = [
  {
    title: 'random quotes',
    live: 'https://jamessouth.github.io/JS-Project-1/',
    code: 'https://github.com/jamessouth/JS-Project-1',
    alt: 'part of a famous quote',
    tech1: 'javascript',
    src: rando,
  },
  {
    title: 'timezones',
    tech1: 'node mongodb',
    tech2: 'react graphql',
    code: 'https://github.com/jamessouth/timezones',
    alt: 'a graphql query string and response',
    src: time,
  },
  {
    title: 'tic tac toe',
    live: 'https://jamessouth.github.io/JS-Project-4/',
    code: 'https://github.com/jamessouth/JS-Project-4',
    alt: 'a tic tac toe game',
    tech1: 'javascript',
    src: tictac,
  },
  {
    title: '15 puzzle generator',
    tech1: 'angular',
    tech2: 'typescript',
    live: 'https://jamessouth.github.io/fifteen-puzzle-generator/home',
    code: 'https://github.com/jamessouth/fifteen-puzzle-generator',
    alt: 'a web form',
    src: puzz,
  },
  {
    title: 'node.js web scraper',
    code: 'https://github.com/jamessouth/JS-Project-6',
    alt: 'a stuffed frog',
    tech1: 'javascript',
    src: scrape,
  },
  {
    title: 'twitter interface',
    tech1: 'node express',
    tech2: 'pug es6 ajax',
    code: 'https://github.com/jamessouth/JS-Project-7',
    alt: 'twitter sign up and login buttons',
    src: twitter,
  },
  {
    title: 'face scramble!',
    tech1: 'angular typescript',
    tech2: 'nativescript',
    code: 'https://github.com/jamessouth/face-scramble',
    alt: 'a 15 puzzle being solved along with moves and elapsed time',
    src: face,
  },
  {
    title: 'vue-style-lint',
    tech1: 'node es6 fp ci tdd',
    tech2: 'npm|v1.0.3',
    live: 'https://www.npmjs.com/package/vue-style-lint',
    code: 'https://github.com/jamessouth/vue-style-lint',
    alt: 'output of a computer terminal',
    src: vuelint,
  },
  {
    title: 'web app dashboard',
    tech1: 'pwa vue vuex',
    tech2: 'ajax chart.js fp',
    live: 'https://jamessouth.github.io/dashboard/',
    code: 'https://github.com/jamessouth/dashboard',
    alt: 'charts and graphs',
    src: dash,
  },
  {
    title: 'employee directory',
    tech1: 'pwa react a11y',
    tech2: 'tdd ajax fp',
    live: 'https://jamessouth.github.io/directory/',
    code: 'https://github.com/jamessouth/directory',
    alt: 'employee info cards laid out in a grid',
    src: emp,
  },
  {
    title: 'flickr gallery',
    tech1: 'react',
    tech2: 'ajax',
    code: 'https://github.com/jamessouth/Project-11',
    alt: 'a gallery of pictures',
    src: flickr,
  },
  {
    title: 'portfolio',
    tech1: 'pwa webpack a11y paint',
    tech2: 'components workers sass',
    code: 'https://github.com/jamessouth/portfolio',
    alt: 'hovering cubes with images of my websites on each side',
    src: port,
  },
];
