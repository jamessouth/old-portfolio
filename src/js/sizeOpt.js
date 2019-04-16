
const theul = document.querySelector('ul');

const temp = document.createElement('template');
temp.innerHTML = `<p>Cube Size</p>
<div class="slider">
  <div class="track"></div>
  <label for="size">side:</label>
  <input tabindex="0" id="size" type="range" name="size" min="220" max="440" value="220" data-sizing="px">
  <p>&lt;&nbsp;&nbsp;&nbsp;220px&nbsp;&nbsp;&nbsp;&gt;</p>
  <button id="apply" type="button" tabindex="0">apply</button>
</div>`;

theul.children[0].appendChild(temp.content);



const sizeInput = document.querySelector('.slider input');
const sizeInputP = document.querySelector('.slider p');
const sizeTrack = document.querySelector('.track');
const applyButton = document.querySelector('#apply');

sizeInput.value = 220;
sizeInput.addEventListener('focus', () => {
  sizeInput.parentNode.style.border = '3px white solid';
});
sizeInput.addEventListener('blur', () => {
  sizeInput.parentNode.style.border = 'none';
});
function handleRangeUpdate() {
  const width = this.max - this.min;
  const perc = Math.floor(((this.value - width) / width) * 100) / 100;
  sizeInputP.textContent = `<\u00A0\u00A0\u00A0${this.value}px\u00A0\u00A0\u00A0>`;
  sizeTrack.style.width = `${perc * 142}px`;
  sizeTrack.style.backgroundColor = `hsl(${perc * 720}, 65%, 30%)`;
}
sizeInput.addEventListener('change', handleRangeUpdate);
sizeInput.addEventListener('mousemove', handleRangeUpdate);
applyButton.addEventListener('click', () => {
  document.documentElement.style.setProperty('--size', `${sizeInput.value}px`);
});
