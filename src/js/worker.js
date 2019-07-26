
import projects from './projects';

addEventListener('message', (e) => { // eslint-disable-line
  console.log(e, projects[0]);
  postMessage(e.data);
});
