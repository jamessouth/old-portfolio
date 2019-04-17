const theul = document.querySelector('ul');

const temp = document.createElement('template');
temp.innerHTML = `<p>GIFs on/off</p>
<input tabindex="0" class="check" type="checkbox" id="gifs" name="gifs" value="gif" disabled/>
<label for="gifs">no GIFs</label>`.trim();

theul.children[1].appendChild(temp.content);


const check = document.querySelector('#gifs');
const checkLabel = document.querySelector('label[for="gifs"]');
const pb = document.querySelector('.cube-container:last-of-type .photo-cube');
check.checked = false;

if (document.querySelector('cube-panel:last-child')) {
  console.log('message;aosdifja');
  check.disabled = false;
  check.style.cursor = 'default';
} else {
  setTimeout(() => {
    console.log('waite');
    check.disabled = false;
    check.style.cursor = 'default';
  }, 6200);
}
function loopPanels(bool, text) {
  [0, 2, 3, 4].forEach((ind) => {
    pb.children[ind].setAttribute('gif', bool);
  });
  checkLabel.textContent = text;
}
check.addEventListener('change', (e) => {
  if (e.target.checked) {
    loopPanels(true, 'GIFs!');
  } else {
    loopPanels(false, 'no GIFs');
  }
});
