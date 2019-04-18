const theul = document.querySelector('ul');
const temp = document.createElement('template');
temp.innerHTML = `<p>GIFs on/off</p>
<input tabindex="0" class="check" type="checkbox" id="gifs" name="gifs" value="gif"/>
<label for="gifs">no GIFs</label>`;
theul.children[1].appendChild(temp.content);

const check = document.querySelector('#gifs');
const checkLabel = document.querySelector('label[for="gifs"]');
let panels;

check.checked = false;

document.addEventListener('panelsLoaded', () => {
  check.disabled = false;
  check.style.cursor = 'default';
}, { once: true });

if (document.querySelectorAll('cube-panel').length < 12) {
  check.disabled = true;
  check.style.cursor = 'not-allowed';
}

check.addEventListener('change', (e) => {
  panels = document.querySelectorAll('cube-panel[gif-on]');
  panels.forEach((item) => {
    item.setAttribute('gif-on', e.target.checked);
  });
  checkLabel.textContent = e.target.checked ? 'GIFs!' : 'no GIFs';
});
