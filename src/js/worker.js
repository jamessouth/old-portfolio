import { projects } from './projects';

addEventListener('message', e => {
  console.log(e);
  postMessage(e.data);
});
