const check = document.querySelector('#gifs');
const checkLabel = document.querySelector('label[for="gifs"]');
const pb = document.querySelector('.cube-container:last-of-type .photo-cube');
check.checked = false;
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
