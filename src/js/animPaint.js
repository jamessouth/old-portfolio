let paintStart = 0;
const canvasbutton = document.querySelector('.canvasbutton button');

export default function animatePaint() {
  if (paintStart < 900) {
    requestAnimationFrame(animatePaint);
  } else {
    canvasbutton.parentNode.classList.remove('animating');
    return;
  }
  canvasbutton.parentNode.style.cssText = `--a: ${paintStart}`;
  paintStart += 5;
}
