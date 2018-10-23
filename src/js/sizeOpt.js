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
