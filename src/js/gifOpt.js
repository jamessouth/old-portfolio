const theul = document.querySelector('ul');

const temp = document.createElement('template');
temp.innerHTML = `<p>GIFs on/off</p>
<input tabindex="0" class="check" type="checkbox" id="gifs" name="gifs" value="gif"/>
<label for="gifs">no GIFs</label>`;

theul.children[1].appendChild(temp.content);


const check = document.querySelector('#gifs');
const checkLabel = document.querySelector('label[for="gifs"]');

check.checked = false;


document.addEventListener('panelsLoaded', function (e) {
  console.log('remove disabled');
  check.disabled = false;
  check.style.cursor = 'default';
}, { once: true });


if (document.querySelectorAll('cube-panel').length < 12) {
  console.log('set disabled true');
  check.disabled = true;
  check.style.cursor = 'not-allowed';
}
// else {
//   setTimeout(() => {
//     console.log('waite');
//     check.disabled = false;
//     check.style.cursor = 'default';
//   }, 6200);
// }
// function loopPanels(bool, text) {
//   [0, 2, 3, 4].forEach((ind) => {
//     pb.children[ind].setAttribute('gif', bool);
//   });
//   checkLabel.textContent = text;
// }
check.addEventListener('change', (e) => {
  const panels = document.querySelectorAll('cube-panel[gif-on]');
  // if (e.target.checked) {
  //   loopPanels(true, 'GIFs!');
  // } else {
  //   loopPanels(false, 'no GIFs');
  // }
  console.log(panels);
  panels.forEach((item) => {
    item.setAttribute('gif-on', e.target.checked);
  })
  checkLabel.textContent = e.target.checked ? 'GIFs!' : 'no GIFs';

});
